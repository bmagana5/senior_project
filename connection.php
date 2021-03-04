<?php

    // definition for the Connection class in this file
    final class Connection {
        private static $connection;
        const USER_DATA_DIR = "img/users/";
        const DEFAULT_PFP = "default_database_profile_img.jpg";

        // constructor called when object is created
        function __construct($dbconn) {

            // initial connection -- needed in order to grant new user limited privileges in DB (TO BE IMPLEMENTED)
            self::connectionInit($dbconn);
            
            if ($_SERVER['REQUEST_METHOD'] == 'POST' && self::$connection) {

                // print_r($_POST);
                $form_type = self::test_input($_POST['form-type']);

                switch($form_type) {
                    case 'sign-up':
                        // clean and store all of the form data
                        $username = self::test_input($_POST['username']);
                        $fullname = self::test_input($_POST['fullname']);
                        $email = self::test_input($_POST['email']);
                        $signup_password = self::test_input($_POST['signup-password']);
                        $passwordconfirm = self::test_input($_POST['passwordconfirm']);
                        $form_url = self::test_input($_POST['form-url']);

                        if ($this->checkUserEmailAvailability($username, $email)) {
                            $this->insertUser($username, $fullname, $email, $signup_password);
                            header('Location: php/home.php');
                        } else {
                            self::connectionTerminate();
                            session_destroy();
                            header('Location: ' . $form_url);
                        }
                        break;
                    case 'log-in':
                        // clean and store all of the form data
                        $login_userfield = self::test_input($_POST['login-userfield']);
                        $login_password = self::test_input($_POST['login-password']);
                        $form_url = self::test_input($_POST['form-url']);

                        if ($this->getUser($login_userfield, $login_password)) {
                            header('Location: php/home.php');
                        } else {
                            self::connectionTerminate();
                            session_destroy();
                            header('Location: ' . $form_url);
                        }
                        break;
                    default:
                        // this should never be reached, really
                        break;
                }
            } else {
                $form_url = self::test_input($_POST['form-url']);
                self::connectionTerminate();
                session_destroy();
                header('Location: ' . $form_url);
            }
            exit();
        }

        private static function connectionInit($dbconn) {
            try {
                // establish connection: give host server address, database name, username, and username's password
                self::$connection = 
                    new PDO("mysql:host={$dbconn['servername']};dbname={$dbconn['database']}", $dbconn['username'], $dbconn['password']);
                // PDO error mode is set to exception
                self::$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                // echo "Connection established successfully<br>";
            } catch (PDOException $e) {
                echo "Connection failed: " . $e->getMessage() . "<br>";
                exit();
            }
        }

        /**
         * Check to see if a username or email address are not already in use in the database.
         * @param username a username that the user intends to associate with their account
         * @param email an email address the user intends to associate with their account
         * @return True/False returns true if neither of the provided fields are already in use in the database
         */
        private function checkUserEmailAvailability($username, $email) {
            $query1 = "call getUsername('${username}')";
            $query2 = "call getEmailAddress('${email}')";
            try {
                if (self::$connection == NULL) {
                    require 'php/credentials.php';
                    self::connectionInit($dbconn);
                }
                $stmt = self::$connection->prepare($query1);
                $stmt->execute();
                $q1 = $stmt->fetch();

                $stmt = self::$connection->prepare($query2);
                $stmt->execute();
                $q2 = $stmt->fetch();
                // if any of them exists, return false
                return !($q1 || $q2);
            } catch (PDOException $e) {
                echo "<div style='color: red;'>**${query1}**<br>**${query2}</div> " . $e->getMessage();
                exit();
            }
        }

        /** 
         * Will determine if a password is associated with a username
         * @param userfield a username or email address submitted by a user to log in
         * @param password a password submitted by a user upon logging in
         */
        private function getUser($userfield, $password) {
            // check if user exists in database
            $query = "call getUserPasswordInfo('${userfield}')";
            try {
                if (self::$connection == NULL) {
                    require 'php/credentials.php';
                    self::connectionInit($dbconn);
                }
                $stmt = self::$connection->prepare($query);
                $stmt->execute();
                $user = $stmt->fetch();
                if ($user) {
                    if (password_verify($password, $user['pwd_hash'])) {
                        $_SESSION['user_id'] = $user['user_id'];
                        $_SESSION['username'] = $user['username'];
                        $_SESSION['email'] = $user['email_address'];
                        return true;
                    }
                }
            } catch (PDOException $e) {
                echo "<span style='color: red;'>**${query}**</span> " . $e->getMessage();
                exit();
            }
            return false;
        }

        private function insertUser($username, $fullname, $email, $password) {
            $passwd_id = $this->insertPassword(password_hash($password, PASSWORD_BCRYPT));
            $passwd_id = strval($passwd_id);

            if (!file_exists(self::USER_DATA_DIR)) {
                mkdir(self::USER_DATA_DIR);
            }

            $this->createMainDirectories($username);
            $pfp_id = self::createProfilePicture();
            $pfp_id = strval($pfp_id);

            $query = "insert into user (username, full_name, user_passwd_id, email_address, pfp_id, profile_bio) values ('${username}', '${fullname}', ${passwd_id}, '${email}', ${pfp_id}, '')";
            try {
                if (self::$connection == NULL) {
                    require 'php/credentials.php';
                    self::connectionInit($dbconn);
                }
                self::$connection->exec($query);
            } catch (PDOException $e) {
                echo "<span style='color: red;'>**${query}**</span>"  . $e->getMessage();
                exit();
            }
            $_SESSION['username'] = $username;
            $_SESSION['email'] = $email;
            $_SESSION['user_id'] = self::$connection->lastInsertId();
        }

        private function insertPassword($hashed_password) {
            $query = "insert into password (pwd_hash) values ('${hashed_password}')";
            try {
                if (self::$connection == NULL) {
                    require 'php/credentials.php';
                    self::connectionInit($dbconn);
                }
                self::$connection->exec($query);
            } catch (PDOException $e) {
                echo "<span style='color: red;'>**${query}**</span> " . $e->getMessage();
                exit();
            }
            return self::$connection->lastInsertId();
        }

        private function createProfilePicture() {
            $pfp_path = "img/" . self::DEFAULT_PFP;
            $query = "insert into image (image_name) values ('${pfp_path}')";
            try {
                if (self::$connection == NULL) {
                    require 'php/credentials.php';
                    self::connectionInit($dbconn);
                }
                self::$connection->exec($query);
            } catch (PDOException $e) {
                echo "<span style='color: red;'>**${query}**</span> " . $e->getMessage();
                exit();
            }
            return self::$connection->lastInsertId();
        }

        /**
         * Takes in user data and cleanses it of any potentially harmful content.
         * @param data any piece of user form data submitted in an HTML form
         * @return data a cleaned-up version of the originally submitted data through a user form
         */
        private static function test_input($data) {
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
            return $data;
        }

        private function createMainDirectories($username) {
            $userpath = self::USER_DATA_DIR . $username . '/';
            mkdir($userpath);
            mkdir($userpath . "profile/");
            mkdir($userpath . "posts/");
        }

        public static function getFriendsList($user_id) {
            $query = "call getFriends(${user_id})";
            try {
                if (self::$connection == NULL) {
                    require 'php/credentials.php';
                    self::connectionInit($dbconn);
                }
                $stmt = self::$connection->prepare($query);
                $stmt->execute();
                $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
                $friendlist = $stmt->fetchAll();
                return $friendlist;
            } catch (PDOException $e) {
                echo "<div style='color: red;'>**${query}**</div> " . $e->getMessage();
                exit();
            }
        }

        public static function getConnection() {
            return self::$connection;
        }

        public static function connectionTerminate() {
            self::$connection = null;
        }

        public static function testFunction() {
            echo "testFunction has been called";
        }
    }
?>
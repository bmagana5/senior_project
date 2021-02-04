<?php
    session_start();
    require 'credentials.php';

    class Connection {
        private $connection;

        // destructor -- close the connection
        function __destruct() {
            $this->connection = null;
        }

        function __construct($servername, $database, $username, $password) {
            try {
                // establish connection: give host server address, database name, username, and username's password
                $this->connection = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
                // PDO error mode is set to exception
                $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                // echo "Connection established successfully<br>";
            } catch (PDOException $e) {
                echo "Connection failed: " . $e->getMessage() . "<br>";
                exit();
            }
            if ($_SERVER['REQUEST_METHOD'] == 'POST' && $this->connection) {

                $form_type = $this->test_input($_POST['form-type']);

                switch($form_type) {
                    case 'sign-up':
                        // clean and store all of the form data
                        $username = $this->test_input($_POST['username']);
                        $fullname = $this->test_input($_POST['fullname']);
                        $email = $this->test_input($_POST['email']);
                        $signup_password = $this->test_input($_POST['signup-password']);
                        $passwordconfirm = $this->test_input($_POST['passwordconfirm']);
                        $form_url = $this->test_input($_POST['form-url']);

                        if ($this->checkUserEmailAvailability($username, $email)) {
                            $this->insertUser($username, $fullname, $email, $signup_password);
                            header('Location: home.php');
                        } else {
                            header('Location: ' . $form_url);
                            session_destroy();
                        }
                        break;
                    case 'log-in':
                        // clean and store all of the form data
                        $login_userfield = $this->test_input($_POST['login-userfield']);
                        $login_password = $this->test_input($_POST['login-password']);
                        $form_url = $this->test_input($_POST['form-url']);

                        if ($this->getUser($login_userfield, $login_password)) {
                            header('Location: home.php');
                        } else {
                            header('Location: ' . $form_url);
                            session_destory();
                        }
                        break;
                    default:
                        // this should never be reached, really
                        break;
                }
            } else {
                $form_url = $this->test_input($_POST['form-url']);

                header('Location: ' . $form_url);
                session_destroy();
            }
            exit();
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

        /**
         * Check to see if a username or email address are not already in use in the database.
         * @param username a username that the user intends to associate with their account
         * @param email an email address the user intends to associate with their account
         * @return True/False returns true if neither of the provided fields are already in use in the database
         */
        private function checkUserEmailAvailability($username, $email) {
            $query1 = "call getUsername('$username')";
            $query2 = "call getEmailAddress('$email')";
            try {
                $stmt = $this->connection->prepare($query1);
                $stmt->execute();
                $q1 = $stmt->fetch();

                $stmt = $this->connection->prepare($query2);
                $stmt->execute();
                $q2 = $stmt->fetch();
                // if any of them exists, return false
                return !($q1 || $q2);
            } catch (PDOException $e) {
                echo $e->getMessage() . "<br>";
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
            $query = "call getUserPasswordInfo('$userfield')";
            try {
                $stmt = $this->connection->prepare($query);
                $stmt->execute();
                $user = $stmt->fetch();
                if ($user) {
                    if (password_verify($password, $user['pwd_hash'])) {
                        $_SESSION['user_id'] = $user['user_id'];
                        return true;
                    }
                }
            } catch (PDOException $e) {
                echo $query . "<br>" . $e->getMessage();
                exit();
            }
            return false;
        }

        private function insertUser($username, $fullname, $email, $password) {
            $passwd_id = $this->insertPassword(password_hash($password, PASSWORD_BCRYPT));
            $passwd_id = strval($passwd_id);
            $query = "insert into user (username, full_name, user_passwd_id, email_address) values ('${username}', '${fullname}', ${passwd_id}, '${email}')";
            try {
                $this->connection->exec($query);
            } catch (PDOException $e) {
                echo $query . "<br>" . $e->getMessage();
                exit();
            }
            $_SESSION['user_id'] = $this->connection->lastInsertId();
        }

        private function insertPassword($hashed_password) {
            $query = "insert into password (pwd_hash) values ('" . $hashed_password . "')";
            try {
                $this->connection->exec($query);
            } catch (PDOException $e) {
                echo "**${query}**<br>" . $e->getMessage();
                exit();
            }
            return $this->connection->lastInsertId();
        }
    }

    $connection = new Connection($servername, $database, $username, $password);

   

?>
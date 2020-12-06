<?php
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
                // return to sign up form and display appropriate message
            }
            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                switch($_POST['form-type']) {
                    case 'sign-up':
                        if ($this->checkUserEmailAvailability($_POST['username'], $_POST['email'])) {
                            $this->insertUser($_POST['username'], $_POST['fullname'], $_POST['email'], $_POST['signup-password']);
                        } else {
                            echo "username or email already in use!";
                        }
                        break;
                    case 'log-in':
                        $this->getUser($_POST['login-userfield'], $_POST['login-password']);
                        break;
                    default:
                        // this should never be reached, really
                        break;
                }
            } else {
                echo "POST request method was not used.";
            }
        }

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
                echo $query . "<br>" . $e->getMessage();
            }
        }

        private function getUser($userfield, $password) {
            // check if user exists in database
            $query = "call getUserPasswordInfo('$userfield')";
            try {
                $stmt = $this->connection->prepare($query);
                $stmt->execute();
                $user = $stmt->fetch();
                if ($user) {
                    // echo "username valid!<br>";
                    if (password_verify($password, $user['pwd_hash'])) {
                        echo "password is verified";
                        // load the user's webpage
                    } else { 
                        echo "password is wrong"; 
                        return;
                    }
                } else {
                    echo "username or email address not found";
                    return;
                }
            } catch (PDOException $e) {
                echo $query . "<br>" . $e->getMessage();
            }
        }

        private function insertUser($username, $fullname, $email, $password) {
            $passwd_id = $this->insertPassword(password_hash($password, PASSWORD_BCRYPT));
            $passwd_id = strval($passwd_id);
            $query = "insert into user (username, full_name, user_passwd_id, email_address) values ('${username}', '${fullname}', ${passwd_id}, '${email}')";
            try {
                $this->connection->exec($query);
            } catch (PDOException $e) {
                echo $query . "<br>" . $e->getMessage();
            }
        }

        function insertPassword($hashed_password) {
            $query = "insert into password (pwd_hash) values ('" . $hashed_password . "')";
            try {
                $this->connection->exec($query);
            } catch (PDOException $e) {
                echo "**${query}**<br>" . $e->getMessage();
            }
            return $this->connection->lastInsertId();
        }
    }

    $connection = new Connection($servername, $database, $username, $password);

   

?>
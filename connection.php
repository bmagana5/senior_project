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
            }
            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                switch($_POST['form-type']) {
                    case 'sign-up':
                        $this->insertUser($_POST['username'], $_POST['fullname'], $_POST['email'], $_POST['password']);
                        break;
                    case 'sign-in':
                        break;
                    default:
                        // this should never be reached, really
                        break;
                }
            } else {
                echo "POST request method was not used.";
            }
        }

        private function insertUser($username, $fullname, $email, $password) {
            $passwd_id = $this->insertPassword($this->encryptPassword($password));
            $passwd_id = strval($passwd_id);
            $query = "insert into user (username, full_name, user_passwd_id, email_address) values ('${username}', '${fullname}', ${passwd_id}, '${email}')";
            try {
                $this->connection->exec($query);
            } catch (PDOException $e) {
                echo $query . "<br>" . $e->getMessage();
            }
        }
    
        private function encryptPassword($password) {
            // use exec to call python script and use bcrypt algorithm from bcrypt module
            // have it return hashed password with salt prepended to it
            $hashed_password = exec('python ./python/encryptpw.py .$password');
            echo '**hashed password is: ' . $hashed_password . "**";
            return $hashed_password;
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
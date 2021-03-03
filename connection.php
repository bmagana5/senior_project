<?php
# basic php function
require_once 'credentials.php';

$dsn = "mysql:host=$host;dbname=$db;";
try {
    $conn = new PDO("mysql:host=$servername;dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connection successful";
} catch(PDOException $e) {
    echo "Connection failed" . $e->getMessage();
}
?>

<?php
    require 'credentials.php';

    try {
        // establish connection: give host server address, database name, username, and username's password
        $connection = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
        // PDO error mode is set to exception
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        echo "Connection established successfully<br>";
    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage() . "<br>";
    }
?>
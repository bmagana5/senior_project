<?php
    require 'connection.php';
    // close the connection
    if ($connection != null) {
        $connection = null;
        echo "Connection successfully disconnected<br>";
    } else {
        echo "No connection to disconnect<br>";
    }
?>  
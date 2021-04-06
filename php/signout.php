<?php
    session_start();
    require "../connection.php";

    Connection::connectionTerminate();
    session_destroy();
    header("Location: ../login.html");

?>
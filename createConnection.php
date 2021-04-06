<?php 
    session_start();
    
    require 'php/credentials.php';
    require 'connection.php';

    new Connection($dbconn);
?>
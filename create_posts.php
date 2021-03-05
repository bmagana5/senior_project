<?php
// displays posts from the user
require_once('connection.php');

if(isset($_POST['userid'], $_POST['postcontent'])) {
    $userid = htmlspecialchars($_POST['userid']);
    $postcontent = htmlspecialchars($_POST['postcontent']);

    pg_query("SELECT insertpost('$userid','$postcontent')");
    
    header("Location: profile_info.php");
    exit();
}
?>

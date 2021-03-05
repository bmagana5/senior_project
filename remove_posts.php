<?php
// functions for removing posts
require_once('connection.php');
if(isset($_GET['delete'])) {
    $postid = htmlspecialchars($_GET['delete']);

    pg_query("SELECT deletepost('$postid')");

    header("Location: profile_info.php");
    exit();
}
?>


<?php
// displays posted comments from the comment wall
require_once('connection.php');
if(isset($_POST['postid'], $_POST['userid'], $_POST['commentcontent'])) {
    $postid = htmlspecialchars($_POST['postid']);
    $userid = htmlspecialchars($_POST['userid']);
    $commentcontent = htmlspecialchars($_POST['commentcontent']);

    pg_query("SELECT insertcomment('$userid','$commentcontent','$postid')");

    header("profile_info.php");
    exit();
}
?>

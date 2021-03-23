<?php 
    session_start();
?>
// everything down here is Javascript! It's a good 
// way to hide any PHP code from being viewed in the 
// webpage when it is rendered 
getPageContent(<?php echo $_SESSION["user_id"]; ?>, "friend-list-bar");
document.getElementsByTagName("title")[0].innerHTML = format("Welcome, @{}!", '<?php echo $_SESSION["username"] ?>');
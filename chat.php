<?php
session_start();

$_SESSION["username"]=$_POST["username"];



?>




<html>


<head>
<title>Chat Room</title>
</head>

<iframe id="leftbar" src="leftbar.php" title="Left Bar" height="800" width="200">
</iframe>

<iframe id="msg" src="msg.php" title="Messages" height="600" width="600">
</iframe>

<iframe id="newmsg" src="newmsg.php" title="New Messages" height="100" width="600">
</iframe>


</html>

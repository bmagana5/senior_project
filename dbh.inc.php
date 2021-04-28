<?php
// database for posts; connects to my database
$conn = mysqli_connect('localhost', 'root', '4Ad?rkzl4109', 'commentsection');
if (!$conn) {
	die("Connection failed: ".mysqli_connect_error());
}

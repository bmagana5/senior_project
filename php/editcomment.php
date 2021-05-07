<?php
// Connection for php functions
session_start();
	date_default_timezone_set('America/Los_Angeles');
	include("comments.inc.php");
	include("connection.php");
	include("dbh.inc.php");
	include("functions.php");
	
	$user_data = check_login($con);

?>
<!doctype html>
<html>
    <title>Edit Post</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-blue-grey.css">
    <link rel="stylesheet" href='https://fonts.googleapis.com/css?family=Open+Sans'>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="./css/style.css">
	<style>
html, body, h1, h2, h3, h4, h5 {font-family: "Open Sans", sans-serif}
    </style>
	<body class="w3-theme-l5">
	<div class="w3-container w3-content" style="max-width:1400px;margin-top:80px">
	<!-- Middle Column -->
		<div class="w3-col m7">
		    <div class="w3-row-padding">
			<div class="w3-col m12">
			<div class="w3-card w3-round w3-white">
				<div class="w3-container w3-padding">
				<h6 class="w3-opacity">Edit Comment</h6>
				<?php
					$cid = $_POST['cid'];
					$uid = $_POST['uid'];
					$date = $_POST['date'];
					$message = $_POST['message'];
					echo "<form method='POST' action='".editComments($conn)."'>
					<input type='hidden' name='cid' value='".$cid."'>
					<input type='hidden' name='uid' value='".$uid."'>
					<input type='hidden' name='date' value='".$date."'>
					<textarea name='message'>".$message."</textarea><br>
					<button type='submit' name='commentSubmit' class='w3-button w3-theme'><i class='fa fa-pencil'></i>  Edit</button>
					</form></div></div></div></div>";	
				?>
	<!-- End Middle Column -->
		</div>
	</div>
</body>
</html>


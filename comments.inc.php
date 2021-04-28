<?php
ob_start();
function setComments($conn) {
	if (isset($_POST['commentSubmit'])) {
			$uid = $_POST['uid'];
			$date = $_POST['date'];
			$message = $_POST['message'];
			
			$sql = "INSERT INTO comments (uid, date, message) VALUES ('$uid', '$date', '$message')";
			$result = $conn->query($sql); 
	}
}

function getComments($conn) {
	$sql = "SELECT * FROM comments";
	$result = $conn->query($sql);
	while ($row = $result->fetch_assoc()) {
		echo "<div class='w3-container w3-card w3-white w3-round w3-margin'><br>";
		echo "<img src='./img/profile-img.png' alt='Avatar' class='w3-left w3-circle w3-margin-right' style='width:60px'>";
		echo $row['uid']."<br>";
		echo $row['date']."<br><br><br>";
		echo nl2br($row['message']);
		echo "<hr>";
		echo "<form class= 'comment-form'>
		<button class='w3-button w3-theme w3-margin-bottom ' style='float: left; margin-left: -3px;'><i class='fa fa-comment'></i>  Comment</button> 
		</form>
		<form class= 'edit-form' method='POST' action='editcomment.php'>
			<input type='hidden' name='cid' value='".$row['cid']."'>
			<input type='hidden' name='uid' value='".$row['uid']."'>
			<input type='hidden' name='date' value='".$row['date']."'>
			<input type='hidden' name='message' value='".$row['message']."'>
			<button class='w3-button w3-theme w3-margin-bottom' style='float: left; margin-left: 10px;'><i class='fa fa-pencil'></i> Edit</button>
		</form> 
		<form class= 'delete-form' method='POST' action='".deleteComments($conn)."'>
			<input type='hidden' name='cid' value='".$row['cid']."'>
			<button class='w3-button w3-theme w3-margin-bottom' type ='submit' name='commentDelete' style='float: left; margin-left: 10px;'>Delete</button>
		</form>
		</div>";
	}
}

function editComments($conn) {
	if (isset($_POST['commentSubmit'])) {
			$cid = $_POST['cid'];
			$uid = $_POST['uid'];
			$date = $_POST['date'];
			$message = $_POST['message'];
		
			$sql = "UPDATE comments SET message='$message' WHERE cid='$cid'";
			$result = $conn->query($sql);
			header("Location: profile_info.php");
	}
}

function deleteComments($conn) {
	if (isset($_POST['commentDelete'])) {
			$cid = $_POST['cid'];
		
			$sql = "DELETE FROM comments WHERE cid='$cid'";
			$result = $conn->query($sql);
			header("Location: profile_info.php");
	}
}
?>



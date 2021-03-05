<?php
session_start();
require_once('connection.php');
// Functionality for wall posts

$myuserID = $_SESSION['user_id'];

// user inputs a new post in a form
NewPost($myuserID);
$sql = "SELECT * FROM post WHERE user_id = $myuserID";
$res = pg_query($sql);
if($res) {
    while($row = pg_fetch_row($res)) {
	echo "<div class='post'><p>".$row['ptext']."</p><hr>";
	$sql = "SELECT * FROM comments WHERE post_id = ".$row['post_id'];
	$res2 = pg_query($sql);
	if($res2) {
	    echo "<ul>";
	    while($row2 = pg_fetch_row($res2)) {
		echo "<li>".$row2['commented_on']."</li>";
	    }
	    echo "</ul>";
	}
	addComment($row['post_id'], $myuserID);
	echo "</div>";
    }
}

function addComment($postid, $userid=$myuserID) {?>
<form method='post' action='create_comments.php'>
  <textarea name='commentcontent'></textarea>
  <input type='hidden' value='<?php echo $postid;?>' name='postid'>
  <input type='hidden' value='<?php echo $userid;?>' name='userid'>
  <input type='submit' value='Comment'>
</form>
<?php }

function NewPost($userid=$myuserID) {?>
<form method='post' action=makePost.php'>
  <textarea name='postcontent'></textarea>
  <input type='hidden' value='<?php echo $userid;?>' name='userid'>
  <input type='submit' value='Post'>
</form>
<?php }
?>

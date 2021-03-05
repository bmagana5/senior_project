<?php
// comment wall display
session_start();
require_once('connection.php');

$sql= "SELECT * FROM post WHERE user_id = $myuserId";
$res = $db->query($sql);
if($res) {
    while($row = $res->fetch_assoc()) { // fetches a post, displays user's posts, content, etc.
	echo "<div class='post'><p>".$row['commented_on']."</p><hr>";
	$sql = "SELECT * FROM comments WHERE post_user_id = ".$row['post_id'];
	$res2 = $db->query($sql);
	if($res2) {
	    echo "<ul>";
	    while($row2 = $res2->fetch_assoc()) {
		echo "<li>".$row2['commented_on']."</li>";
	    }
	    echo "</ul>";
	}
	echo "</div>";
    } 
}
?>
<form method='post' action='comment_posts.php'>
	<textarea name='content_comments'></textarea>
	<input type='hidden' value='<?php echo $userid;?>' name='userid'>
	<input type='submit' calue='Comment'>
</form>

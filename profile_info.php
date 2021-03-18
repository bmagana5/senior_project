<?php
session_start();
require_once('connection.php');
$myuserId = $_SESSION['user_id'];
$postid = 0;
$userid = 0;
$sql = pg_query("SELECT firstname, lastname FROM userview WHERE user_id='$myuserId'");
$fname = 0;
$lname = 0;
//$user = 0;
$result = pg_fetch_all($sql);
foreach($result as $array) {
    $fname = $array['firstname'];
    $lname = $array['lastname'];
    //$user = $array['username'];
}
?>
<!doctype html>
<html>
    <title>Profile Info</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-blue-grey.css">
    <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Open+Sans'>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <style>
html, body, h1, h2, h3, h4, h5 {font-family: "Open Sans", sans-serif}
    </style>
    <body class="w3-theme-l5">

	<!-- Navbar -->
	<div class="w3-top">
	    <div class="w3-bar w3-theme-d2 w3-left-align w3-large">
		<a class="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2" href="javascript:void(0);" onclick="openNav()"><i class="fa fa-bars"></i></a>
		<a href="#" class="w3-bar-item w3-button w3-padding-large w3-theme-d4"><i class="fa fa-home w3-margin-right"></i>ChatterBox</a>
		<a href="#" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="News"><i class="fa fa-globe"></i></a>
		<a href="#" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Account Settings"><i class="fa fa-user"></i></a>
		<a href="#" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Messages"><i class="fa fa-envelope"></i></a>
		<div class="w3-dropdown-hover w3-hide-small">
		    <button class="w3-button w3-padding-large" title="Notifications"><i class="fa fa-bell"></i><span class="w3-badge w3-right w3-small w3-green">3</span></button>     
		    <div class="w3-dropdown-content w3-card-4 w3-bar-block" style="width:300px">
			<a href="#" class="w3-bar-item w3-button">One new friend request</a>
			<a href="#" class="w3-bar-item w3-button">John Doe posted on your wall</a>
			<a href="#" class="w3-bar-item w3-button">Jane likes your post</a>
		    </div>
		</div>
		<a href="./php/logout.php" class="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-white" title="My Account">
		    <img src="./img/A_profile.png" class="w3-circle" style="height:23px;width:23px" alt="Avatar">	
		</a>
	    </div>
	</div>

	<!-- Navbar on small screens -->
	<div id="navDemo" class="w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium w3-large">
	    <a href="#" class="w3-bar-item w3-button w3-padding-large">Link 1</a>
	    <a href="#" class="w3-bar-item w3-button w3-padding-large">Link 2</a>
	    <a href="#" class="w3-bar-item w3-button w3-padding-large">Link 3</a>
	    <a href="#" class="w3-bar-item w3-button w3-padding-large">My Profile</a>
	</div>

	<!-- Page Container -->
	<div class="w3-container w3-content" style="max-width:1400px;margin-top:80px"> 
	    <div class="row">
		<div class="col-md-12 col-sm-12 col-xs-12 image-section">
		    <center><img src="./img/video_games.png"></center>
		</div>
	    </div>
	    <!-- The Grid -->
	    <div class="w3-row">
		<!-- Left Column -->
		<div class="w3-col m3">
		    <!-- Profile -->
		    <div class="w3-card w3-round w3-white">
			<div class="w3-container">
			    <p class="w3-center"><img src="./img/A_profile.png" class="w3-circle" style="height:106px;width:106px" alt="Avatar"></p>
			    <h4 class="w3-center">Andy Anderson</h4>
			    <hr>
			    <p><i class="fa fa-pencil fa-fw w3-margin-right w3-text-theme"></i> Computer Science Under-grad</p>
			    <p><i class="fa fa-home fa-fw w3-margin-right w3-text-theme"></i> Bakersfield, CA</p>
			    <p><i class="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i> March 6, 1995</p>
			</div>
		    </div>
		    <br>

		    <!-- Accordion -->
		    <div class="w3-card w3-round">
			<div class="w3-white">
			    <button onclick="myFunction('Demo1')" class="w3-button w3-block w3-theme-l1 w3-left-align"><i class="fa fa-circle-o-notch fa-fw w3-margin-right"></i> My Groups</button>
			    <div id="Demo1" class="w3-hide w3-container">
				<p>John Doe's Awesome Group</p>
			    </div>
			    <button onclick="myFunction('Demo2')" class="w3-button w3-block w3-theme-l1 w3-left-align"><i class="fa fa-calendar-check-o fa-fw w3-margin-right"></i> My Events</button>
			    <div id="Demo2" class="w3-hide w3-container">
				<p>Online Game Event</p>
			    </div>
			    <button onclick="myFunction('Demo3')" class="w3-button w3-block w3-theme-l1 w3-left-align"><i class="fa fa-users fa-fw w3-margin-right"></i> My Photos</button>
			    <div id="Demo3" class="w3-hide w3-container">
				<div class="w3-row-padding">
				    <br>
				</div>
			    </div>
			</div>      
		    </div>
		    <br>

		    <!-- Interests --> 
		    <div class="w3-card w3-round w3-white w3-hide-small">
			<div class="w3-container">
			    <p>Interests</p>
			    <p>
			    <span class="w3-tag w3-small w3-theme-d5">Games</span>
			    <span class="w3-tag w3-small w3-theme-d4">Sports</span>
			    <span class="w3-tag w3-small w3-theme-d3">Running</span>
			    <span class="w3-tag w3-small w3-theme-d2">Coding</span>
			    <span class="w3-tag w3-small w3-theme-d1">Lifting</span>
			    <span class="w3-tag w3-small w3-theme">Coffee</span>
			    <span class="w3-tag w3-small w3-theme-l1">Friends</span>
			    <span class="w3-tag w3-small w3-theme-l2">Food</span>
			    <span class="w3-tag w3-small w3-theme-l3">Design</span>
			    <span class="w3-tag w3-small w3-theme-l4">News</span>
			    <span class="w3-tag w3-small w3-theme-l5">Photos</span>
			    </p>
			</div>
		    </div>
		    <br>

		    <!-- Alert Box -->
		    <div class="w3-container w3-display-container w3-round w3-theme-l4 w3-border w3-theme-border w3-margin-bottom w3-hide-small">
			<span onclick="this.parentElement.style.display='none'" class="w3-button w3-theme-l3 w3-display-topright">
			    <i class="fa fa-remove"></i>
			</span>
			<p><strong>Hey!</strong></p>
			<p>People are looking at your profile. Find out who.</p>
		    </div>

		    <!-- End Left Column -->
		</div>

		<!-- Middle Column -->
		<div class="w3-col m7">
		    <div class="w3-row-padding">
			<div class="w3-col m12">
			    <div class="w3-card w3-round w3-white">
				<div class="w3-container w3-padding">
				    <h6 class="w3-opacity">What's happening on your mind today?</h6>
				    <form method='post' action='create_posts.php' class="w3-padding">
					<textarea class="w3-border w3-padding" name='postconetnt'></textarea>
					<input type='hidden' value='<?php echo $myuserID;?>' name='userid'>
					<input class="w3-theme w3-padding" type='submit' value="Post">	
				    </form>
				    <button type="button" class="w3-button w3-theme"><i class="fa fa-pencil"></i>  Post</button> 
				</div>
			    </div>
			</div>
		    </div>
		    <div class="w3-container w3-card w3-white w3-round w3-margin"><br>
<?php
$res = pg_query("SELECT * FROM showpost");
if($res) {
    while($row = pg_fetch_row($res)) {
	$sql = pg_query("SELECT firstname, lastname FROM userview WHERE user_id='$row[1]'");
	$postid = $row[0];
	$result = pg_fetch_all($sql);
	foreach($result as $array) {
	    $fname = $array['firstname'];
	    $lname = $array['lastname'];
	    $userid = $array['user_id'];
	}
    }
}
?>
			<img src="./img/A_profile.png" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:60px">
			<span class="w3-right w3-opacity">1 min</span>
			<h4><?php echo $fname." ".$lname; ?></h4><br>
			<hr class="w3-clear">
<?php echo "<div class='post'><p>".$row[2]."</p><hr>"; ?>
<form method='post' action='create_comment.php'>
	<textarea class="w3-border w3-padding" name='commentcontent'></textarea>
	<input type='hidden' value='<?php echo $postid;?>' name='postid'>
	<input type='hidden' value='<?php echo $userid;?>' name='userid'>
	<input class='w3-button w3-theme-d2 w3-margin-bottom' type='submit' value='Comment'>
	<button class='w3-button w3-theme-d2 w3-margin-bottom' type="button" onclick="javascript:location.href='remove_posts.php?delete=<?php echo $postid; ?>'">Remove</button>
</form><hr><br><br>
		<!-- End Middle Column -->
		    </div>        
		</div>

		<!-- Right Column -->
		<div class="w3-col m2">
		    <div class="w3-card w3-round w3-white w3-center">
			<div class="w3-container">
			    <p>Upcoming Group Events:</p>
			    <img src="./img/video_games.png" alt="game" style="width:75%;">
			    <p><strong>Online Game Event</strong></p>
			    <p>Saturday 5:00 PM</p>
			    <p><button class="w3-button w3-block w3-theme-l4">Info</button></p>
			</div>
		    </div>
		    <br>

		    <div class="w3-card w3-round w3-white w3-center">
			<div class="w3-container">
			    <p>Friend Requests</p>
			    <img src="./img/K_profile.png" alt="Avatar" style="width:50%"><br>
			    <span>Karen M.</span>
			    <div class="w3-row w3-opacity">
				<div class="w3-half">
				    <button class="w3-button w3-block w3-green w3-section" title="Accept"><i class="fa fa-check"></i></button>
				</div>
				<div class="w3-half">
				    <button class="w3-button w3-block w3-red w3-section" title="Decline"><i class="fa fa-remove"></i></button>
				</div>
			    </div>
			</div>
		    </div>
		    <br>

		    <!-- End Right Column -->
		</div>

		<!-- End Grid -->
	    </div>

	    <!-- End Page Container -->
	</div>
	<br>

	<!-- Footer -->
	<footer class="w3-container w3-theme-d3 w3-padding-16">
	</footer>

	<footer class="w3-container w3-theme-d5">
	    <p>2020 Senior Project CMPS-4910</p>
	</footer>

<script>
// Accordion
function myFunction(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
	x.className += " w3-show";
	x.previousElementSibling.className += " w3-theme-d1";
    } else { 
	x.className = x.className.replace("w3-show", "");
	x.previousElementSibling.className = 
	    x.previousElementSibling.className.replace(" w3-theme-d1", "");
    }
}

// Used to toggle the menu on smaller screens when clicking on the menu button
function openNav() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
	x.className += " w3-show";
    } else { 
	x.className = x.className.replace(" w3-show", "");
    }
}
</script>

    </body>
</html>

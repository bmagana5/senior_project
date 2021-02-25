<?php 
    session_start();
    require '../connection.php';

    if (isset($_SESSION['user_id']) && $_SESSION['user_id'] == $_REQUEST['user_id']) {
        $user_id = $_REQUEST['user_id'];
        // print_r($_SESSION);
        // echo '<div>First thing is first, here is the session variable: ' . $_SESSION['user_id'] . '</div><br>';
        // echo '<div>datafetcher.php says: user id is ' . $user_id . '</div><br>';
        // echo '<div>If you see this, that means that it worked! Progress ^,^</div><br>';
        echo Connection::testFunction();
        // we want to get tuples for all of our friends
        $friends = Connection::getFriendsList($user_id);
        foreach ($friends as $key=>$value) {
            echo "<div>" . $key . "<br>";
            foreach ($value as $k=>$v) {
                echo $k . ": " . $v . "<br>";
            }
            echo "</div>";
        }
    } else {
        echo "<div class=''>Uh oh, something went wrong! Session is not created or user id not passed in!</div>";
    }



?>
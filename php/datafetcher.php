<?php 
    session_start();
    require '../connection.php';

    // print_r($_REQUEST);
    if (isset($_SESSION['user_id']) && $_SESSION['user_id'] == $_REQUEST['user_id']) {
        $user_id = $_REQUEST['user_id'];
        switch ($_REQUEST['element_id']) {
            case 'friend-list-bar': 
                // echo "find friends";
                // get the user's friends list from database, encode it and send it to JavaScript
                $friends = Connection::getFriendsList($user_id);
                echo json_encode($friends);
                break;
            default:
                echo "<div style='color: red;'>incorrect element specified. Double-check element ID name</div>";
        }
    } else {
        echo "<div class=''>Uh oh, something went wrong! Session is not created or user id not passed in!</div>";
    }

?>
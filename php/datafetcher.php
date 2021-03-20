<?php 
    session_start();
    require '../connection.php';

    // 1. data to be returned is first formatted into an associative array and then
    // formatted to work with JSON -- it's a lot easier to work with this in JS
    // 2. echo JSON data back to where AJAX call was made...
    if (isset($_SESSION['user_id']) && $_SESSION['user_id'] == $_REQUEST['user_id']) {
        $user_id = $_REQUEST['user_id'];
        if (isset($_REQUEST['element_id']) && $_REQUEST['element_id'] == 'friend-list-bar') {
            // get the user's friends list from database, encode it and send it to JavaScript
            $friends = Connection::getFriendsList($user_id);
            echo json_encode($friends);
        } else if (isset($_REQUEST['friend_id'])) {
            // get the chatthreads that the user belongs to as well as other users associated with that chatthread
            $chatThread = Connection::getChatThread($user_id, $_REQUEST['friend_id']);
            echo json_encode($chatThread);
        } else if (isset($_REQUEST['chatthread_id'])) {
            // get an associative array of the messages in a chat thread 
            $messages = Connection::getChatMessages($_REQUEST['chatthread_id']);
            echo json_encode($messages);
        } else {
            echo "<div style='color: red;'>incorrect element specified. Double-check element ID name</div>";
        }
    } else {
        echo "<div class=''>Uh oh, something went wrong! Session is not created or user id not passed in!</div>";
    }

?>
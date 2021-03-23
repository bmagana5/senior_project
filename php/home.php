<?php
    session_start();

    if (!isset($_SESSION['user_id'])) {
        echo "<script> window.alert('No log-in information received.'); </script>";
    } else {
        echo '<!DOCTYPE html>
        <html>
        <head>
            <title></title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            <link rel="stylesheet" href="../css/home.css">
        </head>
        <body>
            <div class="col-1 h-100 thin-bar-left"></div>
            <div class="col-2 h-100 friend-list-bar" id="friend-list-bar">
                <div class="friend-filter-container">
                    <input class="friend-filter" type="text" id="friend-filter" onkeyup="filterFriends(this)" placeholder="Filter friends...">
                </div>
            </div>
            <div class="col-9 h-100 contentfeed">
                <div class="row navigation-bar">
                    <!-- <div class="menu-icon" onclick="this.classList.toggle("change")">
                        <div class="menu-bar1"></div>
                        <div class="menu-bar2"></div>
                        <div class="menu-bar3"></div>
                    </div> -->
                    <div class="navigation-bar-signout">
                        <form class="col-12" id="sign-out" action="signout.php" method="post">
                            <button class="navigation-sign-out-btn" type="submit" form="sign-out"><i class="fa fa-sign-out"></i></button>
                        </form>
                    </div>
                </div>
                <div class="row message-content" id="message-content">
                    <div class="col-9 h-100 thread-area" id="thread-area"></div>
                    <div class="col-3 h-100 message-user-list"></div>
                </div>
            </div>
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
            <script src="../js/loadcontent.js"></script>
            <script src="getcontent.php" type="text/javascript"></script>
            <script src="../js/inputChecker.js"></script>
        </body>
        </html>';
    }
?>
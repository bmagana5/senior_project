<?php
    session_start();

    if (!isset($_SESSION['user_id'])) {
        echo "<script> window.alert('No user is logged in. This page will not behave correctly.'); </script>";
    }
?><!DOCTYPE html>
<html>
    <head>
        <title>Welcome, @<?php if (isset($_SESSION['username'])) { echo $_SESSION['username'];} else { echo "NO-USER-LOGGED-IN"; }?>!</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="../css/home.css">
    </head>
    <body>
        <!-- <div class="row h-100 w-100"> -->
            <div class="col-1 h-100 thin-bar-left"></div>
            <div class="col-2 h-100 friend-list-bar" id="friend-list-bar"></div>
            <div class="col-9 h-100 contentfeed">
                <div class="row navigation-bar">
                    <div class="navigation-bar-signout">
                        <form class="col-12" id="sign-out" action="signout.php" method="post">
                            <button class="navigation-sign-out-btn" type="submit" form="sign-out"><i class="fa fa-sign-out"></i></button>
                        </form>
                    </div>
                
                </div>
                <div class="row message-content">
                    <div class="col-9 h-100 message-thread" id="message-thread">
                        <div class="row message-area" id="message-area">
                        </div>
                        <div class="input-group message-input-section" id="message-input-section">
                            <textarea id="message-input-bar" oninput="checkForTextOverflow(document.getElementById('message-input-bar'));" rows="1" class="message-input-bar" placeholder="Message"></textarea>
                            <div class="message-submit-button-container">
                                <button class="btn message-submit-button" type="submit"><i class="fa fa-send"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="col-3 h-100 message-user-list">

                    </div>
                </div>
            </div>
        <!-- </div> -->
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <script src="../js/loadcontent.js"></script>
        <script>
            getPageContent(<?php echo $_SESSION['user_id'];?>, 'friend-list-bar');
            getPageContent(<?php echo $_SESSION['user_id'];?>, 'message-area');
        </script>
        <script src="../js/inputChecker.js"></script>
    </body>
</html>
<!DOCTYPE html>
<html>
    <head>
        <title>Join Today! Sign Up Below!</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="css/signup.css">
    </head>
    <body>
        <?php 
            function clean_input($data) {
                $data = trim($data);
                $data = stripslashes($data);
                $data = htmlspecialchars($data);
                return $data;
            }

            function submit_form_data() {
                // TESTING STATEMENT

                require 'connection.php';

                // code to add new user to database goes here

                require 'disconnection.php';
            }
            $username = $firstname = $lastname = $email = $password = $passwordconfirm = '';
            $usernameErr = $firstnameErr = $lastnameErr = $emailErr = $passwordErr = $passwordconfirmErr = '';

            // check incoming request method. 
            if ($_SERVER['REQUEST_METHOD'] == 'POST') {

                $submitFormData = true;
                // validate username
                if (empty($_POST['username'])) {
                    $usernameErr = 'required';
                    $submitFormData = false;
                } else { 
                    $username = clean_input($_POST['username']);
                    if (strlen($username) < 6) {
                        $usernameErr = 'must be at least 6 characters';
                        $submitFormData = false;
                    }
                    if (!preg_match("/^[0-9a-zA-Z_]+$/", $username)) {
                        $usernameErr = "characters must be alphanumeric or '_'";
                        $username = '';
                        $submitFormData = false;
                    }
                }
                // validate first name
                if (empty($_POST['firstname'])) {
                    $firstnameErr = 'required';
                    $submitFormData = false;
                } else { 
                    $firstname = clean_input($_POST['firstname']);
                    if (!preg_match("/^[a-zA-Z-']+$/", $firstname)) {
                        $firstnameErr = 'Invalid input';
                        $firstname = '';
                        $submitFormData = false;
                    }
                    strtolower($firstname);
                    ucfirst($firstname);
                }
                // validate last name
                if (empty($_POST['lastname'])) {
                    $lastnameErr = 'required';
                    $submitFormData = false;
                } else { 
                    $lastname = clean_input($_POST['lastname']);
                    if (!preg_match("/^[a-zA-Z-']+$/", $lastname)) {
                        $lastnameErr = 'Invalid input';
                        $lastname = '';
                        $submitFormData = false;
                    }
                    strtolower($lastname);
                    ucfirst($lastname);
                }
                // validate email
                if (empty($_POST['email'])) {
                    $emailErr = 'required';
                    $submitFormData = false;
                } else { 
                    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
                    if (!preg_match("/^[a-zA-Z0-9!#$%&'*+-\/=?^_`{|}~]+[@][a-zA-z]+[.][a-zA-Z]+$/", $email)) {
                        $emailErr = 'Invalid email address';
                        $email = '';
                        $submitFormData = false;
                    }
                }
                // validate password
                if (empty($_POST['password'])) {
                    $passwordErr = 'required';
                    $submitFormData = false;
                } else { 
                    $password = clean_input($_POST['password']);
                    if (strlen($password) < 8) {
                        $passwordErr = 'Password is too short';
                        $password = '';
                        $submitFormData = false;
                    }
                }
                // confirm password
                if (empty($_POST['passwordconfirm'])) {
                    $passwordconfirmErr = 'required';
                    $submitFormData = false;
                } else { 
                    $passwordconfirm = clean_input($_POST['passwordconfirm']);
                    if ($password !== $passwordconfirm) {
                        $passwordconfirmErr = 'Passwords do not match';
                        $passwordconfirm = '';
                        $submitFormData = false;
                    }
                }
                if ($submitFormData === true) {
                    // if this point is reached, go ahead and submit the form data
                    submit_form_data();
                }
            }
        ?>
        <div class="container-fluid header">
        </div>
        <div class="container-fluid body">
            <!-- this page's php script will handle submitted form data -->
            <div id="userAddSuccess" class="container alert alert-success alert-dismissible " style="display: none;">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <strong>Success!</strong> User successfully added to database!
            </div>
            <form method="post" action="<?php echo htmlspecialchars_decode($_SERVER['PHP_SELF']); ?>" class="shadow bg-white">
                <div class="container form-content">
                    <h2>Sign Up</h2>
                    <p>It's quick and easy.</p>
                    <hr>
                    <div class="row">
                        <div class="col-sm-12 form-group">
                            <label for="username"><b>Username</b></label>
                            <span class="error">* <?php echo $usernameErr; ?></span>
                            <span><em id="usernameHint" style="font-size: 14px;"></em></span>
                            <!-- use 'shadow-none' class to remove bright blue glow outline on focused input fields -->
                            <input type="text" id="usernameField" class="form-control shadow-none" value="<?php echo $username;?>"
                                placeholder="Enter username" name="username" onkeyup="verifyUsername(this.value, event)" 
                                onkeydown="verifyUsername(this.value, event)" onkeypress="filterKey(this.id, event)"
                                data-placement="left" data-trigger="keyup" title="Must be at least 6 characters">
                            <div class="valid-feedback">Valid username.</div>
                            <div class="invalid-feedback">Username not available.</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6 form-group">
                            <label for="firstname"><b>First Name</b></label>
                            <span class="error">* <?php echo $firstnameErr; ?></span>
                            <input type="text" class="form-control shadow-none" placeholder="Enter first name" name="firstname" value="<?php echo $firstname;?>">
                        </div>
                        <div class="col-6 form-group">
                            <label for="lastname"><b>Last Name</b></label>
                            <span class="error">* <?php echo $lastnameErr; ?></span>
                            <input type="text" class="form-control shadow-none" placeholder="Enter last name" name="lastname" value="<?php echo $lastname;?>">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 form-group">
                            <label for="email"><b>Email</b></label>
                            <span class="error">* <?php echo $emailErr; ?></span>
                            <input type="text" class="form-control shadow-none" placeholder="Enter email address" name="email" value="<?php echo $email;?>">
                        </div>                
                    </div>
                    <div class="row">
                        <div class="col-10 form-group">
                            <label for="password"><b>Password</b></label>
                            <span class="error">* <?php echo $passwordErr; ?></span>
                            <input type="password" id="passwordField" class="form-control shadow-none" placeholder="Enter password" name="password" 
                                onkeyup="verifyPassword(this.value, event)" onkeydown="verifyPassword(this.value, event)" 
                                data-placement="left" data-trigger="keyup" title="Must be at least 8 characters">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-10 form-group">
                            <label for="passwordconfirm"><b>Confirm Password</b></label>
                            <span class="error">* <?php echo $passwordconfirmErr; ?></span>
                            <input type="password" class="form-control shadow-none" placeholder="Confirm password" name="passwordconfirm"
                            >
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 form-group btncontainer">
                            <button type="submit" id="submitBtn"><b>Sign Up</b></button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="footer">
            <?php include 'footer.php'; ?>
        </div>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <script src="js/signup.js"></script>
    </body>
</html>
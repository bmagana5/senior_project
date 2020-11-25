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

            $username = $firstname = $lastname = $email = $password = $passwordconfirm = '';
            $usernameErr = $firstnameErr = $lastnameErr = $emailErr = $passwordErr = $passwordconfirmErr = '';

            // check incoming request method. 
            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                empty($_POST['username']) 
                    ? $usernameErr = 'required' : $username = clean_input($_POST['username']);
                empty($_POST['firstname']) 
                    ? $firstnameErr = 'required' : $firstname = clean_input($_POST['firstname']);
                empty($_POST['lastname']) 
                    ? $lastnameErr = 'required' : $lastname = clean_input($_POST['lastname']);
                empty($_POST['email']) 
                    ? $emailErr = 'required' : $email = clean_input($_POST['email']);
                empty($_POST['password']) 
                    ? $passwordErr = 'required' : $password = clean_input($_POST['password']);
                empty($_POST['passwordconfirm']) 
                    ? $passwordconfirmErr = 'required' : $passwordconfirm = clean_input($_POST['passwordconfirm']);
            }
        ?>
        <div class="container-fluid header">
        </div>
        <div class="container-fluid body">
            <!-- this page's php script will handle submitted form data -->
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
                            <input type="text" id="usernameField" class="form-control shadow-none" 
                                placeholder="Enter username" name="username" onkeyup="verifyUsername(this.value, event)" 
                                onkeydown="verifyUsername(this.value, event)" onkeypress="filterKey(event)"
                                data-placement="left" data-trigger="keyup" title="Must be at least 6 characters">
                            <div class="valid-feedback">Valid username.</div>
                            <div class="invalid-feedback">Username not available.</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6 form-group">
                            <label for="firstname"><b>First Name</b></label>
                            <span class="error">* <?php echo $firstnameErr; ?></span>
                            <input type="text" class="form-control shadow-none" placeholder="Enter first name" name="firstname">
                        </div>
                        <div class="col-6 form-group">
                            <label for="lastname"><b>Last Name</b></label>
                            <span class="error">* <?php echo $lastnameErr; ?></span>
                            <input type="text" class="form-control shadow-none" placeholder="Enter last name" name="lastname">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 form-group">
                            <label for="email"><b>Email</b></label>
                            <span class="error">* <?php echo $emailErr; ?></span>
                            <input type="email" class="form-control shadow-none" placeholder="Enter email address" name="email">
                        </div>                
                    </div>
                    <div class="row">
                        <div class="col-6 form-group">
                            <label for="password"><b>Password</b></label>
                            <span class="error">* <?php echo $passwordErr; ?></span>
                            <input type="password" id="passwordField" class="form-control shadow-none" placeholder="Enter password" name="password" 
                                onkeyup="verifyPassword(this.value, event)" onkeydown="verifyPassword(this.value, event)" 
                                data-placement="left" data-trigger="keyup" title="Must be at least 8 characters">
                        </div>
                        <div class="col-6 form-group">
                            <label for="passwordconfirm"><b>Confirm Password</b></label>
                            <span class="error">*</span>
                            <input type="password" class="form-control shadow-none" placeholder="Confirm password" name="passwordconfirm">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 form-group btncontainer">
                            <button type="submit"><b>Sign Up</b></button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="footer">

        </div>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <script src="js/signup.js"></script>
    </body>
</html>
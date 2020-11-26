function verifyUsername(username, e) {
    // this informs the user that usernames must be at least 6 characters long
    if (username.length < 6 && username.length != 0) {
        $('#usernameField').tooltip('show');
    } else {
        $('#usernameField').tooltip('hide');
    }
}

function verifyPassword(password, e) {
    if (password.length < 8 && password.length != 0) {
        $('#passwordField').tooltip('show');
    } else {
        $('#passwordField').tooltip('hide');
    }
}



function filterKey(e) {
    // we can filter out unwanted characters from even entering input fields here 
    let key = e.which || e.keyCode;
    key = String.fromCharCode(key);
    // alert(key);
}
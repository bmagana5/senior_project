function verifyUsername(username, e) {
    // this informs the user that usernames must be at least 6 characters long
    if (username.length < 6 && username.length != 0) {
        document.getElementById('usernameHint').innerHTML = 'Must be at least 6 characters';
    } else {
        document.getElementById('usernameHint').innerHTML = '';
    }
}

function filterKey(e) {
    // we can filter out unwanted characters from even entering input fields here 
    let key = e.which || e.keyCode;
    key = String.fromCharCode(key);
}
// this will keep track of the validity of form fields
let isFieldValid = {username:false, fullname:false, email:false, password:false, confirmpassword:false};

// this function will be called as the user types in <input> value fields in the sign up form
function validateField(field) {
    switch (field.id) {
        case 'usernameField':
            let usernameCriteria = {length:false, input:false};
            if (field.value.length < 6 && field.value.length != 0) {
                $('#'+field.id).tooltip('show');
                usernameCriteria['length'] = false;
            } else if (field.value.length == 0) {
                usernameCriteria['length'] = false;
            } else {
                $('#'+field.id).tooltip('hide');
                usernameCriteria['length'] = true;
            }
            if (field.value.match(/^[0-9a-zA-Z_\b\.]+$/) == null && field.value.length != 0) {
                document.getElementById('error'+field.id).innerHTML = 'Invalid symbol detected';
                usernameCriteria['input'] = false;
            } else {
                document.getElementById('error'+field.id).innerHTML = '';
                usernameCriteria['input'] = true;
            }
            if (usernameCriteria['length'] == true && usernameCriteria['input'] == true) {
                isFieldValid['username'] = true;
            } else {
                isFieldValid['username'] = false;
            }
            break;
        case 'fullnameField':
            if (field.value.match(/^[a-zA-Z \-'\b]+$/) == null && field.value.length != 0) {
                document.getElementById('error'+field.id).innerHTML = 'Invalid symbol detected';
                isFieldValid['fullname'] = false;
            } else {
                document.getElementById('error'+field.id).innerHTML = '';
                isFieldValid['fullname'] = true;
            }
            break;
        case 'emailField':
            if (field.value.match(/^[a-zA-Z0-9!#$%&'*+-\/=?^_`{|}~\b]+[@][a-zA-z\b]+[\.][a-zA-Z\b]+$/) == null && field.value.length != 0) {
                isFieldValid['email'] = false;
                if (field.value.match(/@{1}/) == null) {
                    document.getElementById('error'+field.id).innerHTML = "Needs '@' symbol. ";
                } else {
                    document.getElementById('error'+field.id).innerHTML = '';
                }
                if (field.value.match(/\.{1}/) == null) {
                    document.getElementById('error'+field.id).innerHTML += "Needs '.' symbol. ";
                } else {
                    document.getElementById('error'+field.id).innerHTML = '';
                }
                document.getElementById('error'+field.id).innerHTML += 'Invalid email.';
            } else {
                document.getElementById('error'+field.id).innerHTML = '';
                isFieldValid['email'] = true;
            }
            break;
        case 'passwordField':
            if (field.value.length < 8 && field.value.length != 0) {
                $('#'+field.id).tooltip('show');
                isFieldValid['password'] = false;
            } else {
                $('#'+field.id).tooltip('hide');
                isFieldValid['password'] = true;
            }
            break;
        default:
            alert("shit's not working");
            break;
    }
}

// this function will ensure that users are aware of which characters are put into password form fields.
function checkPassword(password, confirm) {
    if (confirm !== password) {
        $('#confirmpasswordField').tooltip('show');
        isFieldValid['confirmpassword'] = false;
    } else {
        $('#confirmpasswordField').tooltip('hide');
        isFieldValid['confirmpassword'] = true;
    }
}

// this function will ensure that when the form is submitted, it'll only succeed if the 
// form data is completely valid
function confirmFieldValidity() {
    if (isFieldValid['username'] == true && isFieldValid['fullname'] == true && 
        isFieldValid['email'] == true && isFieldValid['password'] == true && 
        isFieldValid['confirmpassword'] == true) {
        // alert('be free');
        return true;
    } else {
        return false;
        // alert(`you shall not pass: username: ${isFieldValid['username']}
        //     fullname: ${isFieldValid['fullname']}
        //     email: ${isFieldValid['email']}
        //     password: ${isFieldValid['password']}
        //     confirmpassword: ${isFieldValid['confirmpassword']}` 
        // );
    }
}
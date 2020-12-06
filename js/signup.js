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
function confirmFieldValidity(e) {
    if (isFieldValid['username'] && isFieldValid['fullname'] && 
        isFieldValid['email'] && isFieldValid['password'] && 
        isFieldValid['confirmpassword']) {
        return true;
    } else {
        if (!document.getElementById('alertMessage')) {
            let div = document.createElement("div");
            let div_class = document.createAttribute("class");
            div_class.value = "alert alert-danger alert-dismissible container";
            let div_id = document.createAttribute('id');
            div_id.value = "alertMessage";
            div.setAttributeNode(div_class);
            div.setAttributeNode(div_id);
            
            let button = document.createElement("button");
            let button_class = document.createAttribute('class');
            button_class.value = "close";
            let button_type = document.createAttribute('type');
            button_type.value = 'button';
            let button_data_dismiss = document.createAttribute("data-dismiss");
            button_data_dismiss.value = "alert";
            let button_text = document.createTextNode('×');
            button.setAttributeNode(button_class);
            button.setAttributeNode(button_type);
            button.setAttributeNode(button_data_dismiss);
            button.appendChild(button_text);
            
            let strong = document.createElement('strong');
            let strong_text = document.createTextNode('Invalid input in one or more fields: ');
            strong.appendChild(strong_text);
    
            let text = document.createTextNode('Check your fields');
            div.appendChild(button);
            div.appendChild(strong);
            div.appendChild(text);

            let second_div = document.querySelector('div.body');
            let first_child = second_div.firstChild;
            second_div.insertBefore(div, first_child);
        }
    }
    return false;
}
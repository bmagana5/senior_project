// this function will be called as the user types in <input> value fields in the sign up form
function matchPasswordFields() {

}

$("input[type='password']").keyup(function () {
    let passwordElements = document.getElementsByClassName("body")[0].querySelectorAll("input[type='password']");
    if (passwordElements[0].value != passwordElements[1].value) {

    }
});
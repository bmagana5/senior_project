function getPageContent(userid, elementID) {
    let xmlhttp = new XMLHttpRequest();
    // callback function must be assigned to onreadystatechange
    // the actual function to be used requires a parameter, so we define an anonymous callback 
    // func that calls the intended function with parameter list. simple
    xmlhttp.onreadystatechange = function() { 
        if (this.readyState == 4 && this.status == 200) {
            addContent(this, elementID); 
        }
    };
    xmlhttp.open("POST", "../php/datafetcher.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("user_id=" + userid + "&element_id=" + elementID); 
}

/**
 * 
 * @param {*} xmlhttp 
 * @param {*} elementID 
 */
function addContent(xmlhttp, elementID) {
    switch (elementID) {
        case 'friend-list-bar':
            let friendList = JSON.parse(xmlhttp.responseText);
            for (let i in friendList) {
                let innerDiv = "<div class='friend-name-container'><div class='friend-username'>@" + friendList[i].username + "</div><div class='friend-fullname'>" + friendList[i].full_name + "</div></div>";
                let imageElement = "<img class='friend-image' src='../" + friendList[i].image_name + "'>"
                let outerDiv = "<div class='clearfix friend-list-item'>" + imageElement + innerDiv + "</div>";
                document.getElementById(elementID).innerHTML += outerDiv;
            }
            break;
        case 'message-area':
            let postList = xmlhttp.responseText;
            document.getElementById(elementID).innerHTML = postList;
            break;
        default:
            document.getElementById(elementID).innerHTML = 
                "elementID is '" + elementID + "' but does not match any valid webpage element IDs";
    }
}
function getFriendsList(userid, elementID) {
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
    xmlhttp.send("user_id=" + userid); 
    // alert("getFriendsList has been called");
}

function addContent(xmlhttp, elementID) {
    document.getElementById(elementID).innerHTML = xmlhttp.responseText;
    // alert('something');
}
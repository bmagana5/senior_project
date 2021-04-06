function adjustMessageAreaScrollHeight(textareaElement) {
    let textareaContainer = textareaElement.parentNode;
    let message_thread = textareaContainer.parentNode;
    let postArea = textareaContainer.previousElementSibling;
    
    textareaElement.style.height = 0;
    textareaElement.style.height = textareaElement.scrollHeight + "px";
    textareaContainer.style.height = (parseInt(textareaElement.style.height) + 24) + "px";

    postArea.style.height = (parseInt(message_thread.clientHeight) - parseInt(textareaContainer.clientHeight)) + "px";
}

function filterFriends(inputElement) {
    // variables to use
    let filter, friendListContainer, friendList;
    // we'll convert the case of the input element's value to upper case
    // get the friend list container element from the webpage...
    // ... and get an array of all the elements inside the containing element
    filter = inputElement.value.toUpperCase();
    friendListContainer = document.getElementById("friend-list-bar");
    friendList = friendListContainer.getElementsByClassName("friend-list-item");

    // loop through list of friends and filter out based on username or full name
    for (i = 0; i < friendList.length; i++) {
        let friendNameContainer = friendList[i].getElementsByClassName("friend-name-container")[0];
        let userNameElement = friendNameContainer.getElementsByClassName("friend-username")[0];
        let fullNameElement = friendNameContainer.getElementsByClassName("friend-fullname")[0];
        if (userNameElement.getAttribute("name").toUpperCase().indexOf(filter) > -1 
            || fullNameElement.getAttribute("name").toUpperCase().indexOf(filter) > -1) {
            friendList[i].style.display = "";
        } else {
            friendList[i].style.display = "none";
        }
    }
}

function openChat(event, userId) {
    let chatElement, messageThreads, friendListItems; 
    chatElement = document.getElementsByName("message-thread-for-" + userId)[0];
    console.log(chatElement);

    // get all message threads and turn off display
    messageThreads = document.getElementsByClassName("message-thread");
    for (let i = 0; i < messageThreads.length; i++) {
        messageThreads[i].style.display = "none";
    }

    // get all friend list items and remove active class effects
    friendListItems = document.getElementsByClassName("friend-list-item");
    for (let i = 0; i < friendListItems.length; i++) {
        friendListItems[i].className = friendListItems[i].className.replace(" active", "");
    }

    chatElement.style.display = "block";
    event.currentTarget.className += " active";
}

/**
 * when message is submitted:
 * want to make a connection to php script that will make connection to database
 * there, create a record for a message/post/etc and store it in database
 * then, return to javascript and create elements that will contain the message
 * append that message to the main message area/thread.
 * @param {} textareaElement 
 */
function submitMessage(textareaElement) {
    // alert(encodeURI(textareaElement.value));
    // alert(textareaElement.value);
}
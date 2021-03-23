function getPageContent(userid, elementID) {
    let xmlhttp = new XMLHttpRequest();
    // callback function must be assigned to onreadystatechange
    // the actual function to be used requires a parameter, so we define an anonymous callback 
    // func that calls the intended function with parameter list. simple
    xmlhttp.onreadystatechange = function() { 
        if (this.readyState == 4 && this.status == 200) {
            addContent(this, userid, elementID); 
        }
    };
    xmlhttp.open("POST", "../php/datafetcher.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("user_id=" + userid + "&element_id=" + elementID); 
}

async function getChatThread(userId, friend) {
    let promise = new Promise(function(resolve) {
        let xmlhttp = new XMLHttpRequest();   
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // we need to send userId, friend info, and chatthread info off
                // let list = [userId, friend, this.responseText];
                let list =  { 
                                user_id: userId, 
                                friendContent: friend, 
                                chatThread: this.responseText 
                            };
                resolve(list);
            }
        }     
        xmlhttp.open("POST", "../php/datafetcher.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("user_id=" + userId + "&friend_id=" + friend.user_id);
    });
    // wait for promise's resolve value and proceed
    createChatContent(await promise);
}

/**
 * 
 * @param {*} xmlhttp 
 * @param {*} elementID 
 */
function addContent(xmlhttp, userId, elementID) {
    switch (elementID) {
        case 'friend-list-bar':
            let friendListElement = document.getElementById(elementID);
            let friendList = JSON.parse(xmlhttp.responseText);
            for (let i in friendList) {

                // get the chatthread ID between the user and current friend asynchronously
                getChatThread(userId, friendList[i]);

                let outerdiv = document.createElement("div");
                outerdiv.className = "clearfix friend-list-item";
                outerdiv.id = friendList[i].username;
                outerdiv.setAttribute("onclick", format("openChat(event, '{}');", outerdiv.id));

                let imageElement = document.createElement("img");
                imageElement.className = "friend-image";
                imageElement.src = "../" + friendList[i].image_name;

                let innerdiv = document.createElement("div");
                innerdiv.className = "friend-name-container";

                let usernamediv = document.createElement("div");
                usernamediv.className = "friend-username";
                usernamediv.setAttribute("name", friendList[i].username);
                usernamediv.innerHTML = "@" + friendList[i].username;

                let fullnamediv = document.createElement("div");
                fullnamediv.className = "friend-fullname";
                fullnamediv.setAttribute("name", friendList[i].full_name);
                fullnamediv.innerHTML = friendList[i].full_name;

                innerdiv.appendChild(usernamediv);
                innerdiv.appendChild(fullnamediv);
                outerdiv.appendChild(imageElement);
                outerdiv.appendChild(innerdiv);
                friendListElement.appendChild(outerdiv);
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

async function getMessages(messageArea, userId, chatThreadId) {
    let promise = new Promise(function(resolve) {
        let xmlhttp = new XMLHttpRequest();   
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // we need to send chatthread id off to retrieve all messages in that chat thread
                resolve(this.responseText);
            }
        }     
        xmlhttp.open("POST", "../php/datafetcher.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("user_id=" + userId + "&chatthread_id=" + chatThreadId);
    });
    // now, we wait for promise to return what we need before proceeding
    createMessages(messageArea, await promise);
}

function createChatContent(chatContent) {
    let userId = chatContent.user_id;
    let friend = chatContent.friendContent;
    let chatThread = JSON.parse(chatContent.chatThread);
    let threadAreaElement = document.getElementById("thread-area");
    let messageThreadElement = document.createElement("div");
    let messageAreaElement = document.createElement("div");
    let messageInputSectionElement = document.createElement("div");
    let messageInputBarElement = document.createElement("textarea");
    let messageSubmitButtonContainerElement = document.createElement("div");
    let messageSubmitButtonElement = document.createElement("button");
    let iElement = document.createElement("i");

    messageThreadElement.className = "h-100 message-thread";
    messageThreadElement.id = "message-thread-" + chatThread.chatthread_id;
    messageThreadElement.setAttribute("name", "message-thread-for-" + friend.username);
    messageAreaElement.className = "row message-area";
    messageInputSectionElement.className = "input-group message-input-section";

    messageInputBarElement.className = "message-input-bar";
    messageInputBarElement.setAttribute("rows", 1);
    messageInputBarElement.setAttribute("placeholder", "Message");
    messageInputBarElement.setAttribute("oninput", "adjustMessageAreaScrollHeight(this);");

    messageSubmitButtonContainerElement.className = "message-submit-button-container";
    messageSubmitButtonElement.className = "btn message-submit-button";
    messageSubmitButtonElement.setAttribute("onclick", "submitMessage(this);");
    iElement.className = "fa fa-send";

    messageSubmitButtonElement.appendChild(iElement);
    messageSubmitButtonContainerElement.appendChild(messageSubmitButtonElement);
    messageInputSectionElement.appendChild(messageInputBarElement);
    messageInputSectionElement.appendChild(messageSubmitButtonContainerElement);
    messageThreadElement.appendChild(messageAreaElement);
    messageThreadElement.appendChild(messageInputSectionElement);
    threadAreaElement.appendChild(messageThreadElement);
    getMessages(messageAreaElement, userId, chatThread.chatthread_id);
}

function createMessages(messageArea, messagesList) {
    let messages = JSON.parse(messagesList);
    for (let message of messages) {
        let messageId = message['message_id']; 
        let userId = message['user_id'];
        let userName = message['username'];
        let fullName = message['full_name'];
        let imageId = message['image_id']; 
        let imageName = message['image_name'];
        let messageBody = message['message_body']; 
        let messageTime = message['message_time'];
        let isEdited = message['is_edited'];
        
        let container = document.createElement("div");
        let content = document.createElement("div");
        let image = document.createElement("img");
        let messageText = document.createElement("div");
        let messageDate = document.createElement("div");
        let userText = document.createElement("div");
        let messageBodyText = document.createElement("div");
        let userLink = document.createElement("a");

        container.className = "chat-message";
        container.setAttribute("name", format("mesage-id-{}", messageId));
        content.className = "content";

        image.setAttribute("src", format("../{}", imageName));
        image.setAttribute("name", format("image-id-{}", imageId));
        image.className = "chat-message-pfp";

        messageText.className = "chat-message-text";
        messageBodyText.className = "chat-message-body";
        messageBodyText.innerHTML = messageBody;

        userLink.className = "chat-message-user-link";
        userLink.href = "#";
        userLink.setAttribute("name", format("message-owner-id-{}", userId));
        userLink.innerHTML = format("@{}", userName);
        userText.innerHTML = format("{} ", fullName);
        userText.className = "chat-message-user";

        messageDate.innerHTML = messageTime;
        messageDate.className = "chat-message-date";

        userText.appendChild(userLink);
        userText.appendChild(messageDate);
        messageText.appendChild(userText);
        messageText.appendChild(messageBodyText);
        content.appendChild(image);
        content.appendChild(messageText);
        container.appendChild(content);
        messageArea.appendChild(container);
    }
}

function format(str) {
    let args = [].slice.call(arguments, 1), i = 0;
    return str.replace(/{}/g, () => args[i++]);
}
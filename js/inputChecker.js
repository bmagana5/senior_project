function foo(element) {
    // element.rows += 1;
    let parent = element.parentNode;
    let grandparent = parent.parentNode;
    alert(grandparent.getAttribute("class"));
}

function bar(element) {
    let row_count = element.rows;
    if (row_count > 1) {
        element.rows -= 1;
    }
}

function checkForTextOverflow(textareaElement) {
    let message_thread = document.getElementById("message-thread");
    let message_input_section = document.getElementById("message-input-section");
    let prevNode = document.getElementById("message-area");
    
    textareaElement.style.height = 0;
    textareaElement.style.height = textareaElement.scrollHeight + "px";
    // message_input_section.style.height = textareaElement.style.height;
    // prevNode.style.height = message_thread.scrollHeight - message_input_section.scrollHeight + "px";

}
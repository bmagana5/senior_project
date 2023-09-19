import "./chat-message.styles.scss";
import MessageButtonGroup from "../message-button-group/message-button-group.component";

const ChatMessage = ({ message }) => {
    const {full_name, image_name, message_body, message_time, message_id, username } = message;
    /*
        full_name: "Brian Magana"
        image_id: 1
        image_name: "http://localhost:3001/images/users/bmagana5/profile/dude.jpg"
        is_edited: 0
        message_body: "Hello there!"
        message_id: 1
        message_time: "18 Mar '21 11:56:58 PM"
        user_id: 1
        username: "bmagana5"
    */
    return(
        <div className="chat-message-container">
            <MessageButtonGroup messageId={message_id}/>
            <img src={image_name} alt={`profile-pic-${username}`} />
            <div className="main-container">
                <div className="text-container">
                    {full_name} |&nbsp;
                    <div className="username-container">
                        @{username}
                    </div>
                    <div className="time-container">
                        {message_time}
                    </div>
                </div>
                <div className="message-body-container">
                    {message_body}
                </div>
            </div>
        </div>
    )
};

export default ChatMessage;
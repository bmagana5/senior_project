const FeedArea = (props) => {
    return (
        <div className="col-9 px-1 h-100 thread-area" id="thread-area">
            {props.children}
        </div>
    );
};

const FriendChat = ({ friendChatData, messageBuffer, captureFriendMessageInput }) => {
    const submitMessage = (event) => {
        console.log(event.target);
    }

    const emptyThreadText = {
        userSelect: 'none'
    };

    const messageArea = {
        height: '88%',
    };

    const messageInputSection = {
        height: '12%',
    }

    const messageInputBar = {
        borderRadius: '0.25rem',
        outline: 'none',
        borderStyle: 'none',
        color: 'lightgray',
    };

    return (
        <div className="h-100 message-thread" id={`message-thread-${friendChatData.friend}`} name={`message-thread-for-${friendChatData.friend}`}>
            <div className="w-100 py-1 overflow-auto" style={messageArea}>
                {friendChatData.messages.length > 0 
                    ? friendChatData.messages.map(message => <ChatMessage key={message.message_id} messageObj={message}></ChatMessage>) 
                    : <div className="d-flex justify-content-center align-items-center text-white-50 mx-5 p-2 fs-4 fw-bolder rounded bg-dark bg-gradient" style={emptyThreadText}>
                        Beginning of {friendChatData.name.toLowerCase()} with <br/> @{friendChatData.friend}
                    </div>}
            </div>
            <div className="d-flex justify-content-center align-items-center px-3 w-100" style={messageInputSection}>
                <div className="d-flex flex-column col-11">
                    <input className="p-2 message-input-bar" style={messageInputBar} type='text' placeholder={`Message @${friendChatData.friend}`} value={messageBuffer} onInput={captureFriendMessageInput}/>
                    <div className={`d-flex justify-content-end ${messageBuffer.length <= 500 ? 'text-white-50' : 'text-danger'}`} style={{ fontSize: '0.75rem', userSelect: 'none' }}>
                        {messageBuffer.length}/500
                    </div>
                </div>
                {/* disable either a valid or disabled button based on input value length */}
                {messageBuffer.length <= 500 
                    ? <button className="d-flex align-items-center justify-content-center col-1 py-2 mb-3 rounded message-submit-button" onClick={submitMessage}>
                        <i className="fa fa-send"></i>
                    </button>
                    : <button className="d-flex align-items-center justify-content-center col-1 py-2 mb-3 rounded message-submit-button-disabled" onClick={submitMessage} disabled>
                        <i className="fa fa-send"></i>
                    </button>}
            </div>
        </div>
    )
};

const ChatMessage = ({ messageObj }) => {
    const chatMessage = {
        borderBottomStyle: 'dotted',
        borderBottomColor: 'var(--medium)',
        userSelect: 'none'
    };

    const chatMessagePfp = {
        height: '3.5rem',
        width: '3.5rem',
        borderRadius: '50%',
    };

    const chatMessageUser = {
        fontSize: '1.1rem'
    };

    const chatMessageUserLink = {
        color: 'cornflowerblue',
        fontSize: '.85rem',
        cursor: 'pointer'
    };

    const chatMessageDate = {
        fontSize: '1rem',
    };

    const chatMessageBody = {
        color: 'gray'
    };


    return (
        <div className="d-flex align-items-center w-100 mw-100 my-1 p-2 shadow chat-message" style={chatMessage} name={`message-id-${messageObj.message_id}`}>
            <img className="col-2 ms-auto" style={chatMessagePfp} src={messageObj.image_name} name={`image-id-${messageObj.image_id}`} alt={`${messageObj.friend}`}/>
            <div className="col-10 mx-auto ps-2">
                <div className="d-flex w-100 align-items-center text-white-50 fw-bold" style={chatMessageUser}>
                    {messageObj.full_name} |
                    <div className="ms-1 chat-message-user-link" style={chatMessageUserLink} name={`message-owner-id-${messageObj.user_id}`}>
                        @{messageObj.username}
                    </div>
                    <div className="ms-auto text-white-50 fw-normal" style={chatMessageDate}>
                        {messageObj.message_time}
                    </div>
                </div>
                <div className="w-100 mw-100 text-white" style={chatMessageBody}>
                    {messageObj.message_body}
                </div>
            </div>
        </div>
    );
};

export { FeedArea, FriendChat, ChatMessage };
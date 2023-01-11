const FeedArea = (props) => {
    return (
        <div className="col-9 px-1 h-100 thread-area" id="thread-area">
            {props.children}
        </div>
    );
};

const FriendChat = ({ friendChatData, friendProfilePicture, messageBuffer, captureFriendMessageInput, submitMessage, checkForSubmitKey }) => {
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
            <div className="w-100 py-4 overflow-auto" style={messageArea}>
                {friendChatData.messages.length > 0 
                    ? <>
                        <div className="d-flex flex-column text-white-50 mx-2 mb-4 p-2" style={emptyThreadText}>
                            <img className="my-2 rounded-circle" src={friendProfilePicture} style={{ width: '6rem', height: '6rem' }} alt={friendProfilePicture}></img>
                            <div className="fs-4 fw-bold mb-2 text-info">@{friendChatData.friend}</div>
                            <div>
                                This is the beginning of your {friendChatData.name.toLowerCase()} history with <span className="text-white fw-bold">@{friendChatData.friend}</span> 
                            </div>
                        </div>
            
                        {friendChatData.messages.map(message => <ChatMessage key={message.message_id} messageObj={message}><MessageButtonGroup messageId={message.message_id}/></ChatMessage>) }
                    </>
                    : <div className="d-flex flex-column justify-content-center align-items-center text-white-50 mx-5 p-2 fs-4 fw-bolder rounded bg-dark bg-gradient" style={emptyThreadText}>
                        Beginning of {friendChatData.name.toLowerCase()} with
                        <img className="my-3 rounded-circle" src={friendProfilePicture} style={{ width: '8rem', height: '8rem' }} alt={friendProfilePicture}></img>
                        <div className="mb-3 fs-3 text-info">@{friendChatData.friend}</div>
                        <div className="mb-3 fw-normal text-white">Start the conversation!</div>  
                    </div>}
            </div>
            <div className="d-flex justify-content-center align-items-center px-3 w-100" style={messageInputSection}>
                <div className="d-flex flex-column col-11">
                    <input id={`chatthread-input-for-${friendChatData.friend}`} className="p-2 user-select-none message-input-bar" style={messageInputBar} type='text' placeholder={`Message @${friendChatData.friend}`} value={messageBuffer} onInput={captureFriendMessageInput} onKeyUp={checkForSubmitKey}/>
                    <div className={`d-flex justify-content-end ${messageBuffer.length <= 500 ? 'text-white-50' : 'text-danger'}`} style={{ fontSize: '0.75rem', userSelect: 'none' }}>
                        {messageBuffer.length}/500
                    </div>
                </div>
                {/* disable either a valid or disabled button based on input value length */}
                <button 
                    className={`d-flex align-items-center justify-content-center col-1 my-auto py-3 rounded-3 ${messageBuffer.length <= 500  ? 'message-submit-button' : 'message-submit-button-disabled'}`} 
                    onClick={messageBuffer.length > 0 && messageBuffer.length <= 500  ? submitMessage : null}>
                    <i className="fa fa-send"></i>
                </button>
            </div>
        </div>
    )
};

const ChatMessage = ({ messageObj, ...props }) => {
    const chatMessage = {
        borderBottomStyle: 'dotted',
        borderBottomColor: 'var(--medium)'
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
        fontSize: '.75rem',
    };

    const chatMessageBody = {
        color: 'gray'
    };

    return (
        <div className="position-relative d-flex align-items-center user-select-none w-100 mw-100 my-1 p-2 shadow chat-message" 
            style={chatMessage} name={`message-id-${messageObj.message_id}`} 
            onMouseEnter={() => {document.getElementById(`options-btn-group-${messageObj.message_id}`).style.display = 'block'}}
            onMouseLeave={() => {document.getElementById(`options-btn-group-${messageObj.message_id}`).style.display = 'none'}}>
            {/* message options button group goes here */}
            {props.children}
            <img className="col-2 ms-auto" style={chatMessagePfp} src={messageObj.image_name} name={`image-id-${messageObj.image_id}`} alt={`${messageObj.friend}`}/>
            <div className="col-10 mx-auto ps-2">
                <div className="d-flex w-100 align-items-center text-white-50 fw-bold" style={chatMessageUser}>
                    {messageObj.full_name} |
                    <div className="mx-1 chat-message-user-link" style={chatMessageUserLink} name={`message-owner-id-${messageObj.user_id}`}>
                        @{messageObj.username}
                    </div>
                    <div className="text-white-50 fw-normal" style={chatMessageDate}>
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

const MessageButtonGroup = ({ messageId }) => {
    return (
        <div className="position-absolute top-0 end-0 translate-middle btn-group chat-message-options-button-group" 
            style={{ display: 'none' }} role="group" aria-label="message-options" id={`options-btn-group-${messageId}`}
            onMouseEnter={() => document.getElementById(`options-btn-group-${messageId}`).style.boxShadow = '-1px 3px 5px var(--medium)'}
            onMouseLeave={() => document.getElementById(`options-btn-group-${messageId}`).style.boxShadow = ''}>
            <TooltipButton text={'Add Reaction'} fontAwesomeIcon={'fas fa-laugh-beam'} position='start'/>
            <TooltipButton text={'Edit'} fontAwesomeIcon={'fas fa-pen'} position='middle'/>
            <TooltipButton text={'More Options'} fontAwesomeIcon={'fas fa-ellipsis-h'} position='end'/>
        </div>
    );
};

const TooltipButton = ({ text, fontAwesomeIcon, position }) => {
    const borderOptions = {
        start: 'border-end-0',
        middle: 'border-start-0 border-end-0',
        end: 'border-start-0'
    };

    return (
        <button type="button" className={`border border-dark ${borderOptions[position]} rounded-start py-1 px-2 chat-message-options-button tooltip-target`}>
            <span className="position-absolute bottom-50 start-50 translate-middle mb-2 py-1 px-2 rounded-3 text-white text-opacity-75 text-nowrap tooltiptext overflow-visible">{text}</span>
            <i className={`text-white-50 fs-6 ${fontAwesomeIcon}`}></i>
        </button>
    );
};

export { FeedArea, FriendChat };
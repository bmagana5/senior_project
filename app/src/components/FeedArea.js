import { ChatMessage, MessageButtonGroup } from "./ChatMessage";

const FeedArea = (props) => {
    return (
        <div className="col-9 px-1 h-100 thread-area" id="thread-area">
            {props.children}
        </div>
    );
};

const FriendChat = ({ 
    friendChatData, 
    friendProfilePicture, 
    messageBuffer, 
    captureFriendMessageInput, 
    submitMessage, 
    checkForSubmitKey, 
    editingMessage,
    toggleMessageEdit,
    replyToMessage,
    deleteMessage,
    saveMessageEdit,
    cancelMessageEdit
}) => {
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
            
                        {friendChatData.messages.map(message => 
                            <ChatMessage key={message.message_id} 
                                messageObj={message} 
                                editingMessage={editingMessage}
                                saveMessageEdit={saveMessageEdit}
                                cancelMessageEdit={cancelMessageEdit}>
                                <MessageButtonGroup 
                                    messageId={message.message_id} 
                                    toggleMessageEdit={toggleMessageEdit}
                                    replyToMessage={replyToMessage}
                                    deleteMessage={deleteMessage}/>
                            </ChatMessage>)}
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

export { FeedArea, FriendChat };
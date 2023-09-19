import { useContext } from "react";
import "./friend-chat.styles.scss";
import { FriendsContext } from "../../contexts/friends.context";
import ChatMessage from "../chat-message/chat-message.component";

const FriendChat = () => {
    const { friendsList, activeFriendChatThreadDataRef, friendMessageBuffer } = useContext(FriendsContext);
    const { friend, messages, name } = activeFriendChatThreadDataRef.current;
    const { full_name, image_name, username } = friendsList.find((friend) => friend.username === activeFriendChatThreadDataRef.current.friend);
    
    const checkForSubmitKey = (event) => {
        if (['Enter'].includes(event.key)) {
            // submitFriendChatMessage();
        }
    };

    let messageLength = friendMessageBuffer[friend].length;
    return (
        <div className="friend-chat-container message-thread" 
            id={`message-thread-${friend}`}
            name={`message-thread-for-${friend}`}>
            <div className="message-area-container">
                {
                    messages.length > 0
                        ? <>
                            <div className="nonempty-thread-container">
                                <img src={image_name} alt={username} />
                                <div className="friend-username">{full_name}</div>
                                <div>
                                    This is the beginning of your&nbsp;
                                    {name.toLowerCase()} history with&nbsp;
                                    <span className="friend-handle">@{username}</span>
                                </div>
                            </div>
                            {
                                messages.map((message) =>
                                    <ChatMessage key={message.message_id} message={message}/>
                                )
                            }
                        </>
                        : <div className="empty-thread-container">
                            Beginning of {name.toLowerCase()} with
                            <img className="profile-image" src={image_name} alt={username} />
                            <div className="friend-handle">@{username}</div>
                            <div className="default-text">Start the conversation!</div>
                        </div>
                }
            </div>
            <div className="message-input-container">
                <div className="input-container">
                    <input type="text" 
                        value={friendMessageBuffer[friend]}
                        placeholder={`Message @${friend}`}
                        onInput={() => {}}
                        onKeyUp={checkForSubmitKey}/>
                    <div className={`character-count ${friendMessageBuffer[friend].length > 500 ? 'full' : ''}`}>
                        {friendMessageBuffer[friend].length}/500
                    </div>
                </div>
                <button className={`${messageLength <= 500 && messageLength > 0 ? '' : 'disabled'}`}
                    onClick={messageLength > 0 && messageLength <= 500 ? null : null}>
                    <i className="fa fa-send"></i>
                </button>
            </div>
        </div>
    );
};

export default FriendChat;
import { createContext, useState, useContext, useEffect, useRef } from "react";
import { UserContext } from "./user.context";
import contentService from "../services/contentService";
import { ErrorMessageContext } from "./error-message.context";

export const FriendsContext = createContext({
    friendsList: [],
    setFriendsList: () => {},
    chatListRef: null,
    setChatList: () => {},
    friendMessageBuffer: {},
    activeFriendChatThreadDataRef: null,
    setActiveFriendChatThreadData: () => {},
    openChat: () => {}
});

export const FriendsProvider = ({ children }) => {
    // states
    const [friendsList, setFriendsList] = useState([]);
    const [chatList, _setChatList] = useState([]);
    const [friendMessageBuffer, setFriendMessageBuffer] = useState({}); // table that buffers message string to a friend
    const [isFriendsListRetrieved, setIsFriendsListRetrieved] = useState(false);
    const [activeFriendChat, setActiveFriendChat] = useState(null);
    const [activeFriendChatThreadData, _setActiveFriendChatThreadData] = useState(null);

    // refs
    const chatListRef = useRef(chatList);
    const setChatList = (data) => {
        chatListRef.current = data;
        _setChatList(data);
    }
    const activeFriendChatThreadDataRef = useRef(activeFriendChatThreadData);
    const setActiveFriendChatThreadData = (data) => {
        activeFriendChatThreadDataRef.current = data;
        _setActiveFriendChatThreadData(data);
    };

    // contexts
    const { user, socket, logout } = useContext(UserContext);
    const { setErrorMessage, clearErrorMessage } = useContext(ErrorMessageContext);

    const openChat = (username) => {
        activeFriendChat !== username ?
            setActiveFriendChat(username)
            : setActiveFriendChat(null);
    };

    useEffect(() => {
        const getFriendsCallback = async () => {
            try {
                const friends = await contentService.getFriendsList();
                setIsFriendsListRetrieved(true);
                setFriendsList(friends);
            } catch (errorObj) {
                const e = errorObj.response.data;
                if (e.name) {
                    let errorString;
                    switch (e.name) {
                        case 'TokenExpiredError':
                            errorString = `Session timed out: ${e.error}. Please log in again.`;
                            break;
                        default:
                            errorString = `An error has occurred attempting to retrieve a list item. ${e.error}`;
                            break;
                    }
                    setErrorMessage(errorString);
                    setTimeout(() => {
                        clearErrorMessage();
                    }, 10000);
                    logout();
                }
            }
        }
        if (user && !isFriendsListRetrieved) {
            getFriendsCallback();
        }
    }, [user]);

    useEffect(() => {
        const getActiveFriendChatCallback = async () => {
            const friend = friendsList.find((friend) => friend.username === activeFriendChat);
            const friendChatThread = chatList.find((chatThread) => chatThread.friend === friend.username);
            if (friendChatThread) {
                // join chat room using socket.io
                socket.emit("join-chat-room", friendChatThread.id, user.username);
                setActiveFriendChatThreadData(friendChatThread);
            } else if (friend) {
                try {
                    const chatThreadToJoin = await contentService.getChatThread(friend.user_id);
                    socket.emit("join-chat-room", chatThreadToJoin.id, user.username);
                    setChatList(chatList.concat({
                        id: chatThreadToJoin.id,
                        name: chatThreadToJoin.name,
                        friend: friend.username,
                        messages: chatThreadToJoin.messages
                    }));
                    const tmpObj = {...friendMessageBuffer};
                    tmpObj[friend.username] = '';
                    setFriendMessageBuffer(tmpObj);
                } catch (error) {
                    const e = error.response.error;
                    if (e.name) {
                        let errorString;
                        switch (e.name) {
                            case 'TokenExpiredError':
                                errorString = `Session timed out: ${e.error}. Please log in again.`;
                                break;
                            default:
                                errorString = `An error has occurred attempting to retrieve a list item. ${e.error}`;
                                break;
                        }
                        setErrorMessage(errorString);
                        setTimeout(() => {
                            clearErrorMessage();
                        }, 10000);
                        logout();
                    }
                }
            } 
        }
        
        if (isFriendsListRetrieved && activeFriendChat !== null) {
            // console.trace(`Trace: '${activeFriendChat}'`);
            getActiveFriendChatCallback();
        } else {
            setActiveFriendChatThreadData(null);
        }
    }, [activeFriendChat]);

    useEffect(() => {
        chatList.length > 0 
            && setActiveFriendChatThreadData(
                    chatList.find((chat) => chat.friend === activeFriendChat)
                    );                
    }, [chatList]);

    // use ↓ to test and view what object and list structures are like
    useEffect(() => {
        // friendsList && console.log('friendsList: ', friendsList);
        // chatList && console.log('chatList: ', chatList);
        // friendMessageBuffer && console.log('friendMessageBuffer: ', friendMessageBuffer);
        // isFriendsListRetrieved && console.log('isFriendsListRetrieved: ', isFriendsListRetrieved);
        // activeFriendChat && console.log('activeFriendChat: ', activeFriendChat);
        activeFriendChatThreadData && console.log('activeFriendChatThreadData: ', activeFriendChatThreadData);
    });

    const value = { 
        friendsList, setFriendsList, 
        chatListRef, setChatList,
        friendMessageBuffer,
        activeFriendChatThreadDataRef, 
        setActiveFriendChatThreadData, openChat 
    };

    return <FriendsContext.Provider value={value}>{children}</FriendsContext.Provider>;
};
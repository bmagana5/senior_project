import { createContext, useState, useEffect, useContext } from "react";
import contentService from "../services/contentService";
import { io } from "socket.io-client";
import { FriendsContext } from "./friends.context";

export const UserContext = createContext({
    user: null,
    setUserData: () => {},
    socket: null,
    logout: () => {}
});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [socket, setSocket] = useState(null);

    const { chatListRef, setChatList, activeFriendChatThreadDataRef } = useContext(FriendsContext);

    const setUserData = (userData) => {
        window.localStorage.setItem('loggedInUser', JSON.stringify(userData));
        contentService.setToken(userData.token);
        setUser(userData);
    };

    const logout = () => {
        window.localStorage.clear();
        // disconnect socket as well if it is used in context
        contentService.clearToken();
        setUser(null);
    };

    const connectSocket = () => {
        const newSocket = io.connect('http://localhost:3001');
        newSocket.on("new-friend-chat-message", (newMessage) => {
            const tmpChat = chatListRef.current.find(
                (chat) => chat.friend === activeFriendChatThreadDataRef.current.friend);
            tmpChat.messages.push(newMessage);
            setChatList(chatListRef.current.map(
                (chat) => chat.id === newMessage.chatthread_id ? tmpChat : chat
            ));
        });
        setSocket(newSocket);
    };

    const disconnectSocket = () => {
        socket.disconnect();
        setSocket(null);
    };

    // checks if there's valid user data stored in browser local storage
    useEffect(() => {
        const loggedInUser = window.localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            setUserData(JSON.parse(loggedInUser));
        }
    }, []);

    useEffect(() => {
        user ?
            socket === null && connectSocket()
            : socket && disconnectSocket();
    }, [user]);

    // useEffect(() => {
    //     user && console.log('user: ', user);
    //     socket && console.log('socket: ', socket);
    // });

    const value = { user, setUserData, socket, logout };
    
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
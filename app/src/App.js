/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import { useContext } from "react";
import { UserContext } from "./contexts/user.context";
import { ErrorMessageContext } from './contexts/error-message.context';
import Signup from "./components/sign-up-form/sign-up-form.component";  
import Home from './routes/home/home.component';
import { io } from 'socket.io-client';
import contentService from './services/contentService';
import { useEffect, useRef, useState } from "react";
import FriendList from './components/FriendList';
// import { FeedArea, FriendChat } from './components/FeedArea';


// function App() {
//   const [errorMessage, setErrorMessage]                     = useState('');
//   const [user, setUser]                                     = useState(null);
  
//   const [friendList, setFriendList]                         = useState([]);
//   const isFriendListRetrieved                               = useRef(false);                // flag to check if friends' list has been retrieved from server
//   const setIsFriendListRetrieved = (value) => {
//     isFriendListRetrieved.current = value;
//   };

//   const [activeFriendChat, setActiveFriendChat]             = useState('');                 // tracks which friend chat should be opened
//   const [activeFriendChatData, _setActiveFriendChatData]    = useState(null);               // holds the active friend chat thread's data, include messages, friend id, chatthread id...
//   const activeFriendChatDataRef                             = useRef(activeFriendChatData); // reference hook for active friend chat data. useful for passing into event handlers
//   const setActiveFriendChatData = (data) => {
//     activeFriendChatDataRef.current = data;
//     _setActiveFriendChatData(data);
//   };

//   const [chatList, _setChatList]                            = useState([]);                 // keeps track of chat thread id, mesages in a direct messaging chat between friends
//   const chatListRef                                         = useRef(chatList);             // reference hook for chat thread list. useful for passing chat thread list into event handlers
//   const setChatList = (data) => {
//     chatListRef.current = data;
//     _setChatList(data);
//   };

//   const [friendMessageBuffer, setFriendMessageBuffer]       = useState({});                 // table that is used to hold buffers for messages for each friend
//   const [socket, setSocket]                                 = useState(null);               // socket for the user to communicate immediate changes to other users subscribed to their content
//   const [editingMessage, setEditingMessage]                 = useState(null);
//   // effect that adds an event listener to each form in the app
//   // useEffect(() => {
//   //   const forms = document.querySelectorAll('.needs-validation');

//   //   Array.from(forms).forEach(form => {
//   //     form.addEventListener('submit', (event) => {
//   //       // console.log(event.target[0]);
//   //       // console.log(event.target[1]);
//   //       // if (!form.checkValidity()) {
//   //       //   event.preventDefault();
//   //       //   event.stopPropagation();
//   //       // }
//   //       form.classList.add('was-validated');
//   //     }, false);
//   //   });
//   // }, []);
 
//   useEffect(() => {
//     // responsible for socket connection. dependent on user object
//     user 
//       ? socket === null && connectSocket()
//       : socket && disconnectSocket();
//   }, [user]);

//   // the function connects user client to the server via socket
//   // also defines how specific events received from the server will be handled.
//   const connectSocket = () => {
//     let newSocket = io.connect('http://localhost:3001');
//     // server will emit new chat messages out to all clients subscribed to specific chat threads
//     newSocket.on("new-friend-chat-message", (newMessage) => {
//       let tmpChat = chatListRef.current.find(chat => chat.friend === activeFriendChatDataRef.current.friend);
//       tmpChat.messages.push(newMessage);
//       setChatList(chatListRef.current.map(chat => chat.id === newMessage.chatthread_id ? tmpChat : chat));
//     });
//     setSocket(newSocket);
//   };

//   const disconnectSocket = () => {
//     socket.disconnect();
//     setSocket(null);
//   };

//   // checks if there is valid user credentials saved on localStorage to use to automatically log in user
//   useEffect(() => {
//     const loggedInUser = window.localStorage.getItem('loggedInUser');
//     if (loggedInUser) {
//       const user = JSON.parse(loggedInUser);
//       setUserData(user);
//     }
//   }, []);

//   useEffect(() => {
//     // check if activeFriendChat changes
//     // if so, check if chat data has been retrieved and placed in chatList
//     if (isFriendListRetrieved) {
//       const friend = friendList.find(friend => friend.username === activeFriendChat);
//       const cachedChatData = chatList.find(chatThread => chatThread.friend === activeFriendChat);
//       if (cachedChatData) {
//         socket.emit("join-chat-room", cachedChatData.id, user.username);
//         setActiveFriendChatData(cachedChatData);
//       } else if (friend) {
//         // if not already there, retrieve from database asynchronously
//         contentService.getChatThread(friend.user_id).then((chatThread) => {
//           socket.emit("join-chat-room", chatThread.id, user.username);
//           setChatList(chatList.concat({ 
//             id: chatThread.id, 
//             name: chatThread.name, 
//             friend: friend.username, 
//             messages: chatThread.messages
//           }));
//           let tmpObj = {...friendMessageBuffer};
//           tmpObj[friend.username] = '';
//           setFriendMessageBuffer(tmpObj);
//         }).catch((errorObj) => {
//           const error = errorObj.response.data;
//           console.log('ERROR while retrieving chat thread or messages: ', error);
//           if (error.name && error.name === 'TokenExpiredError') {
//             setErrorMessage(`Session timed out: ${error.error}. Please log in again.`);
//             setTimeout(() => {
//               clearErrorMessage();
//             }, 10000);
//             logout();
//           } else if (error.error && error.error.toLowerCase().includes('token')) {
//             setErrorMessage(`An error has occurred: ${error.error}`);
//             setTimeout(() => {
//               clearErrorMessage();
//             }, 10000);
//             logout();
//           } 
//         });
//       } else {
//         setActiveFriendChatData(null);
//       }
//     }
//   }, [activeFriendChat]);

//   // if there are cached friend chat threads, grab the correct one based on the friend username the activeFriendChat tracker is set to
//   useEffect(() => {
//     chatList.length > 0 && setActiveFriendChatData(chatList.find(chat => chat.friend === activeFriendChat));
//   }, [chatList]);

//   const setUserData = (userData) => {
//     contentService.setToken(userData.token);
//     setUser(userData);
//   };

//   // clear all data out when logging out
//   const logout = () => {
//     window.localStorage.clear();
//     setFriendList([]);
//     setIsFriendListRetrieved(false);
//     setActiveFriendChat('');  
//     setActiveFriendChatData(null);
//     setChatList([]);  
//     setFriendMessageBuffer({});
//     disconnectSocket();
//     setUser(null);
//   };

//   const clearErrorMessage = () => {
//     setErrorMessage('');
//   };

//   const openChat = (username) => {
//     if (activeFriendChat !== username) {
//       setActiveFriendChat(username);
//     } else {
//       setActiveFriendChat('');
//     }
//   };

//   // takes in the event, gets the current value of the <input> element
//   // ...and updates the message buffer for the appropriate friend
//   const captureFriendMessageInput = (event) => {
//     let tmpObj = {...friendMessageBuffer};
//     tmpObj[activeFriendChat] = event.target.value;
//     setFriendMessageBuffer(tmpObj);
//   };

//   const checkForSubmitKey = (event) => {
//     if (['Enter'].includes(event.key)){
//       submitFriendChatMessage();
//     }
//   };

//   const clearFriendMessageInput = () => {
//     let tmpObj = {...friendMessageBuffer};
//     tmpObj[activeFriendChat] = '';
//     document.getElementById(`chatthread-input-for-${activeFriendChatData.friend}`).value = '';
//     setFriendMessageBuffer(tmpObj);
//   };

//   const submitFriendChatMessage = async () => {
//     // need: user_id, chatthread_id, message_body
//     // user id comes from webtoken, so use that!
//     // console.log('submitting: ', { chatthread_id: activeFriendChatData.id, message_body: friendMessageBuffer[activeFriendChat]})
//     try {
//       const newMessage = await contentService.submitChatMessage({ chatthread_id: activeFriendChatData.id, message_body: friendMessageBuffer[activeFriendChat], socket_id: socket.id});
//       let tmpChat = chatList.find(chat => chat.friend === activeFriendChatData.friend);
//       tmpChat.messages.push(newMessage);
//       clearFriendMessageInput();
//       setChatList(chatList.map(chat => chat.id === newMessage.chatthread_id ? tmpChat : chat));
//     } catch (error) {
//       setErrorMessage(`Session timed out: ${error}. Please log in again.`);
//       setTimeout(() => {
//         clearErrorMessage();
//       }, 10000);
//       logout();
//     }
  
//   };

//   const toggleMessageEdit = (messageId) => {
//     console.log('message edit');
//     // setEditingMessage(messageId);
//   };

//   const replyToMessage = (messageId) => {
//     console.log('reply to message');
//   };

//   const deleteMessage = (messageId) => {
//     console.log('delete message');
//   };

//   const saveMessageEdit = () => {
//     // when confirming save message by edit,
//     /*
//       update chatlist.message
//     */
//   };

//   const cancelMessageEdit = () => {
//     setEditingMessage(null);
//   };

//   // this returns the appropriate React component for corresponding user form
//   const userForm = () => (
//     <>
//       <div className="w-100 d-flex justify-content-center align-items-center" id="app-container" style={{ backgroundColor: '#ebedf0', height: '85%' }}>
//         <Signup setUserData={setUserData}/>
//       </div>
//       <div className="bg-white w-100 " style={{ height: '15%' }}>
//           <p className='mx-5 text-secondary fs-6'>Social Media Project © 2020</p>
//       </div>
//     </>
//   );

//   // web app components once user is logged in
//   const homeElements = () => {
//     return (
//       <Home logout={logout}>
//         <FriendList key="FriendList" friendList={friendList} openChat={openChat}></FriendList>
//         <FeedArea key="FeedArea">
//           { activeFriendChatData 
//             ? <FriendChat 
//                 friendChatData={activeFriendChatData}
//                 friendProfilePicture={friendList.find(friend => friend.username === activeFriendChatData.friend).image_name}
//                 messageBuffer={friendMessageBuffer[activeFriendChatData.friend]}
//                 captureFriendMessageInput={captureFriendMessageInput}
//                 submitMessage={submitFriendChatMessage}
//                 checkForSubmitKey={checkForSubmitKey}
//                 editingMessage={editingMessage}
//                 toggleMessageEdit={toggleMessageEdit}
//                 replyToMessage={replyToMessage}
//                 deleteMessage={deleteMessage}
//                 saveMessageEdit={saveMessageEdit}
//                 cancelMessageEdit={cancelMessageEdit}
//               /> 
//             : null}
//         </FeedArea>
//       </Home>
//     );
//   };

//   return ( 
//     <>
//       {!user ? userForm() : homeElements()}
//     </>
//   );
// }

const App = () => {
    const { user } = useContext(UserContext);
    return (
        <>
            {
                user ? 
                    <Home/>
                    : <Signup/>
            }
        </>
    );
};

export default App;

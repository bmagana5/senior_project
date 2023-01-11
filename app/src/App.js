/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import { io } from 'socket.io-client';
import loginService from './services/loginService';
import signupService from './services/signupService';
import contentService from './services/contentService';
import Login from  "./components/Login";
import Signup from "./components/Signup";
import { useEffect, useRef, useState } from "react";
import Home from './components/Home';
import FriendList from './components/FriendList';
import { FeedArea, FriendChat } from './components/FeedArea';


function App() {
  const [loginSignupToggle, setLoginSignupToggle]           = useState(true);
  const [usernameField, setUsernameField]                   = useState('');
  const [fullNameField, setFullNameField]                   = useState('');
  const [emailField, setEmailField]                         = useState('');
  const [passwordField, setPasswordField]                   = useState('');
  const [confirmPasswordField, setConfirmPasswordField]     = useState('');
  const [errorMessage, setErrorMessage]                     = useState('');
  const [user, setUser]                                     = useState(null);
  const [friendList, setFriendList]                         = useState([]);
  const isFriendListRetrieved                               = useRef(false);
  const setIsFriendListRetrieved = (value) => {
    isFriendListRetrieved.current = value;
  };
  const [activeFriendChat, setActiveFriendChat]             = useState('');     // tracks which friend chat should be opened
  const [activeFriendChatData, _setActiveFriendChatData]    = useState(null);
  const activeFriendChatDataRef                             = useRef(activeFriendChatData);
  const setActiveFriendChatData = (data) => {
    activeFriendChatDataRef.current = data;
    _setActiveFriendChatData(data);
  };
  const [chatList, _setChatList]                            = useState([]);     // keeps track of chat thread id, mesages in a direct messaging chat between friends
  const chatListRef                                         = useRef(chatList);
  const setChatList = (data) => {
    chatListRef.current = data;
    _setChatList(data);
  };
  const [friendMessageBuffer, setFriendMessageBuffer]       = useState({});
  const [socket, setSocket]                                 = useState(null);
  // effect that adds an event listener to each form in the app
  // useEffect(() => {
  //   const forms = document.querySelectorAll('.needs-validation');

  //   Array.from(forms).forEach(form => {
  //     form.addEventListener('submit', (event) => {
  //       // console.log(event.target[0]);
  //       // console.log(event.target[1]);
  //       // if (!form.checkValidity()) {
  //       //   event.preventDefault();
  //       //   event.stopPropagation();
  //       // }
  //       form.classList.add('was-validated');
  //     }, false);
  //   });
  // }, []);
 
  useEffect(() => {
    // responsible for socket connection. dependent on user object
    user 
      ? socket === null && connectSocket()
      : socket && disconnectSocket(null);
  }, [user]);

  // the function connects user client to the server via socket
  // also defines how specific events received from the server will be handled.
  const connectSocket = () => {
    let newSocket = io.connect('http://localhost:3001');
    // server will emit new chat messages out to all clients subscribed to specific chat threads
    newSocket.on("new-friend-chat-message", (newMessage) => {
      let tmpChat = chatListRef.current.find(chat => chat.friend === activeFriendChatDataRef.current.friend);
      tmpChat.messages.push(newMessage);
      setChatList(chatListRef.current.map(chat => chat.id === newMessage.chatthread_id ? tmpChat : chat));
    });
    setSocket(newSocket);
  };

  const disconnectSocket = () => {
    socket.disconnect();
    setSocket(null);
  };

  // checks if there is valid user credentials saved on localStorage to use to automatically log in user
  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      contentService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (user && !isFriendListRetrieved.current) {
      // retrieve list of friends
      contentService.getFriendsList().then((friends) => {
        setIsFriendListRetrieved(true);
        setFriendList(friends);
        console.log(friends);
      }).catch((errorObj) => {
        const error = errorObj.response.data;
        if (error.name && error.name === 'TokenExpiredError') {
          setErrorMessage(`Session timed out: ${error.error}. Please log in again.`);
          setTimeout(() => {
            clearErrorMessage();
          }, 10000);
          logout();
        } else if (error.error && error.error.toLowerCase().includes('token')) {
          setErrorMessage(`An error has occurred: ${error.error}`);
          setTimeout(() => {
            clearErrorMessage();
          }, 10000);
          logout();
        } else {
          setErrorMessage(`An error has occurred attempting to retrieve a list item. ${error.error}`);
          setTimeout(() => {
            clearErrorMessage();
          }, 10000);
          logout();
        }
      });
    }
  }, [user]);
  
  useEffect(() => {
    // check if activeFriendChat changes
    // if so, check if chat data has been retrieved and placed in chatList
    if (isFriendListRetrieved) {
      const friend = friendList.find(friend => friend.username === activeFriendChat);
      const cachedChatData = chatList.find(chatThread => chatThread.friend === activeFriendChat);
      if (cachedChatData) {
        socket.emit("join-chat-room", cachedChatData.id, user.username);
        setActiveFriendChatData(cachedChatData);
      } else if (friend) {
        // if not already there, retrieve from database asynchronously
        contentService.getChatThread(friend.user_id).then((chatThread) => {
          socket.emit("join-chat-room", chatThread.id, user.username);
          setChatList(chatList.concat({ 
            id: chatThread.id, 
            name: chatThread.name, 
            friend: friend.username, 
            messages: chatThread.messages
          }));
          let tmpObj = {...friendMessageBuffer};
          tmpObj[friend.username] = '';
          setFriendMessageBuffer(tmpObj);
        }).catch((errorObj) => {
          const error = errorObj.response.data;
          console.log('ERROR while retrieving chat thread or messages: ', error);
          if (error.name && error.name === 'TokenExpiredError') {
            setErrorMessage(`Session timed out: ${error.error}. Please log in again.`);
            setTimeout(() => {
              clearErrorMessage();
            }, 10000);
            logout();
          } else if (error.error && error.error.toLowerCase().includes('token')) {
            setErrorMessage(`An error has occurred: ${error.error}`);
            setTimeout(() => {
              clearErrorMessage();
            }, 10000);
            logout();
          } 
        });
      } else {
        setActiveFriendChatData(null);
      }
    }
  }, [activeFriendChat]);

  // if there are cached friend chat threads, grab the correct one based on the friend username the activeFriendChat tracker is set to
  useEffect(() => {
    chatList.length > 0 && setActiveFriendChatData(chatList.find(chat => chat.friend === activeFriendChat));
  }, [chatList]);
  
  const validateForm = (event) => {
    event.preventDefault();
    // if a field is not '', check that it has valid data
    // ensure username is long enough and is of valid chars
    // check that password is long enough
    // check that email is valid
    // check that full name is valid as well.
    loginSignupToggle 
      ? login(usernameField, passwordField, emailField) 
      : signup(usernameField, fullNameField, emailField, passwordField, confirmPasswordField);
  };

  const login = async (username, password, email = null) => {
    // check login fields
    const userObj = {
      password
    }
    username.length > 0
      ? userObj.username = username
      : userObj.email = email;
    try {
      const user = await loginService.login(userObj.username ? 'username' : 'email', userObj);
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      contentService.setToken(user.token);
      clearAllFormFields();
      setUser(user);
    } catch (error) {
      setErrorMessage(`Login failed: ${error.response.data.error}`);
      setTimeout(() => {
        clearErrorMessage();
      }, 10000);
      clearAllFormFields();
    }
  };

  const signup = async (username, name, email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      setErrorMessage('Sign up failed: Passwords do not match');
      setTimeout(() => setErrorMessage(''), 10000);
      clearAllFormFields();
      return;
    }
    const userObj = {
      username,
      name,
      email,
      password,
      confirmPassword
    };

    try {
      const newUser = await signupService.signup(userObj);
      if (newUser && newUser.username === username) {
        login(newUser.username, passwordField);
      }
    } catch(error) {
      setErrorMessage(`Signup Failed: ${error.response.data.error}`);
      setTimeout(() => {
        clearErrorMessage();
      }, 10000);
      clearAllFormFields();
    }
  };
  
  // clear all data out when logging out
  const logout = () => {
    window.localStorage.clear();
    setFriendList([]);
    setIsFriendListRetrieved(false);
    setActiveFriendChat('');  
    setActiveFriendChatData(null);
    setChatList([]);  
    setFriendMessageBuffer({});
    disconnectSocket();
    setUser(null);
  };

  const captureUsernameInput = (event) => {
    setUsernameField(event.target.value);
  };

  const captureFullNameInput = (event) => {
    setFullNameField(event.target.value);
  };

  const captureEmailInput = (event) => {
    setEmailField(event.target.value);
  };

  const capturePasswordInput = (event) => {
    setPasswordField(event.target.value);
  };

  const captureConfirmPasswordInput = (event) => {
    setConfirmPasswordField(event.target.value);
  };

  const toggleUserForm = () => {
    clearAllFormFields();
    setLoginSignupToggle(loginSignupToggle ? false : true);
  };

  const toggleUserEmailFields = () => {
    const userContainer = document.getElementById('user-field-containter');
    const emailContainer = document.getElementById('email-field-containter');
    
    userContainer.classList.toggle('d-grid');
    userContainer.classList.toggle('d-none');
    if (userContainer.querySelector('input').hasAttribute('required')) {
      userContainer.querySelector('input').removeAttribute('required');
      userContainer.querySelector('input').value = '';
      setUsernameField('');
    } else {
      userContainer.querySelector('input').setAttribute('required', '');
    }

    emailContainer.classList.toggle('d-grid');
    emailContainer.classList.toggle('d-none');
    if (emailContainer.querySelector('input').hasAttribute('required')) {
      emailContainer.querySelector('input').removeAttribute('required');
      emailContainer.querySelector('input').value = '';
      setEmailField('');
    } else {
      emailContainer.querySelector('input').setAttribute('required', '');
    }
  };

  const clearErrorMessage = () => {
    setErrorMessage('');
  };

  const clearAllFormFields = () => {
    setFullNameField('');
    setUsernameField('');
    setEmailField('');
    setPasswordField('');
    setConfirmPasswordField('');
  };

  const openChat = (username) => {
    if (activeFriendChat !== username) {
      setActiveFriendChat(username);
    } else {
      setActiveFriendChat('');
    }
  };

  // takes in the event, gets the current value of the <input> element
  // ...and updates the message buffer for the appropriate friend
  const captureFriendMessageInput = (event) => {
    let tmpObj = {...friendMessageBuffer};
    tmpObj[activeFriendChat] = event.target.value;
    setFriendMessageBuffer(tmpObj);
  };

  const checkForSubmitKey = (event) => {
    if (['Enter'].includes(event.key)){
      submitFriendChatMessage();
    }
  };

  const clearFriendMessageInput = () => {
    let tmpObj = {...friendMessageBuffer};
    tmpObj[activeFriendChat] = '';
    document.getElementById(`chatthread-input-for-${activeFriendChatData.friend}`).value = '';
    setFriendMessageBuffer(tmpObj);
  };

  const submitFriendChatMessage = async () => {
    // need: user_id, chatthread_id, message_body
    // user id comes from webtoken, so use that!
    // console.log('submitting: ', { chatthread_id: activeFriendChatData.id, message_body: friendMessageBuffer[activeFriendChat]})
    try {
      const newMessage = await contentService.submitChatMessage({ chatthread_id: activeFriendChatData.id, message_body: friendMessageBuffer[activeFriendChat], socket_id: socket.id});
      let tmpChat = chatList.find(chat => chat.friend === activeFriendChatData.friend);
      tmpChat.messages.push(newMessage);
      clearFriendMessageInput();
      setChatList(chatList.map(chat => chat.id === newMessage.chatthread_id ? tmpChat : chat));
    } catch (error) {
      setErrorMessage(`Session timed out: ${error}. Please log in again.`);
      setTimeout(() => {
        clearErrorMessage();
      }, 10000);
      logout();
    }
  
  };

  // this returns the appropriate React component for corresponding user form
  const userForm = () => (
    <>
      <div className="w-100 d-flex justify-content-center align-items-center" id="app-container" style={{ backgroundColor: '#ebedf0', height: '85%' }}>
        {loginSignupToggle 
        ? <Login 
            submitForm={validateForm} 
            toggleUserForm={toggleUserForm}
            toggleUserEmailFields={toggleUserEmailFields}
            usernameInputHandler={captureUsernameInput}
            emailInputHandler={captureEmailInput}
            passwordInputHandler={capturePasswordInput}
            usernameField={usernameField}
            emailField={emailField}
            passwordField={passwordField}
          /> 
        : <Signup 
            submitForm={validateForm}
            toggleUserForm={toggleUserForm}
            usernameInputHandler={captureUsernameInput}
            fullNameInputHandler={captureFullNameInput}
            emailInputHandler={captureEmailInput}
            passwordInputHandler={capturePasswordInput}
            confirmPasswordInputHandler={captureConfirmPasswordInput}
            usernameField={usernameField}
            fullNameField={fullNameField}
            emailField={emailField}
            passwordField={passwordField}
            confirmPasswordField={confirmPasswordField}
          />}
      </div>
      <div className="bg-white w-100 " style={{ height: '15%' }}>
          <p className='mx-5 text-secondary fs-6'>Social Media Project © 2020</p>
      </div>
    </>
  );

  // web app components once user is logged in
  const homeElements = () => {
    return (
      <Home logout={logout}>
        <FriendList key="FriendList" friendList={friendList} openChat={openChat}></FriendList>
        <FeedArea key="FeedArea">
          { activeFriendChatData 
            ? <FriendChat friendChatData={activeFriendChatData}
              friendProfilePicture={friendList.find(friend => friend.username === activeFriendChatData.friend).image_name}
              messageBuffer={friendMessageBuffer[activeFriendChatData.friend]}
              captureFriendMessageInput={captureFriendMessageInput}
              submitMessage={submitFriendChatMessage}
              checkForSubmitKey={checkForSubmitKey}/> 
            : null}
        </FeedArea>
      </Home>
    );
  };

  return ( 
    <>
      {!user ? userForm() : homeElements()}
    </>
  );
}

export default App;

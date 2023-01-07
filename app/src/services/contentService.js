import axios from 'axios';

const baseUrl = 'api/app';

let token = null;

const setToken = (newToken) => {
    token = `bearer ${newToken}`;
};

const clearToken = () => token = null;


const getConfig = () => {
    return {
        headers: {
            Authorization: token
        }
    };
};

//  React makes a call to this contentService.getFriendsList({ user_id: user.id });
//  getFriendsList makes post request to server at /api/app/friends-list with Auth header and user id object
//  server Express router for /api/app/friends-list handles the request, calls MySQL stored procedure 'call getFriends(user_id)' and returns content back here
//  contentService returns content back to React app. 
//  React app makes components out of the retrieved friends list

const getFriendsList = async () => {
    const response = await axios.post(`${baseUrl}/friends-list`, undefined, getConfig());
    return response.data;
};

const getChatThread = async (friendId) => {
    const response = await axios.post(`${baseUrl}/chat-thread`, {friendId: friendId}, getConfig());
    return response.data;
};

const submitChatMessage = async (messageData) => {
    const response = await axios.post(`${baseUrl}/create-new-message`, messageData, getConfig());
    return response.data;
};

const contentService = {
    setToken,
    clearToken,
    getFriendsList,
    getChatThread,
    submitChatMessage
};

export default contentService;
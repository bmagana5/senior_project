const jsonwebtoken = require('jsonwebtoken');
const config = require('../utils/config');

const getDecodedToken = (request) => {
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return jsonwebtoken.verify(authorization.substring(7), config.SECRET);
    }
    return null;
};

module.exports = (promisePool) => {
    const appRouter = require('express').Router();

    appRouter.post('/friends-list', async (request, response, next) => {
        try {
            const tokenDecoded = getDecodedToken(request);

            if (!(tokenDecoded && tokenDecoded.id)) {
                return response.status(401).json({
                    error: 'Token is missing or invalid'
                });
            }
            const [result, fields] = await promisePool.execute('call getFriends(?)', [tokenDecoded.id])

            // prepare each image name so that image can be fetched by the front end
            let friends = [];
            result[0].forEach(friend => {
                friends.push({
                    ...friend,
                    image_name: friend.image_name.replace('img', `http://${request.get('host')}/images`), 
                });
            })
            return response.json(friends);
        } catch (error) {
            next(error);
        }
    });

    // get chat thread between current user and their friend using ids
    // VALIDATE & SANITIZE THE BODY's friendId!!!
    appRouter.post('/chat-thread', async (request, response, next) => {
        try {
            const tokenDecoded = getDecodedToken(request);
            if (!(tokenDecoded && tokenDecoded.id)) {
                return response.status(401).json({
                    error: 'Token is missing or invalid'
                });
            }

            const [chatThreadResult, chatThreadFields] = await promisePool.execute('call getChatThread(?, ?)', [tokenDecoded.id, request.body.friendId]);

            let chatResponse = { 
                id: chatThreadResult[0][0].chatthread_id,
                name: chatThreadResult[0][0].chatthread_name,
            };

            const [messagesResult, messagesFields] = await promisePool.execute('call getChatMessages(?)', [chatResponse.id]);
            
            chatResponse.messages = messagesResult[0].map(message => {
                return {
                    ...message, 
                    image_name: message.image_name.replace('img', `http://${request.get('host')}/images`)
                }
            });
            
            // console.log(chatResponse);
            return response.json(chatResponse);
        } catch (error) {
            next(error);
        }
    });

    appRouter.post('/create-new-message', async (request, response, next) => {
        try {
            const tokenDecoded = getDecodedToken(request);
            if (!(tokenDecoded && tokenDecoded.id)) {
                return response.status(401).json({
                    error: 'Token is missing or invalid'
                });
            }

            const [insertMessageResult] = await promisePool.execute('insert into message (message_owner_id, chatthread_id, message_body) values (?, ?, ?)', [tokenDecoded.id, request.body.chatthread_id, request.body.message_body])
            const [newMessageResult, newMessageFields] = await promisePool.execute('call getChatMessage(?)', [insertMessageResult.insertId]);
            let newMessage = {
                ...newMessageResult[0][0], 
                image_name: newMessageResult[0][0].image_name.replace('img', `http://${request.get('host')}/images`)
            }
            
            // console.log(newMessageResult[0][0]);
            // console.log('from socket: ', request.body.socket_id);
            // console.log(request.io.in(`chat-room-${request.body.chatthread_id}`).adapter.nsp.sockets);

            // request obj has socket id of user who sends message
            // we'll check all other sockets other than the sending user's socket and send the new message.
            // the saved message will be returned to the sender via response object; all other logged in users will receive via socket
            for (let [key, socket] of request.io.in(`chat-room-${request.body.chatthread_id}`).adapter.nsp.sockets) {
                if (request.body.socket_id !== key) {
                    socket.emit('new-friend-chat-message', newMessage);
                }
            }
            // request.io.in(`chat-room-${request.body.chatthread_id}`).emit('new-friend-chat-message', newMessage);
            return response.json(newMessage);
        } catch (error) {
            next(error);
        }
    });

    return appRouter;
}
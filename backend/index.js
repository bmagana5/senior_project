// const app = require('./app');
const app = require('express')();
const http = require('http');
const { Server } = require('socket.io');
const config = require('./utils/config');

// const server = http.createServer(app);
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

app.use((request, response, next) => {
    request.io = io;
    return next();
});

app.use(require('./app'));

// when a connection is detected, assign event handlers
io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('join-chat-room', (chatthread_id, username) => {
        console.log(`'${username}' joined room 'chat-room-${chatthread_id}'`)
        socket.join(`chat-room-${chatthread_id}`);
    });
});

// console.log(io);

server.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
});
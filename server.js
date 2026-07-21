import { Server } from "socket.io";

import express from 'express';
import { createServer } from 'node:http';

const app = express();

const server = createServer(app);

// Create a new instance of Socket.IO and attach it to the HTTP server
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

const ROOM = 'group';

// Listen for incoming connections from clients
io.on('connection', (socket) => {
  console.log('a user connected', socket.id);



  // Listen for a "joinRoom" event from the client. Created a group chat room for the user to join. The userName is passed from the client when the event is emitted.
  socket.on('joinRoom', async(userName) => {
    console.log(`${userName} joined the room.`);

    await socket.join(ROOM);

    // send to all( It will notify the user who join the group)
    // io.to(ROOM).emit('roomNotice', userName);


    //broadcast ( To notify that any user join the group)
    socket.to(ROOM).emit('roomNotice', userName)
  });

  socket.on('chatMessage', (msg) => {
    socket.to(ROOM).emit('chatMessage', msg);
  });


  socket.on('typing', (userName) => {
    socket.to(ROOM).emit('typing', userName);
  });


  socket.on('stopTyping', (userName) => {
    socket.to(ROOM).emit('stopTyping', userName);
  })

});

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(4600, () => {
  console.log('server running at http://localhost:4600');
});
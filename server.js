const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const db = require('./database');
const routes = require('./routes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());
app.use('/api', routes);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('sendMessage', (message) => {
    const { senderId, recipientId, content } = message;
    db.run('INSERT INTO messages (senderId, recipientId, content) VALUES (?, ?, ?)', [senderId, recipientId, content], function(err) {
      if (err) {
        console.error('Failed to insert message');
        return;
      }
      io.emit('newMessage', { messageId: this.lastID, senderId, recipientId, content });
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

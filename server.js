const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');
const routes = require('./routes');
const { router: sessionsRouter, activeUsers, getIp } = require('./sessions');
const importRouter = require('./import');
const intervRouter = require('./intervenant');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "https://stallion-rh-online.web.app/", // Remplacez par l'origine de votre application React
    methods: ["GET", "POST"]
  }
});

app.use(cors()); 
app.use(bodyParser.json());
app.use('/api', routes);
app.use('/sessions', sessionsRouter);
app.use('/import', importRouter);
app.use('/intervenant', intervRouter);

io.on('connection', (socket) => {
  // console.log('Nouveau client !');

  // Ajouter l'utilisateur à la liste des actifs
  socket.on('login', (username) => {
    const now = new Date();
    const formattedDate = now.toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const ip = getIp(socket);

    activeUsers.push({
      datetime: formattedDate,
      name: username,
      socketId: socket.id,
      ip: ip
    });

    // console.log(`User ${username} connected with socket id ${socket.id}`);
  });

  // Supprimer l'utilisateur de la liste des actifs lors de la déconnexion
  socket.on('disconnect', () => {
    const userIndex = activeUsers.findIndex(user => user.socketId === socket.id);
    if (userIndex !== -1) {
      // console.log(`User ${activeUsers[userIndex].name} déconnecté`);
      activeUsers.splice(userIndex, 1);
    }
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Serveur sur le port : ${PORT}`));

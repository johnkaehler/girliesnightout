const { Server } = require('socket.io');
const http = require('http');

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3002"],
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["*"]
  },
  transports: ['websocket', 'polling']
});

const gameState = {
  players: [],
  customSquares: []
};

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('joinGame', (player) => {
    if (gameState.players.length >= 4) {
      socket.emit('error', 'Game is full');
      return;
    }

    gameState.players.push(player);
    io.emit('gameState', gameState);
    console.log(`${player.name} joined the game`);
  });

  socket.on('updateBoard', (updatedPlayer) => {
    const playerIndex = gameState.players.findIndex(p => p.id === updatedPlayer.id);
    if (playerIndex !== -1) {
      gameState.players[playerIndex] = updatedPlayer;
      io.emit('gameState', gameState);
    }
  });

  socket.on('addCustomSquare', (square) => {
    gameState.customSquares.push(square);
    io.emit('gameState', gameState);
    console.log(`New custom square added: ${square.text}`);
  });

  socket.on('disconnect', () => {
    const playerIndex = gameState.players.findIndex(p => p.id === socket.id);
    if (playerIndex !== -1) {
      gameState.players.splice(playerIndex, 1);
      io.emit('gameState', gameState);
    }
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});

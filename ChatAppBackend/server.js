require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userroutes.js');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const { DB_USER, DB_PASS} = process.env;

// DB Connection
const main = () => {
  // return mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@localhost:27017/chatapp`)
  return mongoose.connect(`mongodb://localhost:27017/chatapp`);
};

main()
  .then(() => console.log('Database is connected'))
  .catch((err) => console.error('Error connecting to the database:', err));

// API routes
app.use('/api/users', userRoutes);

//chats k liye
io.on('connection', (socket) => {
  // console.log('User connected');

  socket.on('chat message', (msg) => {
    console.log(`Received: ${msg}`);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    // console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

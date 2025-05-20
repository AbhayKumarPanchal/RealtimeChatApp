const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
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

const PORT = 8080;

// DB Connection
const main = () => {
  // return mongoose.connect('mongodb://localhost:27017/chatapp');
  return mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@localhost:27017/chatapp`)
};

main()
  .then(() => {
    console.log('Database is connected');
  })
  .catch((err) => {
    console.log(`Error connecting to the database: ${err}`);
  });

  
  app.post('/register', async(req,res)=>{

    const { name, email,  password } = req.body;
    
    const newUser = new User({
      name,
      email,
      password
    });    
    await newUser.save();    
    res.send(newUser);
  })
  
  app.post('/login',async (req,res)=>{
    const { name, password } = req.body;
    const fetchedUser = await User.findOne({name: name, password: password})
    console.log(fetchedUser);
    if(!fetchedUser){
      res.send('name or password is wrong!')
    }
    res.send(fetchedUser)
  })




//chats k liye

io.on('connection', (socket) =>{
    // console.log(`connection stablished`)
    socket.on('chat message', (msg)=>{
        console.log(`got a msg:- ${msg}`)
        io.emit('chat message', msg)
    })


    socket.on('disconnect', ()=>{
        console.log('disconnected')
    })
})


server.listen(PORT, () =>{
    console.log(`Server alive at ${PORT}`);
})
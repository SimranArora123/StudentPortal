require('dotenv').config();
const express = require('express');
const app =express();
const ejs= require("ejs");
const request = require("request");
const server = require("http").Server(app);
const { v4: uuidv4 } = require("uuid");
const io = require("socket.io")(server);
const path = require('path');
const cors = require('cors');
// Peer

const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});




const connectDB = require('./config/db');
connectDB();

app.use(express.json());

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Routes 
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));

app.use('/api/files', require('./routes/files'));


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({
  extended:true
}));
app.use(express.json())
app.use("/peerjs", peerServer);


app.get('/' , function(req, res){
  res.sendFile(__dirname + "/one.html");
});



app.get("/notes", function(req,res){
  res.render("notes");
})

app.get("/filesharing", function(req,res){
  res.render("filesharing");
})
app.get("/one", function(req,res){
  res.render("one");
})

app.get("/room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);

    socket.on("message", (message) => {
      io.to(roomId).emit("createMessage", message);
    });
  });
});

server.listen(process.env.PORT || 3000);
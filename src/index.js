const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const router = require('./routes');

mongoose.connect('mongodb+srv://dell:value123@cluster0.vuve5.mongodb.net/db?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});


const app = express();
const server = http.Server(app);
const io = socketIo(server);

app.use((req, res, next) => {
    req.io = io;
    return next();
})

app.use(express.json());
app.use(cors());
app.use(router);

server.listen(process.env.PORT || 3001, () => console.log('Run server'));
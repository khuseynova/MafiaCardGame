const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origins: ['http://localhost:8080']
    }
});

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    // socket.on('my message', (msg) => {
    //     io.emit('my broadcast', `server: ${msg}`);
    // });
});

app.get('/', (req, res) => {
    res.send('<h1>Hey Socket.io</h1>');
});

app.post('/room', (req, res) => {
    res.redirect('/');
    req.body.room.admin_id = parseInt(req.body.room.admin_id);
    req.body.room.number_of_players = parseInt(req.body.room.number_of_players);
    req.body.room.isPrivate = parseInt(req.body.room.isPrivate);
    req.body.room.id = parseInt(req.body.room.id);
    io.emit('room-created', req.body.room);
})

app.post('/room-joined', (req, res) => {
    res.redirect('/');
    if (req.body.user) {
        req.body.user.id = parseInt(req.body.user.id);
        req.body.user.room_id = parseInt(req.body.user.room_id);
        req.body.user.wins = parseInt(req.body.user.wins);
        req.body.user.loses = parseInt(req.body.user.loses);
        io.emit('room-joined', req.body.user);
    } else if (req.body.guest) {
        req.body.guest.id = parseInt(req.body.guest.id);
        req.body.guest.room_id = parseInt(req.body.guest.room_id);
        io.emit('room-joined', req.body.guest);
    }
})

app.post('/start-game', (req, res) => {
    res.redirect('/');
    req.body.players.forEach(player => {
        player.id = parseInt(player.id);
        player.room_id = parseInt(player.room_id);
        player.character_id = parseInt(player.character_id);
    });
    req.body.game.id = parseInt(req.body.game.id);
    req.body.game.admin_id = parseInt(req.body.game.admin_id);
    req.body.game.number_of_players = parseInt(req.body.game.number_of_players);
    req.body.game.isPrivate = parseInt(req.body.game.isPrivate);
    req.body.game.hasStarted = parseInt(req.body.game.hasStarted);
    io.emit('game-started');
    delay(500).then(() => {
        io.emit('after-two-seconds');
        io.emit('assign-roles', req.body.players);
        io.emit('open-chatting');
    });
})

app.post('/message-posted', (req, res) => {
    res.redirect('/');
    req.body.message.room_id = parseInt(req.body.message.room_id);
    req.body.message.id = parseInt(req.body.message.id);
    if (req.body.message.user_id) 
        req.body.message.user_id = parseInt(req.body.message.user_id);
    else 
        req.body.message.guest_id = parseInt(req.body.message.guest_id);
    io.emit('message-print', req.body);
})

http.listen(3000, () => {
    console.log('listeninghttp on *:3000');
});

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
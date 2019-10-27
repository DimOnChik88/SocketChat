const express = require('express');
const expHbs = require('express-handlebars');
const path = require('path');

const app = express();

const http = require('http').createServer(app);

const io = require('socket.io')(http);
const dataBase = require('./dataBase').getInstance();
dataBase.setModels();

const {createUser, getUser, recordMessage} = require('./middleware');


io.on('connection', socket => {
    console.log(30);


    socket.on('registration', data => {
        createUser(data);
        socket.name = data.name;
        socket.roomID = data.roomID;
        io.emit('authMessage', {name:socket.name});
    });

    socket.on('login', data => {
        const name = data.name;
        const password = data.password;
        const user = getUser({name, password});

        if (user) {
            socket.name = data.name;
            socket.roomID = data.roomID;
            io.emit('authMessage', {name:socket.name});
        }
        else  socket.error('YOU MUST LOGIN OR REGISTER');
    });

    socket.on('message', message => {
        let name = socket.name;
        let roomID = socket.roomID;
        console.log(name);
        if(!name ) {
            socket.emit('respMessage', {
                name: 'WARNING',
                message: 'YOU MUST LOGIN OR REGISTER'
            });
        }
         else {
             io.emit('respMessage', {name, message});
             recordMessage({message,name , roomID});

         }
    });

    socket.on('joinRoom', () => {
        socket.roomID = 1;
        socket.join(socket.roomID);
        console.log('Joined to room');
    });

    socket.on('msg', message => {
        let roomID = socket.roomID;
        let name = socket.name;
        if(roomID === 1) {
            io.to(roomID.toString()).emit('respMessage', {name, message});
            recordMessage({message,name , roomID});
       }
        else {
            socket.emit('respMessage', {name, message: 'You are not in room. Just JOIN it'})
        }
    });


    socket.on('disconnect', () => {
        let chatName = socket.name;
        socket.broadcast.emit('user_disc', {name:chatName});
        console.log(chatName, 'DISCONNECTED')
    });
});


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'static')));

app.engine('.hbs', expHbs({
    extname:'.hbs',
    defaultLayout: null
}))

app.set('view engine','.hbs');
app.set('views', path.join(__dirname,'static'));

app.get('/', (req,res) => {
    res.render('main');
});

app.all('*', (req,res) => {
    res.json('404');

});

http.listen(3000, () =>{
    console.log('You are listening 3000')
});
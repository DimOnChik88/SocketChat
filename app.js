const express = require('express');
const expHbs = require('express-handlebars');
const path = require('path');

const app = express();

const http = require('http').createServer(app);

const io = require('socket.io')(http);
const dataBase = require('./dataBase').getInstance();
dataBase.setModels();

const {createUser, getUser} = require('./middleware');

io.on('connection', socket => {
    console.log(30);

    socket.on('registration', data => {
        createUser(data);
        socket.name = data.name;
        socket.roomID = data.roomID;

    });

    socket.on('login', data => {
        let jsn = JSON.stringify(data);
        console.log(jsn);
        const user = getUser(jsn);
        console.log(user);
        socket.name = user.name;
        socket.roomID = data.roomID;

    });

    socket.on('message', data => {
        console.log(data);
        let name = socket.name;
        console.log(name);
        if(name === undefined ) {
            socket.emit('respMessage', {
                name: 'WARNING',
                data: 'YOU MUST LOGIN OR REGISTER'
            });
        }
         else {
             io.emit('respMessage', {name, data});
         }
    });

    socket.on('joinRoom', data => {
        console.log(data);
        socket.join(data);
    });

    socket.on('msg', data => {
        let someData = socket.rooms;
        Object.entries(someData).forEach(
            ([key, value]) => {
                if (value === '111') {
                    io.to('111').emit('msg_resp', {id: socket.id, data});

                }
            }
        );
    });


    socket.on('disconnect', () => {
        socket.broadcast.emit('user_disc', {id: socket.id})
        console.log(socket.id, 'DISCONNECTED')
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
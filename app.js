const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const UsPresenter = require('./presenter/us.presenter');
const UserPresenter = require('./presenter/user.presenter');
let bodyParser = require('body-parser')

const server = require('http').createServer(app);
const io = require('socket.io', { rememberTransport: false, transports: ['WebSocket', 'Flash Socket', 'AJAX long-polling'] })(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });

server.listen(port, () => {
    console.log(`Server listen on ${port} ...`);
});
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/us/:id', async (req, res) => {
    try {
        let usConfig = await UsPresenter.getUsInfor(req.params.id);

        return res.status(200).json({status: true, data: usConfig, message: 'success'});

    } catch (e) {
        return res.status(200).json({status: true, message: e.message});
    }
});

app.post('/insertUs', async (req, res) => {
    try {
        let usConfig = await UsPresenter.insertUs(req.body);

        return res.status(200).json({status: true, data: usConfig, message: 'success'});

    } catch (e) {
        return res.status(200).json({status: false, message: e.message});
    }
});

app.post('/update', async (req, res) => {
    try {
        let process = await UsPresenter.updateUs(req.body);

        return res.status(200).json({status: true, message: 'success'});
    } catch (e) {
        return res.status(200).json({status: false, message: e.message});
    }
});
app.post('/register', async (req, res) => {
    try {
        let process = await UserPresenter.register(req.body);
        return res.status(200).json({status: true, message: 'success', data: process});
    } catch (e) {
        return res.status(200).json({status: false, message: e.message});
    }
});

app.post('/login', async (req, res) => {
    try {
        let process = await UserPresenter.login(req.body);
        return res.status(200).json({status: true, message: 'success', data: process});
    } catch (e) {
        return res.status(200).json({status: false, message: e.message});
    }
});

io.on('connection', (socket) => {
    console.log('id ',socket.id);
    socket.on('send-message', (data) => {
        socket.broadcast.emit('recive-message', JSON.stringify(data));

    });
    socket.on('disconnected', () => {
        socket.emit('disconnected', {name: socket.name});
    });
});
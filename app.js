const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const UsPresenter = require('./presenter/us.presenter');
let bodyParser = require('body-parser')
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

app.listen(port, () => {
    console.log(`Server listen on ${port} ...`);
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
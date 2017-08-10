'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');

app.use(express.static('static'));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

const upload = multer({dest: './uploads/'});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

//Routing
app.get('/', function (req, res) {
    res.sendFile('./static/index.html');
});

app.get('/categories', function (req, res) {
    const categories = [
        {name: 'category1'},
        {name: 'category2'}
    ];

    res.send(categories);
});

app.post('/questions/add', upload.single('file'), function (req, res) {
    console.log(req.body);
    console.log(req.file);
    res.send({name: req.body.name});
});
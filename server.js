'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const Jimp = require("jimp");

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
    const cropX = req.body.cropX;
    const cropY = req.body.cropY;
    const cropW = req.body.cropW;
    const cropH = req.body.cropH;
    const file = req.file;
    const srcPath = file.destination + file.filename;

    console.log(req.body);

    Jimp.read(srcPath, function (err, lenna) {
        if (err) throw err;

        lenna.crop(parseInt(cropX), parseInt(cropY), parseInt(cropW), parseInt(cropH))
            .quality(60)                 // set JPEG quality
            .write("./uploads/lena-small-bw1.jpg"); // save
    });

    res.send({name: req.body.name});
});
'use strict';

const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');
const Jimp = require("jimp");

const models = require('./database/models');
const Question = models.Question;
const QuestionImage = models.QuestionImage;
const QuestionAnswer = models.QuestionAnswer;

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
    const body = req.body;
    const cropX = body.cropX;
    const cropY = body.cropY;
    const cropW = body.cropW;
    const cropH = body.cropH;


    /** Load file */
    const file = req.file;
    // const srcPath = file.destination + file.filename;
    const dir = './static/uploads';
    const originalname = file.originalname;
    const extension = originalname.split('.').slice(-1).pop();
    const oldPath = file.destination + '/' + file.filename;
    const date = new Date();
    const seconds = date.getTime();
    const originName = seconds + '_origin.' + extension;
    const thumbName = seconds + '_thumb.' + extension;

    //Create directory
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    //Move and rename origin file
    const source = fs.createReadStream(oldPath);
    const destination = fs.createWriteStream(dir + '/' + originName);

    source.pipe(destination, {end: false});
    source.on("end", function () {
        fs.unlinkSync(oldPath);
    });

    //Crop, set quality and save
    Jimp.read(oldPath, function (err, image) {
        if (err) throw err;

        image.crop(parseInt(cropX), parseInt(cropY), parseInt(cropW), parseInt(cropH))
            .quality(60)
            .write(dir + '/' + thumbName);
    });

    //Save data to database
    Question.create({
        question: body.question,
        category: body.category,
        answers: [
            {answer: body.answer1, isCorrect: true},
            {answer: body.answer2, isCorrect: false},
            {answer: body.answer3, isCorrect: false},
            {answer: body.answer4, isCorrect: false}
        ],
        image: {
            origin: originName,
            thumb: thumbName,
            x: cropX,
            y: cropY,
            width: cropW,
            height: cropH
        }
    }, {
        include: [
            {model: QuestionAnswer, as: 'answers'},
            {model: QuestionImage, as: 'image'}
        ]
    }).then(function (question) {
        console.log('success');
    }).catch(function (error) {
        console.log(error);
    });

    res.send({success: true});
});
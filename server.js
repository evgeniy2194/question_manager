'use strict';

let http = require('http');
let https = require("https");
let express = require('express');
let app = express();
let fs = require('fs');
let bodyParser = require('body-parser');
let multer = require('multer');
let Jimp = require("jimp");

let models = require('./database/models');
let Question = models.Question;
let QuestionImage = models.QuestionImage;
let QuestionAnswer = models.QuestionAnswer;

app.use(express.static('static'));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

let upload = multer({dest: './uploads/'});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

//Routing
app.get('/', function (req, res) {
    res.sendFile('./static/index.html');
});

app.get('/categories', function (req, res) {
    let categories = [
        {name: 'category1'},
        {name: 'category2'}
    ];

    res.send(categories);
});

app.get('/search', function (req, res) {
    let question = req.query.question;
    let answer = req.query.answer;

    Question.findAll({
        attributes: ['id'],
        limit: 100,
        where: question ? {question: {$like: '%' + question + '%'}} : {},
        include: [{
            model: QuestionAnswer,
            as: 'answers',
            where: answer ? {answer: {$like: '%' + answer + '%'}} : {}
        }]
    }).then(response => {
        return Question.findAll({
            where: {id: {$in: response.map(row => row.get('id'))}},
            include: [
                {model: QuestionAnswer, as: 'answers'},
                {model: QuestionImage, as: 'image'}
            ]
        });
    }).then(response => {
        res.send(response.map(row => row.get({plain: true})));
    }).catch(error => {
        console.log(error);
        res.send({});
    });
});

app.post('/questions/add', upload.single('file'), function (req, res) {
    let body = req.body;

    /** Crop settings **/
    let cropX = body.cropX;
    let cropY = body.cropY;
    let cropW = body.cropW;
    let cropH = body.cropH;

    /** Load and save image **/
    let imageSrc = body.imageSrc;
    let dir = './static/uploads';
    let date = new Date();
    let seconds = date.getTime();

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    let originName = '';
    let thumbName = '';

    Jimp.read(imageSrc).then(function (image) {
        let extension = image.getExtension();

        originName = seconds + '_origin.' + extension;
        thumbName = seconds + '_thumb.' + extension;

        let writePromise = image.write(dir + '/' + originName);
        let cropPromise = image.crop(parseInt(cropX), parseInt(cropY), parseInt(cropW), parseInt(cropH))
            .quality(60)
            .write(dir + '/' + thumbName);

        return Promise.all([writePromise, cropPromise]);
    }).then(function (data) {
        // Save data to database
        return Question.create({
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
        });
    }).then(function () {
        res.send({success: true});
    }).catch(function (err) {
        console.log(err);
        res.send({success: false});
    });
});
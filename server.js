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
        {id: 1, name: 'category1'},
        {id: 2, name: 'category2'}
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
        res.send({});
    });
});

app.post('/questions/add', upload.single('file'), function (req, res) {
    let body = req.body;

    /** Crop settings **/
    let cropX = parseInt(body.cropX);
    let cropY = parseInt(body.cropY);
    let cropW = parseInt(body.cropW);
    let cropH = parseInt(body.cropH);

    /** Load and save image **/
    let imageSrc = body.imageSrc;
    let dir = './static/uploads';
    let date = new Date();
    let seconds = date.getTime();

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    let id = body.id;
    let questionPromise = Promise.resolve(null);
    let imagePromise = Jimp.read(imageSrc);

    if (id) {
        questionPromise = Question.find({
            where: {
                id: id
            },
            include: [{model: QuestionAnswer, as: 'answers'}, {model: QuestionImage, as: 'image'}]
        });
    } else {
        questionPromise = Question.create({
            question: body.question,
            category: body.category,
            answers: [
                {answer: body.answer1, isCorrect: true},
                {answer: body.answer2, isCorrect: false},
                {answer: body.answer3, isCorrect: false},
                {answer: body.answer4, isCorrect: false}
            ]
        }, {
            include: [{model: QuestionAnswer, as: 'answers'}, {model: QuestionImage, as: 'image'}]
        });
    }

    Promise.all([questionPromise, imagePromise]).then(function (data) {
        let q = data[0],
            image = data[1];

        /**
         * is has image?
         * is image change?
         * is crop position change?
         */
        let newImageName = imageSrc.split('/').splice(-1).pop();
        let oldImage = q && q.image ? q.image.origin : null;
        let promises = [];
        let isNewImage = true;

        if (q.image) {
            isNewImage = false;
        }

        let questionImage = isNewImage ? QuestionImage.build({}) : q.image;

        if (image) {
            let extension = image.getExtension();
            let originName = seconds + '.' + extension;
            let thumbName = seconds + '_thumb.' + extension;

            if (newImageName !== oldImage) {
                questionImage.origin = originName;
                promises.push(image.write(dir + '/' + originName));
            } else {
                questionImage.origin = q.image.origin;
            }

            if (!q.image || (q.image.x !== cropX || q.image.y !== cropY || q.image.width !== cropW || q.image.height !== cropH )) {
                questionImage.thumb = thumbName;
                questionImage.x = cropX;
                questionImage.y = cropY;
                questionImage.width = cropW;
                questionImage.height = cropH;
            }

            promises.push(image.crop(cropX, cropY, cropW, cropH).quality(60).write(dir + '/' + thumbName));
            promises.push(isNewImage ? q.setImage(questionImage) : questionImage.save());
        }

        promises.push(q.save());

        return Promise.all(promises);
    }).then(function () {
        // res.send({success: true});
        res.send({success: false});
    }).catch(function (err) {
        console.log(err);
        res.send({success: false});
    });
});
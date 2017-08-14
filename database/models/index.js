const Question = require('./question');
const QuestionAnswer = require('./questionAnswer');
const QuestionImage = require('./questionImage');

Question.hasMany(QuestionAnswer, {as: 'answers'});
Question.hasOne(QuestionImage, {as: 'image'});
// QuestionAnswer.belongsTo(Question, {as: 'question'});

module.exports = {
    Question: Question,
    QuestionAnswer: QuestionAnswer,
    QuestionImage: QuestionImage
};
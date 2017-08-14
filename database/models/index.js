const Question = require('./question');
const QuestionAnswer = require('./questionAnswer');
const QuestionImage = require('./questionImage');

Question.hasMany(QuestionAnswer, {as: 'answers'});
Question.belongsTo(QuestionImage, {as: 'image'});
QuestionAnswer.belongsTo(Question, {as: 'question'});
QuestionImage.hasOne(Question, {as: 'question'});

module.exports = {
    Question: Question,
    QuestionAnswer: QuestionAnswer,
    QuestionImage: QuestionImage
};
const Question = require('./question');
const QuestionAnswer = require('./questionAnswer');
const QuestionImage = require('./questionImage');

Question.hasMany(QuestionAnswer, {as: 'answers', foreignKey: 'questionId'});
Question.hasOne(QuestionImage, {as: 'image', foreignKey: 'questionId'});
QuestionAnswer.belongsTo(Question, {as: 'question'});
QuestionImage.belongsTo(Question, {as: 'question'});

module.exports = {
    Question: Question,
    QuestionAnswer: QuestionAnswer,
    QuestionImage: QuestionImage
};
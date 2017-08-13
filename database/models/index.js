import Question from './question';
import QuestionAnswer from './questionAnswer';
import QuestionImage from './questionImage';

Question.hasMany(QuestionAnswer, {as: 'answers'});
Question.hasOne(QuestionImage, {as: 'image'});
QuestionAnswer.belongsTo(Question, {as: 'question'});

export {Question, QuestionAnswer, QuestionImage};
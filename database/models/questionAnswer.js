import Sequelize from 'sequelize';
import connect from '../connect';

const QuestionAnswer = connect.define('QuestionAnswer', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    questionId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    answer: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    isCorrect: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: false
});

export default QuestionAnswer;
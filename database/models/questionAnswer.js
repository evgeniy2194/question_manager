const Sequelize = require('sequelize');
const connect = require('../connect');

module.exports = connect.define('QuestionAnswer', {
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
const Sequelize = require('sequelize');
const connect = require('../connect');

module.exports = connect.define('QuestionImage', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    origin: {
        type: Sequelize.STRING,
        allowNull: false
    },
    thumb: {
        type: Sequelize.STRING,
        allowNull: false
    },
    x: Sequelize.INTEGER,
    y: Sequelize.INTEGER,
    width: Sequelize.INTEGER,
    height: Sequelize.INTEGER
}, {
    timestamps: false
});
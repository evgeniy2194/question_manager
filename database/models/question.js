const Sequelize = require('sequelize');
const connect = require('../connect');

module.exports = connect.define('Question', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    question: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    imageId: {
        type: Sequelize.INTEGER.UNSIGNED
    }
}, {
    timestamps: false
});
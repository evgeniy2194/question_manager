import Sequelize from 'sequelize';
import connect from '../connect';

const Question = connect.define('Question', {
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

export default Question;
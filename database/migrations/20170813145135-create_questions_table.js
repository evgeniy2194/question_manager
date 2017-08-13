'use strict';

const questions = 'Questions';
const questionImages = 'QuestionImages';
const questionAnswers = 'QuestionAnswers';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(questionImages, {
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
            charset: 'UTF8',
        }).then(() => {
            return queryInterface.createTable(questions, {
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
                    type: Sequelize.INTEGER.UNSIGNED,
                    references: {
                        model: questionImages,
                        key: 'id'
                    },
                }
            }, {
                charset: 'UTF8',
            });
        }).then(() => {
            return queryInterface.createTable(questionAnswers, {
                id: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    primaryKey: true,
                    autoIncrement: true
                },
                questionId: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    allowNull: false,
                    references: {
                        model: questions,
                        key: 'id'
                    },
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
                charset: 'UTF8',
            });
        }).then(() => {
            return queryInterface.addIndex(questionAnswers, ['questionId']);
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable(questionImages).then(() => {
            return queryInterface.dropTable(questionAnswers).then(() => {
                return queryInterface.dropTable(questions);
            });
        });
    }
}
;
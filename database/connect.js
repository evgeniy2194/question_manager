import Sequelize from 'sequelize';

const connect = new Sequelize('question', 'root', 'aq1sw2de3', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    define: {
        timestamps: false
    }
});

connect.authenticate().then(() => {
    console.log('Connect to MySql');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

export default connect;
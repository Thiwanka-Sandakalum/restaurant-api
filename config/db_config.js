const { Sequelize } = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: `./database/${process.env.NODE_ENV}.DB`,
    logging: true,
});

module.exports = sequelize;

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite', // You can change this to your desired database dialect (e.g., 'mysql', 'postgres')
    storage: './database/dev.sqlite', // Adjust the storage path as needed
    logging: true, // Set to true to see SQL queries in the console
});

module.exports = sequelize;

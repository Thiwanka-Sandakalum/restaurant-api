// db_config.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'mssql',
  host: process.env.AZURE_SQL_SERVER,
  database: process.env.AZURE_SQL_DATABASE,
  username: process.env.AZURE_SQL_USERNAME,
  password: process.env.AZURE_SQL_PASSWORD,
  port: process.env.AZURE_SQL_PORT,
  dialectOptions: {
    options: {
      encrypt: true,
      trustServerCertificate: false,
    },
  },
});


sequelize.sync()
  .then(() => {
    console.log('Database and tables synchronized!');
  })
  .catch((err) => {
    console.error('Error synchronizing database:', err.message);
  });

module.exports = sequelize;

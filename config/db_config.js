// db_config.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'mssql',
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
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

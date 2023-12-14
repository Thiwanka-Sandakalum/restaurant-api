const { Sequelize } = require('sequelize');
require('dotenv').config();
const path = require('path');
const logger = require('../logger/index');

let sequelize;

if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize({
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
    logging: msg => logger.debug(msg)
  });
} else if (process.env.NODE_ENV === 'development') {
  const dir_db = path.join('database', 'dev.sqlite');
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dir_db,
    logging: msg => logger.debug(msg)
  });
}


sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
})

module.exports = { sequelize };

const mysql = require('mysql2');
const Sequelize = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DILECT,
        logging: false,
        pool: {
            max: Number(process.env.DB_MAX_CONNECTION),     
            min: Number(process.env.DB_MIN_CONNECTION),     
            idle: Number(process.env.DB_IDEAL_CONNECTION),
            acquire: Number(process.env.DB_ACQUIRE),

          }
    }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

module.exports = sequelize;
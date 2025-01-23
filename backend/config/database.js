const { Sequelize } = require("sequelize");
require("dotenv").config();

//DB connection
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // Ensure the correct port is passed here
    dialect: "mysql",
  }
);

module.exports = sequelize;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Link = sequelize.define("Link", {
  url: { type: DataTypes.STRING, allowNull: false },
  domain: { type: DataTypes.STRING, allowNull: false },
  published_at: { type: DataTypes.DATE, allowNull: true },
  language: { type: DataTypes.STRING(10), allowNull: true },
});

module.exports = Link;

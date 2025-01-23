const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Document = sequelize.define('Document', {
  file_name: { type: DataTypes.STRING, allowNull: false },
  file_type: { type: DataTypes.ENUM('word', 'ppt'), allowNull: false },
});

module.exports = Document;

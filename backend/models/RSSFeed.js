const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RSSFeed = sequelize.define('RSSFeed', {
  feed_url: { type: DataTypes.STRING, allowNull: false },
  last_fetched: { type: DataTypes.DATE, allowNull: true },
});

module.exports = RSSFeed;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const RSSFeed = require("./RSSFeed");

const articles = sequelize.define("articles", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  pub_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  content_snippet: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

// Establishing associations
articles.belongsTo(RSSFeed, { foreignKey: "rssFeedId", onDelete: "CASCADE" });
RSSFeed.hasMany(articles, { foreignKey: "rssFeedId" });

module.exports = articles;

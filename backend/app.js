const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/database");
const app = express();
const PORT = process.env.PORT || 3000;
const cron = require("node-cron");
const RSSFeed = require("./models/RSSFeed");
const { fetchRSSFeed } = require("./controllers/rssController");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully."))
  .catch((err) => {
    console.error("Connection error ====>", err);
  });

// Schedule RSS feed scraping every day at 8 AM
cron.schedule("0 8 * * *", async () => {
  try {
    const feeds = await RSSFeed.findAll();
    feeds.forEach((feed) => {
      fetchRSSFeed(feed.dataValues.feed_url);
    });
    console.log("Scheduled RSS feed scraping completed.");
  } catch (error) {
    console.error("Scheduled RSS scraping failed:", error);
  }
});

// Middleware
app.use(cors());
app.use(express.json()); // Modern Express body parser
app.use(bodyParser.json()); // Additional body parser

// Routes
const routes = require("./routes");
app.use("/api", routes);

// Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

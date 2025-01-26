const { parseRSSFeed } = require("../utils/rssParser");
const RSSFeed = require("../models/RSSFeed");
const RSSArticle = require("../models/RssArticle");

async function fetchRSSFeed(req, res) {
  const { feedUrl } = req.body;

  try {

    // Parse the RSS feed
    const { title: feedTitle, articles } = await parseRSSFeed(feedUrl);

    // Check if the feed URL already exists in the database
    let rssFeed = await RSSFeed.findOne({ where: { feed_url: feedUrl } });
    if (rssFeed) {
      // Update the existing feed entry
      rssFeed.last_fetched = new Date();
      await rssFeed.save();
    } else {
      // Create a new feed entry
      rssFeed = await RSSFeed.create({
        feed_url: feedUrl,
        last_fetched: new Date(),
      });
    }

    // Save or update articles
    for (const article of articles) {
      const { title, link, pubDate, contentSnippet } = article;

      // Check if the article already exists (you can use the link as a unique identifier)
      let existingArticle = await RSSArticle.findOne({ where: { link } });

      if (!existingArticle) {
        console.log("existingArticle Found =======>", existingArticle);
        // Create a new article if it doesn't exist
        await RSSArticle.create({
          title,
          link,
          pub_date: article.pubDate,
          content_snippet: article.contentSnippet,
          rssFeedId: rssFeed.id, // Associate the article with the feed
        });
      }
    }

    // Respond with parsed articles
    res.status(200).json({
      message: "RSS feed fetched successfully",
      feedTitle,
      articles,
    });
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    res.status(500).json({ error: "Failed to fetch RSS feed" });
  }
}

async function getRssFeeds(req, res) {
  try {
    // Fetch all RSS feeds along with their associated articles
    const rssFeeds = await RSSFeed.findAll({
      include: [
        {
          model: RSSArticle, // Include associated articles
          as: "articles", // Alias for articles
          attributes: ["title", "link", "pub_date", "content_snippet"], // Specify attributes you want from the articles
        },
      ],
    });

    // Respond with the list of RSS feeds and their articles
    res.status(200).json({
      message: "RSS feeds with articles fetched successfully",
      rssFeeds,
    });
  } catch (error) {
    console.error("Error fetching RSS feeds with articles:", error);
    res.status(500).json({ error: "Failed to fetch RSS feeds with articles" });
  }
}

module.exports = { fetchRSSFeed, getRssFeeds };

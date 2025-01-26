const RSSParser = require("rss-parser");
const parser = new RSSParser();

async function parseRSSFeed(feedUrl) {
  try {
    const feed = await parser.parseURL(feedUrl);

    // Map feed items to a simplified format
    const articles = feed.items.map((item) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      contentSnippet: item.contentSnippet,
    }));

    return { title: feed.title, articles };
  } catch (error) {
    console.error("Error parsing RSS feed:", error);
    throw new Error("Failed to parse RSS feed");
  }
}

module.exports = { parseRSSFeed };

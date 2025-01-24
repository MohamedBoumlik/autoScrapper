const { scrapeWebsiteLinks,extractContent } = require("../utils/scraper");
const Link = require("../models/Link");
const { URL } = require("url");

async function crawlWebsite(req, res) {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const navlinks = await scrapeWebsiteLinks(url);
    const links = await extractContent(navlinks);
    // const domain = new URL(url).hostname;
    // const savedLinks = await Promise.all(
    //   links.map((link) => Link.create({ url: link, domain }))
    // );
    res.status(200).json({ message: "Crawling complete", links: links });
  } catch (error) {
    console.error("Error crawling website:", error);
    res.status(500).json({ error: "Crawling failed" });
  }
}

module.exports = { crawlWebsite };

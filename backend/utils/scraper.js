const axios = require("axios");
const cheerio = require("cheerio");
const { URL } = require("url");

// Delay function to space out requests
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to extract specific content from HTML
async function extractSpecificContent(html, baseUrl) {
  const $ = cheerio.load(html);

  const extractedContent = {
    title: $("title").text(), // Extract page title
    headings: $("h1, h2, h3")
      .map((_, el) => $(el).text().trim())
      .get(), // Extract headings
    links: $("a")
      .map((_, el) => {
        const link = $(el).attr("href");
        if (link) {
          try {
            return new URL(link, baseUrl).toString(); // Convert relative to absolute URLs
          } catch {
            return null;
          }
        }
        return null;
      })
      .get()
      .filter(Boolean), // Remove invalid links
    // images: $("img")
    //   .map((_, el) => $(el).attr("src"))
    //   .get()
    //   .filter(Boolean) // Extract image sources
    //   .map((src) => new URL(src, baseUrl).toString()), // Convert relative image URLs to absolute
  };

  return extractedContent;
}

// Function to extract all links from the navigation menu
async function scrapeWebsiteLinks(url) {
  console.log(url);

  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
      },
    });
    const $ = cheerio.load(data);
    const baseUrl = new URL(url);

    // First, try to find links inside the <nav> tag
    let navlinks = $("header nav a")
      .map((_, element) => $(element).attr("href"))
      .get();

    // If no links are found in <nav>, fall back to <header>
    if (navlinks.length === 0) {
      console.log("No links found in <nav>. Checking <header>...");
      navlinks = $("header a")
        .map((_, element) => $(element).attr("href"))
        .get();
    }

    // Filter out empty or undefined links
    navlinks = navlinks.filter((link) => {
      if (!link) return false;

      try {
        const fullUrl = new URL(link, baseUrl);
        return fullUrl.hostname === baseUrl.hostname;
      } catch {
        return false;
      }
    });

    // Remove duplicates
    navlinks = navlinks.filter(
      (link, index, self) => self.indexOf(link) === index
    );

    console.log(`Scraped ${navlinks.length} links`);
    return navlinks.map((link) => new URL(link, baseUrl).toString()); // Return absolute URLs
  } catch (error) {
    console.error("Error scraping website:", error.message);
    return [];
  }
}

// Function to extract Content from the each page
async function extractContent(links) {
  const allExtractedContent = [];

  for (const link of links) {
    try {
      console.log(`Fetching HTML for: ${link}`);

      // Add a delay between requests to avoid triggering rate limits
      await delay(2000 + Math.random() * 2000); // Random delay between 2-4 seconds

      const { data: html } = await axios.get(link, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.5",
          "Accept-Encoding": "gzip, deflate",
        },
        timeout: 10000,
      });

      // Extract specific content using extractSpecificContent
      const extractedContent = await extractSpecificContent(html, link);
      allExtractedContent.push({ url: link, content: extractedContent });
    } catch (error) {
      console.error(`Failed to fetch HTML for ${link}:`, error.message);
    }
  }

  return allExtractedContent;
}

module.exports = { scrapeWebsiteLinks, extractContent };

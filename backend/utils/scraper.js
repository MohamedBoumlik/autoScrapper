const axios = require("axios");
const cheerio = require("cheerio");
const { URL } = require("url");

async function scrapeWebsite(url) {
  console.log(url);
  
  // try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const baseUrl = new URL(url);
    console.log(data);
    

    // const links = $("a")
    //   .map((_, element) => $(element).attr("href"))
    //   .get()
    //   .filter((link) => {
    //     // Filter out empty or undefined links
    //     if (!link) return false;

    //     try {
    //       // Convert relative URLs to absolute
    //       const fullUrl = new URL(link, baseUrl);

    //       // Keep only links from the same domain
    //       return fullUrl.hostname === baseUrl.hostname;
    //     } catch {
    //       return false;
    //     }
    //   })
    //   // Remove duplicates
    //   .filter((link, index, self) => self.indexOf(link) === index);

    // console.log(`Scraped ${links.length} links`);
    // return links;
  // } catch (error) {
  //   console.error("Error scraping website:", error.message);
  //   return [];
  // }
}

module.exports = { scrapeWebsite };

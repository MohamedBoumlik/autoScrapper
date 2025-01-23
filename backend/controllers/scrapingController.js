const puppeteer = require("puppeteer");
const { exec } = require('child_process');

const startScraping = async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    // Example: Extract page title
    const pageTitle = await page.title();
    const content = await page.evaluate(() => {
      return document.body.innerText; // Example: Extract all visible text
    });

    await browser.close();

    res.status(200).json({ title: pageTitle, content });
  } catch (error) {
    console.error("Error during scraping:", error);
    res.status(500).json({ message: "Scraping failed", error: error.message });
  }
};

const runPythonScript = (scriptPath, args = []) => {
  return new Promise((resolve, reject) => {
    const command = `python3 ${scriptPath} ${args.join(" ")}`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(`Error: ${stderr}`);
      }
      resolve(stdout);
    });
  });
};

const generateWordDoc = async (req, res) => {
  try {
    const content = ["Sample Title", "Sample Content"];
    const scriptPath = "./scripts/generators/word_generator.py";
    const output = await runPythonScript(scriptPath, content);

    res.status(200).json({ message: "Word document created", output });
  } catch (error) {
    res.status(500).json({ message: "Failed to create document", error });
  }
};

module.exports = {
  startScraping,
  generateWordDoc,
};

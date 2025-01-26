import React, { useState } from "react";
import axios from "axios";
import fileDownload from "js-file-download";

function ScrappingForm() {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [downloadError, setDownloadError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setResult(null);

    if (!websiteUrl.trim()) {
      setError("The website URL cannot be empty.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/crawler/crawl",
        {
          url: websiteUrl,
        }
      );

      if (
        !response.data ||
        !response.data.links ||
        response.data.links.length === 0
      ) {
        throw new Error("No data returned from the server.");
      }

      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "An error occurred while scraping."
      );
    } finally {
      setLoading(false);
    }
  };

  // Downloading Document function
  const handleDownload = () => {
    setDownloadError(null);

    if (!result || !result.links || result.links.length === 0) {
      setDownloadError("There is no data to download.");
      return;
    }

    try {
      let docContent = `Scraping Results for ${websiteUrl}\n\n`;

      result.links.forEach((item, index) => {
        docContent += `Link ${index + 1}: ${item.url}\n`;
        docContent += `Title: ${item.content?.title || "N/A"}\n`;
        docContent += `Headings:\n`;

        if (item.content?.headings?.length > 0) {
          item.content.headings.forEach((heading) => {
            docContent += `  - ${heading}\n`;
          });
        } else {
          docContent += "  No headings available\n";
        }

        docContent += `Links:\n`;
        if (item.content?.links?.length > 0) {
          item.content.links.forEach((link) => {
            docContent += `  - ${link}\n`;
          });
        } else {
          docContent += "  No links available\n";
        }

        docContent += "\n";
      });

      const fileName = `Scraping_Results_${Date.now()}.docx`;
      fileDownload(docContent, fileName);
    } catch (err) {
      console.error(err);
      setDownloadError("An error occurred while downloading the file.");
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Highlighting Searched Words
  const highlightText = (text, query) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-300">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Filtering Data Based on Search
  const filteredLinks =
    searchQuery.trim() && result?.links
      ? result.links.filter((item) => {
          const searchLower = searchQuery.toLowerCase();
          return (
            item.url.toLowerCase().includes(searchLower) ||
            (item.content?.title || "").toLowerCase().includes(searchLower) ||
            (item.content?.headings || []).some((heading) =>
              heading.toLowerCase().includes(searchLower)
            )
          );
        })
      : result?.links;

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex justify-center my-5">
          <h1 className="text-3xl font-bold">Scrapping Page</h1>
        </div>
        <div className="mb-6">
          <label
            htmlFor="website-url"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter the website's link
          </label>
          <input
            type="text"
            id="website-url"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="https://example.com"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <div className="flex justify-center items-center text-center h-[40px]">
              <div className="text-[#fff] text-xl">
                <svg className="animate-spin h-8 w-8" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            </div>
          ) : (
            "Scrape"
          )}
        </button>
      </form>

      {error && (
        <div className="mt-4 text-red-600 bg-red-100 p-3 rounded">
          Error: {error}
        </div>
      )}

      {result && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Scraping Results</h2>

          {/* Search Input */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search results..."
              value={searchQuery}
              onChange={handleSearch}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          {filteredLinks?.length === 0 && (
            <div className="text-red-600 bg-red-100 p-3 rounded">
              No results found for your search.
            </div>
          )}

          <ul>
            {filteredLinks.map((item, index) => (
              <li key={index} className="mb-6 border-b pb-4">
                <h3 className="text-lg font-semibold">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {highlightText(item.url, searchQuery)}
                  </a>
                </h3>
                <p className="mt-1 text-gray-700">
                  <strong>Title:</strong>{" "}
                  {highlightText(item.content?.title || "N/A", searchQuery)}
                </p>
                <div className="mt-2">
                  <strong>Headings:</strong>
                  <ul className="list-disc list-inside mt-1 flex flex-col items-start">
                    {item.content?.headings?.length > 0 ? (
                      item.content.headings.map((heading, hIndex) => (
                        <li key={hIndex} className="text-gray-600">
                          {highlightText(heading, searchQuery)}
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-600">No headings available</li>
                    )}
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          <button
            onClick={handleDownload}
            className="mt-4 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
          >
            Download as Word
          </button>

          {downloadError && (
            <div className="mt-4 text-red-600 bg-red-100 p-3 rounded">
              Error: {downloadError}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ScrappingForm;

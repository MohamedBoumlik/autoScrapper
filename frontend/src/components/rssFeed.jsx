import React, { useState } from "react";
import axios from "axios";

function RssFeed() {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
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

    // URL formatting function
    const formatUrl = (url) => {
      // Remove any trailing slashes
      url = url.replace(/\/+$/, "");

      // Ensure URL starts with protocol
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = `https://${url}`;
      }

      // Add /feed if not already present
      if (!url.endsWith("/feed")) {
        url += "/feed";
      }

      return url;
    };

    try {
      // Format the URL
      const formattedUrl = formatUrl(websiteUrl);

      const response = await axios.post("http://localhost:3000/api/rss", {
        feedUrl: formattedUrl,
      });

      if (!response.data) {
        throw new Error("No data returned from the server.");
      }

      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "An error occurred while getting Rss."
      );
    } finally {
      setLoading(false);
    }
  };

  // Highlight search term in text
  const highlightText = (text, term) => {
    if (!term || !text) return text;

    const regex = new RegExp(`(${term})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <mark key={index} className="bg-yellow-200">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Filter articles based on search query
  const filteredArticles =
    result?.articles.filter(
      (item) =>
        !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.contentSnippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.link.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex justify-center my-5">
          <h1 className="text-3xl font-bold">RSS Page</h1>
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
            placeholder="https://example.com/feed"
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
            "Fetch"
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
          {/* Search Input */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search results..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <h2 className="text-2xl font-bold mb-4">
            {result.message} of: <strong>{result.feedTitle}</strong>{" "}
          </h2>

          {filteredArticles.length === 0 ? (
            <div className="text-center text-gray-600 text-xl">
              {searchQuery ? "No results found." : "No articles available."}
            </div>
          ) : (
            <ul>
              {filteredArticles.map((item, index) => (
                <li key={index} className="mb-6 border-b pb-4">
                  <h3 className="text-lg font-semibold">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {highlightText(item.link, searchQuery)}
                    </a>
                  </h3>
                  <div className="flex flex-col item-center justify-center">
                    <p className="mt-1 text-gray-700 text-xl font-bold">
                      <strong>Title:</strong>
                      <br />
                      {highlightText(
                        item.title || "No title for this Article",
                        searchQuery
                      )}
                    </p>
                    <span className="mt-1 text-sm">{item.pubDate}</span>
                  </div>

                  <div className="mt-2">
                    <strong>Snippet:</strong>
                    <p className="mt-1 text-gray-700">
                      {highlightText(item.contentSnippet, searchQuery)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default RssFeed;

import React, { useEffect, useState } from "react";
import axios from "axios";

function RssFeeds() {
  const [feeds, setFeeds] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          "http://localhost:3000/api/rss/getRss"
        );

        // Validate response structure
        if (!response.data || !response.data.rssFeeds) {
          throw new Error("Invalid response format from server");
        }

        setFeeds(response.data.rssFeeds || []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchFeeds();
  }, []);

  // Highlight search term in text
  const highlightText = (text, term) => {
    if (!term) return text;

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

  // Filter and search feeds
  const filteredFeeds = feeds.filter(
    (feed) =>
      feed.feed_url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (feed.articles &&
        feed.articles.some(
          (article) =>
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.content_snippet
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        ))
  );

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center text-center h-screen">
        <div className="text-[#615FFF] text-xl">
          <svg className="animate-spin h-8 w-8 mr-3" viewBox="0 0 24 24">
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
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-600 text-xl p-6 bg-red-50 rounded-lg shadow-md">
          <p className="font-bold mb-2">Error Occurred</p>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-center my-5">
        <h1 className="text-3xl font-bold">All Rss Contents</h1>
      </div>
      {/* Search Input */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search feeds, titles, or content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* No Feeds or No Search Results */}
      {filteredFeeds.length === 0 ? (
        <div className="text-center text-gray-600 text-xl">
          {searchTerm ? "No results found." : "No feeds available."}
        </div>
      ) : (
        <div className="space-y-6">
          {filteredFeeds.map((feed) => (
            <div
              key={feed.id}
              className="p-4 border rounded-lg shadow-lg bg-white"
            >
              <h2 className="text-lg font-semibold mb-2">
                Feed URL:{" "}
                <a
                  href={feed.feed_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {highlightText(feed.feed_url, searchTerm)}
                </a>
              </h2>
              <p className="text-gray-600 mb-2">
                Last fetched: {new Date(feed.last_fetched).toLocaleString()}
              </p>

              {feed.articles && feed.articles.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-800">Articles:</h3>
                  {feed.articles.map((article) => (
                    <div
                      key={article.link}
                      className="p-3 border rounded-lg bg-gray-50"
                    >
                      <h4 className="text-base font-semibold text-gray-800">
                        <a
                          href={article.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {highlightText(article.title, searchTerm)}
                        </a>
                      </h4>
                      <p className="text-sm text-gray-600">
                        Published on:{" "}
                        {new Date(article.pub_date).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        {highlightText(article.content_snippet, searchTerm)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">
                  No articles found for this feed.
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RssFeeds;

import React from "react";
import Sidebar from "../components/sidebar";
import RssFeed from "../components/rssFeed";

function Rss() {
  return (
    <div>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="min-h-[100vh] p-4 border-2 border-gray-500 border-dashed rounded-lg dark:border-gray-700">
          <RssFeed />
        </div>
      </div>
    </div>
  );
}

export default Rss;

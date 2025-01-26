import React from "react";
import { FaRssSquare } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <button
          data-drawer-target="sidebar-multi-level-sidebar"
          data-drawer-toggle="sidebar-multi-level-sidebar"
          aria-controls="sidebar-multi-level-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
      </div>

      <aside
        id="sidebar-multi-level-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-5 overflow-y-auto bg-[#615FFF]">
          <h2 className="text-2xl font-bold pb-5">AutoScrapper</h2>
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive
                    ? " flex items-center p-2 text-gray-900 rounded-lg bg-gray-100 group"
                    : "flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  group"
                }
              >
                <svg
                  className="w-5 h-5 text-black-500 transition duration-75 group-hover:text-gray-900"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Scrapper</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/rss"}
                className={({ isActive }) =>
                  isActive
                    ? " flex items-center p-2 text-gray-900 rounded-lg bg-gray-100 group"
                    : "flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  group"
                }
              >
                <FaRssSquare className="w-5 h-5 text-black-500 transition duration-75 group-hover:text-gray-900" />
                <span className="ms-3">New RSS Feed</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/allRss"}
                className={({ isActive }) =>
                  isActive
                    ? " flex items-center p-2 text-gray-900 rounded-lg bg-gray-100 group"
                    : "flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  group"
                }
              >
                <FaRssSquare className="w-5 h-5 text-black-500 transition duration-75 group-hover:text-gray-900" />
                <span className="ms-3">All RSS Feeds</span>
              </NavLink>
            </li>

          </ul>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;

# Web Scraper and RSS Feed Manager Application  

## Description  
This application is a full-stack web app built with **Node.js** and **ReactJS** that performs the following features:  
1. **Web Scraping**:  
   - Extracts page titles, links, and headings from a provided website URL.  
   - Displays the scraped data with a **search feature**.  
   - Converts the scraped data into a Word document for easy export.  

2. **RSS Feed Management**:  
   - Fetches RSS feeds of websites along with their articles.  
   - Checks for duplicate articles before storing them in the database.  
   - Displays stored RSS feeds and their articles on a dedicated page.  
   - Includes a **search bar** for filtering articles.  
   - Automates daily fetching of new RSS feed data via a **cron job** that runs every day at 8 AM.  

---

## Features  

### Web Scraping  
- Extracts website metadata (title, links, headings).  
- Displays scraped data in a clean and interactive interface.  
- Allows exporting scraped data as a Word document.  

### RSS Feed Management  
- Fetches RSS feeds and their articles for websites.  
- Prevents duplicate entries in the database.  
- Displays stored RSS feeds and articles with a search bar for filtering.  

### Cron Job  
- Automates daily RSS feed updates for stored websites.  

---

## Installation  

### Prerequisites  
Ensure you have the following installed:  
- Node.js (v16 or later)  
- npm (v7 or later)  
- MySQL or another supported database  

### Steps  
1. Clone the repository:  
   ```  
   git clone <repository-url>  
   cd <repository-directory>  
Install dependencies:

For the backend:



cd backend  
npm install  
For the frontend:



cd frontend  
npm install  
Configure the backend:

Set up a .env file in the backend folder with the following variables:
env


PORT=8889  
DATABASE_URL=<your-database-url>  
RSS_FETCH_CRON_TIME="0 8 * * *"  
Start the application:

Backend:



npm run start  
Frontend:



npm run dev  
Usage
Web Scraping
Go to the web scraping page.
Provide a website URL.
View and search the scraped data.
Export the data as a Word document.
RSS Feed Management
Add websites for RSS feeds.
View stored RSS feeds and their articles.
Use the search bar to filter articles.
Automation
The application will automatically fetch new RSS feed data daily at 8 AM.
Scripts
Backend:
npm run start - Start the backend server.
Frontend:
npm run dev - Start the frontend development server.
Tech Stack
Frontend: ReactJS
Backend: Node.js, Express
Database: MySQL
Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your improvements.

License
This project is licensed under the MIT License.

Author
Mohamed Boumlik

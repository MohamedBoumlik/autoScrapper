import feedparser

def fetch_rss_feed(url):
    try:
        feed = feedparser.parse(url)
        articles = []
        for entry in feed.entries:
            articles.append({
                'title': entry.title,
                'link': entry.link,
                'published': entry.published
            })
        return articles
    except Exception as e:
        print(f"Error fetching RSS feed: {e}")
        return []

if __name__ == "__main__":
    rss_url = "https://example.com/rss"
    articles = fetch_rss_feed(rss_url)
    print(f"Fetched {len(articles)} articles from {rss_url}")

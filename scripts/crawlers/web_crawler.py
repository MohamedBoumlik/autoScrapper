import requests
from bs4 import BeautifulSoup

def crawl_website(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')

        # Example: Extract all links
        links = [a['href'] for a in soup.find_all('a', href=True)]
        return links
    except Exception as e:
        print(f"Error crawling {url}: {e}")
        return []

if __name__ == "__main__":
    url = "https://example.com"
    links = crawl_website(url)
    print(f"Extracted {len(links)} links from {url}")

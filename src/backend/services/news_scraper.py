import httpx
from textblob import TextBlob
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()
# Retrieve the API key from environment variables
API_KEY = os.environ.get('NEWS_API_KEY')

async def scrape_news():
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"https://newsapi.org/v2/everything?q=finance&apiKey={API_KEY}")
        # Check for a successful response
        if response.status_code == 200:
            return response.json()
        else:
            print(f"Failed to fetch news. Status code: {response.status_code}")
            return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

async def analyze_news_impact(news_data):
    if not news_data or 'articles' not in news_data:
        return []

    impact_analysis = []
    for article in news_data['articles']:
        description = article.get('description', '')
        if description:
            blob = TextBlob(description)
            sentiment = blob.sentiment.polarity
            impact_analysis.append({
                'title': article['title'],
                'sentiment': sentiment,
                'impact': 'Positive' if sentiment > 0 else 'Negative' if sentiment < 0 else 'Neutral'
            })
    return impact_analysis

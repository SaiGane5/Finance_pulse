import httpx
from textblob import TextBlob

async def scrape_news():
    async with httpx.AsyncClient() as client:
        response = await client.get("https://newsapi.org/v2/everything?q=finance&apiKey=62c93c6366354f95a08817d61106356e")
    return response.json()

async def analyze_news_impact(news_data):
    impact_analysis = []
    for article in news_data['articles']:
        blob = TextBlob(article['description'])
        sentiment = blob.sentiment.polarity
        impact_analysis.append({
            'title': article['title'],
            'sentiment': sentiment,
            'impact': 'Positive' if sentiment > 0 else 'Negative' if sentiment < 0 else 'Neutral'
        })
    return impact_analysis
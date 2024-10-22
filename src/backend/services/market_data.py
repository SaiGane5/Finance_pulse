import httpx
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()
API_KEY = os.environ.get('FINANCE_API_KEY')
async def get_market_data():
    symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN']
    market_data = {}
    async with httpx.AsyncClient() as client:
        for symbol in symbols:
            response = await client.get(f"https://financialmodelingprep.com/api/v3/quote/{symbol}?apikey={API_KEY}")
            market_data[symbol] = response.json()[0]
    return market_data
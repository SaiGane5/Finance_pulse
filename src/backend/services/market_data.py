import httpx

async def get_market_data():
    symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN']
    market_data = {}
    async with httpx.AsyncClient() as client:
        for symbol in symbols:
            response = await client.get(f"https://financialmodelingprep.com/api/v3/quote/{symbol}?apikey=U2QEsMasPfIbprTwSVyubH5Ehe9AjRMM")
            market_data[symbol] = response.json()[0]
    return market_data
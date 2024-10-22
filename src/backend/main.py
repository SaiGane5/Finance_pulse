from fastapi import FastAPI, WebSocket, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from services.ai_forecasting import forecast_liquidity
from services.news_scraper import scrape_news, analyze_news_impact
from services.market_data import get_market_data
from services.entity_recognition import extract_entities
from services.investment_recommender import get_investment_recommendations
import httpx

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# Mount the frontend static files
# app.mount("/", StaticFiles(directory="../", html=True), name="frontend")

@app.get("/api/forecast")
async def liquidity_forecast():
    forecast_data = await forecast_liquidity()
    return forecast_data

@app.get("/api/news")
async def get_news():
    news_data = await scrape_news()
    if "error" in news_data:
        raise HTTPException(status_code=500, detail=news_data["error"])
    impact_analysis = await analyze_news_impact(news_data)
    entities = await extract_entities(news_data)
    return {"news": news_data, "impact": impact_analysis, "entities": entities}

@app.get("/api/market")
async def get_market():
    return await get_market_data()

@app.get("/api/recommendations")
async def get_recommendations():
    market_data = await get_market_data()
    return await get_investment_recommendations(market_data)

@app.get("/api/cash-flow/{symbol}")
async def get_cash_flow(symbol: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"https://financialmodelingprep.com/api/v3/cash-flow-statement/{symbol}?apikey=U2QEsMasPfIbprTwSVyubH5Ehe9AjRMM")
    return response.json()

@app.get("/api/quote/{symbol}")
async def get_quote(symbol: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"https://financialmodelingprep.com/api/v3/quote/{symbol}?apikey=U2QEsMasPfIbprTwSVyubH5Ehe9AjRMM")
    return response.json()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        result = f"Real-time data: {data}"
        await websocket.send_text(result)
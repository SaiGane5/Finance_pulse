import pandas as pd
from prophet import Prophet
import yfinance as yf
import numpy as np

async def forecast_liquidity():
    # Fetching historical data for AAPL
    ticker = 'AAPL'
    stock_data = yf.download(ticker, start='2020-01-01', end='2023-12-31', progress=False)

    # Preparing data for Prophet (Prophet expects columns 'ds' and 'y')
    data = stock_data[['Adj Close']].reset_index()  # Using adjusted closing price
    data.columns = ['ds', 'y']  # Prophet requires 'ds' (date) and 'y' (value)

    # Remove timezone information (if any)
    data['ds'] = pd.to_datetime(data['ds']).dt.tz_localize(None)

    # Fit the Prophet model
    model = Prophet()
    model.fit(data)

    # Make future dataframe for 365 days ahead
    future = model.make_future_dataframe(periods=365)
    forecast = model.predict(future)

    # Return the forecasted data
    return forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail(365).to_dict('records')

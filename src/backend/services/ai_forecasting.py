import pandas as pd
from prophet import Prophet
import numpy as np
async def forecast_liquidity():
    # Simulated historical data
    data = pd.DataFrame({
        'ds': pd.date_range(start='2020-01-01', end='2023-12-31', freq='D'),
        'y': np.random.normal(loc=1000000, scale=100000, size=1461)  # 4 years of daily data
    })

    model = Prophet()
    model.fit(data)

    future = model.make_future_dataframe(periods=365)
    forecast = model.predict(future)

    return forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail(365).to_dict('records')
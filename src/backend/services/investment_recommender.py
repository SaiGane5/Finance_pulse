import numpy as np

async def get_investment_recommendations(market_data):
    recommendations = []
    for symbol, data in market_data.items():
        price = data['price']
        change_percent = data['changesPercentage']
        
        if change_percent > 2:
            recommendation = "Strong Buy"
        elif change_percent > 0:
            recommendation = "Buy"
        elif change_percent < -2:
            recommendation = "Strong Sell"
        elif change_percent < 0:
            recommendation = "Sell"
        else:
            recommendation = "Hold"
        
        recommendations.append({
            'symbol': symbol,
            'price': price,
            'change_percent': change_percent,
            'recommendation': recommendation
        })
    
    return recommendations
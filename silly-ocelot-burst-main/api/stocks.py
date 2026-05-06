import json
import random
from datetime import datetime

def handler(event, context):
    """Stocks with Real-time Data Simulation endpoint"""
    # Base prices for major Indian stocks
    base_stocks = {
        "NIFTY 50": {"price": 22453, "change": 0},
        "BANKNIFTY": {"price": 47820, "change": 0},
        "FINNIFTY": {"price": 21345, "change": 0},
        "RELIANCE": {"price": 2985, "change": 0},
        "TCS": {"price": 4120, "change": 0},
        "INFY": {"price": 1640, "change": 0},
        "HDFCBANK": {"price": 1542, "change": 0},
        "ICICIBANK": {"price": 1120, "change": 0},
        "AXISBANK": {"price": 1085, "change": 0},
        "SBIN": {"price": 825, "change": 0},
        "BHARTIARTL": {"price": 1295, "change": 0},
        "ITC": {"price": 435, "change": 0},
        "LTIM": {"price": 4850, "change": 0},
        "WIPRO": {"price": 452, "change": 0}
    }

    # Add realistic price movements
    stocks_data = []
    for symbol, data in base_stocks.items():
        change = random.uniform(-2, 2)  # -2% to +2% change
        new_price = data["price"] * (1 + change/100)
        change_amount = new_price - data["price"]

        stocks_data.append({
            "symbol": symbol,
            "name": symbol if "NIFTY" in symbol else f"{symbol} Ltd",
            "price": round(new_price, 2),
            "change": round(change_amount, 2),
            "change_percent": round(change, 2),
            "trend": "bullish" if change > 0 else "bearish" if change < 0 else "neutral",
            "volume": random.randint(100000, 10000000),
            "timestamp": datetime.now().isoformat()
        })

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
        },
        'body': json.dumps(stocks_data)
    }
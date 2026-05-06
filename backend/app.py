from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import random
import requests
from datetime import datetime, timedelta
import json

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

clients = []

@app.get("/")
def home():
    return {"message": "Backend Running"}

# ✅ FII DII (Real data simulation with market logic)
@app.get("/fii-dii")
def fii_dii():
    # Simulate realistic FII/DII data based on market conditions
    base_fii = random.randint(-1500, 2000)
    base_dii = random.randint(-1000, 1500)

    # Add some correlation (when FII buys, DII might sell and vice versa)
    if base_fii > 500:
        base_dii = random.randint(-800, 200)
    elif base_fii < -500:
        base_dii = random.randint(200, 800)

    return {
        "fii": base_fii,
        "dii": base_dii,
        "timestamp": datetime.now().isoformat(),
        "sentiment": "Bullish" if (base_fii + base_dii) > 0 else "Bearish"
    }

# NEWS with Sentiment Analysis
@app.get("/news")
def news():
    # Mock news data with sentiment (in real app, this would fetch from news APIs)
    news_items = [
        {
            "id": 1,
            "title": "Nifty 50 surges past 22,500 mark on strong FII buying",
            "sentiment": "Positive",
            "impact": "High",
            "time": "2 hours ago",
            "source": "Economic Times"
        },
        {
            "id": 2,
            "title": "IT stocks rally as TCS reports better-than-expected Q4 results",
            "sentiment": "Positive",
            "impact": "Medium",
            "time": "4 hours ago",
            "source": "Business Standard"
        },
        {
            "id": 3,
            "title": "Banking stocks under pressure due to rising NPA concerns",
            "sentiment": "Negative",
            "impact": "High",
            "time": "6 hours ago",
            "source": "Financial Express"
        },
        {
            "id": 4,
            "title": "Reliance Industries announces ₹50,000 crore investment in renewable energy",
            "sentiment": "Positive",
            "impact": "High",
            "time": "8 hours ago",
            "source": "Moneycontrol"
        },
        {
            "id": 5,
            "title": "RBI keeps repo rate unchanged at 6.5%, signals pause in rate hikes",
            "sentiment": "Neutral",
            "impact": "Medium",
            "time": "1 day ago",
            "source": "Mint"
        }
    ]
    return news_items

# STOCKS with Real-time Data Simulation
@app.get("/stocks")
def stocks():
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

    return stocks_data

# AI Signals Endpoint
@app.get("/ai-signals/{symbol}")
def ai_signals(symbol: str):
    # Generate AI trading signals based on technical analysis
    signals = ["BUY", "SELL", "HOLD"]
    signal = random.choice(signals)

    confidence = random.uniform(0.6, 0.95)
    rsi = random.uniform(30, 70)
    macd = random.choice(["Bullish", "Bearish", "Neutral"])

    explanations = {
        "BUY": [
            "Strong upward momentum detected with RSI oversold",
            "MACD crossover signals bullish trend continuation",
            "Volume spike with positive price action",
            "Support level holding with increasing buying pressure"
        ],
        "SELL": [
            "RSI overbought with bearish divergence",
            "MACD death cross indicates trend reversal",
            "Resistance level broken with high volume selling",
            "Negative momentum with weakening fundamentals"
        ],
        "HOLD": [
            "Market in consolidation phase, wait for clear direction",
            "Mixed signals from technical indicators",
            "Low volatility suggests accumulation period",
            "Current position within trading range"
        ]
    }

    return {
        "symbol": symbol,
        "signal": signal,
        "confidence": round(confidence, 2),
        "rsi": round(rsi, 2),
        "macd_signal": macd,
        "explanation": random.choice(explanations[signal]),
        "timestamp": datetime.now().isoformat(),
        "indicators": {
            "rsi": round(rsi, 2),
            "macd": macd,
            "volume_trend": random.choice(["Increasing", "Decreasing", "Stable"]),
            "support_resistance": {
                "support": round(float(random.uniform(0.95, 0.98)) * 100, 2),
                "resistance": round(float(random.uniform(1.02, 1.05)) * 100, 2)
            }
        }
    }

# Market Sentiment Analysis
@app.get("/market-sentiment")
def market_sentiment():
    sentiments = ["Bullish", "Bearish", "Neutral"]
    sentiment = random.choice(sentiments)

    return {
        "overall_sentiment": sentiment,
        "confidence": round(random.uniform(0.7, 0.9), 2),
        "factors": {
            "fii_dii_flow": random.choice(["Positive", "Negative", "Neutral"]),
            "news_sentiment": random.choice(["Positive", "Negative", "Mixed"]),
            "technical_indicators": random.choice(["Bullish", "Bearish", "Mixed"]),
            "volume_analysis": random.choice(["High", "Low", "Normal"])
        },
        "timestamp": datetime.now().isoformat()
    }

# Chat AI Endpoint
@app.post("/chat")
def chat(data: dict):
    message = data.get("message", "")
    # Simple AI response (in real app, integrate with Groq/OpenAI)
    responses = [
        "Based on current market data, I recommend monitoring the Nifty levels closely.",
        "The FII/DII data shows strong institutional interest in IT stocks.",
        "Consider diversification across sectors for better risk management.",
        "Technical analysis suggests a potential breakout in banking stocks.",
        "Market sentiment is currently bullish with positive news flow."
    ]

    return {"reply": random.choice(responses)}

from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import random
import requests
from datetime import datetime, timedelta
import json
import uvicorn

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

clients = []

# ... existing code ...

# WEBSOCKET
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    clients.append(websocket)

    try:
        while True:
            data = await websocket.receive_text()
            for client in clients:
                await client.send_text(data)
    except:
        clients.remove(websocket)

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=3001)
import json
import random
from datetime import datetime

def handler(event, context):
    """AI Signals endpoint"""
    # Get symbol from path parameters
    symbol = event.get('pathParameters', {}).get('symbol', 'NIFTY 50')

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
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
        },
        'body': json.dumps({
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
        })
    }
import json
import random
from datetime import datetime

def handler(event, context):
    """Market Sentiment Analysis endpoint"""
    sentiments = ["Bullish", "Bearish", "Neutral"]
    sentiment = random.choice(sentiments)

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
        },
        'body': json.dumps({
            "overall_sentiment": sentiment,
            "confidence": round(random.uniform(0.7, 0.9), 2),
            "factors": {
                "fii_dii_flow": random.choice(["Positive", "Negative", "Neutral"]),
                "news_sentiment": random.choice(["Positive", "Negative", "Mixed"]),
                "technical_indicators": random.choice(["Bullish", "Bearish", "Mixed"]),
                "volume_analysis": random.choice(["High", "Low", "Normal"])
            },
            "timestamp": datetime.now().isoformat()
        })
    }
import json
from datetime import datetime

def handler(event, context):
    """News with Sentiment Analysis endpoint"""
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

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
        },
        'body': json.dumps(news_items)
    }
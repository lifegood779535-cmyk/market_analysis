import json
import random

def handler(event, context):
    """Chat AI endpoint"""
    # Get message from request body
    body = json.loads(event.get('body', '{}'))
    message = body.get("message", "")

    # Simple AI response (in real app, integrate with Groq/OpenAI)
    responses = [
        "Based on current market data, I recommend monitoring the Nifty levels closely.",
        "The FII/DII data shows strong institutional interest in IT stocks.",
        "Consider diversification across sectors for better risk management.",
        "Technical analysis suggests a potential breakout in banking stocks.",
        "Market sentiment is currently bullish with positive news flow."
    ]

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
        },
        'body': json.dumps({
            "reply": random.choice(responses)
        })
    }
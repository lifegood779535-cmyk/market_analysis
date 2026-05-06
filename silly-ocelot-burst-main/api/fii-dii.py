import json
import random
from datetime import datetime

def handler(event, context):
    """FII DII endpoint"""
    # Simulate realistic FII/DII data based on market conditions
    base_fii = random.randint(-1500, 2000)
    base_dii = random.randint(-1000, 1500)

    # Add some correlation (when FII buys, DII might sell and vice versa)
    if base_fii > 500:
        base_dii = random.randint(-800, 200)
    elif base_fii < -500:
        base_dii = random.randint(200, 800)

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
        },
        'body': json.dumps({
            "fii": base_fii,
            "dii": base_dii,
            "timestamp": datetime.now().isoformat(),
            "sentiment": "Bullish" if (base_fii + base_dii) > 0 else "Bearish"
        })
    }
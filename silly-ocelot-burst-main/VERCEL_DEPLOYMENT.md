# Vercel Deployment Guide

## 🚀 Deploy to Vercel

### Prerequisites
1. Install Vercel CLI: `npm install -g vercel`
2. Login to Vercel: `vercel login`

### Step 1: Deploy Frontend + Backend
```bash
cd silly-ocelot-burst-main
vercel --prod
```

### Step 2: Set Environment Variables
In your Vercel dashboard or using CLI:
```bash
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

### Step 3: Configure Build Settings
The `vercel.json` is already configured for:
- Frontend: Static build with Vite
- Backend: Python serverless functions

### API Endpoints Available:
- `/api/fii-dii` - FII/DII data
- `/api/news` - News with sentiment
- `/api/stocks` - Live stock data
- `/api/ai-signals/[symbol]` - AI trading signals
- `/api/market-sentiment` - Market sentiment analysis
- `/api/chat` - AI mentor chat

### Testing Deployment
After deployment, your app will be available at: `https://your-project.vercel.app`

All API calls will automatically use the deployed endpoints.
export const INDIAN_STOCKS = [
  { symbol: 'NIFTY 50', name: 'Nifty 50', price: 22453.20, change: 124.5, trend: 'bullish', type: 'INDEX' },
  { symbol: 'BANKNIFTY', name: 'Nifty Bank', price: 47820.15, change: -85.2, trend: 'bearish', type: 'INDEX' },
  { symbol: 'FINNIFTY', name: 'Nifty Fin Service', price: 21345.60, change: 45.3, trend: 'bullish', type: 'INDEX' },
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2985.40, change: 45.1, trend: 'bullish', type: 'STOCK' },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 4120.60, change: 12.3, trend: 'neutral', type: 'STOCK' },
  { symbol: 'INFY', name: 'Infosys Limited', price: 1640.25, change: -15.4, trend: 'bearish', type: 'STOCK' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1542.80, change: 18.2, trend: 'bullish', type: 'STOCK' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 1120.45, change: -5.3, trend: 'bearish', type: 'STOCK' },
  { symbol: 'AXISBANK', name: 'Axis Bank', price: 1085.20, change: 12.1, trend: 'bullish', type: 'STOCK' },
  { symbol: 'SBIN', name: 'State Bank of India', price: 825.40, change: 8.4, trend: 'bullish', type: 'STOCK' },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 1295.30, change: -3.2, trend: 'bearish', type: 'STOCK' },
  { symbol: 'ITC', name: 'ITC Limited', price: 435.20, change: 1.5, trend: 'neutral', type: 'STOCK' },
  { symbol: 'LTIM', name: 'LTIMindtree', price: 4850.60, change: -25.4, trend: 'bearish', type: 'STOCK' },
  { symbol: 'WIPRO', name: 'Wipro Limited', price: 452.10, change: 4.2, trend: 'bullish', type: 'STOCK' },
];

export const MARKET_ANALYTICS = {
  pcr: 1.15, // Put Call Ratio
  maxPain: 22400,
  vix: 12.4, // Volatility Index
  advanceDecline: { advances: 32, declines: 18 }
};

export const generateAISignal = (symbol: string) => {
  const rsi = Math.floor(Math.random() * 60) + 20;
  const sentiment = Math.random() > 0.5 ? 'Positive' : 'Negative';
  
  let signal: 'BUY' | 'SELL' | 'HOLD' = 'HOLD';
  let explanation = "";

  if (rsi < 30) {
    signal = 'BUY';
    explanation = "Market oversold zone me hai, yahan se reversal aa sakta hai. 📈";
  } else if (rsi > 70) {
    signal = 'SELL';
    explanation = "Stock overbought lag raha hai, thoda profit booking aa sakti hai. ⚠️";
  } else {
    explanation = "Abhi wait and watch mode me rehna sahi rahega. Trend clear nahi hai. ⚖️";
  }

  return { signal, rsi, sentiment, explanation };
};

export const getOptionChain = (spotPrice: number) => {
  const strikes = [];
  const baseStrike = Math.round(spotPrice / 100) * 100;
  
  for (let i = -5; i <= 5; i++) {
    const strike = baseStrike + (i * 100);
    strikes.push({
      strike,
      ce: { price: Math.max(10, (spotPrice - strike) + 50), oi: Math.floor(Math.random() * 100000) },
      pe: { price: Math.max(10, (strike - spotPrice) + 50), oi: Math.floor(Math.random() * 100000) },
    });
  }
  return strikes;
};
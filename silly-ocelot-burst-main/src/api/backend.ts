const BASE_URLS = ["/api", "http://127.0.0.1:5000/api", "http://localhost:5000/api", "http://127.0.0.1:8000/api", "http://localhost:8000/api", "http://127.0.0.1:3001/api", "http://localhost:3001/api"];

const multiFetch = async (endpoint: string) => {
  // For production (Vercel), use relative URLs
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    try {
      const res = await fetch(endpoint);
      if (res.ok) return res;
    } catch (e) {
      // Continue to fallback
    }
  }

  // For development, try multiple URLs
  let lastError = null;
  for (const url of BASE_URLS) {
    try {
      const res = await fetch(url + endpoint);
      if (res.ok) return res;
    } catch (e) {
      lastError = e;
      continue;
    }
  }
  throw lastError || new Error("All API endpoints failed");
};

export const getNews = async () => {
  const res = await multiFetch("/news");
  return res.json();
};

export const getFiiDii = async () => {
  const res = await multiFetch("/fii-dii");
  return res.json();
};

export const getStocks = async () => {
  const res = await multiFetch("/stocks");
  return res.json();
};

export const getAISignal = async (symbol: string) => {
  const res = await multiFetch(`/ai-signals/${encodeURIComponent(symbol)}`);
  return res.json();
};

export const getMarketSentiment = async () => {
  const res = await multiFetch("/market-sentiment");
  return res.json();
};

export const getOptionChainData = async (symbol: string) => {
  const res = await multiFetch(`/option-chain?symbol=${encodeURIComponent(symbol)}`);
  return res.json();
};

export const getPrediction = async (symbol: string) => {
  const res = await multiFetch(`/predict?symbol=${encodeURIComponent(symbol)}`);
  return res.json();
};

export const getHistory = async (symbol: string, interval: string = '1d') => {
  const res = await multiFetch(`/history?symbol=${encodeURIComponent(symbol)}&interval=${interval}`);
  return res.json();
};
export interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  hinglishSummary: string;
}

export const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'RBI keeps repo rate unchanged at 6.5%',
    source: 'Economic Times',
    time: '2h ago',
    sentiment: 'Bullish',
    hinglishSummary: 'RBI ne rates nahi badhaye, market ke liye achhi khabar hai! 📈'
  },
  {
    id: '2',
    title: 'Reliance Industries Q3 profits beat estimates',
    source: 'MoneyControl',
    time: '4h ago',
    sentiment: 'Bullish',
    hinglishSummary: 'Reliance ke results solid hain, stock me tezi aa sakti hai. 🚀'
  },
  {
    id: '3',
    title: 'Global markets slide on inflation fears',
    source: 'Reuters',
    time: '5h ago',
    sentiment: 'Bearish',
    hinglishSummary: 'Global tension ki wajah se market thoda pressure me reh sakta hai. 📉'
  },
  {
    id: '4',
    title: 'New SEBI regulations for F&O trading',
    source: 'LiveMint',
    time: '1d ago',
    sentiment: 'Neutral',
    hinglishSummary: 'F&O rules me badlav, traders ko thoda sambhal kar rehna hoga. ⚖️'
  }
];
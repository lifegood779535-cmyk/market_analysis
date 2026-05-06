import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Newspaper, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getNews } from '@/api/backend';

interface NewsItem {
  id: number;
  title: string;
  sentiment: string;
  impact: string;
  time: string;
  source: string;
}

const NewsFeed = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const json = await getNews();
        setNews(json);
      } catch (err) {
        console.error("Failed to fetch news data", err);
      }
    };
    fetchNews();
    const interval = setInterval(fetchNews, 60000); // refresh every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <Newspaper className="text-primary w-5 h-5" />
        <h3 className="font-bold text-white text-lg tracking-tight">Market News & Sentiment</h3>
      </div>
      
      {news.length === 0 ? (
        <div className="text-center py-8 text-white/20 text-xs italic">
          Fetching latest market buzz...
        </div>
      ) : (
        news.map((item) => (
          <Card key={item.id} className="glass-panel border-white/5 bg-slate-900/40 backdrop-blur-xl rounded-2xl overflow-hidden hover:border-primary/30 transition-all group">
            <CardContent className="p-5">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-white/40 font-black">{item.source} • {item.time}</span>
                    <span className={cn(
                      "text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-tighter",
                      item.sentiment === 'Positive' || item.sentiment === 'Bullish' ? "bg-primary/10 text-primary" :
                      item.sentiment === 'Negative' || item.sentiment === 'Bearish' ? "bg-destructive/10 text-destructive" : "bg-white/5 text-white/40"
                    )}>
                      {item.sentiment}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm mb-2 text-white group-hover:text-primary transition-colors leading-snug">{item.title}</h4>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-tight">Impact: {item.impact}</p>
                </div>
                <div className={cn(
                  "p-3 rounded-xl border border-white/5 shadow-inner",
                  item.sentiment === 'Positive' || item.sentiment === 'Bullish' ? "bg-primary/10 text-primary border-primary/20" :
                  item.sentiment === 'Negative' || item.sentiment === 'Bearish' ? "bg-destructive/10 text-destructive border-destructive/20" : "bg-white/5 text-white/40"
                )}>
                  {item.sentiment === 'Positive' || item.sentiment === 'Bullish' ? <TrendingUp size={18} /> : 
                   item.sentiment === 'Negative' || item.sentiment === 'Bearish' ? <TrendingDown size={18} /> : <Minus size={18} />}
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default NewsFeed;
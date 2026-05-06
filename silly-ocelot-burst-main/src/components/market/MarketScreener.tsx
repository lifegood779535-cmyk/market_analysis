import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTrading } from '@/hooks/useTrading';
import { Filter, Zap, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const MarketScreener = () => {
  const [filter, setFilter] = useState<'ALL' | 'BULLISH' | 'BEARISH' | 'VOLATILE'>('ALL');
  const { marketData } = useTrading();

  const filteredStocks = marketData.filter(stock => {
    if (filter === 'ALL') return true;
    if (filter === 'BULLISH') return stock.change > 0;
    if (filter === 'BEARISH') return stock.change < 0;
    if (filter === 'VOLATILE') return Math.abs(stock.change) > 50;
    return true;
  });

  return (
    <Card className="border-white/5 shadow-2xl bg-slate-900/40 backdrop-blur-xl rounded-2xl overflow-hidden glass-panel">
      <CardHeader className="pb-4 border-b border-white/5 bg-white/5">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm flex items-center gap-2 font-bold text-white">
            <Filter className="text-primary w-4 h-4" />
            Market Screener
          </CardTitle>
          <div className="flex gap-2">
            {(['ALL', 'BULLISH', 'BEARISH'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "text-[9px] px-3 py-1.5 rounded-lg font-black tracking-widest transition-all uppercase",
                  filter === f ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-white/5">
          {filteredStocks.map((stock) => (
            <div key={stock.symbol} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2.5 rounded-xl border border-white/5",
                  stock.change > 0 ? "bg-primary/10 text-primary border-primary/20" : "bg-destructive/10 text-destructive border-destructive/20"
                )}>
                  {stock.change > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors">{stock.symbol}</h4>
                  <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">NSE India</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-white">₹{stock.price.toLocaleString()}</p>
                <p className={cn(
                  "text-[10px] font-black",
                  stock.change > 0 ? "text-primary" : "text-destructive"
                )}>
                  {stock.change > 0 ? '+' : ''}{stock.change.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketScreener;
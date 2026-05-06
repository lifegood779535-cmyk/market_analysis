import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useTrading } from '@/hooks/useTrading';

const MarketHeatmap = () => {
  const { marketData } = useTrading();
  const topSymbols = marketData.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-6 bg-primary rounded-full" />
          <h3 className="font-bold text-white text-lg tracking-tight">Market Heatmap</h3>
        </div>
        <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
          <span className="text-[10px] text-white/40 uppercase font-black tracking-widest">Sector:</span>
          <span className="text-[10px] text-primary uppercase font-black tracking-widest">All Markets</span>
        </div>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
        {topSymbols.map((stock) => {
          const currentPrice = stock.price;
          const priceChange = stock.change;
          const isPositive = priceChange >= 0;
          
          return (
            <div 
              key={stock.symbol}
              className={cn(
                "min-w-[200px] flex-1 glass-panel p-5 rounded-2xl border border-white/5 hover:border-white/20 transition-all cursor-pointer relative overflow-hidden group",
                isPositive ? "hover:bg-primary/5" : "hover:bg-destructive/5"
              )}
            >
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                {isPositive ? <TrendingUp size={40} className="text-primary" /> : <TrendingDown size={40} className="text-destructive" />}
              </div>
              
              <div className="space-y-3 relative z-10">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-white/60 tracking-wider">{stock.symbol}</span>
                  {isPositive ? <TrendingUp size={14} className="text-primary" /> : <TrendingDown size={14} className="text-destructive" />}
                </div>
                <div>
                  <p className="text-xl font-bold text-white tabular-nums">₹{currentPrice.toLocaleString()}</p>
                  <p className={cn(
                    "text-xs font-bold mt-1 tabular-nums",
                    isPositive ? "text-primary" : "text-destructive"
                  )}>
                    {isPositive ? '+' : ''}{priceChange.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarketHeatmap;
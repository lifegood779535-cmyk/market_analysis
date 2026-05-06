import { useTrading } from '@/hooks/useTrading';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const MarketPulse = () => {
  const { marketData } = useTrading();

  return (
    <div className="w-full bg-slate-950 border-b border-slate-800 overflow-hidden py-2.5 shadow-lg">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center gap-10 px-4">
            {marketData.map((stock) => {
              const price = stock.price;
              const isUp = stock.change > 0;
              return (
                <div key={`${i}-${stock.symbol}`} className="flex items-center gap-2.5">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">{stock.symbol}</span>
                  <span className="text-sm font-bold text-white">₹{price.toLocaleString()}</span>
                  <span className={cn(
                    "text-xs font-bold flex items-center gap-0.5",
                    isUp ? "text-[#00D09C]" : "text-red-500"
                  )}>
                    {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {isUp ? '+' : ''}{stock.change}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}} />
    </div>
  );
};

export default MarketPulse;
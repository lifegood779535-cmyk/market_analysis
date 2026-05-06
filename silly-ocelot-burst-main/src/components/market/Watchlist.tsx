import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTrading } from '@/hooks/useTrading';
import { Star, TrendingUp, TrendingDown } from 'lucide-react';

const Watchlist = () => {
  const { marketData } = useTrading();

  return (
    <Card className="bg-slate-900 border-slate-800 text-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Star className="text-yellow-500 w-4 h-4 fill-yellow-500" />
          My Watchlist
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-slate-800">
          {marketData.map((stock) => (
            <div key={stock.symbol} className="p-3 flex justify-between items-center hover:bg-slate-800/50 transition-colors cursor-pointer">
              <div>
                <p className="font-bold text-sm">{stock.symbol}</p>
                <p className="text-[10px] text-slate-500 uppercase">NSE India</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm">₹{stock.price.toLocaleString()}</p>
                <div className={`flex items-center justify-end gap-1 text-[10px] font-bold ${stock.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stock.change > 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {stock.change > 0 ? '+' : ''}{stock.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Watchlist;
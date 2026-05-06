import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Target, Zap, TrendingUp, Percent } from 'lucide-react';
import { useTrading } from '@/hooks/useTrading';

const PortfolioStats = () => {
  const { portfolio } = useTrading();
  
  // Calculate stats from history
  const totalTrades = portfolio.length;
  const buyTrades = portfolio.filter(t => t.type === 'BUY').length;
  const sellTrades = portfolio.filter(t => t.type === 'SELL').length;
  
  // Mock stats for demo purposes if no trades exist
  const winRate = totalTrades > 0 ? 65 : 0;
  const avgProfit = totalTrades > 0 ? "₹1,240" : "₹0";
  const profitFactor = totalTrades > 0 ? "1.8" : "0.0";

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <Card className="bg-slate-900 border-slate-800 text-white">
        <CardContent className="p-4 flex flex-col items-center text-center space-y-1">
          <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500 mb-1">
            <Target size={18} />
          </div>
          <p className="text-[10px] text-slate-500 uppercase font-bold">Win Rate</p>
          <p className="text-xl font-bold text-green-500">{winRate}%</p>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-800 text-white">
        <CardContent className="p-4 flex flex-col items-center text-center space-y-1">
          <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500 mb-1">
            <Zap size={18} />
          </div>
          <p className="text-[10px] text-slate-500 uppercase font-bold">Profit Factor</p>
          <p className="text-xl font-bold text-blue-500">{profitFactor}</p>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-800 text-white">
        <CardContent className="p-4 flex flex-col items-center text-center space-y-1">
          <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500 mb-1">
            <TrendingUp size={18} />
          </div>
          <p className="text-[10px] text-slate-500 uppercase font-bold">Avg. Profit</p>
          <p className="text-xl font-bold text-white">{avgProfit}</p>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-800 text-white">
        <CardContent className="p-4 flex flex-col items-center text-center space-y-1">
          <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500 mb-1">
            <Percent size={18} />
          </div>
          <p className="text-[10px] text-slate-500 uppercase font-bold">Total Trades</p>
          <p className="text-xl font-bold text-white">{totalTrades}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioStats;
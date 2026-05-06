import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MARKET_ANALYTICS } from '@/utils/marketData';
import { Activity, BarChart3, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const AnalyticsCard = ({ title, value, desc, color }: { title: string, value: string | number, desc: string, color: string }) => (
  <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-1 group hover:border-white/20 transition-all">
    <div className="flex items-center justify-between">
      <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider">{title}</span>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Info size={12} className="text-white/20" />
          </TooltipTrigger>
          <TooltipContent className="bg-slate-900 border-white/10 text-white text-xs max-w-[200px] shadow-2xl">
            {desc}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    <p className={`text-xl font-bold ${color}`}>{value}</p>
  </div>
);

const MarketAnalytics = () => {
  const { pcr, maxPain, vix, advanceDecline } = MARKET_ANALYTICS;

  return (
    <Card className="bg-slate-900/40 border-white/5 text-white overflow-hidden rounded-[2.5rem] shadow-2xl glass-panel relative group">
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
      
      <CardHeader className="p-8 pb-4 border-b border-white/5 bg-black/20 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-black uppercase tracking-[0.3em] text-white/30 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
            <BarChart3 className="text-blue-500 w-4 h-4" />
          </div>
          Quantum Analytics
        </CardTitle>
        <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
           <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest">Nifty 50</span>
        </div>
      </CardHeader>

      <CardContent className="p-8 space-y-8 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <AnalyticsCard 
            title="PCR (OI)" 
            value={pcr} 
            color={pcr > 1 ? "text-primary" : "text-destructive"}
            desc="Put Call Ratio. > 1.0 usually means bullish sentiment."
          />
          <AnalyticsCard 
            title="Max Pain" 
            value={`₹${maxPain}`} 
            color="text-white/80"
            desc="The strike price where option buyers lose the most money."
          />
          <AnalyticsCard 
            title="India VIX" 
            value={vix} 
            color="text-orange-500"
            desc="Volatility Index. High VIX means fear in the market."
          />
          <AnalyticsCard 
            title="A/D Ratio" 
            value={`${advanceDecline.advances}:${advanceDecline.declines}`} 
            color="text-white/80"
            desc="Advance-Decline Ratio. Shows market breadth."
          />
        </div>

        <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-[2rem] flex gap-5 items-start backdrop-blur-md shadow-inner relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 blur-2xl rounded-full group-hover:scale-150 transition-transform duration-1000" />
          <Activity className="text-blue-500 shrink-0 mt-1" size={20} />
          <div className="space-y-1">
            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Synthetic Intelligence Insight</p>
            <p className="text-[13px] text-white/60 leading-relaxed font-medium italic">
              {`PCR levels of ${pcr} indicate a ${pcr > 1 ? 'bullish' : 'cautious'} bias. Strategic focus at ${maxPain} for weekly expiration settlement.`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketAnalytics;
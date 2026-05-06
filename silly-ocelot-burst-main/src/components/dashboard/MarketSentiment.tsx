import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BrainCircuit } from 'lucide-react';

const MarketSentiment = () => {
  return (
    <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10 text-white overflow-hidden rounded-[2.5rem] glass-panel relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000" />
      <CardContent className="p-8 relative z-10">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/30 shrink-0 shadow-lg shadow-primary/10">
            <BrainCircuit className="text-primary w-8 h-8" />
          </div>
          <div className="space-y-4 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-xl tracking-tight">AI Sentiment Engine</h3>
              <Badge className="bg-primary/20 text-primary border-primary/30 px-3 py-1 text-[10px] font-black uppercase tracking-widest">Bullish Mood</Badge>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                <span>Fear</span>
                <span>Greed</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-primary w-[72%] shadow-[0_0_10px_rgba(0,208,156,0.5)]" />
              </div>
            </div>

            <p className="text-white/70 leading-relaxed font-medium italic text-lg">
              "Market abhi strong lag raha hai, NIFTY ne support levels hold kiye hain. Lekin RSI 65 ke paas hai, toh naye trades me thoda cautious rehna better hai."
            </p>
            
            <div className="flex flex-wrap gap-6 pt-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">FII Activity</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Strong Buy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Volatility</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-yellow-500">Moderate</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketSentiment;
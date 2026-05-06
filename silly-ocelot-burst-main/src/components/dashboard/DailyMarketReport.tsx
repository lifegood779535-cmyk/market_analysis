import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, TrendingUp, AlertCircle, Info, BrainCircuit } from 'lucide-react';

const DailyMarketReport = () => {
  return (
    <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10 text-white overflow-hidden h-full rounded-[2.5rem] glass-panel">
      <CardHeader className="pb-4 border-b border-white/5 bg-white/5 px-8">
        <CardTitle className="text-sm flex items-center gap-2 font-black uppercase tracking-widest text-white/60">
          <BrainCircuit className="text-primary w-5 h-5" />
          Market Intelligence
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        <div className="space-y-6">
          <div className="flex items-start gap-5 group">
            <div className="p-2.5 bg-primary/10 border border-primary/20 rounded-xl text-primary shrink-0 transition-transform group-hover:scale-110">
              <TrendingUp size={18} />
            </div>
            <div>
              <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-2">Technical Summary</h4>
              <p className="text-sm text-white/70 leading-relaxed font-medium">
                NIFTY has closed above <span className="text-primary font-bold">22,400</span>, showing strong bullish momentum. IT sector is leading the rally while Banking remains cautious. 📈
              </p>
            </div>
          </div>

          <div className="flex items-start gap-5 group">
            <div className="p-2.5 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-500 shrink-0 transition-transform group-hover:scale-110">
              <AlertCircle size={18} />
            </div>
            <div>
              <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-2">Critical Levels</h4>
              <p className="text-sm text-white/70 leading-relaxed font-medium">
                Resistance at <span className="text-white font-bold">22,550</span>. A breakout could trigger a move to 22,700. Support is firm at 22,300. ⚖️
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex gap-4 items-start shadow-inner">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
            <Info className="text-primary" size={20} />
          </div>
          <p className="text-xs text-white/50 italic leading-relaxed font-bold uppercase tracking-tight">
            "Pro Tip: Don't chase the rally. Wait for a minor dip near 22,350 to enter long positions. 🛡️"
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyMarketReport;
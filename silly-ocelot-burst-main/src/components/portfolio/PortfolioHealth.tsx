import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, AlertTriangle, HeartPulse, Info } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useTrading } from '@/hooks/useTrading';

const PortfolioHealth = () => {
  const { portfolio, balance } = useTrading();
  
  // Mock health calculation
  const totalInvested = portfolio.reduce((acc, t) => acc + (t.price * t.quantity), 0);
  const cashRatio = balance / (balance + totalInvested);
  
  let healthScore = 85;
  let status = "Excellent";
  let color = "text-green-500";
  let advice = "Aapka portfolio well-balanced hai. Risk management solid lag raha hai! 👍";

  if (cashRatio < 0.1) {
    healthScore = 45;
    status = "Risky";
    color = "text-red-500";
    advice = "Saara paisa stocks me hai! Thoda cash rakho emergency ke liye. ⚠️";
  } else if (portfolio.length > 10) {
    healthScore = 65;
    status = "Over-diversified";
    color = "text-yellow-500";
    advice = "Bahut saare stocks hain, track karna mushkil hoga. Focus badhao. ⚖️";
  }

  return (
    <Card className="bg-slate-900/40 border-white/5 text-white overflow-hidden rounded-[2.5rem] shadow-2xl glass-panel">
      <CardHeader className="p-8 pb-4">
        <CardTitle className="text-sm font-black uppercase tracking-[0.3em] text-white/30 flex items-center gap-3">
          <div className="w-8 h-8 bg-red-500/10 rounded-xl flex items-center justify-center border border-red-500/20">
            <HeartPulse className="text-red-500 w-4 h-4" />
          </div>
          Risk Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 pt-4 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-5xl font-black tracking-tighter ${color}`}>{healthScore}%</p>
            <p className="text-[10px] text-white/20 uppercase font-black tracking-[0.2em] mt-1">{status} Rating</p>
          </div>
          <div className="w-16 h-16 bg-black/40 rounded-3xl border border-white/5 flex items-center justify-center shadow-inner">
            <ShieldCheck className={color} size={32} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/20">
            <span>Safety Margin</span>
            <span className="text-white/60">{healthScore}/100</span>
          </div>
          <Progress value={healthScore} className="h-3 bg-white/5 rounded-full" />
        </div>

        <div className="p-6 bg-primary/5 border border-primary/10 rounded-3xl flex gap-5 items-start backdrop-blur-md shadow-inner relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 blur-2xl rounded-full group-hover:scale-150 transition-transform duration-1000" />
          <span className="text-primary shrink-0 mt-1">
            <Info size={20} />
          </span>
          <p className="text-[13px] text-white/60 leading-relaxed font-medium italic relative z-10">
            "{advice}"
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioHealth;
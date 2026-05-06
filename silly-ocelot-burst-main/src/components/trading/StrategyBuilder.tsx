import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Info, TrendingUp, TrendingDown, ShieldCheck } from 'lucide-react';
import PayoffSimulator from './PayoffSimulator';

const STRATEGIES = [
  { 
    id: 'bull-call', 
    name: 'Bull Call Spread', 
    mood: 'Bullish', 
    desc: 'Buy 1 ATM Call, Sell 1 OTM Call. Limited risk, limited profit.',
    legs: [
      { type: 'CE', strike: 22400, premium: 150, action: 'BUY' },
      { type: 'CE', strike: 22600, premium: 60, action: 'SELL' }
    ]
  },
  { 
    id: 'bear-put', 
    name: 'Bear Put Spread', 
    mood: 'Bearish', 
    desc: 'Buy 1 ATM Put, Sell 1 OTM Put. Best for moderate down moves.',
    legs: [
      { type: 'PE', strike: 22400, premium: 140, action: 'BUY' },
      { type: 'PE', strike: 22200, premium: 55, action: 'SELL' }
    ]
  }
];

const StrategyBuilder = () => {
  const [selected, setSelected] = useState(STRATEGIES[0]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {STRATEGIES.map((strat) => (
          <Card 
            key={strat.id} 
            className={`cursor-pointer transition-all border-2 ${
              selected.id === strat.id ? "bg-blue-600/10 border-blue-500" : "bg-slate-900 border-slate-800 hover:border-slate-700"
            }`}
            onClick={() => setSelected(strat)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-white">{strat.name}</h3>
                <Badge className={strat.mood === 'Bullish' ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}>
                  {strat.mood}
                </Badge>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{strat.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-slate-900 border-slate-800 text-white">
        <CardHeader className="border-b border-slate-800">
          <CardTitle className="text-lg flex items-center gap-2">
            <ShieldCheck className="text-blue-500" />
            Strategy Breakdown: {selected.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selected.legs.map((leg, i) => (
              <div key={i} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold">{leg.action} Leg {i+1}</p>
                  <p className="font-bold">{leg.type} {leg.strike}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Premium</p>
                  <p className="font-bold text-blue-500">₹{leg.premium}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-blue-600/10 border border-blue-500/20 rounded-xl flex gap-4 items-start">
            <Info className="text-blue-500 shrink-0 mt-0.5" size={18} />
            <div className="space-y-1">
              <p className="text-sm font-bold">AI Learning Tip</p>
              <p className="text-xs text-slate-300 italic">
                "Spreads use karne se aapka risk limited ho jata hai. Agar market aapke against gaya, toh pura capital zero nahi hoga! 🛡️"
              </p>
            </div>
          </div>

          <PayoffSimulator 
            strike={selected.legs[0].strike} 
            premium={selected.legs[0].premium - selected.legs[1].premium} 
            type={selected.legs[0].type as 'CE' | 'PE'} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default StrategyBuilder;
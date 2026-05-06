import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldAlert } from 'lucide-react';

const RiskCalculator = () => {
  const [capital, setCapital] = useState(100000);
  const [riskPercent, setRiskPercent] = useState(1);
  const [entryPrice, setEntryPrice] = useState(2500);
  const [stopLoss, setStopLoss] = useState(2450);

  const riskAmount = (capital * riskPercent) / 100;
  const riskPerShare = entryPrice - stopLoss;
  const quantity = riskPerShare > 0 ? Math.floor(riskAmount / riskPerShare) : 0;
  const totalValue = quantity * entryPrice;

  return (
    <Card className="border-white/5 shadow-2xl bg-slate-900/40 backdrop-blur-xl rounded-2xl overflow-hidden glass-panel">
      <CardHeader className="border-b border-white/5 bg-white/5">
        <CardTitle className="flex items-center gap-2 text-lg font-bold text-white">
          <ShieldAlert className="text-primary" />
          Risk Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-white/50 font-semibold text-xs uppercase tracking-wider">Capital (₹)</Label>
            <Input 
              type="number" 
              value={capital} 
              onChange={(e) => setCapital(Number(e.target.value))}
              className="bg-white/5 border-white/10 rounded-xl h-12 text-white focus:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/50 font-semibold text-xs uppercase tracking-wider">Risk (%)</Label>
            <Input 
              type="number" 
              value={riskPercent} 
              onChange={(e) => setRiskPercent(Number(e.target.value))}
              className="bg-white/5 border-white/10 rounded-xl h-12 text-white focus:ring-primary"
            />
          </div>
        </div>

        <div className="p-5 bg-primary/5 rounded-2xl space-y-4 border border-primary/10">
          <div className="flex justify-between items-center">
            <span className="text-white/40 text-sm font-medium">Max Risk</span>
            <span className="font-bold text-destructive">₹{riskAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/40 text-sm font-medium">Quantity</span>
            <span className="font-bold text-primary">{quantity} Shares</span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-white/5">
            <span className="text-white/60 text-sm font-bold">Total Value</span>
            <span className="font-black text-white text-lg">₹{totalValue.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskCalculator;
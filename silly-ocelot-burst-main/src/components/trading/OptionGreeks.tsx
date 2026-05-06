import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Zap } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface GreekProps {
  label: string;
  value: string;
  desc: string;
  color: string;
}

const GreekItem = ({ label, value, desc, color }: GreekProps) => (
  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center text-center">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="text-[10px] text-slate-500 uppercase font-bold cursor-help flex items-center gap-1">
            {label} <Info size={10} />
          </span>
        </TooltipTrigger>
        <TooltipContent className="bg-slate-900 border-slate-800 text-xs max-w-[200px]">
          {desc}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <p className={`text-lg font-bold mt-1 ${color}`}>{value}</p>
  </div>
);

const OptionGreeks = ({ strike }: { strike: number }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        < Zap className="text-yellow-500 w-4 h-4" />
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Option Greeks (Pro)</h4>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <GreekItem 
          label="Delta" 
          value="0.52" 
          color="text-blue-400"
          desc="Price change sensitivity. 0.52 means for every ₹1 move in NIFTY, option moves ₹0.52."
        />
        <GreekItem 
          label="Theta" 
          value="-12.4" 
          color="text-red-400"
          desc="Time decay. You lose ₹12.4 every day just by holding this option."
        />
        <GreekItem 
          label="Gamma" 
          value="0.002" 
          color="text-purple-400"
          desc="Rate of change of Delta. High gamma means delta changes quickly."
        />
        <GreekItem 
          label="Vega" 
          value="8.5" 
          color="text-orange-400"
          desc="Volatility sensitivity. If IV increases by 1%, option price rises by ₹8.5."
        />
      </div>
      <p className="text-[10px] text-slate-500 italic text-center">
        "Greeks samajhna matlab option trading ki ABCD seekhna!" - TradeGuru AI
      </p>
    </div>
  );
};

export default OptionGreeks;
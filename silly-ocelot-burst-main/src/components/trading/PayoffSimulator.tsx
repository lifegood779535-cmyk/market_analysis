import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Info } from 'lucide-react';

interface PayoffSimulatorProps {
  strike: number;
  premium: number;
  type: 'CE' | 'PE';
}

const PayoffSimulator = ({ strike, premium, type }: PayoffSimulatorProps) => {
  const generateData = () => {
    const data = [];
    const range = 500;
    const step = 50;
    
    for (let price = strike - range; price <= strike + range; price += step) {
      let profit = 0;
      if (type === 'CE') {
        profit = Math.max(0, price - strike) - premium;
      } else {
        profit = Math.max(0, strike - price) - premium;
      }
      data.push({ price, profit });
    }
    return data;
  };

  const data = generateData();
  const breakEven = type === 'CE' ? strike + premium : strike - premium;

  return (
    <Card className="bg-slate-900 border-slate-800 text-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Info className="text-blue-500 w-4 h-4" />
          Payoff Simulator: {type} {strike}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis 
                dataKey="price" 
                stroke="#64748b" 
                fontSize={10} 
                tickFormatter={(val) => `₹${val}`}
              />
              <YAxis 
                stroke="#64748b" 
                fontSize={10} 
                tickFormatter={(val) => `₹${val}`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                labelStyle={{ color: '#94a3b8' }}
              />
              <ReferenceLine y={0} stroke="#475569" strokeWidth={2} />
              <ReferenceLine x={strike} stroke="#3b82f6" strokeDasharray="3 3" label={{ position: 'top', value: 'Strike', fill: '#3b82f6', fontSize: 10 }} />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke={type === 'CE' ? '#10b981' : '#ef4444'} 
                strokeWidth={3} 
                dot={false} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <p className="text-[10px] text-slate-500 uppercase font-bold">Break-even</p>
            <p className="font-bold text-sm">₹{breakEven.toLocaleString()}</p>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <p className="text-[10px] text-slate-500 uppercase font-bold">Max Loss</p>
            <p className="font-bold text-sm text-red-500">₹{premium.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PayoffSimulator;
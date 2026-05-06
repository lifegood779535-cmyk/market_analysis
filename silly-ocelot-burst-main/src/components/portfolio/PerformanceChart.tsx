"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const DATA = [
  { date: 'Mon', value: 100000 },
  { date: 'Tue', value: 102500 },
  { date: 'Wed', value: 101200 },
  { date: 'Thu', value: 104800 },
  { date: 'Fri', value: 106500 },
  { date: 'Sat', value: 106500 },
  { date: 'Sun', value: 108200 },
];

const PerformanceChart = () => {
  return (
    <Card className="bg-slate-900 border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl">
      <CardHeader className="p-6 border-b border-slate-800 flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#00D09C]/10 rounded-xl text-[#00D09C]">
            <TrendingUp size={20} />
          </div>
          <CardTitle className="text-lg font-bold text-white">Equity Curve</CardTitle>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Return</p>
          <p className="text-lg font-bold text-[#00D09C]">+8.2%</p>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={DATA}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00D09C" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00D09C" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis 
                dataKey="date" 
                stroke="#64748b" 
                fontSize={10} 
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#64748b" 
                fontSize={10} 
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `₹${val/1000}k`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                itemStyle={{ color: '#00D09C', fontWeight: 'bold' }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#00D09C" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
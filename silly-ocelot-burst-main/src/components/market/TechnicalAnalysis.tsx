"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Activity, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TechnicalAnalysisProps {
  symbol: string;
}

const TechnicalAnalysis = ({ symbol }: TechnicalAnalysisProps) => {
  // Simulated technical data
  const indicators = [
    { name: 'RSI (14)', value: 62, status: 'Neutral', color: 'text-blue-500' },
    { name: 'MACD', value: 'Bullish Crossover', status: 'Buy', color: 'text-[#00D09C]' },
    { name: 'Moving Avg (20)', value: 'Above', status: 'Bullish', color: 'text-[#00D09C]' },
    { name: 'Bollinger Bands', value: 'Upper Band', status: 'Overbought', color: 'text-red-500' },
  ];

  const buyStrength = 65; // 0-100

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Activity className="text-blue-500 w-4 h-4" />
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Technical Summary</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Overall Signal</p>
              <p className="text-2xl font-bold text-[#00D09C]">Strong Buy</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 uppercase font-bold">Confidence</p>
              <p className="text-sm font-bold text-blue-500">82%</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase">
              <span className="text-red-500">Sell</span>
              <span className="text-slate-400">Neutral</span>
              <span className="text-[#00D09C]">Buy</span>
            </div>
            <Progress value={buyStrength} className="h-2 bg-slate-100" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {indicators.map((ind) => (
            <div key={ind.name} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-[8px] text-slate-400 uppercase font-bold mb-1">{ind.name}</p>
              <p className="text-xs font-bold text-slate-900">{ind.value}</p>
              <p className={cn("text-[10px] font-bold mt-1", ind.color)}>{ind.status}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl">
        <h5 className="text-xs font-bold text-blue-600 mb-2 flex items-center gap-2">
          <TrendingUp size={14} /> AI Technical Insight
        </h5>
        <p className="text-xs text-slate-600 leading-relaxed italic">
          "{symbol} abhi strong momentum me hai. RSI 60+ hai matlab trend bullish hai, lekin 70 ke paas profit booking aa sakti hai. Support ₹{Math.round(2900)} par hai. 📊"
        </p>
      </div>
    </div>
  );
};

export default TechnicalAnalysis;
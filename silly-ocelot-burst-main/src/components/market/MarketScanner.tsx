"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTrading } from '@/hooks/useTrading';
import { Scan, Zap, TrendingUp, TrendingDown, Target, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const MarketScanner = () => {
  const [scans, setScans] = useState<any[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const { marketData } = useTrading();

  const runScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const results = marketData.map(stock => {
        const patterns = [];
        if (stock.change > 30) patterns.push({ name: 'Bullish Breakout', type: 'bullish', icon: TrendingUp });
        if (stock.change < -30) patterns.push({ name: 'Bearish Breakdown', type: 'bearish', icon: TrendingDown });
        if (Math.random() > 0.7) patterns.push({ name: 'Volume Spike', type: 'neutral', icon: Zap });
        
        return { ...stock, patterns };
      }).filter(s => s.patterns.length > 0);
      
      setScans(results);
      setIsScanning(false);
    }, 1500);
  };

  useEffect(() => {
    runScan();
    const interval = setInterval(runScan, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="border-white/5 shadow-2xl bg-slate-900/40 backdrop-blur-xl rounded-2xl overflow-hidden glass-panel">
      <CardHeader className="pb-4 border-b border-white/5 bg-white/5">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm flex items-center gap-2 font-bold text-white">
            <Scan className={cn("text-primary w-4 h-4", isScanning && "animate-pulse")} />
            AI Pattern Scanner
          </CardTitle>
          <Badge variant="outline" className="text-[10px] border-primary/30 text-primary font-bold">
            {isScanning ? "SCANNING..." : "LIVE"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-white/5">
          {scans.length === 0 ? (
            <div className="p-8 text-center text-white/40 text-xs italic">
              Scanning market for patterns...
            </div>
          ) : (
            scans.map((scan) => (
              <div key={scan.symbol} className="p-4 hover:bg-white/5 transition-colors group">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors">{scan.symbol}</h4>
                    <p className="text-[10px] text-white/40 font-medium">₹{scan.price.toLocaleString()}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {scan.patterns.map((p: any, i: number) => (
                      <Badge 
                        key={i} 
                        className={cn(
                          "text-[8px] px-2 py-0.5 flex items-center gap-1 border-none font-black uppercase tracking-tighter",
                          p.type === 'bullish' ? "bg-primary/10 text-primary" :
                          p.type === 'bearish' ? "bg-destructive/10 text-destructive" : "bg-blue-500/10 text-blue-400"
                        )}
                      >
                        <p.icon size={8} /> {p.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketScanner;
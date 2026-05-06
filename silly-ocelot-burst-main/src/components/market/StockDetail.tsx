"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Info, Zap, ShieldCheck, Activity, BarChart, Share2, Gauge, Bell, LayoutGrid } from 'lucide-react';
import OptionGreeks from '@/components/trading/OptionGreeks';
import MarketDepth from '@/components/market/MarketDepth';
import CandlestickChart from '@/components/market/CandlestickChart';
import PriceAlertModal from '@/components/notifications/PriceAlertModal';
import TechnicalAnalysis from '@/components/market/TechnicalAnalysis';
import { showSuccess } from '@/utils/toast';
import { generateAISignal } from '@/utils/marketData';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface StockDetailProps {
  isOpen: boolean;
  onClose: () => void;
  stock: {
    symbol: string;
    price: number;
    change: number;
    trend: string;
  };
  onTrade: (type: 'BUY' | 'SELL') => void;
}

const MOCK_CANDLE_DATA = [
  { time: '2024-05-20', open: 2940, high: 2960, low: 2935, close: 2955 },
  { time: '2024-05-21', open: 2955, high: 2980, low: 2950, close: 2970 },
  { time: '2024-05-22', open: 2970, high: 2975, low: 2955, close: 2960 },
  { time: '2024-05-23', open: 2960, high: 2995, low: 2958, close: 2985 },
  { time: '2024-05-24', open: 2985, high: 2990, low: 2970, close: 2975 },
  { time: '2024-05-25', open: 2975, high: 3005, low: 2975, close: 2990 },
  { time: '2024-05-26', open: 2990, high: 3000, low: 2980, close: 2985 },
];

const StockDetail = ({ isOpen, onClose, stock, onTrade }: StockDetailProps) => {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const aiSignal = generateAISignal(stock.symbol);
  
  const handleShare = () => {
    showSuccess(`Analysis for ${stock.symbol} shared with the community! 🚀`);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-slate-950 border-white/5 text-white sm:max-w-[850px] p-0 overflow-hidden rounded-[2.5rem] shadow-2xl glass-panel">
          <div className="p-8 border-b border-white/5 bg-white/5 backdrop-blur-xl">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-3xl font-black text-white tracking-tight">{stock.symbol}</h2>
                  <Badge className="bg-white/10 text-white/60 border-none font-bold uppercase text-[9px] tracking-widest px-3">
                    NSE India
                  </Badge>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                    <Activity size={12} className="text-primary animate-pulse" />
                    <span className="text-[9px] font-black text-primary uppercase tracking-widest">Live</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-black text-white tracking-tighter">₹{stock.price.toLocaleString()}</span>
                  <span className={cn(
                    "text-xl font-black tracking-tight",
                    stock.change > 0 ? "text-primary" : "text-destructive"
                  )}>
                    {stock.change > 0 ? '+' : ''}{stock.change} ({((stock.change/stock.price)*100).toFixed(2)}%)
                  </span>
                </div>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <Button variant="outline" size="icon" onClick={() => setIsAlertModalOpen(true)} className="h-14 w-14 border-white/5 text-yellow-500 bg-white/5 hover:bg-yellow-500/10 rounded-2xl transition-all">
                  <Bell size={20} />
                </Button>
                <Button variant="outline" size="icon" onClick={handleShare} className="h-14 w-14 border-white/5 text-white/40 hover:text-white bg-white/5 rounded-2xl transition-all">
                  <Share2 size={20} />
                </Button>
                <Button onClick={() => onTrade('BUY')} className="flex-1 md:flex-none h-14 bg-primary hover:bg-primary/90 text-white font-black px-10 rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95 uppercase tracking-widest">BUY</Button>
                <Button onClick={() => onTrade('SELL')} variant="outline" className="flex-1 md:flex-none h-14 border-destructive text-destructive hover:bg-destructive hover:text-white font-black px-10 rounded-2xl transition-all active:scale-95 uppercase tracking-widest">SELL</Button>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8 max-h-[75vh] overflow-y-auto bg-black/20 custom-scrollbar">
            <Tabs defaultValue="chart" className="w-full">
              <TabsList className="bg-white/5 border border-white/5 p-1.5 h-14 rounded-2xl mb-8 shadow-inner">
                <TabsTrigger value="chart" className="flex items-center gap-2 rounded-xl px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-white transition-all uppercase text-[10px] tracking-widest">
                  <BarChart size={14} /> Chart
                </TabsTrigger>
                <TabsTrigger value="technical" className="flex items-center gap-2 rounded-xl px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-white transition-all uppercase text-[10px] tracking-widest">
                  <Activity size={14} /> Technicals
                </TabsTrigger>
                <TabsTrigger value="options" className="flex items-center gap-2 rounded-xl px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-white transition-all uppercase text-[10px] tracking-widest">
                  <LayoutGrid size={14} /> Options
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chart" className="space-y-8 focus-visible:outline-none">
                <div className="bg-white/5 rounded-3xl p-6 border border-white/5 shadow-2xl overflow-hidden">
                  <CandlestickChart data={MOCK_CANDLE_DATA} />
                </div>
                <div className="bg-white/5 rounded-3xl p-6 border border-white/5 shadow-2xl">
                  <MarketDepth basePrice={stock.price} />
                </div>
              </TabsContent>

              <TabsContent value="technical" className="space-y-8 focus-visible:outline-none">
                <div className="bg-white/5 rounded-3xl p-8 border border-white/5 shadow-2xl">
                  <TechnicalAnalysis symbol={stock.symbol} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/5 shadow-2xl space-y-4 group hover:border-primary/30 transition-all">
                    <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest flex items-center gap-2">
                      <Zap size={14} className="text-yellow-500" />
                      AI Pundit Analysis
                    </h4>
                    <div className="flex items-start gap-4">
                      <Badge className={cn(
                        "shrink-0 font-black px-3 py-1 text-[10px] tracking-widest",
                        aiSignal.signal === 'BUY' ? "bg-primary/20 text-primary border border-primary/30" :
                        aiSignal.signal === 'SELL' ? "bg-destructive/20 text-destructive border border-destructive/30" : "bg-white/5 text-white/40"
                      )}>
                        {aiSignal.signal}
                      </Badge>
                      <p className="text-sm text-white/70 italic leading-relaxed font-medium">
                        "{aiSignal.explanation}"
                      </p>
                    </div>
                  </div>
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/5 shadow-2xl space-y-4 group hover:border-blue-500/30 transition-all">
                    <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest flex items-center gap-2">
                      <Gauge size={14} className="text-purple-500" />
                      RSI (14)
                    </h4>
                    <div className="text-center">
                      <p className={cn(
                        "text-4xl font-black tracking-tight",
                        aiSignal.rsi > 70 ? "text-destructive" : aiSignal.rsi < 30 ? "text-primary" : "text-blue-400"
                      )}>
                        {aiSignal.rsi}
                      </p>
                      <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mt-2">
                        {aiSignal.rsi > 70 ? "Overbought" : aiSignal.rsi < 30 ? "Oversold" : "Neutral"}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="options" className="space-y-8 focus-visible:outline-none">
                <div className="bg-white/5 rounded-3xl p-8 border border-white/5 shadow-2xl">
                  <OptionGreeks strike={stock.price} />
                </div>
                <div className="p-8 bg-white/5 rounded-3xl border border-white/5 shadow-2xl">
                  <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-6">Option Chain Summary</h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/5 group hover:border-blue-500/30 transition-all">
                      <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-2">Max Pain</p>
                      <p className="text-2xl font-black text-blue-400">₹{Math.round(stock.price / 100) * 100}</p>
                    </div>
                    <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/5 group hover:border-primary/30 transition-all">
                      <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-2">PCR (OI)</p>
                      <p className="text-2xl font-black text-primary">1.12</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>

      <PriceAlertModal 
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        symbol={stock.symbol}
        currentPrice={stock.price}
      />
    </>
  );
};

export default StockDetail;
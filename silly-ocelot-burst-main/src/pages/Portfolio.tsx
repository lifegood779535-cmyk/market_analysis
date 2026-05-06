"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import MobileHeader from '@/components/layout/MobileHeader';
import TradeHistory from '@/components/portfolio/TradeHistory';
import PortfolioHealth from '@/components/portfolio/PortfolioHealth';
import TradingJournal from '@/components/portfolio/TradingJournal';
import Achievements from '@/components/portfolio/Achievements';
import Leaderboard from '@/components/social/Leaderboard';
import PerformanceChart from '@/components/portfolio/PerformanceChart';
import { useTrading } from '@/hooks/useTrading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, TrendingDown, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

const Portfolio = () => {
    const { positions, balance, squareOff } = useTrading();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    const totalInvested = positions.reduce((acc, p) => acc + (p.avgPrice * p.quantity), 0);
    const totalPnL = positions.reduce((acc, p) => acc + p.pnl, 0);
    const totalValue = balance + totalInvested + totalPnL;

    const handleSquareOff = async (symbol: string) => {
      const success = await squareOff(symbol);
      if (success) {
        // success toast is handled or can be added here
      }
    };

    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col lg:flex-row font-sans selection:bg-primary/30">
        <MobileHeader isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <main className="flex-1 lg:ml-64 p-8 lg:p-14 mt-16 lg:mt-0 relative">
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 relative z-10">
            <div className="space-y-2">
              <h1 className="text-5xl font-black tracking-tighter">My Portfolio</h1>
              <p className="text-white/40 font-medium text-lg tracking-wide uppercase text-[10px]">Financial Command Center</p>
            </div>
            <div className="flex items-center gap-4 p-3 bg-white/5 rounded-3xl border border-white/5 shadow-inner backdrop-blur-xl">
               <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/20 shadow-lg shadow-primary/5">
                 <Briefcase className="text-primary w-6 h-6" />
               </div>
               <div>
                  <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">Active Assets</p>
                  <p className="text-xl font-black text-white">{positions.length}</p>
               </div>
            </div>
          </div>
  
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-10 relative z-10">
            <div className="lg:col-span-2 space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <Card className="bg-slate-900/50 border-white/5 p-10 rounded-[2.5rem] shadow-2xl glass-panel relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-3">Total Net Worth</p>
                  <p className="text-5xl font-black tracking-tighter tabular-nums">₹{totalValue.toLocaleString()}</p>
                  <div className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm mt-6 font-black uppercase tracking-widest shadow-lg", totalPnL >= 0 ? "bg-primary/20 text-primary border border-primary/20" : "bg-destructive/20 text-destructive border border-destructive/20")}>
                    {totalPnL >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    ₹{Math.abs(totalPnL).toLocaleString()}
                  </div>
                </Card>
                <Card className="bg-slate-900/50 border-white/5 p-10 rounded-[2.5rem] shadow-2xl glass-panel relative overflow-hidden group">
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-3">Available Capital</p>
                  <p className="text-5xl font-black tracking-tighter tabular-nums text-white/90">₹{balance.toLocaleString()}</p>
                  <button className="text-sm font-black text-primary mt-6 hover:text-white transition-colors uppercase tracking-[0.2em] flex items-center gap-2">
                    Inject Liquidity 
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  </button>
                </Card>
              </div>
  
              <PerformanceChart />
  
              <Achievements />
  
              <Card className="bg-slate-900/40 border-white/5 overflow-hidden rounded-[2.5rem] shadow-2xl glass-panel">
                <CardHeader className="p-10 pb-6 border-b border-white/5 bg-black/20">
                  <CardTitle className="text-xl font-black tracking-tight flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                      <Briefcase className="text-primary w-5 h-5" />
                    </div>
                    Market Exposure
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/5 hover:bg-transparent h-16">
                        <TableHead className="text-white/20 font-black uppercase tracking-[0.2em] text-[10px] pl-10">Ticker</TableHead>
                        <TableHead className="text-white/20 font-black uppercase tracking-[0.2em] text-[10px]">Volume</TableHead>
                        <TableHead className="text-white/20 font-black uppercase tracking-[0.2em] text-[10px] text-right">Realized P&L</TableHead>
                        <TableHead className="text-white/20 font-black uppercase tracking-[0.2em] text-[10px] text-right pr-10">Operation</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {positions.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-20 text-white/20 text-xs font-bold uppercase tracking-widest italic">
                            No Active Exposure. Deploy Capital! ⚡
                          </TableCell>
                        </TableRow>
                      ) : (
                        positions.map((pos) => (
                          <TableRow key={pos.symbol} className="border-white/5 hover:bg-white/5 transition-colors h-24">
                            <TableCell className="font-black text-lg tracking-tight pl-10">{pos.symbol}</TableCell>
                            <TableCell className="font-bold text-white/60 tabular-nums">{pos.quantity} Units</TableCell>
                            <TableCell className={cn("text-right font-black text-xl tabular-nums tracking-tighter", pos.pnl >= 0 ? "text-primary drop-shadow-[0_0_10px_rgba(0,208,156,0.3)]" : "text-destructive drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]")}>
                              {pos.pnl >= 0 ? '+' : ''}₹{pos.pnl.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right pr-10">
                              <button 
                                onClick={() => handleSquareOff(pos.symbol)}
                                className="bg-destructive/10 hover:bg-destructive text-destructive hover:text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-destructive/20 active:scale-90 shadow-lg"
                              >
                                Exit Position
                              </button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
  
              <TradeHistory />
            </div>
  
            <div className="space-y-10">
              <PortfolioHealth />
              <Leaderboard />
              <TradingJournal />
            </div>
          </div>
        </main>
      </div>
  );
};

export default Portfolio;
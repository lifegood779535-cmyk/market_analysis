import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getOptionChainData } from '@/api/backend';
import { cn } from '@/lib/utils';
import { Info, Loader2 } from 'lucide-react';
import { useTrading } from '@/hooks/useTrading';
import { toast } from 'sonner';

const OptionChainView = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('NIFTY 50');
  const [optionData, setOptionData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { executeTrade, livePrices, dataSource, marketData } = useTrading();
  
  const spotPrice = livePrices[selectedSymbol] || (marketData.find(s => s.symbol === selectedSymbol)?.price || 0);

  const fetchData = async () => {
    try {
      const data = await getOptionChainData(selectedSymbol);
      if (data && data.length > 0) {
        setOptionData(data);
      }
    } catch (error) {
      console.error('Failed to fetch options:', error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData().finally(() => setLoading(false));

    const interval = setInterval(fetchData, 5000); // Auto-refresh every 5s
    return () => clearInterval(interval);
  }, [selectedSymbol]);

  const handleTrade = async (strike: number, type: 'CE' | 'PE', price: number) => {
    const symbol = `${selectedSymbol} ${strike} ${type}`;
    const success = await executeTrade({
      symbol,
      type: 'BUY',
      price,
      quantity: 50, // Default lot size
      assetType: 'OPTION'
    });

    if (success) {
      toast.success(`Bought 50 qty of ${symbol} at ₹${price}`);
    } else {
      toast.error('Insufficient balance to execute trade');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 glass-panel p-6 rounded-[2rem]">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white">Live Option Chain</h2>
            <span className={cn(
              "px-2 py-0.5 rounded-md text-[8px] font-black tracking-widest border",
              dataSource === 'LIVE' ? "bg-primary/10 border-primary/30 text-primary" : "bg-orange-400/10 border-orange-400/30 text-orange-400"
            )}>
              {dataSource}
            </span>
          </div>
          <p className="text-white/40 text-xs font-medium">Real-time Greeks and OI data for {selectedSymbol}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-white/50 uppercase tracking-widest">Symbol:</span>
          <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
            <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white rounded-xl h-11">
              <SelectValue placeholder="Select symbol" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-white/10 text-white rounded-xl">
              {marketData.map(stock => (
                <SelectItem key={stock.symbol} value={stock.symbol} className="hover:bg-white/10">
                  {stock.symbol}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="glass-panel rounded-[2.5rem] overflow-hidden border-white/10 relative min-h-[500px] shadow-2xl bg-slate-900/40">
        {loading && (
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex flex-col items-center justify-center space-y-6">
            <div className="relative">
              <Loader2 className="w-16 h-16 text-primary animate-spin" />
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-white font-black text-xl tracking-tighter uppercase">Syncing Option Matrix</p>
              <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em]">Quantum Data Feed Active</p>
            </div>
          </div>
        )}
        <div className="overflow-x-auto custom-scrollbar">
          <Table>
            <TableHeader>
              <TableRow className="border-white/5 hover:bg-transparent bg-black/40 h-20">
                <TableHead colSpan={2} className="text-center text-primary font-black py-4 text-[11px] tracking-[0.3em] uppercase border-r border-white/5 shadow-inner">Calls (CE)</TableHead>
                <TableHead className="text-center text-white/20 font-black py-4 text-[11px] tracking-[0.3em] uppercase border-r border-white/5">Strike</TableHead>
                <TableHead colSpan={2} className="text-center text-destructive font-black py-4 text-[11px] tracking-[0.3em] uppercase shadow-inner">Puts (PE)</TableHead>
              </TableRow>
              <TableRow className="border-white/5 hover:bg-transparent bg-white/5 h-12">
                <TableHead className="text-center text-white/30 font-black text-[9px] tracking-widest uppercase">Open Interest</TableHead>
                <TableHead className="text-center text-white/30 font-black text-[9px] tracking-widest uppercase border-r border-white/5">Last Price</TableHead>
                <TableHead className="text-center text-white/10 font-black text-xs border-r border-white/5">Index</TableHead>
                <TableHead className="text-center text-white/30 font-black text-[9px] tracking-widest uppercase border-r border-white/5">Last Price</TableHead>
                <TableHead className="text-center text-white/30 font-black text-[9px] tracking-widest uppercase">Open Interest</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {optionData.length === 0 && !loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-32 text-white/20 font-black uppercase tracking-widest italic">
                    Matrix Offline. Select another symbol or check connectivity. 📡
                  </TableCell>
                </TableRow>
              ) : (
                optionData.map((row, idx) => {
                  const isITM_CE = row.strike < spotPrice;
                  const isITM_PE = row.strike > spotPrice;
                  
                  return (
                    <TableRow key={idx} className="border-white/5 hover:bg-white/5 transition-colors h-16 group">
                      <TableCell className={cn(
                        "text-center font-bold text-xs tabular-nums transition-colors",
                        isITM_CE ? "bg-primary/10 text-primary/60" : "text-white/30"
                      )}>
                        {row.ce.oi.toLocaleString()}
                      </TableCell>
                      <TableCell 
                        className={cn(
                          "text-center font-black text-sm py-4 border-r border-white/5 cursor-pointer hover:bg-primary/20 transition-all tabular-nums",
                          isITM_CE ? "bg-primary/20 text-primary shadow-inner" : "text-white"
                        )}
                        onClick={() => handleTrade(row.strike, 'CE', row.ce.price)}
                      >
                        ₹{row.ce.price.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-center font-black text-white text-base bg-white/5 border-r border-white/5 shadow-2xl z-10 relative">
                        <div className="absolute inset-0 bg-white/5 pointer-events-none" />
                        <span className="relative z-10">{row.strike}</span>
                      </TableCell>
                      <TableCell 
                        className={cn(
                          "text-center font-black text-sm py-4 border-r border-white/5 cursor-pointer hover:bg-destructive/20 transition-all tabular-nums",
                          isITM_PE ? "bg-destructive/20 text-destructive shadow-inner" : "text-white"
                        )}
                        onClick={() => handleTrade(row.strike, 'PE', row.pe.price)}
                      >
                        ₹{row.pe.price.toFixed(2)}
                      </TableCell>
                      <TableCell className={cn(
                        "text-center font-bold text-xs tabular-nums transition-colors",
                        isITM_PE ? "bg-destructive/10 text-destructive/60" : "text-white/30"
                      )}>
                        {row.pe.oi.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex items-center gap-2 p-4 bg-white/5 rounded-2xl border border-white/10">
        <Info size={14} className="text-primary" />
        <p className="text-[10px] text-white/40 font-medium italic">
          Tip: Shaded rows represent "In-The-Money" (ITM) options. Spot Price: ₹{spotPrice.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default OptionChainView;

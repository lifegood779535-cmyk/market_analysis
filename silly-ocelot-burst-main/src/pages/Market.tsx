"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import MobileHeader from '@/components/layout/MobileHeader';
import AlertCenter from '@/components/notifications/AlertCenter';
import NewsFeed from '@/components/market/NewsFeed';
import FIIDIIActivity from '@/components/market/FIIDIIActivity';
import RiskCalculator from '@/components/trading/RiskCalculator';
import MarketScanner from '@/components/market/MarketScanner';
import MarketAnalytics from '@/components/market/MarketAnalytics';
import StockDetail from '@/components/market/StockDetail';
import TradeModal from '@/components/trading/TradeModal';
import MarketHeatmap from '@/components/market/MarketHeatmap';
import OptionChainView from '@/components/market/OptionChainView';
import MarketPrediction from '@/components/market/MarketPrediction';
import { useTrading } from '@/hooks/useTrading';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, LayoutGrid, List, LineChart, TrendingUp, TrendingDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { showSuccess } from '@/utils/toast';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const Market = () => {
  const { balance, executeTrade, livePrices, dataSource, marketData } = useTrading();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState('ALL');
  const navigate = useNavigate();
  
  const [tradeConfig, setTradeConfig] = useState<{ isOpen: boolean, type: 'BUY' | 'SELL', stock: any }>({
    isOpen: false,
    type: 'BUY',
    stock: null
  });

  const filteredStocks = marketData.filter(stock => {
    const matchesSearch = stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         stock.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = sectorFilter === 'ALL' || stock.type === sectorFilter;
    return matchesSearch && matchesSector;
  });

  const handleTrade = (stock: any, type: 'BUY' | 'SELL') => {
    const currentPrice = livePrices[stock.symbol] || stock.price;
    setTradeConfig({ isOpen: true, type, stock: { ...stock, price: currentPrice } });
  };

  const onExecuteTrade = async (quantity: number) => {
    const success = await executeTrade({
      symbol: tradeConfig.stock.symbol,
      type: tradeConfig.type,
      price: tradeConfig.stock.price,
      quantity,
      assetType: 'STOCK'
    });

    if (success) {
      showSuccess(`${tradeConfig.type} order for ${quantity} shares of ${tradeConfig.stock.symbol} executed! 🚀`);
      setTradeConfig({ ...tradeConfig, isOpen: false });
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col lg:flex-row font-sans">
      <MobileHeader isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="flex-1 lg:ml-64 p-6 lg:p-10 mt-16 lg:mt-0 overflow-x-hidden">
        <div className="max-w-[1400px] mx-auto space-y-10">
          {/* Top Header */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-4">
                <h1 className="text-3xl font-bold tracking-tight text-white">Market Watch</h1>
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-black tracking-widest border animate-in fade-in zoom-in duration-500",
                  dataSource === 'LIVE' ? "bg-primary/10 border-primary/30 text-primary" : "bg-orange-400/10 border-orange-400/30 text-orange-400"
                )}>
                  <span className={cn("inline-block w-1.5 h-1.5 rounded-full mr-2 animate-pulse", dataSource === 'LIVE' ? "bg-primary" : "bg-orange-400")} />
                  {dataSource} FEED
                </span>
              </div>
              <p className="text-white/60">Live market analysis and execution hub.</p>
            </div>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
              <Input 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search stocks, indices..." 
                className="glass-panel text-white placeholder:text-white/40 border-white/10 h-14 pl-12 rounded-2xl focus-visible:ring-primary transition-all duration-300" 
              />
            </div>
          </div>

          {/* Market Summary / Heatmap */}
          <div className="glass-panel p-8 rounded-[2.5rem] border-white/10">
            <MarketHeatmap />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
            {/* Main Tabs Section */}
            <div className="xl:col-span-3 space-y-8">
              <Tabs defaultValue="stocks" className="space-y-8">
                <TabsList className="glass-panel p-1.5 h-14 rounded-2xl w-full max-w-2xl border-white/10">
                  <TabsTrigger value="stocks" className="flex-1 rounded-xl text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all">Stocks</TabsTrigger>
                  <TabsTrigger value="options" className="flex-1 rounded-xl text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">Option Chain</TabsTrigger>
                  <TabsTrigger value="prediction" className="flex-1 rounded-xl text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">AI Prediction</TabsTrigger>
                  <TabsTrigger value="analytics" className="flex-1 rounded-xl text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">Advanced Analytics</TabsTrigger>
                </TabsList>

                {/* Stocks Tab */}
                <TabsContent value="stocks" className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                  <div className="flex justify-between items-center glass-panel p-4 rounded-[2rem] border-white/5">
                     <div className="flex items-center gap-6 px-4">
                       <button onClick={() => setSectorFilter('ALL')} className={cn("text-sm font-bold transition-colors", sectorFilter === 'ALL' ? "text-primary" : "text-white/40 hover:text-white")}>All Markets</button>
                       <button onClick={() => setSectorFilter('INDEX')} className={cn("text-sm font-bold transition-colors", sectorFilter === 'INDEX' ? "text-primary" : "text-white/40 hover:text-white")}>Indices</button>
                       <button onClick={() => setSectorFilter('STOCK')} className={cn("text-sm font-bold transition-colors", sectorFilter === 'STOCK' ? "text-primary" : "text-white/40 hover:text-white")}>Stocks</button>
                     </div>
                     <div className="flex gap-2 pr-4">
                       <Button variant="ghost" size="icon" className="hover:bg-white/10 rounded-xl text-white/70"><List size={18} /></Button>
                       <Button variant="ghost" size="icon" className="hover:bg-white/10 rounded-xl text-white/70"><LayoutGrid size={18} /></Button>
                     </div>
                  </div>

                  <Card className="glass-panel rounded-[2.5rem] overflow-hidden border-white/10">
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-white/5 hover:bg-transparent bg-white/5">
                            <TableHead className="pl-8 text-white/50 font-bold py-6 text-[10px] tracking-widest uppercase">Symbol</TableHead>
                            <TableHead className="text-white/50 font-bold text-[10px] tracking-widest uppercase">Price</TableHead>
                            <TableHead className="text-white/50 font-bold text-[10px] tracking-widest uppercase">Change</TableHead>
                            <TableHead className="text-right pr-8 text-white/50 font-bold text-[10px] tracking-widest uppercase">Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredStocks.map((stock) => {
                            const currentPrice = stock.price;
                            const priceChange = stock.change;
                            
                            return (
                              <TableRow 
                                key={stock.symbol} 
                                className="border-white/5 hover:bg-white/5 transition-colors cursor-pointer group"
                                onClick={() => setSelectedStock({ ...stock, price: currentPrice })}
                              >
                                <TableCell className="pl-8 py-6">
                                  <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center font-bold text-white shadow-inner border border-white/10 group-hover:border-primary/50 transition-all">
                                      {stock.symbol[0]}
                                    </div>
                                    <div>
                                      <p className="font-bold text-white text-base group-hover:text-primary transition-colors">{stock.symbol}</p>
                                      <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider mt-0.5">{stock.name}</p>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="font-bold text-white text-base tabular-nums">₹{currentPrice.toLocaleString()}</TableCell>
                                <TableCell className={cn("font-bold tabular-nums", priceChange >= 0 ? "text-primary" : "text-destructive")}>
                                  <div className="flex items-center gap-1">
                                    {priceChange >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                    {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}
                                  </div>
                                </TableCell>
                                <TableCell className="text-right pr-8">
                                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                                    <Button 
                                      size="sm" 
                                      onClick={(e) => { e.stopPropagation(); handleTrade(stock, 'BUY'); }}
                                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl px-6 h-10 shadow-[0_0_15px_rgba(0,208,156,0.3)]"
                                    >
                                      BUY
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={(e) => { e.stopPropagation(); handleTrade(stock, 'SELL'); }}
                                      className="border-destructive/50 text-destructive hover:bg-destructive/10 hover:border-destructive font-bold rounded-xl px-6 h-10"
                                    >
                                      SELL
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Option Chain Tab */}
                <TabsContent value="options" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <OptionChainView />
                </TabsContent>

                {/* Analytics Tab */}
                <TabsContent value="analytics" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <MarketAnalytics />
                </TabsContent>

                {/* AI Prediction Tab */}
                <TabsContent value="prediction" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-8">
                    <MarketPrediction symbol={selectedStock?.symbol || 'NIFTY 50'} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <MarketPrediction symbol="BANKNIFTY" />
                      <MarketPrediction symbol="FINNIFTY" />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar Section */}
            <div className="space-y-8">
               <FIIDIIActivity />
               <RiskCalculator />
               <MarketScanner />
               <NewsFeed />
               <AlertCenter />
            </div>
          </div>
        </div>
      </main>

      {selectedStock && (
        <StockDetail 
          isOpen={!!selectedStock} 
          onClose={() => setSelectedStock(null)} 
          stock={selectedStock}
          onTrade={(type) => handleTrade(selectedStock, type)}
        />
      )}

      {tradeConfig.isOpen && (
        <TradeModal 
          isOpen={tradeConfig.isOpen}
          onClose={() => setTradeConfig({ ...tradeConfig, isOpen: false })}
          symbol={tradeConfig.stock.symbol}
          price={tradeConfig.stock.price}
          type={tradeConfig.type}
          assetType="STOCK"
          balance={balance}
          onExecute={onExecuteTrade}
        />
      )}
    </div>
  );
};

export default Market;
"use client";

import { useState, useMemo, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import MobileHeader from '@/components/layout/MobileHeader';
import MarketPulse from '@/components/dashboard/MarketPulse';
import MarketSentiment from '@/components/dashboard/MarketSentiment';
import SectorPerformance from '@/components/dashboard/SectorPerformance';
import DailyMarketReport from '@/components/dashboard/DailyMarketReport';
import LiveStatus from '@/components/dashboard/LiveStatus';
import DailyChallenges from '@/components/dashboard/DailyChallenges';
import StrategyCard from '@/components/dashboard/StrategyCard';
import TradingViewChart from '@/components/market/TradingViewChart';
import MarketPrediction from '@/components/market/MarketPrediction';
import CommunityFeed from '@/components/social/CommunityFeed';
import { useTrading } from '@/hooks/useTrading';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Flame, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getNews, getFiiDii, getStocks, getPrediction } from "../api/backend";

const Index = () => {
  const [stocks, setStocks] = useState<any[]>([]);
const [news, setNews] = useState<any[]>([]);
const [fiiDii, setFiiDii] = useState<any>({});

useEffect(() => {
  const loadStocks = async () => {
    const data = await getStocks();
    console.log("STOCKS:", data);
    setStocks(data);
  };

  loadStocks();
  const stockInterval = setInterval(loadStocks, 2000);

  getNews().then(data => {
    console.log("NEWS:", data);
    setNews(data);
  });

  const loadFii = async () => {
    const data = await getFiiDii();
    console.log("FII DII:", data);
    setFiiDii(data);
  };

  loadFii();
  const fiiInterval = setInterval(loadFii, 5000);

  return () => {
    clearInterval(stockInterval);
    clearInterval(fiiInterval);
  };
}, []);
  
  const { balance, livePrices, positions, dataSource, marketData } = useTrading();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSymbol, setActiveSymbol] = useState('NIFTY 50');
  const [timeframe, setTimeframe] = useState('15m');
  const [prediction, setPrediction] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchAI = async () => {
      try {
        const data = await getPrediction(activeSymbol);
        setPrediction(data);
      } catch (e) {
        console.error("AI Fetch Error", e);
      }
    };
    fetchAI();
  }, [activeSymbol]);

  const totalPnL = positions.reduce((acc, p) => acc + p.pnl, 0);
  const isPositive = totalPnL >= 0;

  // Generate high-density mock data for the TradingView experience
  const { chartData, volumeData } = useMemo(() => {
    const basePrice = livePrices[activeSymbol] || 22000;
    const count = 150; // Increased density
    const data = [];
    const volume = [];
    
    let lastClose = basePrice;
    
    for (let i = 0; i < count; i++) {
      const date = new Date();
      const minutesToSubtract = (count - i) * (timeframe.includes('m') ? parseInt(timeframe) : timeframe === '1h' ? 60 : 1440);
      date.setMinutes(date.getMinutes() - minutesToSubtract);
      
      const open = lastClose + (Math.random() - 0.5) * 20;
      const close = open + (Math.random() - 0.5) * 40;
      const high = Math.max(open, close) + Math.random() * 15;
      const low = Math.min(open, close) - Math.random() * 15;
      
      const time = timeframe === '1d' || timeframe === '1w' 
        ? date.toISOString().split('T')[0] 
        : Math.floor(date.getTime() / 1000) as any;

      data.push({ time, open, high, low, close });
      volume.push({ 
        time, 
        value: Math.floor(Math.random() * 1000000) + 500000,
        color: close >= open ? 'rgba(0, 208, 156, 0.2)' : 'rgba(239, 68, 68, 0.2)'
      });
      
      lastClose = close;
    }
    
    return { chartData: data, volumeData: volume };
  }, [activeSymbol, livePrices, timeframe]);

  return (
    <div className="min-h-screen bg-transparent flex flex-col lg:flex-row font-sans">
      <MobileHeader isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="flex-1 lg:ml-64 flex flex-col min-w-0">
        <MarketPulse />
        
        <div className="p-4 lg:p-8 w-full max-w-[1400px] mx-auto space-y-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-md">Welcome back, Trader! 👋</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-orange-400 font-bold text-sm drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]">
                  <Flame size={16} /> 5 Day Streak
                </div>
                <div className="w-1.5 h-1.5 bg-white/20 rounded-full" />
                <div className="text-white/50 font-bold text-xs uppercase tracking-widest">Rank: Pro Apprentice</div>
              </div>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                <Input 
                  placeholder="Search (e.g. RELIANCE, NIFTY 50)..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      setActiveSymbol(searchQuery.trim().toUpperCase());
                      setSearchQuery("");
                    }
                  }}
                  className="glass-panel text-white placeholder:text-white/40 border-white/10 h-14 pl-12 pr-16 rounded-2xl focus-visible:ring-primary transition-all duration-300"
                />
                <Button 
                  onClick={() => {
                    if (searchQuery.trim()) {
                      setActiveSymbol(searchQuery.trim().toUpperCase());
                      setSearchQuery("");
                    }
                  }}
                  className="absolute right-2 top-2 h-10 px-4 rounded-xl bg-primary text-primary-foreground font-bold text-xs"
                >
                  Search
                </Button>
              </div>
              <LiveStatus />
            </div>
          </div>

          {/* Full TradingView Chart Section */}
          <section className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="xl:col-span-3">
              <div className="glass-panel rounded-[2rem] overflow-hidden p-2">
                <TradingViewChart 
                  symbol={activeSymbol}
                  price={livePrices[activeSymbol] || 0}
                  timeframe={timeframe}
                  onTimeframeChange={setTimeframe}
                  prediction={prediction}
                />
              </div>
            </div>

            {/* Quick Selector Sidebar */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest px-2 flex justify-between items-center">
                Quick Watch
                <span className={cn(
                  "flex items-center gap-1.5 text-[8px] font-bold px-2 py-0.5 rounded-full border",
                  dataSource === 'LIVE' ? "text-primary border-primary/30 bg-primary/10" : "text-orange-400 border-orange-400/30 bg-orange-400/10"
                )}>
                  <span className={cn("w-1 h-1 rounded-full animate-pulse", dataSource === 'LIVE' ? "bg-primary" : "bg-orange-400")} /> {dataSource}
                </span>
              </h3>
              <div className="flex flex-col gap-3 h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {(stocks.length > 0 ? stocks : marketData).map((stock) => (
                  <button
                    key={stock.symbol}
                    onClick={() => setActiveSymbol(stock.symbol)}
                    className={cn(
                      "p-5 rounded-[1.5rem] transition-all duration-300 flex justify-between items-center group flex-shrink-0 relative overflow-hidden",
                      activeSymbol === stock.symbol 
                        ? "bg-primary/10 border border-primary/30 shadow-[0_0_15px_rgba(0,208,156,0.1)] text-white" 
                        : "glass-panel text-white/70 hover:text-white hover:bg-white/10"
                    )}
                  >
                    <div className="text-left relative z-10">
                      <p className="font-bold text-sm tracking-wide">{stock.symbol}</p>
                      <p className="text-[10px] opacity-50 uppercase mt-0.5 tracking-wider">{stock.name || 'NSE India'}</p>
                    </div>
                    <div className="text-right relative z-10">
                      <p className="font-bold text-sm">₹{stock.price.toLocaleString()}</p>
                      <p className={cn(
                        "text-[10px] font-bold mt-0.5 tracking-wider",
                        stock.change >= 0 
                          ? "text-primary drop-shadow-[0_0_5px_rgba(0,208,156,0.5)]" 
                          : "text-destructive drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]"
                      )}>
                        {stock.change >= 0 ? '+' : ''}
                        {stock.change.toFixed(2)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Tabbed Interface for less clutter */}
          <section className="mt-8 pt-8 border-t border-white/5">
            <Tabs defaultValue="prediction" className="w-full">
              <TabsList className="glass-panel border-white/10 p-1.5 mb-8 rounded-2xl w-full max-w-2xl h-14">
                <TabsTrigger value="prediction" className="flex-1 rounded-xl text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all gap-2">
                  <BrainCircuit size={14} /> AI Prediction
                </TabsTrigger>
                <TabsTrigger value="overview" className="flex-1 rounded-xl text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all">My Portfolio</TabsTrigger>
                <TabsTrigger value="market" className="flex-1 rounded-xl text-sm font-semibold data-[state=active]:bg-white/10 data-[state=active]:text-white transition-all">Market Insights</TabsTrigger>
                <TabsTrigger value="community" className="flex-1 rounded-xl text-sm font-semibold data-[state=active]:bg-white/10 data-[state=active]:text-white transition-all">Community & Growth</TabsTrigger>
              </TabsList>
              
              <TabsContent value="prediction" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <MarketPrediction symbol={activeSymbol} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                   <MarketPrediction symbol="BANKNIFTY" />
                   <MarketPrediction symbol="FINNIFTY" />
                </div>
              </TabsContent>

              <TabsContent value="overview" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-3 text-white">Your Portfolio</h2>
                    <Card className="glass-panel overflow-hidden rounded-[2rem] border-white/10 relative">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
                      <CardContent className="p-8 space-y-8 relative z-10">
                        <div className="space-y-2">
                          <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Total Value</p>
                          <p className="text-5xl font-bold text-white tabular-nums tracking-tight">₹{(balance + totalPnL).toLocaleString()}</p>
                        </div>
                        <div className={cn("p-5 bg-black/20 rounded-2xl border border-white/5 backdrop-blur-md", isPositive ? "text-primary" : "text-destructive")}>
                          <p className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-70">Current P&L</p>
                          <p className="text-2xl font-bold tabular-nums tracking-tight">{isPositive ? '+' : ''}₹{Math.abs(totalPnL).toLocaleString()}</p>
                        </div>
                        <button className="w-full h-14 bg-primary text-primary-foreground rounded-xl font-bold text-base shadow-[0_0_20px_rgba(0,208,156,0.4)] hover:bg-primary/90 transition-all duration-300">
                           Execute Portfolio Rebalance
                        </button>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="space-y-6">
                     <h2 className="text-xl font-bold flex items-center gap-3 text-white">Strategy of the Day</h2>
                     <div className="glass-panel rounded-[2rem] p-1 border-white/10">
                        <StrategyCard />
                     </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="market" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                  <div className="xl:col-span-2 space-y-8">
                    <DailyMarketReport />
                  </div>
                  <div className="space-y-8">
                    <SectorPerformance />
                    <MarketSentiment />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="community" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                     <h2 className="text-xl font-bold flex items-center gap-3 text-white">Daily Progress</h2>
                     <DailyChallenges />
                  </div>
                  <div className="space-y-6">
                     <h2 className="text-xl font-bold flex items-center gap-3 text-white">Community Feed</h2>
                     <CommunityFeed />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </section>

        </div>
      </main>
    </div>
    
  );

};

export default Index;
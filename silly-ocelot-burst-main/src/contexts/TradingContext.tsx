import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { getStocks } from '@/api/backend';
import { INDIAN_STOCKS } from '@/utils/marketData';

export interface Trade {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  price: number;
  quantity: number;
  timestamp: number;
  assetType: 'STOCK' | 'OPTION';
  user_id?: string;
}

export interface JournalEntry {
  id: string;
  date: number;
  text: string;
  mood: 'Happy' | 'Neutral' | 'Sad' | 'Regret';
  tradeId?: string;
  user_id?: string;
}

export interface DailyProgress {
  tradesExecuted: number;
  quizzesCompleted: number;
  aiSignalsChecked: number;
  lastLoginDate?: string;
  streak: number;
}

interface TradingContextType {
  user: any;
  balance: number;
  portfolio: Trade[];
  positions: any[];
  journal: JournalEntry[];
  xp: number;
  level: number;
  completedLevelIds: number[];
  livePrices: Record<string, number>;
  marketData: any[];
  dataSource: 'LIVE' | 'DEMO';
  dailyProgress: DailyProgress;
  lastUpdate: number;
  executeTrade: (trade: Omit<Trade, 'id' | 'timestamp'>) => Promise<boolean>;
  squareOff: (symbol: string) => Promise<boolean>;
  addXp: (amount: number) => Promise<void>;
  addJournalEntry: (text: string, mood: JournalEntry['mood']) => Promise<void>;
  completeLevel: (levelId: number, xpReward: number) => Promise<void>;
}

const TradingContext = createContext<TradingContextType | undefined>(undefined);

export const TradingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [balance, setBalance] = useState<number>(100000);
  const [portfolio, setPortfolio] = useState<Trade[]>([]);
  const [journal, setJournal] = useState<JournalEntry[]>([]);
  const [xp, setXp] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [completedLevelIds, setCompletedLevelIds] = useState<number[]>([]);
  const [livePrices, setLivePrices] = useState<Record<string, number>>({});
  const [marketData, setMarketData] = useState<any[]>(INDIAN_STOCKS);
  const [lastUpdate, setLastUpdate] = useState<number>(Date.now());
  const [dataSource, setDataSource] = useState<'LIVE' | 'DEMO'>('DEMO');
  const [dailyProgress, setDailyProgress] = useState<DailyProgress>({
    tradesExecuted: 0,
    quizzesCompleted: 0,
    aiSignalsChecked: 0,
    streak: 0
  });

  // Auth Sync
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch User Data from Supabase
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profile) {
        setBalance(Number(profile.balance));
        setXp(profile.xp);
        setLevel(profile.level || 1);
        setCompletedLevelIds(profile.completed_levels || []);
        setDailyProgress(profile.daily_progress || dailyProgress);
      }

      const { data: trades } = await supabase
        .from('trades')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false });

      if (trades) setPortfolio(trades);

      const { data: journalEntries } = await supabase
        .from('journal')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (journalEntries) setJournal(journalEntries);
    };

    fetchData();
  }, [user]);

  // Live Price Polling
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const stocksData = await getStocks();
        if (!stocksData || stocksData.length === 0) throw new Error("No data");

        const prices: Record<string, number> = {};

        // Update prices from backend data
        stocksData.forEach((stock: any) => {
          prices[stock.symbol] = stock.price;
        });

        // Update market data with live prices
        const updatedMarketData = INDIAN_STOCKS.map(stock => {
          const liveStock = stocksData.find((s: any) => s.symbol === stock.symbol);
          if (liveStock) {
            return {
              ...stock,
              price: liveStock.price,
              change: liveStock.change,
              trend: liveStock.trend
            };
          }
          return stock;
        });

        setLivePrices(prices);
        setMarketData(updatedMarketData);
        setDataSource('LIVE');
        setLastUpdate(Date.now());
      } catch (err) {
        console.error("Failed to fetch live prices, using demo values", err);
        setDataSource('DEMO');
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const positions = useMemo(() => {
    const posMap: Record<string, { qty: number; totalCost: number }> = {};
    portfolio.forEach(trade => {
      if (!posMap[trade.symbol]) posMap[trade.symbol] = { qty: 0, totalCost: 0 };
      if (trade.type === 'BUY') {
        posMap[trade.symbol].qty += trade.quantity;
        posMap[trade.symbol].totalCost += trade.price * trade.quantity;
      } else {
        posMap[trade.symbol].qty -= trade.quantity;
        // Simplified avg cost adjustment on sell
        const totalBefore = posMap[trade.symbol].qty + trade.quantity;
        if (totalBefore > 0) {
           const avg = posMap[trade.symbol].totalCost / totalBefore;
           posMap[trade.symbol].totalCost -= avg * trade.quantity;
        }
      }
    });
    return Object.entries(posMap)
      .filter(([_, data]) => data.qty > 0)
      .map(([symbol, data]) => ({
        symbol,
        quantity: data.qty,
        avgPrice: data.totalCost / data.qty,
        currentPrice: livePrices[symbol] || data.totalCost / data.qty,
        pnl: ((livePrices[symbol] || (data.totalCost / data.qty)) - (data.totalCost / data.qty)) * data.qty,
        pnlPercent: (((livePrices[symbol] || (data.totalCost / data.qty)) - (data.totalCost / data.qty)) / (data.totalCost / data.qty)) * 100
      }));
  }, [portfolio, livePrices]);

  const executeTrade = useCallback(async (trade: Omit<Trade, 'id' | 'timestamp'>) => {
    const cost = trade.price * trade.quantity;
    if (trade.type === 'BUY' && cost > balance) {
       console.error("Insufficient balance");
       return false;
    }

    const newTrade: Trade = {
      ...trade,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      user_id: user?.id
    };

    const newBalance = trade.type === 'BUY' ? balance - cost : balance + cost;
    
    setBalance(newBalance);
    setPortfolio(prev => [newTrade, ...prev]);

    if (user) {
      try {
        await supabase.from('trades').insert([newTrade]);
        await supabase.from('profiles').update({ balance: newBalance }).eq('id', user.id);
      } catch (err) {
        console.error("Failed to sync trade with Supabase", err);
      }
    }

    return true;
  }, [balance, user, portfolio]);

  const addJournalEntry = async (text: string, mood: JournalEntry['mood']) => {
    const entry: JournalEntry = {
      id: Math.random().toString(36).substr(2, 9),
      date: Date.now(),
      text,
      mood,
      user_id: user?.id
    };
    setJournal(prev => [entry, ...prev]);
    
    if (user) {
      await supabase.from('journal').insert([entry]);
    }
  };

  const addXp = async (amount: number) => {
    let newXp = xp + amount;
    let newLevel = level;
    const nextLevelThreshold = level * 1000;
    
    if (newXp >= nextLevelThreshold) {
      newLevel += 1;
      newXp -= nextLevelThreshold;
    }

    setXp(newXp);
    setLevel(newLevel);

    if (user) {
      await supabase.from('profiles').update({ xp: newXp, level: newLevel }).eq('id', user.id);
    }
  };

  const completeLevel = async (levelId: number, xpReward: number) => {
    if (completedLevelIds.includes(levelId)) return;

    const newCompletedIds = [...completedLevelIds, levelId];
    setCompletedLevelIds(newCompletedIds);
    const nextLevel = Math.max(level, levelId + 1);
    setLevel(nextLevel);
    const newXp = xp + xpReward;
    setXp(newXp);

    if (user) {
      await supabase.from('profiles').update({ 
        completed_levels: newCompletedIds,
        level: nextLevel,
        xp: newXp
      }).eq('id', user.id);
    }
  };

  const squareOff = useCallback(async (symbol: string) => {
    const position = positions.find(p => p.symbol === symbol);
    if (!position || position.quantity <= 0) return false;

    const success = await executeTrade({
      symbol: position.symbol,
      type: 'SELL',
      price: position.currentPrice,
      quantity: position.quantity,
      assetType: symbol.includes('CE') || symbol.includes('PE') ? 'OPTION' : 'STOCK'
    });

    if (success) {
      console.log(`Squared off ${symbol} at ${position.currentPrice}`);
    }
    return success;
  }, [positions, executeTrade]);

  const value = {
    user, balance, portfolio, positions, journal, xp, level, completedLevelIds, livePrices, marketData, dataSource, dailyProgress, lastUpdate,
    executeTrade, squareOff, addXp, addJournalEntry, completeLevel
  };

  return <TradingContext.Provider value={value}>{children}</TradingContext.Provider>;
};

export const useTradingContext = () => {
  const context = useContext(TradingContext);
  if (context === undefined) {
    throw new Error('useTradingContext must be used within a TradingProvider');
  }
  return context;
};

import { useTradingContext } from '@/contexts/TradingContext';

export const useTrading = () => {
  return useTradingContext();
};

export type { Trade, JournalEntry, DailyProgress } from '@/contexts/TradingContext';
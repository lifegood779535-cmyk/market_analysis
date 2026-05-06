import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, TrendingUp, TrendingDown, Target, ShieldAlert, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { getAISignal } from '@/api/backend';

interface AISignal {
  symbol: string;
  signal: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  rsi: number;
  macd_signal: string;
  explanation: string;
  timestamp: string;
  indicators: {
    rsi: number;
    macd: string;
    volume_trend: string;
    support_resistance: {
      support: number;
      resistance: number;
    };
  };
}

const SignalsFeed = () => {
  const [signals, setSignals] = useState<AISignal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSignals = async () => {
      try {
        const symbols = ['RELIANCE', 'TCS', 'NIFTY 50', 'HDFCBANK', 'INFY'];
        const signalPromises = symbols.map(symbol => getAISignal(symbol));
        const signalResults = await Promise.all(signalPromises);
        setSignals(signalResults);
      } catch (err) {
        console.error("Failed to fetch AI signals", err);
        // Fallback to demo signals
        setSignals([
          {
            symbol: 'RELIANCE',
            signal: 'BUY',
            confidence: 0.85,
            rsi: 35,
            macd_signal: 'Bullish',
            explanation: 'Strong upward momentum detected with RSI oversold',
            timestamp: new Date().toISOString(),
            indicators: {
              rsi: 35,
              macd: 'Bullish',
              volume_trend: 'Increasing',
              support_resistance: { support: 2950, resistance: 3100 }
            }
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSignals();
    const interval = setInterval(fetchSignals, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-white flex items-center gap-2">
            <Zap className="text-yellow-500 w-5 h-5" />
            AI Trade Signals
          </h3>
          <Badge variant="outline" className="text-yellow-500 border-yellow-500">Loading...</Badge>
        </div>
        <div className="flex justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Zap className="text-yellow-500 w-5 h-5" />
          AI Trade Signals
        </h3>
        <Badge variant="outline" className="text-yellow-500 border-yellow-500">Live Analysis</Badge>
      </div>

      {signals.map((sig, index) => (
        <Card key={index} className="bg-slate-900 border-slate-800 text-white hover:border-slate-700 transition-all overflow-hidden">
          <div className={cn(
            "h-1 w-full",
            sig.signal === 'BUY' ? "bg-green-500" : sig.signal === 'SELL' ? "bg-red-500" : "bg-yellow-500"
          )} />
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-bold text-lg">{sig.symbol}</h4>
                <div className="flex gap-2">
                  <span className={cn(
                    "text-[10px] font-bold uppercase px-1.5 py-0.5 rounded",
                    sig.signal === 'BUY' ? "bg-green-500/10 text-green-500" :
                    sig.signal === 'SELL' ? "bg-red-500/10 text-red-500" : "bg-yellow-500/10 text-yellow-500"
                  )}>
                    {sig.signal}
                  </span>
                  <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500">
                    {(sig.confidence * 100).toFixed(0)}% Confidence
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-500 uppercase font-bold">RSI</p>
                <p className={cn(
                  "text-xs font-bold",
                  sig.indicators.rsi < 30 ? "text-green-500" :
                  sig.indicators.rsi > 70 ? "text-red-500" : "text-yellow-500"
                )}>{sig.indicators.rsi.toFixed(1)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-center">
                <p className="text-[8px] text-slate-500 uppercase font-bold">Support</p>
                <p className="text-xs font-bold text-green-500">₹{sig.indicators.support_resistance.support.toFixed(0)}</p>
              </div>
              <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-center">
                <p className="text-[8px] text-slate-500 uppercase font-bold">Resistance</p>
                <p className="text-xs font-bold text-red-500">₹{sig.indicators.support_resistance.resistance.toFixed(0)}</p>
              </div>
            </div>

            <div className="p-3 bg-blue-600/5 border border-blue-500/10 rounded-xl flex gap-3 items-start">
              <ShieldAlert className="text-blue-500 shrink-0 mt-0.5" size={14} />
              <p className="text-[11px] text-slate-300 leading-relaxed italic">
                "{sig.explanation}"
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SignalsFeed;
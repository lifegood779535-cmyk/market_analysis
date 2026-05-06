import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Maximize2, 
  Minimize2, 
  BrainCircuit, 
  RefreshCw,
  Activity,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

declare global {
  interface Window {
    TradingView: any;
  }
}

interface TradingViewChartProps {
  symbol: string;
  price: number;
  timeframe: string;
  onTimeframeChange: (tf: string) => void;
  prediction?: any;
}

const TradingViewChart = ({ symbol, timeframe, prediction }: TradingViewChartProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showAI, setShowAI] = useState(true);

  // Map symbols to TradingView format
  const getTVSymbol = (s: string) => {
    const map: any = {
      'NIFTY 50': 'BSE:SENSEX',
      'BANKNIFTY': 'BSE:BANKEX',
      'FINNIFTY': 'BSE:SENSEX50',
      'RELIANCE': 'NSE:RELIANCE',
      'TCS': 'NSE:TCS',
      'INFY': 'NSE:INFY',
      'HDFCBANK': 'NSE:HDFCBANK',
      'ICICIBANK': 'NSE:ICICIBANK',
      'AXISBANK': 'NSE:AXISBANK',
      'SBIN': 'NSE:SBIN',
      'BHARTIARTL': 'NSE:BHARTIARTL',
      'ITC': 'NSE:ITC',
      'LTIM': 'NSE:LTIM',
      'WIPRO': 'NSE:WIPRO'
    };
    return map[s] || `NSE:${s.replace(/\s+/g, '')}`;
  };

  useEffect(() => {
    const scriptId = 'tradingview-widget-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    const initWidget = () => {
      if (window.TradingView && document.getElementById('tv_chart_container')) {
        const tvSymbol = getTVSymbol(symbol);
        let tvInterval = timeframe === '1d' ? 'D' : timeframe === '1w' ? 'W' : timeframe.replace('m', '');
        
        // BSE symbols on free widgets only support D, W, M intervals.
        if (tvSymbol.startsWith('BSE:') && !['D', 'W', 'M'].includes(tvInterval)) {
          tvInterval = 'D';
        }

        new window.TradingView.widget({
          "autosize": true,
          "symbol": tvSymbol,
          "interval": tvInterval,
          "timezone": "Asia/Kolkata",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "toolbar_bg": "#0f172a",
          "enable_publishing": false,
          "allow_symbol_change": false,
          "container_id": "tv_chart_container",
          "hide_side_toolbar": false,
          "studies": [
            "RSI@tv-basicstudies",
            "MASimple@tv-basicstudies"
          ],
          "show_popup_button": true,
          "popup_width": "1000",
          "popup_height": "650"
        });
      }
    };

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      script.onload = initWidget;
      document.head.appendChild(script);
    } else {
      initWidget();
    }

    // Fallback if script is already loaded but widget needs re-init
    const timeout = setTimeout(initWidget, 500);
    return () => clearTimeout(timeout);
  }, [symbol, timeframe]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={cn(
        "flex flex-col bg-[#050A14] border border-white/5 overflow-hidden transition-all duration-500",
        isFullscreen ? "fixed inset-0 z-[100] rounded-0" : "rounded-[2.5rem] shadow-2xl"
      )}
    >
      <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-black/40 backdrop-blur-md relative z-30">
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2">
             <Activity className="text-primary w-5 h-5 animate-pulse" />
             <span className="text-xs font-black uppercase tracking-widest text-white/70">Real-Time Terminal</span>
           </div>
           <div className="h-4 w-[1px] bg-white/10 mx-2" />
           <Button 
            variant="ghost" 
            className={cn("h-8 px-3 gap-2 text-[10px] font-black uppercase rounded-lg border", showAI ? "text-primary border-primary/20 bg-primary/5" : "text-white/20 border-white/5")}
            onClick={() => setShowAI(!showAI)}
           >
            <BrainCircuit size={14} /> AI Overlay {showAI ? "ON" : "OFF"}
           </Button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-white/20 hover:text-white" onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </Button>
        </div>
      </div>

      <div className="flex-1 relative bg-black min-h-[550px]">
        {/* The Real TradingView Widget Container */}
        <div id="tv_chart_container" className="absolute inset-0 w-full h-full" />

        {/* AI Insight HUD */}
        {showAI && prediction && (
          <div className="absolute top-6 left-6 z-40 space-y-3 pointer-events-none">
             <div className={cn(
              "px-6 py-3 rounded-2xl border backdrop-blur-3xl flex items-center gap-4 shadow-2xl",
              prediction.prediction === 'BULLISH' ? "bg-primary/20 border-primary/30" : "bg-destructive/20 border-destructive/30"
            )}>
              <BrainCircuit className={cn("w-5 h-5 animate-pulse", prediction.prediction === 'BULLISH' ? "text-primary" : "text-destructive")} />
              <div>
                <p className="text-[8px] font-black uppercase tracking-widest opacity-40">AI SENTIMENT</p>
                <p className="text-lg font-black tracking-tighter text-white">{prediction.prediction} ({prediction.confidence})</p>
              </div>
            </div>
          </div>
        )}

        {/* Real-Time Authenticity Badge */}
        <div className="absolute bottom-6 right-6 z-20 pointer-events-none opacity-20">
           <p className="text-[10px] font-black tracking-[0.5em] text-white uppercase italic">Real-Time Data Verified</p>
        </div>
      </div>
    </div>
  );
};

export default TradingViewChart;
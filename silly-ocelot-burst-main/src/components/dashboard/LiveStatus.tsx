import { Activity, Wifi } from 'lucide-react';
import { useTrading } from '@/hooks/useTrading';
import { cn } from '@/lib/utils';

const LiveStatus = () => {
  const { lastUpdate } = useTrading();
  
  return (
    <div className="flex items-center gap-4 px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-full backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D09C] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D09C]"></span>
        </div>
        <span className="text-[10px] font-bold text-[#00D09C] uppercase tracking-widest">Live Market</span>
      </div>
      <div className="h-3 w-[1px] bg-slate-800" />
      <div className="flex items-center gap-1.5">
        <Wifi size={12} className="text-slate-500" />
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Connected</span>
      </div>
    </div>
  );
};

export default LiveStatus;
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { History, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useTrading } from '@/hooks/useTrading';
import { cn } from '@/lib/utils';

const TradeHistory = () => {
  const { portfolio } = useTrading();

  return (
    <Card className="bg-slate-900/40 border-white/5 text-white overflow-hidden rounded-[2.5rem] shadow-2xl glass-panel">
      <CardHeader className="p-10 pb-6 border-b border-white/5 bg-black/20">
        <CardTitle className="text-xl font-black tracking-tight flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
            <History className="text-blue-500 w-5 h-5" />
          </div>
          Operational History
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/5 hover:bg-transparent h-16">
                <TableHead className="text-white/20 font-black uppercase tracking-[0.2em] text-[10px] pl-10">Asset</TableHead>
                <TableHead className="text-white/20 font-black uppercase tracking-[0.2em] text-[10px]">Action</TableHead>
                <TableHead className="text-white/20 font-black uppercase tracking-[0.2em] text-[10px]">Execution</TableHead>
                <TableHead className="text-white/20 font-black uppercase tracking-[0.2em] text-[10px]">Volume</TableHead>
                <TableHead className="text-white/20 font-black uppercase tracking-[0.2em] text-[10px] text-right pr-10">Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolio.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-20 text-white/20 text-xs font-bold uppercase tracking-widest italic">
                    Historical Log Empty. Start Trading! 🚀
                  </TableCell>
                </TableRow>
              ) : (
                portfolio.map((trade) => (
                  <TableRow key={trade.id} className="border-white/5 hover:bg-white/5 transition-colors h-20">
                    <TableCell className="font-black text-base tracking-tight pl-10">{trade.symbol}</TableCell>
                    <TableCell>
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border",
                        trade.type === 'BUY' ? "bg-primary/10 text-primary border-primary/20 shadow-[0_0_10px_rgba(0,208,156,0.2)]" : "bg-destructive/10 text-destructive border-destructive/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                      )}>
                        {trade.type === 'BUY' ? <ArrowUpRight size={10} /> : <ArrowDownLeft size={10} />}
                        {trade.type}
                      </span>
                    </TableCell>
                    <TableCell className="font-bold text-white/80 tabular-nums">₹{trade.price.toLocaleString()}</TableCell>
                    <TableCell className="font-bold text-white/60 tabular-nums">{trade.quantity}</TableCell>
                    <TableCell className="text-right text-[10px] text-white/30 font-black tracking-widest pr-10 uppercase">
                      {new Date(trade.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TradeHistory;
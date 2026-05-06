import { Bell, Zap, TrendingUp, TrendingDown, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

const ALERTS = [
  { id: 1, type: 'signal', title: 'New AI Signal: RELIANCE', desc: 'Bullish crossover detected on 15m chart.', time: '5m ago', icon: Zap, color: 'text-yellow-500' },
  { id: 2, type: 'price', title: 'Price Alert: NIFTY 50', desc: 'NIFTY crossed 22,450 resistance level.', time: '12m ago', icon: TrendingUp, color: 'text-green-500' },
  { id: 3, type: 'news', title: 'Market Update', desc: 'European markets open positive, NIFTY may follow.', time: '1h ago', icon: Info, color: 'text-blue-500' },
];

const AlertCenter = () => {
  return (
    <Card className="bg-slate-900 border-slate-800 text-white">
      <CardHeader className="pb-2 border-b border-slate-800">
        <CardTitle className="text-sm flex items-center gap-2">
          <Bell className="text-blue-500 w-4 h-4" />
          Alert Center
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px]">
          <div className="divide-y divide-slate-800">
            {ALERTS.map((alert) => (
              <div key={alert.id} className="p-4 hover:bg-slate-800/50 transition-colors">
                <div className="flex gap-3">
                  <div className={`p-2 rounded-lg bg-slate-950 border border-slate-800 ${alert.color}`}>
                    <alert.icon size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold">{alert.title}</h4>
                      <span className="text-[10px] text-slate-500">{alert.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{alert.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AlertCenter;
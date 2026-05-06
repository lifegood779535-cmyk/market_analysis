import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Globe, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const EVENTS = [
  { id: 1, title: 'RBI Monetary Policy', date: 'Tomorrow', time: '10:00 AM', impact: 'High', desc: 'Interest rate decision and commentary.' },
  { id: 2, title: 'India CPI Inflation', date: 'Oct 12', time: '5:30 PM', impact: 'Medium', desc: 'Consumer price index data release.' },
  { id: 3, title: 'US Fed Meeting', date: 'Oct 15', time: '11:30 PM', impact: 'High', desc: 'Global market sentiment driver.' },
  { id: 4, title: 'Reliance AGM', date: 'Oct 20', time: '2:00 PM', impact: 'Medium', desc: 'Future growth plans and announcements.' },
];

const MarketEvents = () => {
  return (
    <Card className="bg-slate-900 border-slate-800 text-white">
      <CardHeader className="pb-2 border-b border-slate-800">
        <CardTitle className="text-sm flex items-center gap-2">
          <Calendar className="text-blue-500 w-4 h-4" />
          Economic Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-slate-800">
          {EVENTS.map((event) => (
            <div key={event.id} className="p-4 hover:bg-slate-800/50 transition-colors">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-xs font-bold">{event.title}</h4>
                <span className={cn(
                  "text-[8px] px-1.5 py-0.5 rounded font-bold uppercase",
                  event.impact === 'High' ? "bg-red-500/10 text-red-500" : "bg-yellow-500/10 text-yellow-500"
                )}>
                  {event.impact} Impact
                </span>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-slate-500 mb-2">
                <span className="flex items-center gap-1"><Clock size={10} /> {event.time}</span>
                <span className="flex items-center gap-1"><Calendar size={10} /> {event.date}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed italic">"{event.desc}"</p>
            </div>
          ))}
        </div>
        <div className="p-3 bg-blue-600/5 flex items-center gap-2">
          <AlertCircle className="text-blue-500 shrink-0" size={14} />
          <p className="text-[10px] text-blue-400 font-medium">
            Tip: High impact events me volatility badh sakti hai. Be careful!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketEvents;
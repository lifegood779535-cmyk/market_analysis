import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gauge } from 'lucide-react';

const SentimentMeter = () => {
  const sentimentValue = 65; // 0 to 100 (Fear to Greed)

  return (
    <Card className="bg-slate-900 border-slate-800 text-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Gauge className="text-purple-500 w-4 h-4" />
          Market Sentiment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-4 bg-slate-800 rounded-full overflow-hidden mt-4">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 opacity-20" />
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-1000"
            style={{ left: `${sentimentValue}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-[10px] font-bold uppercase tracking-wider">
          <span className="text-red-500">Extreme Fear</span>
          <span className="text-yellow-500">Neutral</span>
          <span className="text-green-500">Extreme Greed</span>
        </div>
        <p className="text-center mt-4 text-xs text-slate-400">
          Current Mood: <span className="text-green-500 font-bold">Greedy (65)</span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SentimentMeter;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutGrid, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const SECTORS = [
  { name: 'IT', change: 1.2, trend: 'up' },
  { name: 'Banking', change: -0.5, trend: 'down' },
  { name: 'Auto', change: 0.8, trend: 'up' },
  { name: 'Pharma', change: 2.1, trend: 'up' },
  { name: 'Energy', change: -1.4, trend: 'down' },
];

const SectorPerformance = () => {
  return (
    <Card className="bg-slate-900 border-slate-800 text-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <LayoutGrid className="text-blue-500 w-4 h-4" />
          Sector Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {SECTORS.map((sector) => (
          <div key={sector.name} className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-xs font-medium text-slate-300">{sector.name}</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full rounded-full",
                    sector.trend === 'up' ? "bg-green-500" : "bg-red-500"
                  )}
                  style={{ width: `${Math.abs(sector.change) * 20}%` }}
                />
              </div>
              <span className={cn(
                "text-[10px] font-bold w-10 text-right",
                sector.trend === 'up' ? "text-green-500" : "text-red-500"
              )}>
                {sector.trend === 'up' ? '+' : ''}{sector.change}%
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SectorPerformance;
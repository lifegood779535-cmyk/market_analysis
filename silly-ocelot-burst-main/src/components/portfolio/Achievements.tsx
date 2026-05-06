import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Target, Zap, ShieldCheck, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const BADGES = [
  { id: 1, title: 'First Trade', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-500/10', unlocked: true },
  { id: 2, title: 'Risk Master', icon: ShieldCheck, color: 'text-blue-500', bg: 'bg-blue-500/10', unlocked: true },
  { id: 3, title: 'Option Ninja', icon: Target, color: 'text-purple-500', bg: 'bg-purple-500/10', unlocked: false },
  { id: 4, title: 'Profit King', icon: Trophy, color: 'text-green-500', bg: 'bg-green-500/10', unlocked: false },
  { id: 5, title: 'Learning Star', icon: Star, color: 'text-orange-500', bg: 'bg-orange-500/10', unlocked: true },
];

const Achievements = () => {
  return (
    <Card className="bg-slate-900 border-slate-800 text-white">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Trophy className="text-yellow-500 w-5 h-5" />
          Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {BADGES.map((badge) => (
            <div 
              key={badge.id} 
              className={cn(
                "flex flex-col items-center p-4 rounded-xl border transition-all",
                badge.unlocked ? "bg-slate-950 border-slate-800" : "bg-slate-950/50 border-slate-900 opacity-40 grayscale"
              )}
            >
              <div className={cn("p-3 rounded-full mb-3", badge.bg, badge.color)}>
                <badge.icon size={24} />
              </div>
              <span className="text-xs font-bold text-center">{badge.title}</span>
              {!badge.unlocked && <span className="text-[8px] uppercase mt-1 text-slate-600">Locked</span>}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Achievements;
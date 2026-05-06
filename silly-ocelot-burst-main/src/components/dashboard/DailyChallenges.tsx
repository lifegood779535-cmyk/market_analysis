import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Circle, Zap, BookOpen, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useTrading } from '@/hooks/useTrading';

const DailyChallenges = () => {
  const { dailyProgress } = useTrading();

  const CHALLENGES = [
    { 
      id: 1, 
      title: 'Complete 1 Quiz', 
      xp: 100, 
      icon: BookOpen, 
      completed: dailyProgress.quizzesCompleted >= 1,
      current: dailyProgress.quizzesCompleted,
      target: 1
    },
    { 
      id: 2, 
      title: 'Execute 2 Trades', 
      xp: 200, 
      icon: TrendingUp, 
      completed: dailyProgress.tradesExecuted >= 2,
      current: dailyProgress.tradesExecuted,
      target: 2
    },
    { 
      id: 3, 
      title: 'Check AI Signal', 
      xp: 50, 
      icon: Zap, 
      completed: dailyProgress.aiSignalsChecked >= 1,
      current: dailyProgress.aiSignalsChecked,
      target: 1
    },
  ];

  const completedCount = CHALLENGES.filter(c => c.completed).length;
  const progress = (completedCount / CHALLENGES.length) * 100;

  return (
    <Card className="bg-slate-900 border-slate-800 text-white h-full">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm flex items-center gap-2 font-bold">
            <Zap className="text-yellow-500 w-4 h-4" />
            Daily Tasks
          </CardTitle>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            {completedCount}/{CHALLENGES.length} Done
          </span>
        </div>
        <Progress value={progress} className="h-1.5 bg-slate-800 mt-2" />
      </CardHeader>
      <CardContent className="space-y-3">
        {CHALLENGES.map((challenge) => (
          <div 
            key={challenge.id} 
            className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors"
          >
            <div className={challenge.completed ? "text-[#00D09C]" : "text-slate-700"}>
              {challenge.completed ? <CheckCircle2 size={18} /> : <Circle size={18} />}
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold">{challenge.title}</h4>
              <p className="text-[10px] text-slate-500">
                +{challenge.xp} XP • {challenge.current}/{challenge.target}
              </p>
            </div>
            <challenge.icon size={14} className={challenge.completed ? "text-blue-500" : "text-slate-600"} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DailyChallenges;
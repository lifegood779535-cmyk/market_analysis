import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Medal, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const TOP_STUDENTS = [
  { id: 1, name: 'Rahul S.', level: 12, xp: 12450, profit: '+15.4%', avatar: 'RS' },
  { id: 2, name: 'Priya K.', level: 10, xp: 10200, profit: '+12.1%', avatar: 'PK' },
  { id: 3, name: 'Amit V.', level: 9, xp: 9150, profit: '+8.7%', avatar: 'AV' },
  { id: 4, name: 'Sneha M.', level: 8, xp: 8400, profit: '+10.2%', avatar: 'SM' },
  { id: 5, name: 'You', level: 1, xp: 0, profit: '0.0%', avatar: 'ME', isUser: true },
];

const Leaderboard = () => {
  return (
    <Card className="bg-slate-900 border-slate-800 text-white">
      <CardHeader className="pb-2 border-b border-slate-800">
        <CardTitle className="text-sm flex items-center gap-2">
          <Trophy className="text-yellow-500 w-4 h-4" />
          Top Students
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-slate-800">
          {TOP_STUDENTS.map((student, i) => (
            <div 
              key={student.id} 
              className={cn(
                "p-4 flex items-center gap-4 hover:bg-slate-800/50 transition-colors",
                student.isUser && "bg-blue-600/10 border-l-2 border-blue-500"
              )}
            >
              <div className="w-6 text-center font-bold text-slate-500 text-xs">
                {i === 0 ? <Medal className="text-yellow-500 w-4 h-4 mx-auto" /> : 
                 i === 1 ? <Medal className="text-slate-400 w-4 h-4 mx-auto" /> :
                 i === 2 ? <Medal className="text-orange-500 w-4 h-4 mx-auto" /> : i + 1}
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold border border-slate-700">
                {student.avatar}
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold">{student.name}</h4>
                <p className="text-[10px] text-slate-500">Level {student.level} • {student.xp} XP</p>
              </div>
              <div className="text-right">
                <p className={cn(
                  "text-xs font-bold",
                  student.profit.startsWith('+') ? "text-green-500" : "text-slate-400"
                )}>
                  {student.profit}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookText, MessageSquareQuote, Lightbulb, Plus, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTrading } from '@/hooks/useTrading';
import { cn } from '@/lib/utils';

const TradingJournal = () => {
  const { journal, addJournalEntry } = useTrading();
  const [isAdding, setIsAdding] = useState(false);
  const [text, setText] = useState('');
  const [mood, setMood] = useState<'Happy' | 'Neutral' | 'Sad' | 'Regret'>('Neutral');

  const handleSubmit = () => {
    if (!text.trim()) return;
    addJournalEntry(text, mood);
    setText('');
    setIsAdding(false);
  };

  return (
    <Card className="bg-slate-900/40 border-white/5 text-white overflow-hidden rounded-[2.5rem] shadow-2xl glass-panel">
      <CardHeader className="p-8 pb-4 border-b border-white/5 flex flex-row items-center justify-between bg-black/20">
        <CardTitle className="text-sm font-black uppercase tracking-[0.3em] text-white/30 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
            <BookText className="text-blue-500 w-4 h-4" />
          </div>
          Tactical Journal
        </CardTitle>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 bg-white/5 border border-white/5 rounded-xl text-white/40 hover:text-white hover:bg-white/10"
          onClick={() => setIsAdding(!isAdding)}
        >
          <Plus size={18} />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        {isAdding && (
          <div className="p-8 border-b border-white/5 space-y-5 bg-black/40 animate-in fade-in slide-in-from-top-4 duration-300">
            <Input 
              placeholder="What did you observe in the markets today?" 
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="bg-white/5 border-white/10 text-sm h-14 rounded-2xl px-6 placeholder:text-white/10 focus:ring-primary"
            />
            <div className="flex justify-between items-center gap-4">
              <div className="flex gap-2 p-1.5 bg-white/5 rounded-2xl border border-white/5">
                {(['Happy', 'Neutral', 'Sad', 'Regret'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMood(m)}
                    className={cn(
                      "text-[10px] px-4 py-2 rounded-xl font-black uppercase tracking-widest transition-all",
                      mood === m ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-white/20 hover:text-white/40 hover:bg-white/5"
                    )}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <Button onClick={handleSubmit} className="h-14 px-8 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 active:scale-95">
                <Send size={16} className="mr-2" /> Log Entry
              </Button>
            </div>
          </div>
        )}

        <div className="divide-y divide-white/5 max-h-[400px] overflow-y-auto custom-scrollbar">
          {journal.length === 0 ? (
            <div className="p-12 text-center text-white/20 text-xs font-black uppercase tracking-[0.2em] italic">
              "Journaling is the discipline of legends. Start logging."
            </div>
          ) : (
            journal.map((entry) => (
              <div key={entry.id} className="p-8 hover:bg-white/5 transition-all group">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <MessageSquareQuote size={20} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="text-[10px] text-white/20 font-black uppercase tracking-widest">
                        {new Date(entry.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                      </h4>
                      <span className={cn(
                        "text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-[0.1em] border",
                        entry.mood === 'Happy' ? "bg-primary/10 text-primary border-primary/20" :
                        entry.mood === 'Regret' ? "bg-destructive/10 text-destructive border-destructive/20" : "bg-white/5 text-white/30 border-white/5"
                      )}>
                        {entry.mood}
                      </span>
                    </div>
                    <p className="text-[15px] text-white/70 font-medium leading-relaxed italic group-hover:text-white transition-colors">"{entry.text}"</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-8 bg-primary/5 border-t border-white/5 flex items-start gap-5 backdrop-blur-md">
          <div className="w-10 h-10 bg-yellow-500/10 rounded-2xl flex items-center justify-center border border-yellow-500/20 shrink-0">
            <Lightbulb className="text-yellow-500" size={20} />
          </div>
          <p className="text-[12px] text-primary/60 font-medium leading-snug">
            <span className="font-black uppercase tracking-widest block mb-1">Trader Intelligence:</span>
            Log your emotional state after every execution. Pattern recognition starts with honesty.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TradingJournal;
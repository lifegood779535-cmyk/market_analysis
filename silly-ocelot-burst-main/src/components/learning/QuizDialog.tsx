import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle2, XCircle, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Question {
  id: number;
  text: string;
  options: string[];
  correct: number;
}

interface QuizDialogProps {
  isOpen: boolean;
  onClose: () => void;
  levelTitle: string;
  questions: Question[];
  onComplete: () => void;
}

const QuizDialog = ({ isOpen, onClose, levelTitle, questions, onComplete }: QuizDialogProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  const handleNext = () => {
    if (selected === questions[currentStep].options[questions[currentStep].correct]) {
      setScore(s => s + 1);
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(s => s + 1);
      setSelected(null);
    } else {
      setIsFinished(true);
    }
  };

  const handleFinish = () => {
    if (score >= questions.length * 0.7) {
      onComplete();
    }
    onClose();
    // Reset for next time
    setCurrentStep(0);
    setSelected(null);
    setIsFinished(false);
    setScore(0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-950 border-white/5 text-white sm:max-w-[500px] p-0 overflow-hidden rounded-[2.5rem] shadow-2xl glass-panel">
        <DialogHeader className="p-8 pb-0">
          <DialogTitle className="text-2xl font-black tracking-tight">{levelTitle} - Quiz</DialogTitle>
          <DialogDescription className="text-white/40 font-medium">
            Answer correctly to earn XP and unlock the next level.
          </DialogDescription>
        </DialogHeader>

        {!isFinished ? (
          <div className="p-8 space-y-6">
            <div className="space-y-2">
              <p className="text-[10px] text-primary font-black uppercase tracking-widest">Question {currentStep + 1} of {questions.length}</p>
              <h3 className="text-xl font-bold text-white leading-snug">{questions[currentStep].text}</h3>
            </div>

            <RadioGroup value={selected || ''} onValueChange={setSelected} className="space-y-4">
              {questions[currentStep].options.map((opt, i) => (
                <div key={i} className={cn(
                  "flex items-center space-x-4 p-5 rounded-2xl border transition-all cursor-pointer group",
                  selected === opt ? "bg-primary/10 border-primary shadow-lg shadow-primary/10" : "bg-white/5 border-white/5 hover:border-white/20"
                )}>
                  <RadioGroupItem value={opt} id={`q-${i}`} className="border-white/20 text-primary w-5 h-5" />
                  <Label htmlFor={`q-${i}`} className="flex-1 cursor-pointer font-bold text-white/80 group-hover:text-white transition-colors">{opt}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ) : (
          <div className="p-12 text-center space-y-8">
            {score >= questions.length * 0.7 ? (
              <>
                <div className="w-24 h-24 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mx-auto mb-6 border border-primary/20 shadow-2xl shadow-primary/20">
                  <Trophy size={48} />
                </div>
                <h2 className="text-3xl font-black text-white tracking-tight">Shabaash! 🎉</h2>
                <p className="text-white/40 font-medium">Aapne quiz pass kar liya hai. Level completed!</p>
              </>
            ) : (
              <>
                <div className="w-24 h-24 bg-destructive/10 text-destructive rounded-3xl flex items-center justify-center mx-auto mb-6 border border-destructive/20 shadow-2xl shadow-destructive/20">
                  <XCircle size={48} />
                </div>
                <h2 className="text-3xl font-black text-white tracking-tight">Wapas Padho! 📚</h2>
                <p className="text-white/40 font-medium">Aapko kam se kam 70% score chahiye pass hone ke liye.</p>
              </>
            )}
            <div className="p-6 bg-white/5 rounded-3xl border border-white/5 inline-block px-12 shadow-inner">
              <p className="text-[10px] text-white/20 uppercase font-black tracking-widest mb-2">Final Score</p>
              <p className="text-4xl font-black text-white tracking-tighter">{score}<span className="text-white/20 text-2xl">/{questions.length}</span></p>
            </div>
          </div>
        )}

        <DialogFooter className="p-8 pt-0">
          {!isFinished ? (
            <Button 
              onClick={handleNext} 
              disabled={!selected}
              className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-black rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95 uppercase tracking-widest"
            >
              {currentStep === questions.length - 1 ? "Finish Quiz" : "Next Question"}
            </Button>
          ) : (
            <Button onClick={handleFinish} className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-black rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95 uppercase tracking-widest">
              {score >= questions.length * 0.7 ? "Claim XP" : "Try Again"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuizDialog;
"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight, CheckCircle2 } from 'lucide-react';

interface LessonSection {
  title: string;
  text: string;
  visualType?: string;
}

interface LessonViewerProps {
  title: string;
  content: LessonSection[];
  onStartQuiz: () => void;
}

const VisualAid = ({ type }: { type?: string }) => {
  if (!type) return null;

  return (
    <div className="my-10 p-10 bg-white/5 rounded-[2.5rem] border border-white/5 flex flex-col items-center justify-center min-h-[300px] shadow-inner backdrop-blur-sm">
      {/* Corrected Candlesticks */}
      {type === 'hammer' && (
        <div className="flex flex-col items-center">
          <div className="w-1 h-3 bg-white/20" />
          <div className="w-14 h-10 bg-primary rounded-sm shadow-[0_0_15px_rgba(0,208,156,0.3)]" />
          <div className="w-1 h-28 bg-white/20" />
          <p className="mt-6 text-[10px] font-black text-primary uppercase tracking-[0.2em]">Hammer (Bullish Reversal)</p>
        </div>
      )}
      {type === 'shooting-star' && (
        <div className="flex flex-col items-center">
          <div className="w-1 h-28 bg-white/20" />
          <div className="w-14 h-10 bg-destructive rounded-sm shadow-[0_0_15px_rgba(239,68,68,0.3)]" />
          <div className="w-1 h-3 bg-white/20" />
          <p className="mt-6 text-[10px] font-black text-destructive uppercase tracking-[0.2em]">Shooting Star (Bearish Reversal)</p>
        </div>
      )}
      {type === 'inverted-hammer' && (
        <div className="flex flex-col items-center">
          <div className="w-1 h-24 bg-white/20" />
          <div className="w-14 h-10 bg-primary rounded-sm shadow-[0_0_15px_rgba(0,208,156,0.3)]" />
          <div className="w-1 h-3 bg-white/20" />
          <p className="mt-6 text-[10px] font-black text-primary uppercase tracking-[0.2em]">Inverted Hammer</p>
        </div>
      )}
      {type === 'hanging-man' && (
        <div className="flex flex-col items-center">
          <div className="w-1 h-3 bg-white/20" />
          <div className="w-14 h-10 bg-destructive rounded-sm shadow-[0_0_15px_rgba(239,68,68,0.3)]" />
          <div className="w-1 h-24 bg-white/20" />
          <p className="mt-6 text-[10px] font-black text-destructive uppercase tracking-[0.2em]">Hanging Man</p>
        </div>
      )}
      {type === 'marubozu-bull' && (
        <div className="flex flex-col items-center">
          <div className="w-14 h-40 bg-primary rounded-sm shadow-[0_0_20px_rgba(0,208,156,0.3)]" />
          <p className="mt-6 text-[10px] font-black text-primary uppercase tracking-[0.2em]">Bullish Marubozu</p>
        </div>
      )}
      {type === 'marubozu-bear' && (
        <div className="flex flex-col items-center">
          <div className="w-14 h-40 bg-destructive rounded-sm shadow-[0_0_20px_rgba(239,68,68,0.3)]" />
          <p className="mt-6 text-[10px] font-black text-destructive uppercase tracking-[0.2em]">Bearish Marubozu</p>
        </div>
      )}
      {type === 'spinning-top' && (
        <div className="flex flex-col items-center">
          <div className="w-1 h-16 bg-white/20" />
          <div className="w-14 h-10 bg-white/10 rounded-sm border border-white/20" />
          <div className="w-1 h-16 bg-white/20" />
          <p className="mt-6 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Spinning Top</p>
        </div>
      )}

      {/* Advanced Chart Patterns */}
      {type === 'cup-handle' && (
        <div className="w-full max-w-[300px] h-40 relative flex flex-col items-center">
          <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">
            <path d="M20,20 Q20,90 100,90 Q180,90 180,20 M180,20 L190,40 L170,40 L180,20" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
            <path d="M180,20 Q185,50 200,50" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <p className="text-center text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mt-6">Cup & Handle</p>
        </div>
      )}
      {type === 'ascending-triangle' && (
        <div className="w-full max-w-[250px] h-40 relative flex flex-col items-center">
          <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(0,208,156,0.3)]">
            <line x1="20" y1="20" x2="180" y2="20" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4" />
            <line x1="20" y1="80" x2="180" y2="20" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4" />
            <path d="M20,70 L50,20 L80,50 L110,20 L140,35 L170,20 L190,10" fill="none" stroke="#00D09C" strokeWidth="3" strokeLinecap="round" strokeJoin="round" />
          </svg>
          <p className="text-center text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mt-6">Ascending Triangle</p>
        </div>
      )}
      {type === 'descending-triangle' && (
        <div className="w-full max-w-[250px] h-40 relative flex flex-col items-center">
          <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">
            <line x1="20" y1="80" x2="180" y2="80" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4" />
            <line x1="20" y1="20" x2="180" y2="80" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4" />
            <path d="M20,30 L50,80 L80,50 L110,80 L140,65 L170,80 L190,90" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeJoin="round" />
          </svg>
          <p className="text-center text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mt-6">Descending Triangle</p>
        </div>
      )}

      {/* Indicators */}
      {type === 'macd' && (
        <div className="w-full space-y-4">
          <div className="h-32 w-full bg-black/40 rounded-2xl relative overflow-hidden p-4 border border-white/5">
            <svg viewBox="0 0 400 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(59,130,246,0.2)]">
              <path d="M0,50 Q100,10 200,50 T400,50" fill="none" stroke="#3b82f6" strokeWidth="2" />
              <path d="M0,60 Q100,20 200,60 T400,60" fill="none" stroke="#ef4444" strokeWidth="2" />
              <rect x="180" y="40" width="5" height="20" fill="#00D09C" opacity="0.3" />
              <rect x="190" y="45" width="5" height="10" fill="#00D09C" opacity="0.3" />
            </svg>
          </div>
          <p className="text-center text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">MACD Crossover</p>
        </div>
      )}
    </div>
  );
};

const LessonViewer = ({ title, content, onStartQuiz }: LessonViewerProps) => {
  const [hasRead, setHasRead] = useState(false);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary border border-primary/20 shadow-2xl shadow-primary/10">
          <FileText size={40} />
        </div>
        <div>
          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-1">Academy Module</p>
          <h1 className="text-4xl font-black text-white tracking-tight">{title}</h1>
        </div>
      </div>

      <Card className="border-white/5 bg-slate-900/40 backdrop-blur-2xl text-white p-8 lg:p-20 rounded-[3.5rem] shadow-2xl relative overflow-hidden glass-panel border-t-white/10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        <div className="max-w-3xl mx-auto space-y-16 relative z-10">
          {content.map((section, i) => (
            <div key={i} className="space-y-6 group">
              <div className="flex items-center gap-5">
                <span className="w-10 h-10 rounded-2xl bg-white/10 text-white flex items-center justify-center text-sm font-black border border-white/10 shadow-lg">
                  {i + 1}
                </span>
                <h2 className="text-2xl font-black text-white tracking-tight group-hover:text-primary transition-colors">{section.title}</h2>
              </div>
              <p className="text-xl text-white/60 font-medium leading-relaxed pl-14">
                {section.text}
              </p>
              <div className="pl-14">
                <VisualAid type={section.visualType} />
              </div>
            </div>
          ))}
          
          <div className="pt-16 border-t border-white/5 text-center space-y-10">
            {!hasRead ? (
              <div className="space-y-6">
                <p className="text-white/40 italic font-medium">Please study all patterns carefully. The final assessment requires deep understanding!</p>
                <Button 
                  onClick={() => setHasRead(true)}
                  className="bg-white text-slate-950 hover:bg-white/90 px-12 h-16 rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95"
                >
                  Confirm Readiness
                </Button>
              </div>
            ) : (
              <div className="space-y-8 animate-in zoom-in duration-500">
                <div className="inline-flex items-center gap-3 px-6 py-2 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">
                  <CheckCircle2 size={16} />
                  Module Mastery Reached
                </div>
                <h3 className="text-3xl font-black text-white tracking-tight">Challenge the Final Assessment</h3>
                <Button 
                  onClick={onStartQuiz}
                  className="w-full h-20 bg-primary hover:bg-primary/90 text-white text-2xl rounded-3xl font-black shadow-2xl shadow-primary/20 group uppercase tracking-widest transition-all active:scale-95"
                >
                  Launch Quiz
                  <ArrowRight className="ml-3 w-8 h-8 group-hover:translate-x-2 transition-transform" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LessonViewer;
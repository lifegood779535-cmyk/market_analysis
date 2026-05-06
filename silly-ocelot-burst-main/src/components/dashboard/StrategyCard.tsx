"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const StrategyCard = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 border-none text-white overflow-hidden rounded-[2.5rem] shadow-2xl relative group cursor-pointer" onClick={() => navigate('/learning')}>
        <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
          <Lightbulb size={180} />
        </div>
        
        <CardContent className="p-10 lg:p-12 space-y-8 relative z-10">
          <div className="flex items-center gap-3">
            <div className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
              <Sparkles size={12} className="text-yellow-300" />
              Strategy of the Day
            </div>
            <div className="px-4 py-1.5 bg-[#00D09C]/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-[#00D09C]">
              High Probability
            </div>
          </div>

          <div className="space-y-4 max-w-2xl">
            <h3 className="text-4xl lg:text-5xl font-black tracking-tight">The "9:20 AM" Breakout</h3>
            <p className="text-blue-100 text-lg lg:text-xl leading-relaxed font-medium">
              Master the most popular intraday setup used by pro traders. Learn how to identify the first 15-minute range breakout and ride the trend with precision. 📈
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-4">
            <div className="flex items-center gap-2 text-sm font-bold text-blue-200">
              <ShieldCheck size={20} className="text-[#00D09C]" /> 
              Risk: 1:2 Reward Ratio
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-blue-200">
              <ArrowRight size={20} className="text-yellow-400" /> 
              Timeframe: 15m Candles
            </div>
          </div>

          <div className="pt-4">
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                navigate('/learning');
              }}
              className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-10 h-16 rounded-2xl text-lg shadow-xl shadow-blue-900/20 group/btn"
            >
              Start Learning Now
              <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StrategyCard;
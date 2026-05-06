"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, ThumbsUp, Share2, TrendingUp, TrendingDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const POSTS = [
  {
    id: 1,
    user: { name: 'Arjun Mehta', avatar: 'AM', level: 15 },
    text: "NIFTY looking strong above 22,400. Expecting a move towards 22,600 by expiry. What do you guys think? 🚀",
    symbol: 'NIFTY 50',
    sentiment: 'Bullish',
    likes: 24,
    comments: 8,
    time: '10m ago'
  },
  {
    id: 2,
    user: { name: 'Sara Khan', avatar: 'SK', level: 12 },
    text: "RELIANCE taking support at 2950. Good entry point for long term? 📈",
    symbol: 'RELIANCE',
    sentiment: 'Bullish',
    likes: 15,
    comments: 3,
    time: '25m ago'
  },
  {
    id: 3,
    user: { name: 'Vikram Singh', avatar: 'VS', level: 8 },
    text: "Bank Nifty is showing some weakness. Be careful with long positions today. 📉",
    symbol: 'BANKNIFTY',
    sentiment: 'Bearish',
    likes: 12,
    comments: 5,
    time: '1h ago'
  }
];

const CommunityFeed = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <MessageSquare className="text-[#00D09C] w-5 h-5" />
          Community Insights
        </h3>
        <Badge variant="outline" className="text-[#00D09C] border-[#00D09C]/30">Live Feed</Badge>
      </div>

      <div className="space-y-4">
        {POSTS.map((post) => (
          <Card key={post.id} className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-all rounded-2xl overflow-hidden">
            <CardContent className="p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-slate-700">
                    <AvatarFallback className="bg-slate-800 text-slate-300 font-bold">{post.user.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-sm font-bold text-white">{post.user.name}</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Level {post.user.level} Trader</p>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 font-bold">{post.time}</span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {post.text}
              </p>

              <div className="flex items-center gap-3">
                <Badge className="bg-slate-800 text-slate-300 border-none font-bold text-[10px]">
                  {post.symbol}
                </Badge>
                <Badge className={cn(
                  "font-bold text-[10px] border-none",
                  post.sentiment === 'Bullish' ? "bg-[#00D09C]/10 text-[#00D09C]" : "bg-red-500/10 text-red-500"
                )}>
                  {post.sentiment === 'Bullish' ? <TrendingUp size={10} className="mr-1" /> : <TrendingDown size={10} className="mr-1" />}
                  {post.sentiment}
                </Badge>
              </div>

              <div className="flex items-center gap-6 pt-2 border-t border-slate-800">
                <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-white transition-colors">
                  <ThumbsUp size={14} /> {post.likes}
                </button>
                <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-white transition-colors">
                  <MessageSquare size={14} /> {post.comments}
                </button>
                <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-white transition-colors ml-auto">
                  <Share2 size={14} />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommunityFeed;
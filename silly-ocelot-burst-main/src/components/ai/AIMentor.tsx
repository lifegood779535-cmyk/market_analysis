"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { askAI } from "../../api/ai";

const SUGGESTIONS = [
  "Nifty ka trend kya hai?",
  "Stop loss kaise lagayein?",
  "Options trading risky kyun hai?",
  "Risk management tips dijiye."
];

const AIMentor = () => {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Namaste! Main aapka TradeGuru AI mentor hoon 🙏 Aaj market ke baare mein kya discuss karna chahenge?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text: string = input) => {
    const message = text || input;
    if (!message.trim() || loading) return;

    setMessages((prev) => [...prev, { role: "user", text: message }]);
    setInput("");
    setLoading(true);

    try {
      const reply = await askAI(message);
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch (err: any) {
      console.error("AI Error:", err);
      setMessages((prev) => [...prev, { role: "bot", text: `Error: ${err.message || "Connection failed"}. Please check your API key.` }]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-950 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      
      <div className="p-8 border-b border-white/5 flex justify-between items-center bg-black/40 backdrop-blur-3xl relative z-10">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-primary/10 rounded-[1.5rem] flex items-center justify-center border border-primary/20 shadow-2xl shadow-primary/10 group-hover:scale-105 transition-transform">
            <Bot className="text-primary w-9 h-9" />
          </div>
          <div>
            <h2 className="text-white font-black text-2xl tracking-tighter">TradeGuru AI</h2>
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse shadow-[0_0_12px_rgba(0,208,156,1)]" />
              <span className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em]">Quantum Data Linked</span>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-4 px-6 py-3 bg-white/5 rounded-2xl border border-white/10 shadow-inner">
          <Sparkles className="text-yellow-400 w-5 h-5" />
          <span className="text-[11px] text-white/50 font-black uppercase tracking-[0.2em]">Tier-1 Intelligence</span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 p-8 md:p-12 overflow-y-auto space-y-12 custom-scrollbar bg-transparent relative z-10">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-6 duration-500`}>
            <div className={cn(
              "p-8 px-10 rounded-[2.5rem] max-w-[85%] text-lg md:text-xl leading-relaxed shadow-2xl transition-all",
              msg.role === "user" 
                ? "bg-primary text-white font-black rounded-tr-none shadow-[0_10px_30px_rgba(0,208,156,0.3)] border-b-4 border-primary-foreground/20" 
                : "bg-slate-800/80 text-white border border-white/20 rounded-tl-none backdrop-blur-2xl border-b-4 border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            )}>
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-5 text-primary/30 animate-pulse px-6 py-4 bg-white/5 rounded-3xl w-fit border border-white/5">
            <Loader2 className="animate-spin w-6 h-6" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em]">Synthesizing market context...</span>
          </div>
        )}
      </div>

      <div className="px-8 py-6 bg-black/40 flex flex-wrap gap-3 border-t border-white/5 relative z-10">
        {SUGGESTIONS.map((s, i) => (
          <button
            key={i}
            onClick={() => handleSend(s)}
            className="text-xs md:text-sm px-6 py-3 bg-white/10 hover:bg-primary/20 border border-white/20 hover:border-primary/50 rounded-2xl text-white/70 hover:text-white font-bold tracking-wide transition-all active:scale-95 shadow-lg backdrop-blur-md"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="p-8 md:p-10 flex gap-6 bg-black/60 border-t border-white/10 relative z-10">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Analyze markets, risk, or strategy..."
          className="bg-white/10 border-white/20 rounded-3xl h-20 px-10 text-white placeholder:text-white/40 focus:ring-primary focus:border-primary transition-all text-xl font-bold border-b-4 border-transparent focus:border-b-primary shadow-inner"
        />
        <Button 
          onClick={() => handleSend()} 
          className="h-20 w-20 bg-primary hover:bg-primary/90 text-white rounded-3xl shadow-[0_0_30px_rgba(0,208,156,0.3)] active:scale-90 transition-all flex-shrink-0 border-b-4 border-primary-foreground/30"
        >
          <Send className="w-10 h-10" />
        </Button>
      </div>
    </div>
  );
};

export default AIMentor;
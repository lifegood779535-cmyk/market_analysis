"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import MobileHeader from '@/components/layout/MobileHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, Instagram, MessageCircle, ShieldCheck, Clock, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Support = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const contactInfo = [
    { 
      icon: Mail, 
      label: 'Email Us', 
      value: 'ms7795356405@gmail.com', 
      href: 'mailto:ms7795356405@gmail.com',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10'
    },
    { 
      icon: Phone, 
      label: 'Call Us', 
      value: '+91 7795356405', 
      href: 'tel:7795356405',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10'
    },
    { 
      icon: Instagram, 
      label: 'Instagram', 
      value: '@tradeguru_official', 
      href: 'https://instagram.com',
      color: 'text-pink-400',
      bg: 'bg-pink-500/10'
    },
    { 
      icon: MessageCircle, 
      label: 'WhatsApp', 
      value: 'Chat with us', 
      href: 'https://wa.me/917795356405',
      color: 'text-green-400',
      bg: 'bg-green-500/10'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col lg:flex-row">
      <MobileHeader isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="flex-1 lg:ml-64 p-6 lg:p-10 mt-16 lg:mt-0">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold tracking-tight">Customer Care</h1>
            <p className="text-slate-400 text-lg">We're here to help you with your trading journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactInfo.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="block">
                <Card className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-all cursor-pointer group rounded-3xl overflow-hidden">
                  <CardContent className="p-6 flex items-center gap-5">
                    <div className={cn("p-4 rounded-2xl transition-colors", item.bg, item.color)}>
                      <item.icon size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{item.label}</p>
                      <p className="text-lg font-bold text-white group-hover:text-[#00D09C] transition-colors">{item.value}</p>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
            <div className="text-center space-y-3">
              <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto text-slate-400 border border-slate-800">
                <Clock size={24} />
              </div>
              <h3 className="font-bold text-lg">24/7 Support</h3>
              <p className="text-sm text-slate-500">Always available for your queries.</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto text-slate-400 border border-slate-800">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-bold text-lg">Secure Trading</h3>
              <p className="text-sm text-slate-500">Your data is always protected.</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto text-slate-400 border border-slate-800">
                <Bot size={24} />
              </div>
              <h3 className="font-bold text-lg">Expert AI Advice</h3>
              <p className="text-sm text-slate-500">Get insights from our AI Mentor.</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#00D09C]/10 to-blue-500/10 p-10 rounded-[2.5rem] border border-[#00D09C]/20 text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Need immediate assistance?</h2>
              <p className="text-slate-400 max-w-md mx-auto">Our AI Mentor is available 24/7 to answer your trading and market related questions instantly.</p>
            </div>
            <Button className="bg-[#00D09C] hover:bg-[#00D09C]/90 text-white px-10 h-14 rounded-2xl font-bold text-lg shadow-lg shadow-emerald-500/20">
              Chat with AI Mentor
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Support;
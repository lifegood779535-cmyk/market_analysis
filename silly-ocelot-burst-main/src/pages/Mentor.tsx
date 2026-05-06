"use client";

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import MobileHeader from '@/components/layout/MobileHeader';
import AIMentor from '@/components/ai/AIMentor';

const Mentor = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col lg:flex-row">
      <MobileHeader isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="flex-1 lg:ml-64 mt-16 lg:mt-0 bg-slate-950 h-[calc(100vh-64px)] lg:h-screen flex flex-col overflow-hidden">
        <AIMentor />
      </main>
    </div>
  );
};

export default Mentor;
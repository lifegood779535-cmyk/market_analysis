import { Home, BarChart2, BookOpen, Wallet, MessageSquare, Settings, X, HeadphonesIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Explore', path: '/' },
    { icon: Wallet, label: 'Investments', path: '/portfolio' },
    { icon: BarChart2, label: 'Market', path: '/market' },
    { icon: BookOpen, label: 'Learn', path: '/learning' },
    { icon: MessageSquare, label: 'AI Mentor', path: '/mentor' },
    { icon: HeadphonesIcon, label: 'Support', path: '/support' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" 
          onClick={onClose}
        />
      )}

      <div className={cn(
        "w-64 glass-panel h-screen fixed left-0 top-0 flex flex-col p-6 z-50 transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-[#00D09C] rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <BarChart2 className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">TradeGuru</h1>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden text-slate-600 dark:text-slate-400" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group",
                location.pathname === item.path 
                  ? "bg-primary/10 text-primary font-semibold" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/10 hover:text-black dark:hover:text-white"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-colors",
                location.pathname === item.path ? "text-primary" : "text-slate-500 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300"
              )} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
          <Link
            to="/auth"
            className="flex items-center gap-4 px-4 py-3 text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors flex-1"
          >
            <Settings className="w-5 h-5 text-slate-500" />
            <span className="font-medium">Account</span>
          </Link>
          <div className="pr-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
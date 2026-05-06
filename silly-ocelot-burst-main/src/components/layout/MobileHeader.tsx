import { Menu, X, Wallet, Award } from 'lucide-react';
import { useTrading } from '@/hooks/useTrading';
import { Button } from '@/components/ui/button';

interface MobileHeaderProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

const MobileHeader = ({ isOpen, setIsOpen }: MobileHeaderProps) => {
  const { balance, level } = useTrading();

  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-950 border-b border-slate-800 z-50 flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? <X /> : <Menu />}
        </Button>
        <span className="font-bold text-white">TradeGuru</span>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 text-xs font-bold text-[#00D09C]">
          <Wallet size={14} />
          ₹{(balance/1000).toFixed(1)}k
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-yellow-500">
          <Award size={14} />
          Lvl {level}
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
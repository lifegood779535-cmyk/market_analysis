import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bell, TrendingUp, TrendingDown } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

interface PriceAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  symbol: string;
  currentPrice: number;
}

const PriceAlertModal = ({ isOpen, onClose, symbol, currentPrice }: PriceAlertModalProps) => {
  const [targetPrice, setTargetPrice] = useState(currentPrice);
  const [condition, setCondition] = useState<'ABOVE' | 'BELOW'>('ABOVE');

  const handleSetAlert = () => {
    showSuccess(`Alert set for ${symbol} when price goes ${condition.toLowerCase()} ₹${targetPrice}! 🔔`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-800 text-white sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="text-yellow-500" />
            Set Price Alert: {symbol}
          </DialogTitle>
        </DialogHeader>

        <div className="py-6 space-y-6">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <p className="text-xs text-slate-500 uppercase font-bold">Current Price</p>
            <p className="text-2xl font-bold">₹{currentPrice.toLocaleString()}</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-400">Alert me when price is</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant={condition === 'ABOVE' ? 'default' : 'outline'}
                  onClick={() => setCondition('ABOVE')}
                  className={condition === 'ABOVE' ? "bg-blue-600" : "border-slate-800 text-slate-400"}
                >
                  <TrendingUp size={16} className="mr-2" /> Above
                </Button>
                <Button 
                  variant={condition === 'BELOW' ? 'default' : 'outline'}
                  onClick={() => setCondition('BELOW')}
                  className={condition === 'BELOW' ? "bg-blue-600" : "border-slate-800 text-slate-400"}
                >
                  <TrendingDown size={16} className="mr-2" /> Below
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-400">Target Price (₹)</Label>
              <Input 
                type="number" 
                value={targetPrice} 
                onChange={(e) => setTargetPrice(Number(e.target.value))}
                className="bg-slate-950 border-slate-800 text-lg font-bold"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose} className="text-slate-400 hover:text-white">Cancel</Button>
          <Button onClick={handleSetAlert} className="bg-blue-600 hover:bg-blue-700">
            Set Alert
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PriceAlertModal;
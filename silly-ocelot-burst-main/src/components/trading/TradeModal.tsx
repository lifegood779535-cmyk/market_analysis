import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  symbol: string;
  price: number;
  type: 'BUY' | 'SELL';
  assetType: 'STOCK' | 'OPTION';
  onExecute: (quantity: number) => void;
  balance: number;
}

const TradeModal = ({ isOpen, onClose, symbol, price, type, assetType, onExecute, balance }: TradeModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const totalCost = quantity * price;
  const canAfford = type === 'SELL' || totalCost <= balance;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white border-none text-slate-900 sm:max-w-[400px] p-0 overflow-hidden rounded-[2rem] shadow-2xl">
        <DialogHeader className="p-8 pb-0">
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className={cn(
              "p-2 rounded-xl",
              type === 'BUY' ? "bg-[#00D09C]/10 text-[#00D09C]" : "bg-red-50 text-red-500"
            )}>
              {type === 'BUY' ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
            </div>
            {type} {symbol}
          </DialogTitle>
        </DialogHeader>

        <div className="p-8 space-y-6">
          <div className="flex justify-between items-center p-5 bg-slate-50 rounded-2xl border border-slate-100">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Current Price</p>
              <p className="text-xl font-bold text-slate-900">₹{price.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 uppercase font-bold">Available Balance</p>
              <p className="text-sm font-bold text-blue-600">₹{balance.toLocaleString()}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-500 font-semibold">Quantity</Label>
            <Input 
              type="number" 
              min="1"
              value={quantity} 
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
              className="h-14 bg-slate-50 border-none rounded-xl text-lg font-bold focus-visible:ring-[#00D09C]"
            />
          </div>

          <div className="p-5 bg-[#00D09C]/5 border border-[#00D09C]/10 rounded-2xl">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Total {type === 'BUY' ? 'Cost' : 'Value'}</span>
              <span className="text-2xl font-bold text-slate-900">₹{totalCost.toLocaleString()}</span>
            </div>
            {!canAfford && (
              <p className="text-xs text-red-500 mt-2 font-bold">Insufficient balance for this trade!</p>
            )}
          </div>
        </div>

        <DialogFooter className="p-8 pt-0 flex gap-3">
          <Button variant="ghost" onClick={onClose} className="flex-1 h-14 text-slate-400 hover:text-slate-900 font-bold rounded-xl">Cancel</Button>
          <Button 
            onClick={() => onExecute(quantity)} 
            disabled={!canAfford || quantity <= 0}
            className={cn(
              "flex-[2] h-14 text-white font-bold rounded-xl shadow-lg",
              type === 'BUY' ? "bg-[#00D09C] hover:bg-[#00D09C]/90 shadow-emerald-500/10" : "bg-red-500 hover:bg-red-600 shadow-red-500/10"
            )}
          >
            Confirm {type}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TradeModal;
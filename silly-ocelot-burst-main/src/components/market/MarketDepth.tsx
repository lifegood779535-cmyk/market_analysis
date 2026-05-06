import { Progress } from '@/components/ui/progress';

interface Order {
  price: number;
  quantity: number;
}

interface MarketDepthProps {
  basePrice: number;
}

const MarketDepth = ({ basePrice }: MarketDepthProps) => {
  const generateOrders = (isBuy: boolean) => {
    return Array.from({ length: 5 }).map((_, i) => ({
      price: isBuy ? basePrice - (i * 0.5) : basePrice + (i * 0.5),
      quantity: Math.floor(Math.random() * 5000) + 500
    }));
  };

  const buyOrders = generateOrders(true);
  const sellOrders = generateOrders(false);
  const maxQty = Math.max(...[...buyOrders, ...sellOrders].map(o => o.quantity));

  return (
    <div className="space-y-4">
      <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest">Market Depth (L2)</h4>
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-1">
          <div className="flex justify-between text-[9px] font-black text-white/20 uppercase mb-3">
            <span>Bid Price</span>
            <span>Qty</span>
          </div>
          {buyOrders.map((order, i) => (
            <div key={i} className="relative h-7 flex items-center justify-between px-3 overflow-hidden rounded-lg group">
              <div 
                className="absolute inset-y-0 right-0 bg-primary/10 transition-all duration-700 group-hover:bg-primary/20" 
                style={{ width: `${(order.quantity / maxQty) * 100}%` }}
              />
              <span className="text-xs font-black text-primary z-10">₹{order.price.toFixed(2)}</span>
              <span className="text-xs text-white/60 z-10 font-bold">{order.quantity}</span>
            </div>
          ))}
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-[9px] font-black text-white/20 uppercase mb-3">
            <span>Ask Price</span>
            <span>Qty</span>
          </div>
          {sellOrders.map((order, i) => (
            <div key={i} className="relative h-7 flex items-center justify-between px-3 overflow-hidden rounded-lg group">
              <div 
                className="absolute inset-y-0 left-0 bg-destructive/10 transition-all duration-700 group-hover:bg-destructive/20" 
                style={{ width: `${(order.quantity / maxQty) * 100}%` }}
              />
              <span className="text-xs font-black text-destructive z-10">₹{order.price.toFixed(2)}</span>
              <span className="text-xs text-white/60 z-10 font-bold">{order.quantity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketDepth;
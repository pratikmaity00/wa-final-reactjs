
import { ShoppingBasket, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-auto bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-2 text-emerald-700">
            <ShoppingBasket className="w-5 h-5 text-emerald-600" />
            <span className="font-semibold text-slate-800">Fresh Basket Grocery</span>
          </div>

          <p className="text-sm text-slate-500 max-w-md">
            Delivering farm-fresh fruits, vegetables, dairy, grains, bakery items, and beverages straight to your door with great value.
          </p>

          <div className="flex items-center gap-1 text-xs text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for daily shopping</span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© 2026 Fresh Basket. All rights reserved.</p>
          <p>Simple, reliable & fresh groceries everyday.</p>
        </div>
      </div>
    </footer>
  );
};

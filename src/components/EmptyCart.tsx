import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';

export const EmptyCart: React.FC = () => {
  return (
    <div
      className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-xs my-8"
      id="empty-cart-container"
    >
      <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 border border-emerald-100">
        <ShoppingCart className="w-10 h-10 stroke-1.5" />
      </div>

      <h2 className="text-2xl font-bold text-slate-900">Your Cart is Empty</h2>
      <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
        Looks like you haven't added any fresh groceries to your cart yet. Explore our fresh fruits, vegetables, dairy, and grains!
      </p>

      <div className="mt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-xs hover:shadow-sm transition-all"
          id="continue-shopping-empty-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explore Groceries</span>
        </Link>
      </div>
    </div>
  );
};

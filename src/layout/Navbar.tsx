
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBasket, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { calculateTotalUnits } from '../utils/helpers';

export const Navbar = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const totalUnits = calculateTotalUnits(cartItems);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <Link
            to="/"
            className="flex items-center gap-2.5 text-emerald-700 hover:text-emerald-800 transition-colors group"
            id="brand-logo-link"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 group-hover:scale-105 transition-transform">
              <ShoppingBasket className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900 leading-tight">
                Fresh<span className="text-emerald-600">Basket</span>
              </span>
              <span className="text-xs text-slate-500 font-medium">Daily Groceries</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-3 sm:gap-6">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `text-sm sm:text-base font-medium px-3 py-1.5 rounded-lg transition-colors ${
                  isActive
                    ? 'text-emerald-700 bg-emerald-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
              id="nav-home-link"
            >
              Home
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `relative flex items-center gap-2 text-sm sm:text-base font-medium px-3.5 py-1.5 rounded-lg transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-700 bg-slate-100 hover:bg-slate-200'
                }`
              }
              id="nav-cart-link"
              aria-label={`Cart with ${totalUnits} items`}
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Cart</span>
              {totalUnits > 0 && (
                <span
                  className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold rounded-full bg-emerald-700 text-white min-w-5 h-5 ml-0.5 animate-pulse"
                  id="cart-badge-count"
                >
                  {totalUnits}
                </span>
              )}
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

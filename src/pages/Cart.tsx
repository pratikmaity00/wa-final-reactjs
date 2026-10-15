import { useMemo } from 'react';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { calculateCartTotals, calculateTotalUnits } from '../utils/helpers';
import { CartItem } from '../components/CartItem';
import { CartSummary } from '../components/CartSummary';
import { CouponForm } from '../components/CouponForm';
import { UndoButton } from '../components/UndoButton';
import { EmptyCart } from '../components/EmptyCart';

export const Cart = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const appliedCoupon = useCartStore((state) => state.appliedCoupon);

  // Derive cart calculations dynamically
  const calculation = useMemo(
    () => calculateCartTotals(cartItems, appliedCoupon),
    [cartItems, appliedCoupon]
  );

  const totalUnits = useMemo(
    () => calculateTotalUnits(cartItems),
    [cartItems]
  );

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* If there is an action to undo right after emptying the cart, allow user to undo */}
        <div className="max-w-lg mx-auto mb-4 flex justify-end">
          <UndoButton />
        </div>
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              to="/"
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Groceries</span>
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <span>Shopping Cart</span>
            <span className="text-sm font-semibold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
              {totalUnits} {totalUnits === 1 ? 'item' : 'items'}
            </span>
          </h1>
        </div>

        {/* Undo Action Button */}
        <div>
          <UndoButton />
        </div>
      </div>

      {/* Cart Content: 2-column layout on Desktop, stacked on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-sm font-semibold text-slate-600">
            <span className="flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-emerald-600" />
              <span>Cart Items ({cartItems.length} products)</span>
            </span>
          </div>

          <div className="space-y-3">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Right Column: Coupon Form & Cart Summary */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-24">
          <CouponForm />
          <CartSummary calculation={calculation} />
        </div>
      </div>
    </div>
  );
};

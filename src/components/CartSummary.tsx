import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import type { CartCalculation } from '../utils/interfaces';
import { formatCurrency } from '../utils/helpers';
import { useCartStore } from '../store/cartStore';
import { DiscountMessage } from './DiscountMessage';
import toast from 'react-hot-toast';

interface CartSummaryProps {
  calculation: CartCalculation;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ calculation }) => {
  const clearCart = useCartStore((state) => state.clearCart);

  const {
    subtotal,
    discountPercentage,
    discountAmount,
    discountType,
    couponCode,
    finalTotal,
  } = calculation;

  const handleCheckout = () => {
    toast.success('Thank you for shopping with Fresh Basket! Your order has been placed.', {
      icon: '🎉',
      duration: 4000,
    });
    clearCart();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col gap-6" id="cart-summary-card">
      <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
        Order Summary
      </h3>

      {/* Discount / Tier messaging */}
      <DiscountMessage calculation={calculation} />

      {/* Price breakdown */}
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between text-slate-600">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-900" id="summary-subtotal">
            {formatCurrency(subtotal)}
          </span>
        </div>

        {discountType === 'coupon' && (
          <>
            <div className="flex items-center justify-between text-emerald-700">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Coupon ({couponCode})
              </span>
              <span className="font-medium bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full">
                {discountPercentage}% OFF
              </span>
            </div>
            <div className="flex items-center justify-between text-emerald-700">
              <span>Coupon Discount</span>
              <span className="font-semibold" id="summary-discount-amount">
                -{formatCurrency(discountAmount)}
              </span>
            </div>
          </>
        )}

        {discountType === 'automatic' && (
          <>
            <div className="flex items-center justify-between text-emerald-700">
              <span>Automatic Discount ({discountPercentage}%)</span>
              <span className="font-semibold" id="summary-discount-amount">
                -{formatCurrency(discountAmount)}
              </span>
            </div>
          </>
        )}

        {discountType === 'none' && (
          <div className="flex items-center justify-between text-slate-400">
            <span>Discounts</span>
            <span>₹0.00</span>
          </div>
        )}

        <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
          <div>
            <span className="text-base font-bold text-slate-900 block">Final Total</span>
            <span className="text-xs text-slate-400">Inclusive of all taxes</span>
          </div>
          <span className="text-2xl font-extrabold text-emerald-700" id="summary-final-total">
            {formatCurrency(finalTotal)}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        <button
          type="button"
          onClick={handleCheckout}
          className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold py-3 px-4 rounded-xl shadow-xs hover:shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
          id="checkout-btn"
        >
          <ShieldCheck className="w-5 h-5" />
          <span>Proceed to Checkout</span>
        </button>

        <div className="flex items-center justify-between gap-3 pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors"
            id="continue-shopping-btn"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>

          <button
            type="button"
            onClick={clearCart}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
            id="clear-cart-btn"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Sparkles, TrendingUp, CheckCircle } from 'lucide-react';
import type { CartCalculation } from '../utils/interfaces';
import { formatCurrency } from '../utils/helpers';

interface DiscountMessageProps {
  calculation: CartCalculation;
}

export const DiscountMessage: React.FC<DiscountMessageProps> = ({ calculation }) => {
  const {
    discountType,
    discountPercentage,
    discountAmount,
    couponCode,
    nextTierAmount,
    nextTierPercentage,
  } = calculation;

  if (calculation.subtotal === 0) {
    return null;
  }

  return (
    <div className="space-y-2.5">
      {/* Active Discount Status */}
      {discountType === 'coupon' && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-emerald-800">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-emerald-950">
              Coupon '{couponCode}' Active ({discountPercentage}% OFF)
            </p>
            <p className="text-emerald-700 mt-0.5">
              You are saving {formatCurrency(discountAmount)} on this order.
            </p>
          </div>
        </div>
      )}

      {discountType === 'automatic' && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-emerald-800">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-emerald-950">
              Automatic Discount Applied ({discountPercentage}% OFF)
            </p>
            <p className="text-emerald-700 mt-0.5">
              You saved {formatCurrency(discountAmount)} automatically on your cart subtotal.
            </p>
          </div>
        </div>
      )}

      {/* Next Tier Upgrade Opportunity */}
      {discountType !== 'coupon' && nextTierAmount !== undefined && nextTierPercentage !== undefined && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-900">
          <TrendingUp className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-950">
              Unlock {nextTierPercentage}% Automatic Discount!
            </p>
            <p className="text-amber-800 mt-0.5">
              Add just <span className="font-bold underline">{formatCurrency(nextTierAmount)}</span> more grocery items to unlock {nextTierPercentage}% OFF.
            </p>
          </div>
        </div>
      )}

      {/* Max tier reached without coupon */}
      {discountType === 'automatic' && !nextTierAmount && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-blue-900">
          <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-blue-950">
              Maximum Tier Unlocked!
            </p>
            <p className="text-blue-800 mt-0.5">
              You have qualified for our highest 10% automatic grocery discount.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

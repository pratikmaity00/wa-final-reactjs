import React from 'react';
import { useForm } from 'react-hook-form';
import { Tag, CheckCircle2, XCircle } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

interface CouponFormData {
  couponCode: string;
}

export const CouponForm: React.FC = () => {
  const appliedCoupon = useCartStore((state) => state.appliedCoupon);
  const applyCoupon = useCartStore((state) => state.applyCoupon);
  const removeCoupon = useCartStore((state) => state.removeCoupon);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CouponFormData>({
    defaultValues: {
      couponCode: '',
    },
  });

  const onSubmit = (data: CouponFormData) => {
    const success = applyCoupon(data.couponCode);
    if (success) {
      reset();
    }
  };

  const handleQuickApply = (code: string) => {
    applyCoupon(code);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
      <div className="flex items-center gap-2 mb-3">
        <Tag className="w-4 h-4 text-emerald-600" />
        <h4 className="text-sm font-semibold text-slate-900">Have a Promo Coupon?</h4>
      </div>

      {appliedCoupon ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="text-sm font-bold text-emerald-900">
                {appliedCoupon.code} Applied!
              </p>
              <p className="text-xs text-emerald-700">
                You get {appliedCoupon.percentage}% discount on your cart.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={removeCoupon}
            className="text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 px-2.5 py-1.5 rounded-md border border-red-200 transition-colors cursor-pointer flex items-center gap-1"
            id="remove-coupon-btn"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Remove</span>
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                {...register('couponCode', {
                  required: 'Coupon code cannot be empty',
                  validate: (val) => val.trim().length > 0 || 'Coupon code cannot be empty',
                })}
                placeholder="Enter SAVE10 or SAVE20"
                className={`w-full px-3 py-2 bg-slate-50 border rounded-lg text-sm uppercase tracking-wide placeholder:normal-case placeholder:tracking-normal focus:outline-hidden focus:ring-2 focus:ring-emerald-500 ${
                  errors.couponCode ? 'border-red-400 focus:ring-red-400' : 'border-slate-300'
                }`}
                id="coupon-input"
              />
            </div>
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer shrink-0 shadow-xs"
              id="apply-coupon-btn"
            >
              Apply
            </button>
          </div>

          {errors.couponCode && (
            <p className="text-xs text-red-500 font-medium">
              {errors.couponCode.message}
            </p>
          )}

          {/* Quick clickable coupon chips */}
          <div className="pt-1 flex items-center gap-2 text-xs text-slate-500">
            <span className="text-slate-400">Available:</span>
            <button
              type="button"
              onClick={() => handleQuickApply('SAVE10')}
              className="bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-mono font-semibold transition-colors cursor-pointer"
              title="Click to apply 10% coupon"
            >
              SAVE10
            </button>
            <button
              type="button"
              onClick={() => handleQuickApply('SAVE20')}
              className="bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-mono font-semibold transition-colors cursor-pointer"
              title="Click to apply 20% coupon"
            >
              SAVE20
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

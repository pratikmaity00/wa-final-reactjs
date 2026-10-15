import React, { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import type { CartItem as CartItemType } from '../utils/interfaces';
import { formatCurrency } from '../utils/helpers';
import { useCartStore } from '../store/cartStore';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const [imageError, setImageError] = useState(false);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const itemTotal = item.price * item.quantity;

  return (
    <div
      className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 transition-all"
      id={`cart-item-${item.id}`}
    >
      {/* Product Image & Info */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="relative w-20 h-20 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-100">
          {!imageError ? (
            <img
              src={item.image}
              alt={item.name}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400">
              <ShoppingBag className="w-8 h-8 text-slate-300" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
            {item.category}
          </span>
          <h4 className="font-semibold text-slate-900 text-base leading-snug">
            {item.name}
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Unit Price: <span className="font-medium text-slate-700">{formatCurrency(item.price)}</span>
          </p>
        </div>
      </div>

      {/* Quantity & Price Controls */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        {/* Quantity Stepper */}
        <div className="flex items-center border border-slate-300 rounded-lg bg-slate-50 overflow-hidden shadow-2xs">
          <button
            type="button"
            onClick={() => decreaseQuantity(item.id)}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200 active:bg-slate-300 transition-colors cursor-pointer"
            id={`decrease-qty-${item.id}`}
            aria-label={`Decrease quantity of ${item.name}`}
          >
            <Minus className="w-4 h-4" />
          </button>

          <span
            className="w-10 text-center font-bold text-sm text-slate-800"
            id={`item-qty-${item.id}`}
          >
            {item.quantity}
          </span>

          <button
            type="button"
            onClick={() => increaseQuantity(item.id)}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200 active:bg-slate-300 transition-colors cursor-pointer"
            id={`increase-qty-${item.id}`}
            aria-label={`Increase quantity of ${item.name}`}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Total Price for this item */}
        <div className="text-right min-w-20">
          <span className="text-xs text-slate-400 block">Total</span>
          <span className="text-base font-bold text-slate-900" id={`item-total-${item.id}`}>
            {formatCurrency(itemTotal)}
          </span>
        </div>

        {/* Remove Button */}
        <button
          type="button"
          onClick={() => removeFromCart(item.id)}
          className="text-slate-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors cursor-pointer"
          id={`remove-item-${item.id}`}
          title="Remove item"
          aria-label={`Remove ${item.name} from cart`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

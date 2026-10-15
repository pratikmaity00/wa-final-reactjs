import React, { useState } from 'react';
import { Plus, Check, ShoppingBag } from 'lucide-react';
import type { Product } from '../utils/interfaces';
import { formatCurrency } from '../utils/helpers';
import { useCartStore } from '../store/cartStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageError, setImageError] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const cartItems = useCartStore((state) => state.cartItems);

  const existingInCart = cartItems.find((item) => item.id === product.id);
  const quantityInCart = existingInCart ? existingInCart.quantity : 0;

  return (
    <div
      className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col group"
      id={`product-card-${product.id}`}
    >
      {/* Product Image with Fallback */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-100 p-4">
            <ShoppingBag className="w-10 h-10 mb-1 text-slate-300" />
            <span className="text-xs font-medium text-slate-400">{product.name}</span>
          </div>
        )}

        {/* Category Badge */}
        <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-xs text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-100 shadow-xs">
          {product.category}
        </span>

        {/* In-cart indicator */}
        {quantityInCart > 0 && (
          <span className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
            <Check className="w-3 h-3 stroke-3" />
            {quantityInCart} in cart
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-slate-900 text-base line-clamp-1 group-hover:text-emerald-700 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Fresh & natural quality</p>
        </div>

        <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
          <div>
            <span className="text-xs text-slate-500 block">Price</span>
            <span className="text-lg font-bold text-slate-900">
              {formatCurrency(product.price)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => addToCart(product)}
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-semibold px-3.5 py-2 rounded-lg transition-colors cursor-pointer shadow-xs hover:shadow-sm"
            id={`add-to-cart-btn-${product.id}`}
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

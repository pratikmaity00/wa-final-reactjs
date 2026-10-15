import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';
import type { Product } from '../utils/interfaces';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  products: Product[];
  onResetFilters?: () => void;
}

export const ProductList: React.FC<ProductListProps> = ({ products, onResetFilters }) => {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center my-8 shadow-xs max-w-lg mx-auto">
        <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">No products found</h3>
        <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
          We couldn't find any groceries matching your search or filter criteria. Try adjusting your search term or category.
        </p>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-5 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-4 py-2 rounded-lg transition-colors cursor-pointer shadow-xs"
            id="reset-filters-btn"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      id="product-grid"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

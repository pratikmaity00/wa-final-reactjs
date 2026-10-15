import React from 'react';
import { categories } from '../data/products';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div
      className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-sm"
      id="category-filter-container"
      role="tablist"
      aria-label="Filter products by category"
    >
      {categories.map((category) => {
        const isActive = selectedCategory === category;
        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelectCategory(category)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl font-medium transition-all cursor-pointer ${
              isActive
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
            }`}
            id={`category-filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

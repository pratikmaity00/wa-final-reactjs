import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import type { SortOption } from '../utils/interfaces';

interface SortFilterProps {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

export const SortFilter: React.FC<SortFilterProps> = ({
  sortOption,
  onSortChange,
}) => {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="sort-filter-select"
        className="text-xs sm:text-sm font-medium text-slate-600 flex items-center gap-1.5 whitespace-nowrap"
      >
        <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
        <span>Sort by:</span>
      </label>

      <select
        id="sort-filter-select"
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-xs cursor-pointer"
        aria-label="Sort products"
      >
        <option value="default">Default</option>
        <option value="price-low-to-high">Price: Low to High</option>
        <option value="price-high-to-low">Price: High to Low</option>
        <option value="name-a-to-z">Name: A to Z</option>
      </select>
    </div>
  );
};

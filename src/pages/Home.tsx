import  { useState, useMemo } from 'react';
import { Sparkles, Layers } from 'lucide-react';
import { products } from '../data/products';
import type { SortOption } from '../utils/interfaces';
import { sortProducts } from '../utils/helpers';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { SortFilter } from '../components/SortFilter';
import { ProductList } from '../components/ProductList';

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortOption, setSortOption] = useState<SortOption>('default');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Filter by category
    if (selectedCategory !== 'All Categories') {
      result = result.filter(
        (product) => product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // 2. Filter by search query (case-insensitive and trimmed)
    const trimmedQuery = searchQuery.trim().toLowerCase();
    if (trimmedQuery) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(trimmedQuery)
      );
    }

    // 3. Sort products (returns a sorted shallow copy)
    return sortProducts(result, sortOption);
  }, [searchQuery, selectedCategory, sortOption]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSortOption('default');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Hero / Header Section */}
      <div className="mb-8 sm:mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Save up to 20% with code SAVE20 or automatic cart discounts</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Fresh Groceries
        </h1>
        <p className="text-slate-600 mt-2 text-sm sm:text-base max-w-2xl">
          Browse fresh fruits, vegetables, dairy, grains, bakery delicacies, and refreshing beverages picked daily for the best quality and value.
        </p>
      </div>

      {/* Search, Filter & Sort Controls Section */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
          />

          <SortFilter sortOption={sortOption} onSortChange={setSortOption} />
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
          <Layers className="w-4 h-4 text-emerald-600" />
          <span>Showing {filteredProducts.length} grocery items</span>
        </div>

        {(searchQuery || selectedCategory !== 'All Categories' || sortOption !== 'default') && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      <ProductList
        products={filteredProducts}
        onResetFilters={handleResetFilters}
      />
    </div>
  );
};

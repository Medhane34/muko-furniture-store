'use client';

import { useMemo } from "react";
import { ProductGrid } from "@/components/organisms";
import { sofaProducts, SofaProduct } from "@/lib/mocks/sofaProducts";
import { FilterState } from '@/types/filter';
import ProductFilterSidebar from "@/components/organisms/ProductFilterSidebar";
import { getColorName } from '@/lib/colors'; // Import the helper
import { SortControls } from "@/components/atoms"; // Import SortControls
import { SortOption } from '@/types/sort'; // Import from central location
import { Product } from "@/types/product";

interface SofaProductsWrapperProps {
  sortOption: SortOption;
  visibleProducts: number;
  filters: FilterState;
  onFiltersChange: (newFilters: FilterState) => void;
    onSortChange: (option: SortOption) => void; // New callback for sort
  onQuickView?: (product: Product) => void; // Add this

}

export default function SofaProductsWrapper({ 
  sortOption, 
  visibleProducts, 
  filters,  
     onSortChange, // New prop

  onFiltersChange,
  onQuickView, 

}: SofaProductsWrapperProps) {
  
  // Calculate min/max prices
  const [minPrice, maxPrice] = useMemo(() => {
    const prices = sofaProducts.map(p => p.price);
    return prices.length ? [Math.min(...prices), Math.max(...prices)] : [0, 10000];
  }, [sofaProducts]);

  // Calculate all available color names
  const allColorNames = useMemo(() => {
    const allHexCodes = sofaProducts.flatMap(product => product.colors || []);
    const allNames = allHexCodes
      .map(hex => getColorName(hex))
      .filter((name): name is string => name !== undefined);
    
    return Array.from(new Set(allNames)).sort();
  }, [sofaProducts]);

  // Filter products
  const filteredProducts: SofaProduct[] = sofaProducts.filter(product => {
    if (!product) return false;
    if (product.isNew === undefined || product.isOnSale === undefined) return false;

    return (
      (!filters.isNew || product.isNew === true) &&
      (!filters.isOnSale || product.isOnSale === true) &&
      (product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]) &&
      // Color filter logic
      (filters.colors.length === 0 || 
        (product.colors && product.colors.some(hexCode => {
          const colorName = getColorName(hexCode);
          return colorName && filters.colors.includes(colorName);
        }))
      )
    );
  });

  // Sort products
  const sortedProducts: SofaProduct[] = [...filteredProducts].sort((a, b) => {
    try {
      switch (sortOption) {
        case 'price-asc': return (a.price || 0) - (b.price || 0);
        case 'price-desc': return (b.price || 0) - (a.price || 0);
        case 'name-asc': return (a.name || '').localeCompare(b.name || '');
        case 'name-desc': return (b.name || '').localeCompare(a.name || '');
        case 'newest': return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'on-sale': return (b.isOnSale ? 1 : 0) - (a.isOnSale ? 1 : 0);
        default: return 0;
      }
    } catch (error) {
      console.error("Sorting error:", error);
      return 0;
    }
  });

  const products = sortedProducts.slice(0, visibleProducts);

return (
    <div className="flex flex-col gap-6"> {/* Changed to column layout */}
      
      {/* NEW: Top Bar with Sort Controls aligned right */}
      <div className="flex justify-between items-center">
        {/* Left side - Optional: could add results count or title */}
        <div className="text-sm text-gray-600">
          Showing {products.length} of {filteredProducts.length} products
        </div>
        
        {/* Right side - Sort Controls */}
        <SortControls 
          currentSort={sortOption} 
          onSortChange={onSortChange} 
        />
      </div>

      {/* Main Content Area - Sidebar + Grid */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar - unchanged */}
        <div className="w-full md:w-1/4 lg:w-1/5">
          <div className="sticky top-24 h-fit">
            <ProductFilterSidebar
              filters={filters}
              onFiltersChange={onFiltersChange}
              minPrice={minPrice}
              maxPrice={maxPrice}
              allColorNames={allColorNames}
            />
          </div>
        </div>

        {/* Product Grid - unchanged */}
        <div className="w-full md:w-3/4 lg:w-4/5">
          <ProductGrid products={products} sortOption={sortOption} columns={3} 
            onQuickView={onQuickView} 

          />
        </div>
      </div>
    </div>
  );
}
'use client';

import { useMemo, useEffect, useState } from "react";
import { ProductGrid } from "@/components/organisms";
import { fetchSofaProducts } from "@/lib/sanity/functions/sofaProducts";
import { transformSanityProducts } from "@/lib/sanity/utils/transformers";
import { FilterState } from '@/types/filter';
import { getColorName } from '@/lib/colors';
import { SortControls } from "@/components/atoms";
import { SortOption } from '@/types/sort';
import { Product } from "@/types/product";
import ProductFilterSidebar from "@/components/organisms/ProductFilterSidebar";
import { SanityProduct } from "@/lib/sanity/utils/transformers";

interface SofaProductsWrapperProps {
  sortOption: SortOption;
  visibleProducts: number;
  filters: FilterState;
  onFiltersChange: (newFilters: FilterState) => void;
  onSortChange: (option: SortOption) => void;
  onQuickView?: (product: Product) => void;
}

export default function SofaProductsWrapper({ 
  sortOption, 
  visibleProducts, 
  filters, 
  onFiltersChange,
  onSortChange,
  onQuickView,
}: SofaProductsWrapperProps) {
  // State for Sanity data and loading/error states
  const [sanityProducts, setSanityProducts] = useState<SanityProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch sofa products from Sanity
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchSofaProducts();
        if (data) {
          setSanityProducts(data);
        } else {
          setError('No sofa products found');
        }
      } catch (err) {
        setError('Failed to load sofa products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Transform Sanity products to Product type
  const transformedProducts = useMemo(() => transformSanityProducts(sanityProducts), [sanityProducts]);

  // Calculate min/max prices from transformed products
  const [minPrice, maxPrice] = useMemo(() => {
    const prices = transformedProducts.map(p => p.price);
    return prices.length ? [Math.min(...prices), Math.max(...prices)] : [0, 10000];
  }, [transformedProducts]);

  // Calculate all available color names
  const allColorNames = useMemo(() => {
    const allHexCodes = transformedProducts.flatMap(product => product.colors || []);
    const allNames = allHexCodes
      .map(hex => getColorName(hex))
      .filter((name): name is string => name !== undefined);
    
    return Array.from(new Set(allNames)).sort();
  }, [transformedProducts]);

  // Filter products based on filter state
  const filteredProducts: Product[] = useMemo(() => 
    transformedProducts.filter(product => {
      return (
        (!filters.isNew || product.isNew) &&
        (!filters.isOnSale || product.isOnSale) &&
        (product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]) &&
        (filters.colors.length === 0 || 
          (product.colors?.some(hexCode => {
            const colorName = getColorName(hexCode);
            return colorName && filters.colors.includes(colorName);
          }))
        )
      );
    })
  , [transformedProducts, filters]);

  // Sort products based on sort option
  const sortedProducts: Product[] = useMemo(() => [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'name-asc': return a.name.localeCompare(b.name);
      case 'name-desc': return b.name.localeCompare(a.name);
      case 'newest': return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      case 'on-sale': return (b.isOnSale ? 1 : 0) - (a.isOnSale ? 1 : 0);
      default: return 0;
    }
  }), [filteredProducts, sortOption]);

  // Slice products for pagination
  const products = sortedProducts.slice(0, visibleProducts);

  // Single return with conditional rendering to ensure consistent hook calls
  return (
    <>
      {loading ? (
        // Show loading state
        <div className="text-center py-8">Loading sofas...</div>
      ) : error ? (
        // Show error state
        <div className="text-center py-8 text-red-600">{error}</div>
      ) : (
        // Main content when data is loaded
        <div className="flex flex-col gap-6">
          {/* Top Bar with Sort Controls */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing {products.length} of {filteredProducts.length} products
            </div>
            <SortControls 
              currentSort={sortOption} 
              onSortChange={onSortChange} 
            />
          </div>

          {/* Main Content Area - Sidebar + Grid */}
          <div className="flex flex-col md:flex-row gap-8">
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

            <div className="w-full md:w-3/4 lg:w-4/5">
              <ProductGrid 
                products={products} 
                sortOption={sortOption} 
                columns={3} 
                onQuickView={onQuickView} 
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
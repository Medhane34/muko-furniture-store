// components/organisms/CategoryPageClient.tsx
'use client';

import { motion } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import { fadeInUp } from '@/lib/motion';
import { FeaturedProductsWrapper } from '@/wrappers/FeaturedProductsWrapper';
import { SocialProofSection } from '@/components/organisms/SocialProofSection';
import { ProductGrid } from '@/components/organisms/ProductGrid';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SortControls } from '@/components/atoms/SortControls';
import { SortOption } from '@/types/sort';
import { FilterState } from '@/types/filter';
import { Product } from '@/types/product';
import { getColorName } from '@/lib/colors';
import { HeroSection } from './HeroSection';
import ProductFilterSidebar from './ProductFilterSidebar';
import QuickViewDrawer from './QuickViewDrawer';
import { CTAForm } from '../features/product/CTAForm';
import { CTAFormWrapper } from '@/wrappers/CTAFormWrapper';
import { Spinner } from '@heroui/spinner';

interface CategoryPageClientProps {
  category: string;
  categoryData: any;
  products: Product[];
  featuredProducts: Product[];
  socialProofData: any;
}

export function CategoryPageClient({
  category,
  categoryData,
  products,
  featuredProducts,
  socialProofData,
}: CategoryPageClientProps) {
  const [sortOption, setSortOption] = useState<SortOption>('price-asc');
  const [visibleProducts, setVisibleProducts] = useState(6);
  const [filters, setFilters] = useState<FilterState>({
    isNew: false,
    isOnSale: false,
    colors: [],
    priceRange: [0, 50000],
  });
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
/*   const [isLoading, setIsLoading] = useState(true); // loading state management
 */
  // Debugging: Log products
  console.log('CategoryPageClient products:', products);

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const handleCloseQuickView = () => {
    setQuickViewProduct(null);
  };

  // Calculate min/max prices
  const [minPrice, maxPrice] = useMemo(() => {
    const prices = products.map((p) => p.price ?? 0);
    return prices.length ? [Math.min(...prices), Math.max(...prices)] : [0, 50000];
  }, [products]);

  // Calculate all available color names
  const allColorNames = useMemo(() => {
    const allHexCodes = products.flatMap((product) => product.colors || []);
    const allNames = allHexCodes
      .map((hex) => getColorName(hex))
      .filter((name): name is string => name !== undefined);
    return Array.from(new Set(allNames)).sort();
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        if (!product) {
          console.warn('Undefined product in CategoryPageClient');
          return false;
        }
        return (
          (!filters.isNew || product.isNew) &&
          (!filters.isOnSale || product.isOnSale) &&
          (product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]) &&
          (filters.colors.length === 0 ||
            product.colors?.some((hexCode) => {
              const colorName = getColorName(hexCode);
              return colorName && filters.colors.includes(colorName);
            }))
        );
      }),
    [products, filters],
  );

  // Sort products
  const sortedProducts = useMemo(
    () =>
      [...filteredProducts].sort((a, b) => {
        if (!a || !b) return 0;
        switch (sortOption) {
          case 'price-asc':
            return (a.price ?? 0) - (b.price ?? 0);
          case 'price-desc':
            return (b.price ?? 0) - (a.price ?? 0);
          case 'name-asc':
            return (a.name ?? '').localeCompare(b.name ?? '');
          case 'name-desc':
            return (b.name ?? '').localeCompare(a.name ?? '');
          case 'newest':
            return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
          case 'on-sale':
            return (b.isOnSale ? 1 : 0) - (a.isOnSale ? 1 : 0);
          default:
            return 0;
        }
      }),
    [filteredProducts, sortOption],
  );

  const displayedProducts = sortedProducts.slice(0, visibleProducts);
 // Set isGridLoading to false after initial render or "Load More"
 /*   useEffect(() => {
     const timer = setTimeout(() => setIsLoading(false), Math.max(200, 0)); // Minimum 200ms to avoid flicker
     return () => clearTimeout(timer);
   }, [visibleProducts]);
 
   const handleLoadMore = () => {
     setIsLoading(true);
     setVisibleProducts((prev) => prev + 6);
     const timer = setTimeout(() => setIsLoading(false), Math.max(200, 0)); // Minimum 200ms
     return () => clearTimeout(timer);
   }; */
   
  return (
    <div className="flex flex-col gap-8">
      <HeroSection
        imageUrl={categoryData.image?.asset?.url || '/images/placeholder.jpg'}
        imageAlt={`${categoryData.name || category} category image`}
        badgeText={categoryData.heroBadgeText}
        headline={categoryData.heroHeadline || category.charAt(0).toUpperCase() + category.slice(1)}
        subheadline={categoryData.heroSubheadline || categoryData.description}
        ctaText={categoryData.heroCtaText}
        ctaLink={categoryData.heroCtaLink}
        overlayOpacity={categoryData.heroOverlayOpacity || 40}
        contentWidth={categoryData.heroContentWidth || 'medium'}
        minHeight={categoryData.heroMinHeight || 'lg'}
      />
      <section className="container mx-auto px-4 py-8">
        <FeaturedProductsWrapper
          title={`Featured ${categoryData.name || category}`}
          subtitle={`Discover our premium ${category} collection crafted for comfort and style`}
          viewAllLink={`/${category}`}
          columns={3}
          sortOption={sortOption}
          onSortChange={setSortOption}
          productLimit={3}
          categorySlug={category}
        />
      </section>
      <SocialProofSection
        title={socialProofData.title}
        subtitle={socialProofData.subtitle}
        items={socialProofData.items}
        layout={socialProofData.layout || 'grid-3'}
        backgroundImage={socialProofData.backgroundImage?.asset?.url || '/images/default-social-proof.jpg'}
        overlayOpacity={socialProofData.overlayOpacity || 0.7}
      />
      <section className="container mx-auto px-4 py-8">
        <ErrorBoundary>
          <div className="flex flex-col gap-6">
            {/* Product Count and Sort Controls */}
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {displayedProducts.length} of {filteredProducts.length} products
              </div>
              <SortControls sortOption={sortOption} onSortChange={setSortOption} />
            </div>
            {/* Sidebar and Grid */}
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/4 lg:w-1/5">
                <div className="sticky top-24 h-fit">
                  <ProductFilterSidebar
                    filters={filters}
                    onFiltersChange={setFilters}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    allColorNames={allColorNames}
                  />
                </div>
              </div>
               <div className="w-full md:w-3/4 lg:w-4/5">
                  <ProductGrid
                    products={displayedProducts}
                    sortOption={sortOption}
                    columns={3}
                    onQuickView={handleQuickView}
                  /> 
                {/* {isLoading ? (
                  <div className="flex items-center justify-center min-h-[20rem] bg-background-light dark:bg-background-dark">
                    <Spinner size="lg" className="text-text-light dark:text-text-dark" aria-live="polite" role="alert" />
                  </div>
                ) : (
                  <ProductGrid
                    products={displayedProducts}
                    sortOption={sortOption}
                    columns={3}
                    onQuickView={handleQuickView}
                  />
                )} */} 
              </div>
            </div>
          </div>
        </ErrorBoundary>
        {visibleProducts < sortedProducts.length && (
          
          <motion.button
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            onClick={() => setVisibleProducts((prev) => prev + 6)}
            className="mt-8 px-6 py-2 bg-primary text-gray-900 rounded-none font-sans text-body hover:bg-primary-dark hover:text-gray-900 dark:bg-primary-dark dark:text-gray-100 justify-center"
          >
            Load More {categoryData.name || category}
          </motion.button>
        )}
        <QuickViewDrawer
          isOpen={!!quickViewProduct}
          onClose={handleCloseQuickView}
          product={quickViewProduct}
        />
      </section>
    </div>
  );
}
'use client';

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import { SortOption } from "@/types/sort"; // Import from centralized location
import { FilterState } from "@/types/filter";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import SofaProductsWrapper from "@/wrappers/SofaProductsWrapper";
import QuickViewDrawer from "@/components/organisms/QuickViewDrawer";
import { sofaProducts } from "@/lib/mocks/sofaProducts";
import { Suspense, useState } from "react";
import { Product } from "@/types/product";
import AccentHeading from '@/components/atoms/AccentHeading';
import { FeaturedProductsSection } from "@/components/organisms/FeaturedProductsSection";

import { HeroSection } from '@/components/features/product/HeroSection';
import { SocialProofSection } from "@/components/organisms/SocialProofSection";
import { FeaturedProductsWrapper } from "@/wrappers/FeaturedProductsWrapper";

export default function SofaProductsPage() {
  const [sortOption, setSortOption] = useState<SortOption>('price-asc');
  const [visibleProducts, setVisibleProducts] = useState(6);
  const [filters, setFilters] = useState<FilterState>({ 
    isNew: false, 
    isOnSale: false, 
    colors: [],
    priceRange: [0, 50000]
  });
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const totalProducts = sofaProducts.length;

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const handleCloseQuickView = () => {
    setQuickViewProduct(null);
  };

  // Filter featured sofas (assuming you have an isFeatured property)
  const featuredSofas = sofaProducts.filter(product => product.isFeatured); 
// value for social proof section 
  const sofaSocialProof = [
    { value: 10000, label: 'Sofas Delivered', suffix: '+' },
    { value: 4.8, label: 'Customer Rating', suffix: '/5 ★' },
    { value: 98, label: 'Recommend Us', suffix: '%' }
  ];

  return (
    <>
    <HeroSection
      imageUrl="/features/ui/homepage-hero.jpg"
      imageAlt="Modern furniture collection showcasing sofas, chairs, and tables in a beautifully designed living space"
      badgeText="New Collection 2024"
      headline="Transform Your Home with Elegant Furniture"
      subheadline="Discover handcrafted pieces that blend comfort, style, and functionality for your perfect living space"
      ctaText="Explore Collection"
      ctaLink="/collection"
      minHeight="xl"
      contentWidth="wide"
      overlayOpacity={30} />

      
      <section className="container mx-auto px-4 py-8">
      
        {/* <FeaturedProductsSection
          title="Featured Sofas"
          subtitle="Discover our premium sofa collection crafted for comfort and style"
          products={featuredSofas}
          viewAllLink="/sofa"
          columns={3}
          sortOption={sortOption}
          onSortChange={setSortOption}
          productLimit={3} // Show only 3 products
        /> */}
        <FeaturedProductsWrapper
          title="Featured Sofas"
          subtitle="Discover our premium sofa collection crafted for comfort and style"
          viewAllLink="/sofa"
          columns={3}
          sortOption={sortOption}
          onSortChange={setSortOption}
          productLimit={3}
          categorySlug="sofa"
        />
     
      </section>
     {/* Social Proof Break */}
       <SocialProofSection
        title="Why Customers Love Our Sofas"
        items={sofaSocialProof}
        layout="grid-3"
      backgroundImage="/features/ui/homepage-hero.jpg"
      overlayOpacity={0.7}
      />
      <section className="container mx-auto px-4 py-8">
       <Suspense fallback={<p className="font-sans text-body">Loading products...</p>}>
          <ErrorBoundary>
            <SofaProductsWrapper
              sortOption={sortOption}
              onSortChange={setSortOption}
              visibleProducts={visibleProducts}
              filters={filters}
              onFiltersChange={setFilters}
              onQuickView={handleQuickView} // Pass the quick view handler
            />
          </ErrorBoundary>
        </Suspense>
      {/* Load More Button */}
        {visibleProducts < totalProducts && (
          <motion.button
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            onClick={() => setVisibleProducts(prev => prev + 6)}
            className="mt-8 px-6 py-2 bg-primary text-gray-900 rounded-lg font-sans text-body hover:bg-primary-dark hover:text-gray-900 dark:bg-primary-dark dark:text-gray-100"
          >
            Load More Sofas
          </motion.button>
        )}

        {/* Quick View Drawer */}
        <QuickViewDrawer
          isOpen={!!quickViewProduct}
          onClose={handleCloseQuickView}
          product={quickViewProduct} />
      </section>
       

        
      </>
  );
}
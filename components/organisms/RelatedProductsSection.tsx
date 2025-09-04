// components/organisms/RelatedProductSection
'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/motion';
import { ProductGrid } from '@/components/organisms';
import { Product } from '@/types/product';

interface RelatedProductsSectionProps {
  category: string;
  currentProductSlug: string;
  products: Product[];
  maxProducts?: number;
  className?: string;
}

export default function RelatedProductsSection({
  category,
  currentProductSlug,
  products,
  maxProducts = 3,
  className = '',
}: RelatedProductsSectionProps) {
  // Filter out current product and limit to maxProducts
  const relatedProducts = products
    .filter(product => product.slug !== currentProductSlug)
    .slice(0, maxProducts);

  console.log('RelatedProductsSection category:', category); // Debug
  console.log('RelatedProductsSection currentProductSlug:', currentProductSlug); // Debug
  console.log('RelatedProductsSection relatedProducts:', relatedProducts.map(p => p._id)); // Debug

  if (relatedProducts.length === 0) {
    console.warn('RelatedProductsSection: No related products found'); // Debug
    return null;
  }

  return (
    <section className={`py-8 ${className}`}>
      <motion.h3
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="font-sans text-heading text-gray-900 dark:text-gray-100 mb-6"
      >
        Related {category.charAt(0).toUpperCase() + category.slice(1)}
      </motion.h3>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative"
      >
        <ProductGrid
          products={relatedProducts}
          sortOption="price-asc" // No sorting for related products
          columns={3}
        />
      </motion.div>
    </section>
  );
}
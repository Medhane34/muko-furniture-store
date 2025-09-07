// components/organisms/RelatedProductSection
'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/motion';
import { ProductGrid } from '@/components/organisms';
import { Product } from '@/types/product';
import { CheckIcon } from 'lucide-react';
import BadgeText from '../atoms/BadgeText';
import MainHeadline from '../atoms/MainHeadline';
import { BarsArrowDownIcon } from '@heroicons/react/24/outline';

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
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="font-sans text-heading text-gray-900 dark:text-gray-100 mb-6 text-center"
      >
        <BadgeText
      gradient="custom"
      customGradient="linear-gradient(90deg, #8B5CF6 0%, #EC4899 100%)"
      rounded="lg"icon={<BarsArrowDownIcon className="w-4 h-4" />} 
      >
      Related {category.charAt(0).toUpperCase() + category.slice(1)}
      </BadgeText>
      <MainHeadline size='lg'>
        Find Related products 
      </MainHeadline>
        
      </motion.div>
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
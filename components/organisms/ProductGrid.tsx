'use client';

import { motion, useReducedMotion } from "framer-motion";
import { staggerContainer, reducedMotion, fadeInUp } from "@/lib/motion";
import { ProductCard } from "@/components/molecules/ProductCard";


export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isNew: boolean;
  isOnSale: boolean;
  slug: string;
  stock: number;
  material?: string;
  dimensions?: string;
  weight?: string;
  color?: string;
  features?: string[];
  reviews?: { rating: number; comment: string; user: string }[];
}

export type SortOption = 
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'
  | 'name-desc'
  | 'newest'
  | 'on-sale'
  | 'none';

export interface ProductGridProps {
  products: Product[];
  sortOption: SortOption;
  columns?: 3 | 4;
  className?: string;
}

export function ProductGrid({ products, sortOption, columns = 4, className = "" }: ProductGridProps) {
  const shouldReduceMotion = useReducedMotion();

  console.log("ProductGrid columns:", columns); // Debug
  console.log("Grid className:", `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns === 3 ? 2 : 3} lg:grid-cols-${columns} gap-6 ${className}`); // Debug
  console.log("ProductGrid products order:", products.map(p => p._id)); // Debug

  return (
    <motion.div
      variants={shouldReduceMotion ? reducedMotion : staggerContainer}
      initial="hidden"
      animate="visible"
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns === 3 ? 2 : 3} lg:grid-cols-${columns} gap-6 ${className}`}
    >
      {products.length > 0 ? (
        products.map((product, index) => (
          <motion.div
            key={product._id}
            variants={shouldReduceMotion ? undefined : fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard
              image={product.imageUrl}
              title={product.name}
              price={product.price}
              ctaLink={`/product/${product.slug}`}
              ctaText="Inquire"
              badgeText={product.isNew ? "New" : product.isOnSale ? "On Sale" : undefined}
            />
          </motion.div>
        ))
      ) : (
        <p className="font-sans text-body text-gray-900 dark:text-gray-100">
          No products available.
        </p>
      )}
    </motion.div>
  );
}
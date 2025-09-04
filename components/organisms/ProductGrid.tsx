'use client';

import { motion, useReducedMotion } from "framer-motion";
import { staggerContainer, reducedMotion, fadeInUp } from "@/lib/motion";
import { ProductCard } from "@/components/molecules/ProductCard";
import { Product } from "@/types/product";
import { SortOption } from "@/types/sort";

export interface ProductGridProps {
  products: Product[];
  sortOption: SortOption;
  columns?: 3 | 4;
  className?: string;
  onQuickView?: (product: Product) => void; // ✅ This is the prop
}


export function ProductGrid({ 
  products, 
  sortOption, 
  columns = 4, 
  className = "",
  onQuickView // ✅ This is the prop we want to use
}: ProductGridProps) {
  const shouldReduceMotion = useReducedMotion();

  // ✅ REMOVE THIS - it's overriding the prop!
  // function onQuickView(product: Product): void {
  //   throw new Error("Function not implemented.");
  // }

  // FIX: Static mapping of column classes for Tailwind JIT
  const gridClassMap = {
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-3 lg:grid-cols-4",
  };

  const gridClasses = gridClassMap[columns];
  const finalGridClassName = `grid grid-cols-1 sm:grid-cols-2 ${gridClasses} gap-6 ${className}`;

  return (
    <motion.div
      variants={shouldReduceMotion ? reducedMotion : staggerContainer}
      initial="hidden"
      animate="visible"
      className={finalGridClassName}
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
            {/* ✅ Now this will use the onQuickView from props */}
            <ProductCard 
              product={product} 
              onQuickView={onQuickView} // Pass the prop down
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
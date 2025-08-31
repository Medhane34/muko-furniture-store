'use client';

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import { SortControls, SortOption } from "@/components/atoms";
import { FilterGroup, FilterState } from "@/components/molecules";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import SofaProductsWrapper from "@/wrappers/SofaProductsWrapper";
import { sofaProducts } from "@/lib/mocks/sofaProducts";
import { Suspense, useState } from "react";

export default function SofaProductsPage() {
  const [sortOption, setSortOption] = useState<SortOption>('price-asc');
  const [visibleProducts, setVisibleProducts] = useState(6); // Initial: 2 rows * 3 columns
  const [filters, setFilters] = useState<FilterState>({ isNew: false, isOnSale: false });
  const totalProducts = sofaProducts.length;

  return (
    <section className="container mx-auto px-4 py-8">
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="font-sans text-heading text-gray-900 dark:text-gray-100 mb-4"
      >
        Our Sofa Collection
      </motion.h2>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SortControls
          sortOption={sortOption}
          onSortChange={(option) => {
            console.log("SortControls onSortChange:", option); // Debug
            setSortOption(option);
          }}
        />
        <FilterGroup
          filters={filters}
          onFilterChange={(newFilters) => {
            console.log("SofaProductsPage filters:", newFilters); // Debug
            setFilters(newFilters);
          }}
        />
      </div>
      <Suspense fallback={<p className="font-sans text-body">Loading products...</p>}>
        <ErrorBoundary>
          <SofaProductsWrapper sortOption={sortOption} visibleProducts={visibleProducts} filters={filters} />
        </ErrorBoundary>
      </Suspense>
      {visibleProducts < totalProducts && (
        <motion.button
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          onClick={() => {
            console.log("Load More clicked, visibleProducts:", visibleProducts + 6); // Debug
            setVisibleProducts((prev) => prev + 6);
          }}
          className="mt-6 px-6 py-2 bg-primary text-gray-900 rounded-lg font-sans text-body hover:bg-primary-dark hover:text-gray-900 dark:bg-primary-dark dark:text-gray-100"
        >
          Load More Sofas
        </motion.button>
      )}
    </section>
  );
}
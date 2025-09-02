'use client';

import { motion, useReducedMotion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import { FilterState } from "@/types/filter";


interface FilterGroupProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  className?: string;
}

export function FilterGroup({ filters, onFilterChange, className = "" }: FilterGroupProps) {
  const shouldReduceMotion = useReducedMotion();

  const handleFilterChange = (key: keyof FilterState) => {
    const newFilters = { ...filters, [key]: !filters[key] };
    console.log("FilterGroup newFilters:", newFilters); // Debug
    onFilterChange(newFilters);
  };

  return (
    <motion.div
      variants={shouldReduceMotion ? undefined : fadeInUp}
      initial="hidden"
      animate="visible"
      className={`flex flex-col sm:flex-row gap-8 p-8 ${className}`}
    >
      <label className="flex items-center gap-8 font-sans text-body text-gray-900 dark:text-gray-100">
        <input
          type="checkbox"
          checked={filters.isNew}
          onChange={() => handleFilterChange('isNew')}
          className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary-dark"
        />
        New Products
      </label>
      <label className="flex items-center gap-2 font-sans text-body text-gray-900 dark:text-gray-100">
        <input
          type="checkbox"
          checked={filters.isOnSale}
          onChange={() => handleFilterChange('isOnSale')}
          className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary-dark"
        />
        On Sale
      </label>
    </motion.div>
  );
}
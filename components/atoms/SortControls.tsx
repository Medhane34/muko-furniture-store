'use client';

import { motion, useReducedMotion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import { Select, SelectItem } from "@heroui/select";
import { SortOption } from '@/types/sort'; // Import from central location

interface SortControlsProps {
  sortOption: SortOption;
  onSortChange: (sortOption: SortOption) => void;
  className?: string;
}

export function SortControls({ sortOption, onSortChange, className = "" }: SortControlsProps) {
  const shouldReduceMotion = useReducedMotion();

  const options: { key: SortOption; label: string }[] = [
    { key: 'price-asc', label: 'Price: Low to High' },
    { key: 'price-desc', label: 'Price: High to Low' },
    { key: 'name-asc', label: 'Name: A-Z' },
    { key: 'name-desc', label: 'Name: Z-A' },
    { key: 'newest', label: 'Newest First' },
    { key: 'on-sale', label: 'On Sale First' },
  ];

  return (
    <motion.div
      variants={shouldReduceMotion ? undefined : fadeInUp}
      initial="hidden"
      animate="visible"
      className={`flex items-center gap-2 ${className}`}
    >
      <Select
        label="Sort by"
        selectedKeys={[sortOption]}
        onSelectionChange={(keys) => onSortChange(Array.from(keys)[0] as SortOption)}
        classNames={{
          base: "max-w-xs",
          trigger: "bg-primary hover:bg-primary-dark text-gray-900 dark:bg-primary-dark dark:text-gray-100 rounded-lg",
          value: "font-sans text-body",
          popoverContent: "bg-white dark:bg-gray-800 rounded-lg",
        }}
        isRequired={false}
        placeholder="Select a sort option"
        aria-label="Sort products"
      >
        {options.map((option) => (
          <SelectItem key={option.key} className="font-sans text-body">
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </motion.div>
  );
}
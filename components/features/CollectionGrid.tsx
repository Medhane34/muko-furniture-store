// src/components/organisms/CollectionGrid.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { CategoryCard } from "@/components/molecules/CategoryCard";

interface Category {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  href: string;
}

const categories: Category[] = [
  {
    id: "beds",
    title: "Beds",
    description: "Dreamy beds for modern homes.",
    imageSrc: "/homepage-hero.jpg",
    href: "/categories/beds",
  },
  {
    id: "sofas",
    title: "Sofas",
    description: "Comfort meets style.",
    imageSrc: "/homepage-hero.jpg",
    href: "/categories/sofas",
  },
  {
    id: "dining",
    title: "Dining",
    description: "Elevate every meal.",
    imageSrc: "/homepage-hero.jpg",
    href: "/categories/dining",
  },
  {
    id: "chairs",
    title: "Chairs",
    description: "Seating for every space.",
    imageSrc: "/homepage-hero.jpg",
    href: "/categories/chairs",
  },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

export const CollectionGrid: React.FC = () => {
  return (
    <motion.section
      className="container mx-auto py-12 px-4"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Header - Optional */}
      <div className="text-center mb-12">
        <h2 className="font-sans text-heading font-bold text-gray-900 mb-4">
          Shop by Category
        </h2>
        <p className="font-sans text-body text-gray-600 max-w-2xl mx-auto">
          Discover our curated collections for every room in your home
        </p>
      </div>

      {/* Grid with 30%/70% split */}
      <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-8">
        
        {/* First Column - 30% width (Featured Categories) */}
        <div className="space-y-6">
          <motion.h3 
            className="font-sans text-subheading font-semibold text-gray-900 mb-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
          >
            Featured Collections
          </motion.h3>
          
          {categories.slice(0, 2).map((category, index) => (
            <motion.div
              key={category.id}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { 
                  opacity: 1, 
                  scale: 1,
                  transition: { 
                    duration: 0.4,
                    delay: index * 0.1
                  }
                }
              }}
            >
              <CategoryCard 
                {...category} 
                className="h-full" // Ensure cards fill the height
              />
            </motion.div>
          ))}
        </div>

        {/* Second Column - 70% width (Main Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.slice(2).map((category, index) => (
            <motion.div
              key={category.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.5,
                    delay: 0.2 + (index * 0.1)
                  }
                }
              }}
            >
              <CategoryCard 
                {...category} 
                className="h-full" // Ensure cards fill the height
              />
            </motion.div>
          ))}
          
          {/* Optional: Add a "View All" card */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { 
                opacity: 1, 
                scale: 1,
                transition: { duration: 0.5, delay: 0.4 }
              }
            }}
            className="flex items-center justify-center bg-gray-50 rounded-lg p-8 hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={() => window.location.href = '/categories'}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-700 mb-2">+</div>
              <h3 className="font-sans font-semibold text-gray-900 mb-2">
                View All Categories
              </h3>
              <p className="font-sans text-sm text-gray-600">
                Explore our complete collection
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default CollectionGrid;
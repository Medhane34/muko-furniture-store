"use client";

import React from "react";
import { motion } from "framer-motion";
import { CategoryCard } from "@/components/molecules/CategoryCard";
import { Badge } from "@/components/atoms/Badge";
import MainHeadline from "../atoms/MainHeadline";

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
  {
    id: "accessories", // Fixed typo from "accesories" and changed title from duplicate "Chairs"
    title: "Accessories",
    description: "Enhance your space with style.",
    imageSrc: "/homepage-hero.jpg",
    href: "/categories/accessories",
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
      className="container mx-auto py-12 px-4  dark:bg-background-dark"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Header with Headline and Badge */}
      <div className="text-center mb-12">
        <Badge color="primary" className="mb-4">
          New Collections
        </Badge>
        <MainHeadline  className="font-bold text-text-light dark:text-text-dark mb-4">
          Shop by Category
        </MainHeadline>
        <p className="font-sans text-subheading text-text-light/90 dark:text-text-dark/90 max-w-2xl mx-auto">
          Discover our curated collections for every room in your home
        </p>
      </div>

      {/* 2x3 Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-fr">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            className="h-full"
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
              className="h-full bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow rounded-lg"
            />
          </motion.div>
        ))}
        
        {/* View All Card - Styled to match CategoryCard */}
        <motion.div
          className="h-full"
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { 
              opacity: 1, 
              scale: 1,
              transition: { duration: 0.4, delay: 0.5 }
            }
          }}
        >
          <div 
            className="h-full flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer p-8"
            onClick={() => window.location.href = '/categories'}
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">+</div>
              <h3 className="font-sans text-subheading font-semibold text-text-light dark:text-text-dark mb-2">
                View All Categories
              </h3>
              <p className="font-sans text-body text-text-light/80 dark:text-text-dark/80">
                Explore our complete collection
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CollectionGrid;
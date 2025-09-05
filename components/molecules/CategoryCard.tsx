// src/components/molecules/CategoryCard.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface CategoryCardProps {
  title: string;
  description: string;
  imageSrc: string;
  href: string;
  className?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  imageSrc,
  href,
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
      whileHover="hover"
      whileTap="tap"
      className="relative overflow-hidden rounded-none group"
    >
      <Link href={href} passHref>
        <div className="relative w-full h-full aspect-[4/3] sm:aspect-square md:aspect-[4/3] lg:aspect-[4/3]">
          {/* Background Image */}
          <Image
            src={imageSrc}
            alt={`Image for ${title} category`}
            fill
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
          {/* Text and Overlay */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex flex-col justify-end p-6">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 z-10">
              {title}
            </h3>
            <p className="text-sm md:text-base lg:text-lg text-gray-200 z-10">
              {description}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
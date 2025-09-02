// components/molecules/ProductCard.tsx
'use client';

import { motion } from "framer-motion";
import { cardVariants } from "@/lib/motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { StarRating } from '@/components/atoms/StarRating';
import { Product } from '@/types/product';
import { MoreHorizontal } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void; // New callback prop
}

export function ProductCard({ product, onQuickView }: ProductCardProps) { // ✅ Destructure onQuickView here
  const router = useRouter();
  const { name, price, originalPrice, imageUrl, slug, isNew, isOnSale, colors, rating, promotionText } = product;
  const badgeText = isNew ? "NEW" : isOnSale ? "SALE" : undefined;

  const handleClick = () => {
    router.push(`/product/${slug}`);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the main card click
    onQuickView?.(product); // ✅ This will now use the prop
  };

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="group w-full flex flex-col cursor-pointer"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleClick();
        }
      }}
    >
      {/* Image Wrapper */}
      <div className="relative mb-4 overflow-hidden">
        <div className="relative" style={{ aspectRatio: '3/4' }}>
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        {/* NEW: Quick View Trigger Button */}
        <button
          onClick={handleQuickView}
          className="absolute bottom-3 right-3 p-1.5 bg-white/90 rounded-full backdrop-blur-sm hover:bg-white transition-colors shadow-sm"
          aria-label="Quick view"
        >
          <MoreHorizontal size={16} className="text-gray-700" />
        </button>
        
        {/* Promotion Badge */}
        {promotionText && (
          <div className="absolute top-3 right-3">
            <span className="bg-white text-gray-900 text-xs font-sans font-medium px-2 py-1 rounded backdrop-blur-sm border border-white/20">
              {promotionText}
            </span>
          </div>
        )}
        
        {colors && colors.length > 3 && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-white/90 text-gray-900 text-xs font-sans font-medium px-2 py-1 rounded-full">
              +{colors.length - 3}
            </span>
          </div>
        )}
      </div>

      {/* Details Wrapper */}
      <div className="flex flex-col gap-2 flex-1">
        {rating && (
          <div className="flex items-center gap-1.5">
            <StarRating rating={rating.average} />
            <span className="text-xs text-gray-600 dark:text-gray-400">
              ({rating.count})
            </span>
          </div>
        )}

        <h3 className="font-sans text-body font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 leading-tight">
          {name}
        </h3>

        <div className="flex items-center gap-2">
          <span className="font-sans text-subheading font-bold text-gray-900 dark:text-gray-100">
            ETB {price.toLocaleString()}
          </span>
          {originalPrice && originalPrice > price && (
            <span className="font-sans text-body text-gray-500 line-through">
              ETB {originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {colors && colors.length > 0 && (
          <div className="flex items-center gap-1.5">
            {colors.slice(0, 3).map((color, index) => (
              <div
                key={index}
                aria-hidden="true"
                className="w-4 h-4 rounded-full border border-gray-200 shadow-sm"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}

// ✅ REMOVE THIS ENTIRE FUNCTION FROM THE BOTTOM OF THE FILE!
// function onQuickView(product: Product) {
//   throw new Error("Function not implemented.");
// }
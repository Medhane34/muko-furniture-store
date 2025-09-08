// components/sections/product/ProductHeroSection.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp } from '@/lib/motion';
import { Product } from '@/types/product';
import Image from 'next/image';
import { X, Share2 } from 'lucide-react';
import { Accordion, AccordionItem } from '@heroui/accordion';
import { StarRating } from '@/components/atoms';
import BadgeText from '@/components/atoms/BadgeText';
import { CheckBadgeIcon, MagnifyingGlassPlusIcon } from '@heroicons/react/24/outline';
import { Divider } from '@heroui/divider';

interface HeroSectionProps {
  product: Product;
}

export function ProductHeroSection({ product }: HeroSectionProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Dummy data for enhancements
  const keySellingPoints = [
    "Handcrafted Quality",
    "Free Addis Delivery",
    "5-Year Warranty",
    "Ethiopian Hardwood"
  ];

  const accordionItems = [
    {
      key: "delivery",
      title: "Delivery & Returns",
      content: "Free delivery within Addis Ababa for orders over ETB 5,000. Delivery takes 3-5 business days. We offer a 30-day return policy for unused items in original packaging."
    },
    {
      key: "care",
      title: "Product Care",
      content: "Clean with a soft, dry cloth. Avoid direct sunlight and moisture. For wood products, use specialized wood cleaner monthly to maintain finish."
    },
    {
      key: "specifications",
      title: "Specifications",
      content: `Material: ${product.material || 'Solid Wood'}. Dimensions: ${product.dimensions || 'N/A'}. Weight: ${product.weight || 'N/A'}. Designed and crafted in Addis Ababa, Ethiopia.`
    }
  ];

  // Function to handle social sharing
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here: "Link copied to clipboard!"
    }
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsZoomed(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleClickOutside = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsZoomed(false);
    }
  };

  // Get rating values
  const ratingAverage = typeof product.rating === 'number' ? product.rating : (product.rating?.average ?? 4.5);
  const ratingCount = typeof product.rating === 'object' && product.rating?.count !== undefined ? product.rating.count : 0;

  return (
    <>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
      >
        {/* Image Column (Unchanged) */}
        <div className="flex flex-col items-center sticky top-4 self-start">
          <div className="relative w-full h-96 lg:max-h-[70vh] rounded-none">
            <Image
              src={product.imageUrl || '/images/placeholder.jpg'}
              alt={product.name}
              fill
              className="object-cover rounded-none"
              priority
            />
          </div>
          <motion.button
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            onClick={() => setIsZoomed(true)}
            className="-mt-11 z-2 px-4 py-2 bg-primary text-gray-900 rounded-full font-sans text-body hover:bg-primary-dark flex items-center gap-2"
            aria-label="Zoom image"
          >
            <MagnifyingGlassPlusIcon className='w-5 h-5' />
            Zoom Image
          </motion.button>
        </div>

        {/* Info Column - UPDATED LAYOUT */}
        <div className="flex flex-col gap-2">
          {/* Category Tag - NEW */}
          <motion.p variants={fadeInUp} className="font-sans text-small text-primary font-semibold">
            {product.category?.name}
          </motion.p>

          {/* Product Name & Description */}
          <motion.h1 variants={fadeInUp} className="font-sans text-heading text-text-light dark:text-text-dark text-3xl font-bold">
            {product.name}
          </motion.h1>
          <motion.p variants={fadeInUp} className="font-sans text-body text-text-light/70 dark:text-text-dark/70">
            {product.description}
          </motion.p>
<Divider />
          {/* Price & Rating Group - UPDATED */}
          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-6  rounded-lg">
            <div className="flex gap-18">
              <p className="font-sans text-xl font-bold text-text-light dark:text-text-dark text-left">
                ETB {product.price.toFixed(2)}
              </p>
              <br/>
              <div className="flex items-right gap-2 pt-2">
                <StarRating rating={ratingAverage} size={10} />
                <span className="text-sm text-text-light/70 dark:text-text-dark/70 underline">
                  ({ratingCount} reviews)
                </span>
              </div>
            </div>
            {/* Stock Status - MOVED TO NEW LINE */}
            <p className={`font-sans text-body w-full -mt-[2] ${product.stock > 0 ? 'text-success' : 'text-danger'}`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </p>
          </motion.div>

          {/* Key Selling Points - Badges */}
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-2">
            {keySellingPoints.map((point, index) => (
              <BadgeText key={index}>
                {point}
              </BadgeText>
            ))}
          </motion.div>

          {/* Color Swatches - MOVED HERE with proper label */}
          {product.colors && product.colors.length > 0 && (
            <motion.span variants={fadeInUp} className="flex flex-col gap-2">
{/*               <p className="font-sans text-small font-semibold text-text-light/70 dark:text-text-dark/70"> Colors</p>
 */}              <span className="flex flex-wrap gap-2 ">
                Colors: {product.colors.slice(0, 6).map((color, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full border-2 border-default-200 hover:border-primary transition-colors cursor-pointer"
                    style={{ backgroundColor: color }}
                    aria-hidden="true"
                    title={color}
                  />
                ))}
              </span>
            </motion.span>
          )}
  <Divider />
          {/* Specifications Group - UPDATED (removed colors) */}
          <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 rounded-lg align">
            <div>
              <p className="font-sans text-small font-semibold text-text-light/70 dark:text-text-dark/70">Material</p>
              <p className="font-sans text-body text-text-light dark:text-text-dark">{product.material || 'Solid Wood'}</p>
            </div>
            <div>
              <p className="font-sans text-small font-semibold text-text-light/70 dark:text-text-dark/70">Dimensions</p>
              <p className="font-sans text-body text-text-light dark:text-text-dark">{product.dimensions || 'N/A'}</p>
            </div>
            <div>
              <p className="font-sans text-small font-semibold text-text-light/70 dark:text-text-dark/70">Weight</p>
              <p className="font-sans text-body text-text-light dark:text-text-dark">{product.weight || 'N/A'}</p>
            </div>
          </motion.div>
<Divider />
          {/* Accordion - Enhanced Content */}
          <motion.div variants={fadeInUp}>
            <Accordion variant="splitted">
              {accordionItems.map((item) => (
                <AccordionItem key={item.key} aria-label={item.title} title={item.title}>
                  {item.content}
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* Action Buttons Group */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mt-3 align-left">
            <button className="flex-1 py-3 bg-primary text-gray-900 rounded-lg font-sans font-semibold hover:bg-primary-dark transition-colors">
              Inquire About Product
            </button>
            <button 
              onClick={handleShare}
              className="flex items-left justify-left gap-2 py-3 border-2 border-default-200 text-text-light dark:text-text-dark rounded-lg font-sans font-semibold hover:border-primary transition-colors"
            >
              <Share2 size={18} />
              Share
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Zoom Modal (Unchanged) */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            onClick={handleClickOutside}
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] w-full h-full"
            >
              <Image
                src={product.imageUrl || '/images/placeholder.jpg'}
                alt={product.name}
                fill
                className="object-contain"
              />
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-4 right-4 p-2 text-gray-100 hover:text-primary"
                aria-label="Close zoom"
              >
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
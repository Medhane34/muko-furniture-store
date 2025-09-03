'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp } from '@/lib/motion';
import { Product } from '@/types/product';
import Image from 'next/image';
import { X } from 'lucide-react';
import { colorMap } from '@/lib/colors';
import { Accordion, AccordionItem } from '@heroui/accordion';
interface HeroSectionProps {
  product: Product;
}

export function ProductHeroSection({ product }: HeroSectionProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsZoomed(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Handle click outside to close modal
  const handleClickOutside = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsZoomed(false);
    }
  };

  console.log('HeroSection product:', product); // Debug
  console.log('HeroSection isZoomed:', isZoomed); // Debug

  return (
    <>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start "
      >
        {/* Left Column: Product Image */}
        <div className="flex flex-col items-center sticky top-4 self-start">
          <div className="relative w-full h-96 h-96 lg:max-h-[70vh]">
            <Image
              src={product.imageUrl || '/images/placeholder.jpg'}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
          <motion.button
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            onClick={() => {
              setIsZoomed(true);
              console.log('Zoom Image clicked'); // Debug
            }}
            className="-mt-8 z-2 px-4 py-2 bg-primary text-gray-900 rounded-lg font-sans text-body hover:bg-primary-dark"
            aria-label="Zoom image"
          >
            Zoom Image
          </motion.button>
        </div>

        {/* Right Column: Product Details */}
        <div className="flex flex-col gap-4">
          <motion.h1
            variants={fadeInUp}
            className="font-sans text-heading text-gray-900 dark:text-gray-100"
          >
            {product.name}
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="font-sans text-body text-gray-600 dark:text-gray-300"
          >
            {product.description}
          </motion.p>
          <motion.p
            variants={fadeInUp}
            className="font-sans text-subheading font-bold text-gray-900 dark:text-gray-100"
          >
            ${product.price.toFixed(2)}
          </motion.p>
          <motion.p
            variants={fadeInUp}
            className="font-sans text-body text-gray-900 dark:text-gray-100"
          >
            Stock: {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
          </motion.p>
          <motion.p
            variants={fadeInUp}
            className="font-sans text-body text-gray-900 dark:text-gray-100"
          >
            Material: {product.material || 'N/A'}
          </motion.p>
          <motion.p
            variants={fadeInUp}
            className="font-sans text-body text-gray-900 dark:text-gray-100"
          >
            Dimensions: {product.dimensions || 'N/A'}
          </motion.p>
          <motion.p
            variants={fadeInUp}
            className="font-sans text-body text-gray-900 dark:text-gray-100"
          >
            Weight: {product.weight || 'N/A'}
          </motion.p>
          
          {product.colors && product.colors.length > 0 ? (
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-2 mt-2"
              aria-label={`Available colors: ${product.colors.join(', ')}`}
            >
              <span className="font-sans text-body text-gray-900 dark:text-gray-100">
                Colors:
              </span>
              {product.colors.slice(0, 4).map((color) => (
                <div
                  key={color}
                  className="w-6 h-6 rounded-full border border-gray-300"
                  style={{ backgroundColor: colorMap[color] || '#000000' }}
                  aria-hidden="true"
                />
              ))}
            </motion.div>
          ) : (
            <motion.p
              variants={fadeInUp}
              className="font-sans text-body text-gray-900 dark:text-gray-100"
            >
              Colors: N/A
            </motion.p>
          )}
          
        <Accordion>
            <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
              {defaultContent}
            </AccordionItem>
            <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
              {defaultContent}
            </AccordionItem>
            <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
              {defaultContent}
            </AccordionItem>
          </Accordion>

          <motion.button

            variants={fadeInUp}
            className="px-6 py-2 bg-primary text-gray-900 rounded-lg font-sans text-body hover:bg-primary-dark w-max"
            aria-label="Inquire about product"
          >
            Inquire
          </motion.button>
          
        </div>
      </motion.div>

      {/* Full-Screen Modal */}
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
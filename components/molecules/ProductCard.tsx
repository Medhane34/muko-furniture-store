'use client';

import { motion, useReducedMotion } from "framer-motion";
import { cardVariants, staggerContainer, staggerItem, buttonVariants, reducedMotion } from "@/lib/motion";
import { Image } from "@heroui/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  ctaLink: string;
  ctaText: string;
  badgeText?: string;
}

export  function ProductCard({ image, title, price, ctaLink, ctaText, badgeText }: ProductCardProps) {
  // All hooks called unconditionally at the top
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Common JSX props
  const articleProps = isMounted && !shouldReduceMotion ? {
    variants: cardVariants,
    initial: "hidden",
    animate: "visible",
    whileHover: "hover",
    whileTap: "tap",
  } : {};

  const badgeProps = isMounted && !shouldReduceMotion ? {
    variants: staggerItem,
  } : {};

  const infoProps = isMounted && !shouldReduceMotion ? {
    variants: staggerContainer,
    initial: "hidden",
    animate: "visible",
  } : {};

  const textProps = isMounted && !shouldReduceMotion ? {
    variants: staggerItem,
  } : {};

  const buttonProps = isMounted && !shouldReduceMotion ? {
    variants: buttonVariants,
    initial: "hidden",
    animate: "visible",
    whileHover: "hover",
    whileTap: "tap",
  } : {};

  return (
    <motion.article
      {...articleProps}
      className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-xs mx-auto"
    >
      {/* Product Image */}
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {badgeText && (
          <motion.span
            {...badgeProps}
            className="absolute top-2 right-2 bg-primary text-gray-900 text-small font-sans px-2 py-1 rounded-full"
          >
            {badgeText}
          </motion.span>
        )}
      </div>

      {/* Product Info */}
      <motion.div
        {...infoProps}
        className="p-4 flex flex-col gap-2"
      >
        <motion.h3
          {...textProps}
          className="font-sans text-subheading text-gray-900 dark:text-gray-100"
        >
          {title}
        </motion.h3>
        <motion.p
          {...textProps}
          className="font-sans text-body text-gray-600 dark:text-gray-300"
        >
          ETB {price.toLocaleString()}
        </motion.p>

        {/* CTA Button */}
        <motion.button
          {...buttonProps}
          onClick={isMounted ? () => router.push(ctaLink) : () => {}}
          className="w-full px-6 py-2 bg-primary text-gray-900 rounded-lg font-sans text-body hover:bg-primary-dark hover:text-gray-900 dark:bg-primary-dark dark:text-gray-100"
          aria-label={`Inquire about ${title}`}
        >
          {ctaText}
        </motion.button>
      </motion.div>
    </motion.article>
  );
}
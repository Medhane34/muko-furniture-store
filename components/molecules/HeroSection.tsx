// components/organisms/HeroSection.tsx
"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Badge from "@/components/atoms/Badge";
import BodyText from "@/components/atoms/BodyText";
import { button as buttonStyles } from "@/components/primitives";
import { fadeInUp, buttonVariants } from "@/lib/motion";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/button";

import { title, subtitle } from "@/components/primitives";


export interface HeroSectionProps {
  badgeText?: string;
  headline: string;
  highlight?: string;
  subheading: string;
  imageUrl: string;
  imageAlt: string;
  ctaText: string;
  ctaHref: string;
  showArrow?: boolean;
  onArrowClick?: () => void;
}

export function HeroSection({
  badgeText,
  headline,
  highlight,
  subheading,
  imageUrl,
  imageAlt,
  ctaText,
  ctaHref,
  showArrow = true,
  onArrowClick,
}: HeroSectionProps) {
  // For scrolling to next section
  const handleArrowClick = () => {
    if (onArrowClick) return onArrowClick();
    const nextSection = document.getElementById("next-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative flex flex-col-reverse md:flex-row items-center justify-between min-h-[70vh] bg-background-light dark:bg-background-dark px-4 sm:px-8 py-16">
      {/* Left: Text Content */}
      <motion.div
        className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left gap-6 z-10"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        {badgeText && (
          <Badge color="primary" size="md" className="mb-2">
            {badgeText}
          </Badge>
        )}
        <h1 className={title()}>
          {headline}
          {highlight && (
            <span className="text-primary ml-2">{highlight}</span>
          )}
        </h1>
        <BodyText size="lg" color="default" className="max-w-xl">
          {subheading}
        </BodyText>
        <div className="flex gap-4 mt-4">
          <motion.a
            href={ctaHref}
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
          >
            <Button>{ctaText}</Button>
        
          </motion.a>
        </div>
        {showArrow && (
          <motion.button
            aria-label="Scroll to next section"
            className="mt-8 flex items-center justify-center mx-auto md:mx-0"
            onClick={handleArrowClick}
            initial={{ y: 0 }}
            animate={{ y: [0, 16, 0] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          >
            <ArrowDownIcon className="w-8 h-8 text-primary" />
          </motion.button>
        )}
      </motion.div>
      {/* Right: Image */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={600}
          height={400}
          className="rounded-3xl shadow-xl object-cover w-full max-w-lg h-auto"
          priority
        />
      </motion.div>
    </section>
  );
}

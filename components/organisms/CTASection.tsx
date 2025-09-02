// components/sections/CTASection.tsx
'use client';

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import Image from "next/image";
import { Button } from "@/components/atoms/Button";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  variant?: 'contact' | 'product-inquiry';
  badge?: string;
  heading: string;
  subheading?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
  overlayOpacity?: 20 | 40 | 50 | 60 | 70 | 80; // Limited to specific values
  textColor?: 'light' | 'dark';
  className?: string;
}

// Map opacity values to static Tailwind classes
const opacityClasses = {
  20: 'bg-opacity-20',
  40: 'bg-opacity-40',
  50: 'bg-opacity-50',
  60: 'bg-opacity-60',
  70: 'bg-opacity-70',
  80: 'bg-opacity-80',
};

export function CTASection({
  variant = 'contact',
  badge = "Get Started",
  heading = "Ready to Transform Your Business?",
  subheading = "Let's discuss how we can help you achieve your digital goals",
  ctaText = "Contact Us Today",
  ctaLink = "/contact",
  backgroundImage = "/shop/sofa/sofa-1.jpg",
  overlayOpacity = 40, // Default value
  textColor = 'light',
  className = ""
}: CTASectionProps) {
  
  const textStyles = textColor === 'light' 
    ? 'text-white' 
    : 'text-gray-900';

  // Use static class mapping
  const overlayClass = `absolute inset-0 bg-black ${opacityClasses[overlayOpacity]}`;

  return (
    <section className={`relative py-20 md:py-28 overflow-hidden ${className}`}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {backgroundImage && (
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
            priority
          />
        )}
        <div className={overlayClass} /> {/* Use the static class */}
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Badge */}
          {badge && (
            <motion.span
              variants={fadeInUp}
              className={`inline-block mb-4 px-4 py-2 rounded-full text-sm font-sans font-medium ${
                textColor === 'light' 
                  ? 'bg-white/20 text-white backdrop-blur-sm' 
                  : 'bg-primary/20 text-gray-900'
              }`}
            >
              {badge}
            </motion.span>
          )}

          {/* Heading */}
          <motion.h2
            variants={fadeInUp}
            className={`font-sans text-heading md:text-[2.5rem] font-bold mb-6 ${textStyles}`}
          >
            {heading}
          </motion.h2>

          {/* Subheading */}
          {subheading && (
            <motion.p
              variants={fadeInUp}
              className={`font-sans text-body md:text-xl mb-8 ${textStyles} ${
                textColor === 'light' ? 'opacity-90' : 'opacity-80'
              }`}
            >
              {subheading}
            </motion.p>
          )}

          {/* CTA Button */}
          {ctaText && ctaLink && (
            <motion.div variants={fadeInUp}>
              <Button
                variant={textColor === 'light' ? 'solid' : 'solid'}
                color={textColor === 'light' ? 'secondary' : 'primary'}
                size="lg"
                rightIcon={ArrowRight}
                onClick={() => window.location.href = ctaLink}
                className="text-center"
              >
                {ctaText}
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
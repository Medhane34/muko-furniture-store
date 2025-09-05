'use client';

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import Image from "next/image";
import { Button } from "@/components/atoms/Button";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import MainHeadline from "../atoms/MainHeadline";
import BadgeText from "../atoms/BadgeText";
import { CheckIcon } from "@heroicons/react/24/outline";

interface CTASectionProps {
  variant?: 'contact' | 'product-inquiry';
  badge?: string;
  heading: string;
  subheading?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
  className?: string;
}

export function CTASection({
  variant = 'contact',
  badge = "Get Started",
  heading = "Ready to Transform Your Business?",
  subheading = "Let's discuss how we can help you achieve your digital goals",
  ctaText = "Contact Us Today",
  ctaLink = "/contact",
  backgroundImage = "/shop/sofa/sofa-1.jpg",
  className = ""
}: CTASectionProps) {
  
  return (
    <section 
      className={`relative  overflow-hidden ${className}`} 
      role="region"
      aria-label="Call to action section"
    > 
      <div className="relative w-full min-h-[400px]">
        {/* Background Image with Overlay */}
        {backgroundImage && (
          <Image
            src={backgroundImage}
            alt=""
            fill
            sizes="100vw"
            className="object-cover z-0"
            loading="lazy"
            onError={(e) => {
              console.error("Image failed to load:", backgroundImage);
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).parentElement!.style.backgroundColor = 'var(--background-light, #F9FAFB)';
            }}
          />
        )}
        <div className="absolute inset-0 bg-background-dark/50 dark:bg-background-dark/70 z-0" />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-3xl mx-auto px-6"
          >
            {/* Badge */}
            {badge && (
              <motion.div
            
                variants={fadeInUp}
               >
              <BadgeText 
                gradient="custom"
                customGradient="linear-gradient(90deg, #8B5CF6 0%, #EC4899 100%)"
                rounded="md"
                icon={<CheckIcon className="w-4 h-4" />}

              >
                {badge}
              </BadgeText>
                
              </motion.div>
            )}

            {/* Heading */}
            <motion.div variants={fadeInUp}>
              <MainHeadline 
                gradientStyle="partial"
                size="lg"
                className="mb-6 text-white"
              >
                {heading}
              </MainHeadline>
            </motion.div>

            {/* Subheading */}
            {subheading && (
              <motion.p
                variants={fadeInUp}
                className="font-sans text-body md:text-xl mb-8 text-white dark:text-text-white opacity-90 dark:opacity-80"
              >
                {subheading}
              </motion.p>
            )}

            {/* CTA Button */}
            {ctaText && ctaLink && (
              <motion.div variants={fadeInUp}>
                <Button
                  variant="solid"
                  color="primary"
                  size="lg"
                  rightIcon={ArrowRight}
                  onClick={() => window.location.href = ctaLink}
                  className="text-center hover:scale-105 transition-transform"
                >
                  {ctaText}
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
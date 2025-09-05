'use client';

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import Image from "next/image";
import { Button } from "@/components/atoms/Button";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import MainHeadline from "@/components/atoms/MainHeadline";

interface AboutSneakpeakProps {
  badge?: string;
  headline: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  ctaText?: string;
  ctaLink?: string;
  reverse?: boolean;
}

export function AboutSneakpeak({
  badge = "About Aligoo",
  headline = "Ethiopia's Premier Digital Marketing & Web Development Agency",
  description = "Since 2023, we've been helping Ethiopian businesses thrive online with data-driven strategies and cutting-edge web solutions. Our team of experts combines local market knowledge with global digital expertise.",
  imageUrl = "/about-sneakpeak.jpg",
  imageAlt = "Aligoo Digital Agency Team",
  ctaText = "Our Story",
  ctaLink = "/about",
  reverse = false
}: AboutSneakpeakProps) {
  return (
    <section 
      className="py-16 md:py-24 bg-background-light dark:bg-background-dark" 
      role="region"
      aria-label="About Aligoo sneak peek"
    >
      <div className="container mx-auto px-4">
        <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-6 md:gap-12 items-center`}>
          
          {/* Image Column (50%) */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Content Column (50%) */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full md:w-1/2 space-y-6"
          >
            {/* Badge */}
            {badge && (
              <motion.span 
                variants={fadeInUp}
              >
                <Badge color="primary">
                  {badge}
                </Badge>
              </motion.span>
            )}

            {/* Headline */}
            <motion.div 
              variants={fadeInUp}
            >
              <MainHeadline 
                gradientStyle="partial"
                size="lg"
                className="text-left"
              >
                {headline}
              </MainHeadline>
            </motion.div>

            {/* Description */}
            <motion.p 
              variants={fadeInUp}
              className="font-sans text-body text-text-light/80 dark:text-text-dark/80 leading-relaxed"
            >
              {description}
            </motion.p>

            {/* CTA Button */}
            {ctaText && ctaLink && (
              <motion.div variants={fadeInUp}>
                <Button
                  variant="solid"
                  color="primary"
                  rightIcon={ArrowRight}
                  onClick={() => window.location.href = ctaLink}
                  className="hover:scale-105 transition-transform"
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
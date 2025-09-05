'use client';

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { LucideIcon } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import MainHeadline from "@/components/atoms/MainHeadline";

interface WhyUsItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface WhyUsProps {
  heading?: string;
  subheading?: string;
  items: WhyUsItem[];
  columns?: 2 | 3 | 4;
  backgroundColor?: 'white' | 'gray' | 'primary-light';
  animation?: 'fade' | 'stagger' | 'none';
  className?: string;
}

const backgroundStyles = {
  white: 'bg-white dark:bg-gray-800',
  gray: 'bg-gray-50 dark:bg-gray-900',
  'primary-light': 'bg-primary/5 dark:bg-primary/10'
};

const gridColumns = {
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
};

export function WhyUs({
  heading = "Why Choose Aligoo Digital?",
  subheading = "Here's what sets us apart in the digital landscape",
  items,
  columns = 4,
  backgroundColor = 'white',
  animation = 'stagger',
  className = ""
}: WhyUsProps) {
  
  const bgStyle = backgroundStyles[backgroundColor];
  const gridStyle = gridColumns[columns];

  return (
    <section className={`py-16 md:py-24 dark:text-text-dark ${className}`}>
      <div className="container mx-auto px-4">
        
        {/* Header with Badge and MainHeadline */}
        {(heading || subheading) && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge color="primary" className="mb-4">
              Our Advantage
            </Badge>
            {heading && (
              <MainHeadline 
                gradientStyle="partial"
                size="lg"
                className="mb-4"
              >
                {heading}
              </MainHeadline>
            )}
            {subheading && (
              <p className="font-sans text-subheading text-text-light/80 dark:text-text-dark/80 max-w-2xl mx-auto">
                {subheading}
              </p>
            )}
          </motion.div>
        )}

        {/* Features Grid */}
        <motion.div
          variants={animation === 'stagger' ? staggerContainer : undefined}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className={`grid ${gridStyle} gap-4 sm:gap-6 md:gap-8`}
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={animation === 'stagger' ? fadeInUp : undefined}
              className="group"
              role="region"
              aria-label={`Why us feature: ${item.title}`}
            >
              <div className="flex items-start gap-4">
                <motion.div
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 12,
                    transition: { duration: 0.2 }
                  }}
                  className="flex-shrink-0 p-2 bg-primary/10 dark:bg-primary/20 rounded-lg mt-1"
                >
                  <item.icon 
                    size={24} 
                    className="text-primary dark:text-primary-light"
                    aria-hidden="true"
                  />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-sans text-subheading font-semibold text-text-light dark:text-text-dark mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-sans text-body text-text-light/80 dark:text-text-dark/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
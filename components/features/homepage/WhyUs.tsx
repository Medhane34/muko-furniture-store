// components/sections/WhyUs.tsx
'use client';

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { LucideIcon } from "lucide-react";

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
  white: 'bg-white',
  gray: 'bg-gray-50',
  'primary-light': 'bg-primary/5'
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
    <section className={`py-16 md:py-24 ${bgStyle} ${className}`}>
      <div className="container mx-auto px-4">
        
        {/* Header */}
        {(heading || subheading) && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {heading && (
              <h2 className="font-sans text-heading font-bold text-gray-900 mb-4">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="font-sans text-body text-gray-600 max-w-2xl mx-auto">
                {subheading}
              </p>
            )}
          </motion.div>
        )}

        {/* Features Grid - UPDATED LAYOUT */}
        <motion.div
          variants={animation === 'stagger' ? staggerContainer : undefined}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className={`grid ${gridStyle} gap-8 md:gap-12`}
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={animation === 'stagger' ? fadeInUp : undefined}
              className="group"
            >
              {/* Horizontal Layout: Icon + Text Stack */}
              <div className="flex items-start gap-4">
                
                {/* Icon Container */}
                <motion.div
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                  className="flex-shrink-0 p-2 bg-primary/10 rounded-lg mt-1"
                >
                  <item.icon 
                    size={24} 
                    className="text-primary" 
                    aria-hidden="true"
                  />
                </motion.div>

                {/* Text Stack - Title above Description */}
                <div className="flex-1 min-w-0"> {/* min-w-0 prevents text overflow */}
                  <h3 className="font-sans text-subheading font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  
                  <p className="font-sans text-body text-gray-600 leading-relaxed">
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
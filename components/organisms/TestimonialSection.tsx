'use client';

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import Image from "next/image";
import { Quote } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
  image: string;
  featured?: boolean;
}

interface TestimonialSectionProps {
  title?: string;
  subtitle?: string;
  testimonials: Testimonial[];
  backgroundColor?: 'white' | 'gray' | 'primary-light';
  textColor?: 'light' | 'dark';
  layout?: 'zigzag' | 'grid' | 'carousel';
  className?: string;
}

const backgroundStyles = {
  white: 'bg-white',
  gray: 'bg-gray-50',
  'primary-light': 'bg-primary/5'
};

const textStyles = {
  light: 'text-white',
  dark: 'text-gray-900'
};

export function TestimonialSection({
  title = "What Our Clients Say",
  subtitle = "Real stories from businesses we've helped grow",
  testimonials,
  backgroundColor = 'primary-light',
  textColor = 'dark',
  layout = 'zigzag',
  className = ""
}: TestimonialSectionProps) {
  
  const bgStyle = backgroundStyles[backgroundColor];
  const txtStyle = textStyles[textColor];

  // Star rating component
  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-1 mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          key={star}
          className={`w-5 h-5 ${
            star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        >
          ★
        </div>
      ))}
    </div>
  );

  return (
    <section className={`py-20 md:py-28 ${bgStyle} ${className}`}>
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <Quote className="text-primary" size={32} />
          </div>
          <h2 className={`font-sans text-heading font-bold mb-4 ${txtStyle}`}>
            {title}
          </h2>
          {subtitle && (
            <p className={`font-sans text-body max-w-2xl mx-auto ${
              textColor === 'light' ? 'text-white/80' : 'text-gray-600'
            }`}>
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Testimonials Grid - ZigZag Layout */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-20"
        >
          {testimonials.map((testimonial, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={testimonial.id}
                variants={fadeInUp}
                className={`flex flex-col ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-8 md:gap-12 items-center`}
              >
                {/* Image - Breaks out of container for visual interest */}
                <div className={`relative w-full md:w-2/5 ${
                  isEven ? 'md:ml-[-2rem]' : 'md:mr-[-2rem]'
                }`}>
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      rotate: isEven ? 2 : -2,
                      transition: { duration: 0.3 }
                    }}
                    className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl"
                  >
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                    
                    {/* Decorative element */}
                    <div className={`absolute inset-0 bg-gradient-to-b ${
                      isEven 
                        ? 'from-primary/20 to-transparent' 
                        : 'from-secondary/20 to-transparent'
                    }`} />
                  </motion.div>
                </div>

                {/* Testimonial Content */}
                <div className="w-full md:w-3/5">
                  <motion.div
                    whileHover={{ 
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                    className={`p-8 rounded-2xl ${
                      textColor === 'light' 
                        ? 'bg-white/10 backdrop-blur-sm' 
                        : 'bg-white shadow-xl'
                    } relative`}
                  >
                    {/* Quote icon decoration */}
                    <Quote className={`absolute top-6 ${
                      isEven ? 'left-6' : 'right-6'
                    } ${
                      textColor === 'light' ? 'text-white/20' : 'text-primary/20'
                    }`} size={48} />
                    
                    <StarRating rating={testimonial.rating} />
                    
                    <blockquote className={`font-sans text-body italic mb-6 leading-relaxed ${
                      textColor === 'light' ? 'text-white' : 'text-gray-700'
                    }`}>
                      "{testimonial.content}"
                    </blockquote>
                    
                    <div className="flex items-center">
                      <div>
                        <p className={`font-sans font-semibold ${
                          textColor === 'light' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {testimonial.name}
                        </p>
                        <p className={`font-sans text-sm ${
                          textColor === 'light' ? 'text-white/70' : 'text-gray-600'
                        }`}>
                          {testimonial.role}
                          {testimonial.company && `, ${testimonial.company}`}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Footer */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-16 pt-8 border-t border-gray-200"
        >
          <p className={`font-sans text-sm ${
            textColor === 'light' ? 'text-white/60' : 'text-gray-500'
          }`}>
            Join 500+ satisfied clients who trust us with their digital success
          </p>
        </motion.div>
      </div>
    </section>
  );
}
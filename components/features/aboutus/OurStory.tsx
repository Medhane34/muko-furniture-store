'use client';

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import Image from "next/image";
import { Button } from "@/components/atoms/Button";
import { Calendar, Users, MapPin, Heart } from "lucide-react";

interface OurStoryProps {
  headline?: string;
  subtitle?: string;
  foundingYear?: string;
  founderName?: string;
  founderRole?: string;
  storyContent: string[];
  milestone?: {
    year: string;
    title: string;
    description: string;
  }[];
  imageSrc: string;
  imageAlt?: string;
  ctaText?: string;
  ctaLink?: string;
  className?: string;
}

export function OurStory({
  headline = "Our Story",
  subtitle = "From humble beginnings to Ethiopia's favorite furniture destination",
  foundingYear = "2015",
  founderName = "Michael Kebede",
  founderRole = "Founder & Master Craftsman",
  storyContent = [
    "It all started in a small workshop in Addis Ababa, where Michael combined his passion for traditional Ethiopian craftsmanship with modern design principles.",
    "What began as custom orders for friends and family quickly grew as word spread about the exceptional quality and attention to detail.",
    "Today, we're proud to serve thousands of Ethiopian homes while maintaining the same commitment to quality that started it all."
  ],
  milestone = [
    {
      year: "2015",
      title: "Workshop Beginnings",
      description: "Started in a small Addis Ababa garage"
    },
    {
      year: "2018", 
      title: "First Showroom",
      description: "Opened our first showroom in Bole"
    },
    {
      year: "2020",
      title: "Online Launch",
      description: "Launched e-commerce platform"
    },
    {
      year: "2023",
      title: "5000+ Homes",
      description: "Furnished over 5000 Ethiopian homes"
    }
  ],
  imageSrc = "/about/our-story.jpg",
  imageAlt = "MUKO Furniture early workshop",
  ctaText = "Meet Our Team",
  ctaLink = "/about/team",
  className = ""
}: OurStoryProps) {
  return (
    <section className={`py-20 md:py-28 `}>
      <div className="container mx-auto px-4 text-text-light dark:text-text-dark">
        
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-sans text-heading font-bold mb-4">
            {headline}
          </h2>
          <p className="font-sans text-body  max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Image Column */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
              />
              
              {/* Decorative overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent text-text-light dark:text-text-dark" />
            </div>
            
            {/* Founder badge overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-xs"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <p className="font-sans text-sm font-semibold dark:text-black">{founderName}</p>
              </div>
              <p className="font-sans text-xs ">{founderRole}</p>
              <p className="font-sans text-xs text-primary mt-1">Since {foundingYear}</p>
            </motion.div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Story Content */}
            <div className="space-y-6">
              {storyContent.map((paragraph, index) => (
                <motion.p
                  key={index}
                  variants={fadeInUp}
                  className="font-sans text-body text-gray-700 leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Milestones Timeline */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 gap-4 py-6"
            >
              {milestone.map((item, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-2">{item.year}</div>
                  <h4 className="font-sans font-semibold text-gray-900 mb-1">{item.title}</h4>
                  <p className="font-sans text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </motion.div>

            {/* Values Highlight */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-6 pt-6 border-t border-gray-200"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <MapPin className="text-primary" size={20} />
                </div>
                <span className="font-sans text-sm font-medium text-gray-900">Proudly Ethiopian</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Heart className="text-primary" size={20} />
                </div>
                <span className="font-sans text-sm font-medium text-gray-900">Craftsmanship</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Users className="text-primary" size={20} />
                </div>
                <span className="font-sans text-sm font-medium text-gray-900">Family-Owned</span>
              </div>
            </motion.div>

            {/* CTA Button */}
            {ctaText && ctaLink && (
              <motion.div variants={fadeInUp} className="pt-6">
                <Button
                  variant="outline"
                  onClick={() => window.location.href = ctaLink}
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
'use client';

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { ZoomIn, Shield, Heart, Award } from "lucide-react";
import MainHeadline from "@/components/atoms/MainHeadline";
import AccentHeading from "@/components/atoms/AccentHeading";

interface CraftItem {
  id: string;
  title: string;
  description: string;
  image: string;
  details: string[];
  icon: React.ComponentType<any>;
}

interface CraftsmanshipShowcaseProps {
  headline?: string;
  subtitle?: string;
  craftItems?: CraftItem[];
  warranty?: {
    years: number;
    description: string;
  };
  className?: string;
}

export function CraftsmanshipShowcase({
  headline = "The MUKO Difference",
  subtitle = "Exceptional craftsmanship meets timeless design",
  craftItems = [
    {
      id: "materials",
      title: "Premium Materials",
      description: "We source only the finest sustainable hardwoods and luxury fabrics",
      image: "/homepage-hero.jpg",
      details: [
        "Ethiopian grown hardwoods",
        "European luxury fabrics",
        "Natural organic finishes",
        "Metal hardware tested for 50,000+ cycles"
      ],
      icon: Heart
    },
    {
      id: "techniques",
      title: "Traditional Techniques",
      description: "Generations of craftsmanship refined for modern comfort",
      image: "/homepage-hero.jpg",
      details: [
        "Hand-tied spring systems",
        "Traditional joinery (no staples or glue)",
        "Hand-applied finishes",
        "8-step quality inspection process"
      ],
      icon: Award
    },
    {
      id: "attention",
      title: "Attention to Detail",
      description: "Every stitch, joint, and finish receives meticulous care",
      image: "/homepage-hero.jpg",
      details: [
        "0.1mm precision tolerance",
        "Hand-stitched seams",
        "Triple-reinforced frames",
        "24-hour finish curing"
      ],
      icon: ZoomIn
    }
  ],
  warranty = {
    years: 10,
    description: "comprehensive warranty on all frames and mechanisms"
  },
  className = ""
}: CraftsmanshipShowcaseProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className={`py-20 md:py-28  dark:bg-background-dark ${className}`}>
      <div className="container mx-auto px-4 ">
        
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <AccentHeading size="sm" >
            {subtitle}
          </AccentHeading>
          <MainHeadline className="font-sans text-heading font-bold text-gray-900 mb-4">
            {headline}
          </MainHeadline>
          
        </motion.div>

        {/* Interactive Tabs Navigation */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {craftItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all ${
                  activeTab === index
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <IconComponent size={20} />
                <span className="font-sans font-medium">{item.title}</span>
              </button>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Image Showcase */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-square rounded-none overflow-hidden shadow-2xl">
              <Image
                src={craftItems[activeTab].image}
                alt={craftItems[activeTab].title}
                fill
                className="object-cover rounded-none"
              />
              
              {/* Zoom overlay hint */}
              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300 cursor-zoom-in" />
            </div>
            
            {/* Quality badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-4 -right-4 bg-white rounded-lg p-3 shadow-lg"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-xs font-medium text-gray-600">Handcrafted</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6 order-1 lg:order-2"
          >
            <motion.div variants={fadeInUp}>
              <h3 className="font-sans text-subheading font-bold text-text-black dark:text-text-white mb-2">
                {craftItems[activeTab].title}
              </h3>
              <p className="font-sans text-body text-text-black dark:text-text-white">
                {craftItems[activeTab].description}
              </p>
            </motion.div>

            {/* Details List */}
            <motion.div variants={fadeInUp} className="space-y-3">
              {craftItems[activeTab].details.map((detail, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="font-sans text-body text-text-black dark:text-text-white">{detail}</span>
                </div>
              ))}
            </motion.div>

            {/* Warranty Highlight */}
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-primary mt-8"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Shield className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-gray-900">
                    {warranty.years}-Year Warranty
                  </h4>
                  <p className="font-sans text-sm text-gray-600">
                    {warranty.description}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA for quality-conscious buyers */}
            <motion.div variants={fadeInUp} className="pt-4">
              <Button
                variant="outline"
                onClick={() => window.location.href = "/craftsmanship"}
              >
                Learn More About Our Process
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Footer */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-12 border-t border-gray-200"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">5000+</div>
            <p className="font-sans text-sm text-gray-600">Pieces Crafted</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">98%</div>
            <p className="font-sans text-sm text-gray-600">Customer Satisfaction</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">15</div>
            <p className="font-sans text-sm text-gray-600">Master Artisans</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">0.1%</div>
            <p className="font-sans text-sm text-gray-600">Defect Rate</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
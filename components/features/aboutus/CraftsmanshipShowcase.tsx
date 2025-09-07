'use client';

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { ZoomIn, Shield, Heart, Award } from "lucide-react";
import MainHeadline from "@/components/atoms/MainHeadline";
import AccentHeading from "@/components/atoms/AccentHeading";
import BadgeText from "@/components/atoms/BadgeText";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";

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
  headline = "The MUKO Standard",
  subtitle = "Our commitment to quality you can trust",
  craftItems = [
    {
      id: "sourcing",
      title: "Global Sourcing",
      description: "We partner with world-class manufacturers known for their excellence and ethical production.",
      image: "/homepage-hero.jpg",
      details: [
        "Rigorous manufacturer vetting process",
        "Focus on sustainable and ethical production",
        "Materials meet international safety standards",
        "Direct partnerships ensure value"
      ],
      icon: Heart
    },
    {
      id: "inspection",
      title: "Stringent Inspection",
      description: "Every piece undergoes a multi-point quality check before it reaches your home.",
      image: "/homepage-hero.jpg",
      details: [
        "Pre-shipment quality assurance audits",
        "Post-delivery inspection in our warehouse",
        "Structural integrity and stability checks",
        "Finish and fabric quality verification"
      ],
      icon: ZoomIn
    },
    {
      id: "testing",
      title: "Performance Testing",
      description: "We ensure durability by validating products against rigorous performance standards.",
      image: "/homepage-hero.jpg",
      details: [
        "Frame stability and weight capacity tests",
        "Fabric durability and abrasion resistance checks",
        "Hardware and mechanism lifecycle testing",
        "Safety and compliance certification"
      ],
      icon: Award
    }
  ],
  warranty = {
    years: 5,
    description: "comprehensive warranty on frames and mechanisms for your peace of mind"
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
          <BadgeText
            gradient="custom"
            customGradient="linear-gradient(90deg, #8B5CF6 0%, #EC4899 100%)"
            rounded="lg"icon={<HandThumbUpIcon className="w-4 h-4" />} 
            >
            {headline}
            </BadgeText>
         

          <MainHeadline className="font-sans text-heading font-bold text-gray-900 mb-4">
           {subtitle} 
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
                <div className="text-xs font-medium text-gray-600">Quality Checked</div>
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
                onClick={() => window.location.href = "/contact"}
              >
                Learn More About Our Standards
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
            <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
            <p className="font-sans text-sm text-gray-600">Pieces Delivered</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">98%</div>
            <p className="font-sans text-sm text-gray-600">Customer Satisfaction</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <p className="font-sans text-sm text-gray-600">Trusted Brands</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">0.1%</div>
            <p className="font-sans text-sm text-gray-600">Return Rate</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
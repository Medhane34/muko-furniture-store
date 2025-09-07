"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Badge } from "@/components/atoms/Badge";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import MainHeadline from "../atoms/MainHeadline";
import AccentHeading from "../atoms/AccentHeading";

export interface FaqItem {
  question: string;
  answer: string;
  icon?: React.ReactNode;
}

export interface FaqSectionProps {
  heading?: string;
  faqs: FaqItem[];
  className?: string;
}

const FaqSection: React.FC<FaqSectionProps> = ({
  heading = "Frequently Asked Questions",
  faqs,
  className = "",
}) => {
  // Open only the first item by default
  const [openKeys, setOpenKeys] = useState<Set<string>>(new Set([faqs[0]?.question || ""]));

  return (
    <section 
      className={`py-16 bg-background-light dark:bg-background-dark ${className}`} 
      role="region"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-2xl mx-auto px-2 sm:px-4">
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
         <AccentHeading size="sm" gradient="linear-gradient(90deg, #4361EE 0%, #3A0CA3 100%)">
          Support
        </AccentHeading>
        
          {heading && (
            <MainHeadline 
              
              gradientStyle="partial"
              size="lg"
              className="mb-2"
            >
              {heading}
            </MainHeadline>
          )}
        </motion.div>
        <motion.div
          className="w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <Accordion
            showDivider={false}
            selectedKeys={openKeys}
            onSelectionChange={(keys) => setOpenKeys(new Set(Array.from(keys).map(String)))}
            variant="light"
            className="w-full"
            itemClasses={{
              base: "mb-4 rounded-lg shadow-md bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-600 hover:bg-background-light/50 dark:hover:bg-background-dark/50 transition-colors",
              title: "font-semibold text-lg text-left text-text-light dark:text-text-dark",
              content: "text-body text-text-light/80 dark:text-text-dark/80",
            }}
          >
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.question}
                aria-label={faq.question}
                title={
                  <div className="flex items-center gap-2">
                    {faq.icon && faq.icon}
                    {faq.question}
                  </div>
                }
                classNames={{
                  trigger: "px-6 py-4 focus:outline-none", // Removed focus:ring-2 focus:ring-primary
                  content: "px-6 pb-4",
                }}
              >
                <motion.p
                  variants={fadeInUp}
                  className="text-body text-text-light/80 dark:text-text-dark/80"
                >
                  {faq.answer}
                </motion.p>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;
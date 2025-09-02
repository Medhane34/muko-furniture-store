// components/organisms/FaqSection.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionItem } from "@heroui/accordion";

import { fadeInUp, staggerContainer } from "@/lib/motion";

export interface FaqItem {
  question: string;
  answer: string;
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
  // Open the first item by default
  const [openKeys, setOpenKeys] = useState<Set<string>>(new Set([faqs[0]?.question]));

  return (
    <section className={`py-16 bg-background-light dark:bg-background-dark ${className}`}>
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h1 className="text-heading mb-2">{heading}</h1>
        </motion.div>
        <motion.div
          className="w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <Accordion
            showDivider={false}
            selectedKeys={openKeys}
            onSelectionChange={(keys) => setOpenKeys(new Set(Array.from(keys).map(String)))}
            variant="light"
            className="w-full"
            itemClasses={{
              base: "mb-4 rounded-lg shadow-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700",
              title: "font-semibold text-lg text-left text-gray-900 dark:text-white",
              content: "text-body text-gray-600 dark:text-gray-300",
            }}
          >
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.question}
                aria-label={faq.question}
                title={faq.question}
                classNames={{
                  trigger: "px-6 py-4",
                  content: "px-6 pb-4",
                }}
              >
                <motion.p
                  variants={fadeInUp}
                  className="text-body text-gray-600 dark:text-gray-300"
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

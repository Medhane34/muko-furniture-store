// components/organisms/ProductSteps.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Divider } from "@heroui/divider";
import { Badge } from "@/components/atoms/Badge";
import { Mail, ShoppingCart, Truck } from "lucide-react";
import { stepStagger, stepCard } from "@/lib/motion/stepVariants";

export const productSteps = [
  {
    icon: ShoppingCart,
    title: "Submit Your Inquiry",
    description: "Fill out our simple form—no payment needed. We'll contact you within 24 hours.",
    color: "bg-primary/10 text-primary",
    ariaLabel: "Submit inquiry icon",
  },
  {
    icon: Mail,
    title: "Get Confirmation & Quote",
    description: "Receive a detailed quote and delivery timeline. Approve before we proceed.",
    color: "bg-primary/10 text-primary",
    ariaLabel: "Confirmation icon",
  },
  {
    icon: Truck,
    title: "Enjoy Delivery & Setup",
    description: "We deliver and setup everything within 3-5 days. Your satisfaction guaranteed.",
    color: "bg-primary/10 text-primary",
    ariaLabel: "Delivery icon",
  },
];

export default function ProductSteps() {
  return (
    <section className="py-16  dark:bg-background-dark">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col items-center justify-center gap-8 md:gap-4" // Reduced gap on desktop
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stepStagger}
        >
          {/* Mobile: Vertical Layout with Horizontal Dividers */}
          <div className="flex flex-col md:hidden gap-8 w-full">
            {productSteps.map((step, i) => (
              <React.Fragment key={step.title}>
                <motion.article
                  className="flex flex-col items-center justify-start bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md w-full p-6 text-center relative group hover:shadow-lg transition-all" // Changed to rounded-2xl for mobile
                  variants={stepCard}
                  tabIndex={0}
                  aria-label={step.title}
                >
                  <Badge color="primary" size="sm" className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Step {i + 1}
                  </Badge>

                  <div
                    className={`flex items-center justify-center w-14 h-14 rounded-full mb-4 ${step.color} group-hover:scale-110 transition-transform`}
                    aria-label={step.ariaLabel}
                  >
                    <step.icon size={26} />
                  </div>

                  <h3 className="font-sans text-lg font-semibold mb-2 px-2">
                    {step.title}
                  </h3>

                  <p className="font-sans text-sm text-gray-600 dark:text-gray-300 leading-tight px-2">
                    {step.description}
                  </p>
                </motion.article>

                {/* Horizontal Divider for Mobile (between cards) */}
                {i < productSteps.length - 1 && (
                  <motion.div
                    className="flex justify-center w-full"
                    initial={{ opacity: 0, scaleX: 0.8 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 * (i + 1) }}
                  >
                    <Divider orientation="horizontal" className="w-32 bg-primary/30" />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Desktop: Horizontal Layout with Vertical Dividers */}
          <div className="hidden md:flex flex-row items-center justify-center gap-4"> {/* Reduced gap */}
            {productSteps.map((step, i) => (
              <React.Fragment key={step.title}>
                <motion.article
                  className="flex flex-col items-center justify-start bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-md w-56 h-56 p-6 text-center relative group hover:shadow-lg transition-all" // Smaller fixed size: w-56 h-56
                  variants={stepCard}
                  tabIndex={0}
                  aria-label={step.title}
                >
                  <Badge color="primary" size="sm" className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Step {i + 1}
                  </Badge>

                  <div
                    className={`flex items-center justify-center w-14 h-14 rounded-full mt-4 mb-3 ${step.color} group-hover:scale-110 transition-transform`}
                    aria-label={step.ariaLabel}
                  >
                    <step.icon size={26} />
                  </div>

                  <h3 className="font-sans text-sm font-semibold mb-2 px-2 line-clamp-2">
                    {step.title}
                  </h3>

                  <p className="font-sans text-xs text-gray-600 dark:text-gray-300 leading-tight px-2 line-clamp-3">
                    {step.description}
                  </p>
                </motion.article>

                {/* Vertical Divider for Desktop (between cards) */}
                {i < productSteps.length - 1 && (
                  <motion.div
                    className="flex items-center h-40"
                    initial={{ opacity: 0, scaleY: 0.8 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 * (i + 1) }}
                  >
                    <Divider orientation="vertical" className="h-32 bg-primary/30" />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
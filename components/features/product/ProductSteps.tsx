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
    title: "Place Your Order",
    description: "Complete the form below with your details to book this product.",
    color: "bg-primary/10 text-primary",
    ariaLabel: "Shopping cart icon",
  },
  {
    icon: Mail,
    title: "Order Confirmation",
    description: "Receive a confirmation email with your order details and estimated delivery.",
    color: "bg-green-100 text-green-600",
    ariaLabel: "Mail icon",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Your product is shipped within 3–5 business days with tracking.",
    color: "bg-yellow-100 text-yellow-600",
    ariaLabel: "Truck icon",
  },
];

export default function ProductSteps() {
  return (
    <section className="py-16 bg-background-light dark:bg-background-dark">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stepStagger}
        >
          {productSteps.map((step, i) => (
            <React.Fragment key={step.title}>
              {/* Main Circular Card - FIXED SIZE IS KEY */}
              <motion.article
                className="flex flex-col items-center justify-start bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-md w-64 h-64 p-8 text-center relative" // 1. Fixed size (w-64 h-64). 2. Added padding (p-8)
                variants={stepCard}
                tabIndex={0}
                aria-label={step.title}
              >
                {/* Badge */}
                <Badge color="primary" size="sm" className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Step {i + 1}
                </Badge>

                {/* Icon - Slightly smaller for more space */}
                <div
                  className={`flex items-center justify-center w-14 h-14 rounded-full mt-4 mb-3 ${step.color}`} // Adjusted margin (mb-3)
                  aria-label={step.ariaLabel}
                >
                  <step.icon size={26} /> {/* Slightly smaller icon */}
                </div>

                {/* Title - Tightened margin, potentially smaller font */}
                <h3 className="font-sans text-sm font-semibold mb-2 px-2 line-clamp-2"> {/* 1. text-sm 2. px-2 for horizontal padding 3. line-clamp-2 for safety */}
                  {step.title}
                </h3>

                {/* Description - This is the critical part */}
                <p className="font-sans text-xs text-gray-600 dark:text-gray-300 leading-tight px-2 line-clamp-3"> 
                  {/* 1. text-xs (Smaller font) 
                      2. leading-tight (Tighter line height)
                      3. px-2 (Horizontal padding inside the circle)
                      4. line-clamp-3 (Safely truncate text if it ever overflows) */}
                  {step.description}
                </p>
              </motion.article>

              {/* Divider: show between cards, not after last */}
              {i < productSteps.length - 1 && (
                <motion.div
                  className="hidden md:flex items-center h-40"
                  initial={{ opacity: 0, scaleY: 0.8 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 * (i + 1) }}
                >
                  <Divider orientation="vertical" className="h-32 bg-primary/30" />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
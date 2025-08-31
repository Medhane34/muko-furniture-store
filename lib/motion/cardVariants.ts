import { Variants } from "framer-motion";

// Card animations for product displays with brand-aligned hover effects
export const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
  hover: {
    scale: 1.03,
    y: -5,
    boxShadow: "0 10px 20px rgba(255, 224, 102, 0.2)", // subtle primary (#FFE066) shadow
    transition: { duration: 0.3 },
  },
  tap: { scale: 0.97 },
} as const;
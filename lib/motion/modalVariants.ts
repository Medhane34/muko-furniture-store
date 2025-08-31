import { Variants } from "framer-motion";

// Modal animations with brand-aligned spring effect and backdrop
export const modalVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
  exit: {
    opacity: 0,
    y: 50,
    scale: 0.95,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
} as const;

export const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 0.5,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // dark backdrop with slight primary tint
    transition: { duration: 0.3 },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
} as const;
import { Variants } from "framer-motion";

// Button animations styled with brand colors (#FFE066, #FFD700)
export const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
  hover: {
    scale: 1.05,
    backgroundColor: "#FFD700", // primary.dark (gold/yellow)
    transition: { duration: 0.3 },
  },
  tap: { scale: 0.95 },
} as const;

export const buttonOutlineVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
  hover: {
    scale: 1.05,
    borderColor: "#FFD700", // primary.dark
    color: "#FFD700",
    transition: { duration: 0.3 },
  },
  tap: { scale: 0.95 },
} as const;
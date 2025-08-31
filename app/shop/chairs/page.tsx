import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import ChairsProductsWrapper from "@/wrappers/ChairsProductsWrapper";

export default function ChairsProductsPage() {
  return (
    <section className="container mx-auto px-4 py-8">
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="font-sans text-heading text-gray-900 dark:text-gray-100 mb-4"
      >
        Our Chair Selection
      </motion.h2>
      <ChairsProductsWrapper />
      <motion.button
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="mt-6 px-6 py-2 bg-primary text-gray-900 rounded-lg font-sans text-body hover:bg-primary-dark hover:text-gray-900 dark:bg-primary-dark dark:text-gray-100"
      >
        Explore More Chairs
      </motion.button>
    </section>
  );
}
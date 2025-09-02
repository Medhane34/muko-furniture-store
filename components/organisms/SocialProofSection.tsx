// components/organisms/SocialProofSection.tsx
"use client";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import clsx from "clsx";

export interface SocialProofItem {
  value: string | number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export interface SocialProofSectionProps {
  title?: string;
  subtitle?: string;
  items: SocialProofItem[];
  layout?: "grid-3" | "grid-4" | "carousel";
  backgroundImage?: string; // New: URL for the cover image
  overlayOpacity?: number; // New: Overlay opacity (0-1), default 0.7
  className?: string;
}

const gridLayouts = {
  "grid-3": "grid-cols-1 md:grid-cols-3",
  "grid-4": "grid-cols-2 md:grid-cols-4",
  "carousel": "flex", // Would implement carousel logic separately
};

export function SocialProofSection({
  title = "Trusted by Thousands of Happy Customers",
  subtitle,
  items,
  layout = "grid-3",
  backgroundImage = "/images/sofa-sale.jpg", // Example image, update as needed
  overlayOpacity = 0.7,
  className = "",
}: SocialProofSectionProps) {
  const gridStyle = gridLayouts[layout];

  return (
    <section
      className={clsx(
        "relative w-full min-h-[400px] flex items-center justify-center py-16",
        className
      )}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Black overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `rgba(0,0,0,${overlayOpacity})`,
        }}
        aria-hidden="true"
      />
      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          {/* Title */}
          {title && (
            <motion.h3
              variants={fadeInUp}
              className="font-sans text-subheading font-semibold mb-4 text-white"
            >
              {title}
            </motion.h3>
          )}

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              variants={fadeInUp}
              className="font-sans text-body mb-12 text-gray-200"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Stats Grid */}
          <motion.div
            variants={staggerContainer}
            className={clsx(
              "grid gap-8 md:gap-12",
              gridStyle
            )}
          >
            {items.map((item, index) => (
              <motion.article
                key={index}
                variants={fadeInUp}
                className="bg-white/10 dark:bg-gray-900/30 border border-white/20 rounded-xl shadow-md p-8 flex flex-col items-center text-center"
                tabIndex={0}
                aria-label={item.label}
              >
                <div className="text-3xl md:text-4xl font-bold mb-2 text-primary">
                  {item.prefix && <span>{item.prefix}</span>}
                  {item.value}
                  {item.suffix && <span>{item.suffix}</span>}
                </div>
                <p className="font-sans text-body text-gray-100">{item.label}</p>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default SocialProofSection;

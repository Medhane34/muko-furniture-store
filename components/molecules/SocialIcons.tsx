"use client";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const iconVariants = {
  hover: { scale: 1.15, color: "#FFD700" }, // Brand yellow on hover
  tap: { scale: 0.95 },
};

const socialLinks = [
  {
    href: "https://facebook.com",
    label: "Facebook",
    icon: <FaFacebook size={22} />,
  },
  {
    href: "https://twitter.com",
    label: "Twitter",
    icon: <FaTwitter size={22} />,
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    icon: <FaLinkedin size={22} />,
  },
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: <FaInstagram size={22} />,
  },
];

const SocialIcons = () => (
  <div className="flex gap-3 mt-4">
    {socialLinks.map((s) => (
      <motion.a
        key={s.label}
        href={s.href}
        aria-label={s.label}
        target="_blank"
        rel="noopener noreferrer"
        whileHover="hover"
        whileTap="tap"
        variants={iconVariants}
        className="text-primary hover:text-primary-dark transition-colors"
      >
        {s.icon}
      </motion.a>
    ))}
  </div>
);

export default SocialIcons;

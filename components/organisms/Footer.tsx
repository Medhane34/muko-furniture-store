// components/organisms/Footer.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { buttonVariants, fadeInUp, staggerContainer } from "@/lib/motion";
import { SocialIcons, ContactInfo } from "@/components/molecules";

// Atoms
const Logo = () => (
  <span className="text-2xl font-bold text-primary">Muko Furniture</span>
);



const NavigationGroup = ({ title, links }: { title: string; links: { label: string; href: string }[] }) => (
  <div>
    <h4 className="text-lg font-semibold text-white mb-3">{title}</h4>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.label}>
          <Link href={link.href} className="text-sm text-gray-400 hover:text-primary transition-colors underline-offset-4 hover:underline">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const NewsletterSignup = () => (
  <form className="flex flex-col gap-3 w-full max-w-xs">
    <label htmlFor="newsletter" className="text-white font-semibold">Sign up for our newsletter</label>
    <div className="flex">
      <input
        id="newsletter"
        type="email"
        placeholder="Your email"
        className="flex-1 px-4 py-2 rounded-l-lg border-none focus:ring-2 focus:ring-primary text-gray-900"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-primary text-gray-900 font-semibold rounded-r-lg hover:bg-primary-dark transition-colors"
      >
        Subscribe
      </button>
    </div>
  </form>
);



const Footer = () => (
  <footer className="bg-gray-950 text-gray-400 pt-16 pb-8 px-4 border-t border-gray-800">
    <motion.div
      className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10"
      initial="hidden"
      variants={staggerContainer}
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Brand & Social */}
      <motion.div variants={fadeInUp}>
        <Logo />
        <p className="text-sm mt-4">
          Muko Furniture brings comfort and style to your home. Discover our curated collection of beds, sofas, tables, and more.
        </p>
        <SocialIcons />
      </motion.div>

      {/* Navigation */}
      <motion.div variants={fadeInUp}>
        <NavigationGroup
          title="Shop"
          links={[
            { label: "Beds", href: "/products/beds" },
            { label: "Sofas", href: "/products/sofas" },
            { label: "Dining Tables", href: "/products/dining-tables" },
            { label: "Chairs", href: "/products/chairs" },
            { label: "All Products", href: "/products" },
          ]}
        />
      </motion.div>
      <motion.div variants={fadeInUp}>
        <NavigationGroup
          title="Company"
          links={[
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
            { label: "Careers", href: "/careers" },
            { label: "Blog", href: "/blog" },
          ]}
        />
      </motion.div>

      {/* Newsletter & Contact */}
      <motion.div variants={fadeInUp}>
        <NewsletterSignup />
        <ContactInfo />
      </motion.div>
    </motion.div>
    {/* Bottom Bar */}
    <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
        <div>
          &copy; {new Date().getFullYear()} Muko Furniture. All rights reserved.
        </div>
        <div className="mt-2 md:mt-0 flex flex-wrap justify-center gap-6">
          <Link href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

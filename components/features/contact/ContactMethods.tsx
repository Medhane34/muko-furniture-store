// components/sections/contact/ContactMethods.tsx
'use client';

import { motion, Variants } from 'framer-motion';
import MainHeadline from '@/components/atoms/MainHeadline';
// Import Icons
import { HiPhone, HiMail, HiClipboard, HiClipboardCheck } from 'react-icons/hi';
import { FaTelegram } from 'react-icons/fa';
import { IoTime } from 'react-icons/io5';
import { useState } from 'react';
import AccentHeading from '@/components/atoms/AccentHeading';

// ... (ContactMethod interface and contactMethods array remain exactly the same) ...
interface ContactMethod {
  id: number;
  type: 'phone' | 'email' | 'social' | 'hours';
  title: string;
  value: string;
  description?: string;
  link: string;
  ctaText: string;
}

const contactMethods: ContactMethod[] = [
  // ... (Your data array remains unchanged) ...
  {
    id: 1,
    type: 'phone',
    title: 'Call Us',
    value: '+251 11 123 4567',
    description: 'Speak directly with our team',
    link: 'tel:+251111234567',
    ctaText: 'Call Now',
  },
  {
    id: 2,
    type: 'email',
    title: 'Email Us',
    value: 'info@mukofurniture.com',
    description: 'Send us a detailed inquiry',
    link: 'mailto:info@mukofurniture.com',
    ctaText: 'Send Email',
  },
  {
    id: 3,
    type: 'social',
    title: 'Message on Telegram',
    value: '@MukoFurniture',
    description: 'For quick queries and chats',
    link: 'https://t.me/MukoFurniture',
    ctaText: 'Message Us',
  },
  {
    id: 4,
    type: 'hours',
    title: 'Working Hours',
    value: 'Mon - Sat: 9:00 AM - 6:30 PM',
    description: 'Main Showroom',
    link: '#locations',
    ctaText: 'See All Hours',
  },
];

// ... (Animation variants remain the same) ...
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 120, damping: 15 },
  },
};

// Main Parent Component remains the same
export default function ContactMethods() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <AccentHeading size='sm'>Get in touch </AccentHeading>
        <MainHeadline>Quick Contact Methods </MainHeadline>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {contactMethods.map((method) => (
          <ContactCard key={method.id} method={method} />
        ))}
      </motion.div>
    </section>
  );
}

// Updated and Simplified Individual Card Component
const ContactCard = ({ method }: { method: ContactMethod }) => {
  const [isCopied, setIsCopied] = useState(false);
  const isCopyable = method.type === 'phone' || method.type === 'email' || method.type === 'social';

  const handleCopyToClipboard = (e: React.MouseEvent, text: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  // Choose the right icon inside the component where 'method' is defined
  let IconComponent = HiPhone; // default
  switch (method.type) {
    case 'phone':
      IconComponent = HiPhone;
      break;
    case 'email':
      IconComponent = HiMail;
      break;
    case 'social':
      IconComponent = FaTelegram;
      break;
    case 'hours':
      IconComponent = IoTime;
      break;
  }

  // The base styles for the container
  const containerClass = "h-full p-6 rounded-2xl bg-background-light dark:bg-background-dark border border-background-dark/10 dark:border-background-light/10 shadow-lg dark:shadow-xl-dark hover:shadow-xl transition-shadow flex flex-col group relative";

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      {/* Conditionally render an <a> tag or a <div> */}
      {method.type !== 'hours' ? (
        <a href={method.link} target={method.type === 'social' ? '_blank' : '_self'} rel={method.type === 'social' ? 'noopener noreferrer' : ''} className={containerClass}>
          <CardContent method={method} isCopyable={isCopyable} isCopied={isCopied} onCopyClick={handleCopyToClipboard} IconComponent={IconComponent} />
        </a>
      ) : (
        <div className={containerClass}>
          <CardContent method={method} isCopyable={isCopyable} isCopied={isCopied} onCopyClick={handleCopyToClipboard} IconComponent={IconComponent} />
        </div>
      )}
    </motion.div>
  );
};

// Helper component for the content - FIXED to accept IconComponent as a prop
const CardContent = ({
  method,
  isCopyable,
  isCopied,
  onCopyClick,
  IconComponent // Receive the icon component as a prop
}: {
  method: ContactMethod;
  isCopyable: boolean;
  isCopied: boolean;
  onCopyClick: (e: React.MouseEvent, text: string) => void;
  IconComponent: React.ElementType; // Type for the icon component
}) => {
  return (
    <>
      {/* Icon - Use the passed IconComponent */}
      <div className="mb-4">
        <IconComponent className="w-8 h-8 text-primary" />
      </div>

      {/* Title */}
      <h3 className="font-semibold text-lg text-text-light dark:text-text-dark mb-2">
        {method.title}
      </h3>

      {/* Main Value/Info with Copy Button */}
      <div className="flex items-start justify-between mb-1 gap-2">
        <p className="text-body font-medium text-text-light dark:text-text-dark break-words flex-1">
          {method.value}
        </p>
        {isCopyable && (
          <button
            onClick={(e) => onCopyClick(e, method.value)}
            className="p-1 text-text-light/50 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 rounded flex-shrink-0 mt-1"
            aria-label={isCopied ? "Copied!" : `Copy ${method.value} to clipboard`}
            type="button"
          >
            {isCopied ? <HiClipboardCheck className="w-4 h-4" /> : <HiClipboard className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Description */}
      {method.description && (
        <p className="text-small text-text-light/70 dark:text-text-dark/70 mb-4 flex-grow">
          {method.description}
        </p>
      )}

      {/* Call to Action */}
      <span className={`inline-flex items-center text-primary font-semibold text-body mt-auto ${method.type !== 'hours' ? 'group-hover:underline' : ''}`}>
        {method.ctaText}
      </span>
    </>
  );
};
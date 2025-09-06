// components/navigation/DesktopNavigation.tsx
'use client';

import React, { useState } from 'react';
import { Link } from '@heroui/link';
import NextLink from 'next/link';
import { NavigationItem } from '@/config/navigation';
import { MegaMenu } from './MegaMenu';
import { motion, AnimatePresence } from 'framer-motion';

interface DesktopNavigationProps {
  navItems: NavigationItem[];
}

export const DesktopNavigation = ({ navItems }: DesktopNavigationProps) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <ul className="hidden lg:flex gap-0 justify-center ml-2">
      {navItems.map((item) => {
        const isOpen = openMenu === item.label;

        if (item.subCategories) {
          return (
            <li
              key={item.href}
              className="relative"
              onMouseEnter={() => setOpenMenu(item.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <Link
                as={NextLink}
                href={item.href}
                className={`text-foreground transition-colors font-medium px-2 py-1 rounded-md whitespace-nowrap text-md ${
                  isOpen ? 'text-primary bg-default-100' : 'hover:text-primary'
                }`}
              >
                {item.label}
              </Link>

              <AnimatePresence>
                {isOpen && (
                  /* Fixed container that covers entire screen */
                  <div className="fixed inset-0 top-full z-50 pointer-events-none">
                    {/* Click-catching backdrop - makes the entire area below navbar interactive */}
                    <div 
                      className="fixed inset-0 bg-black/10" 
                      aria-hidden="true"
                      onClick={() => setOpenMenu(null)}
                    />
                    
                    {/* Centered content container */}
                    {/* <div className="flex justify-center pointer-events-auto">
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="w-full max-w-7xl bg-content1 shadow-2xl rounded-b-lg"
                      >
                        <MegaMenu category={item} />
                      </motion.div>
                    </div> */}
                    <div className="w-screen bg-content1 shadow-2xl rounded-b-lg">
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
    className="max-w-7xl mx-auto"
    id={`menu-${item.label}`}
  >
    <MegaMenu category={item} />
  </motion.div>
</div>

                  </div>
                )}
              </AnimatePresence>
            </li>
          );
        }

        return (
          <li key={item.href}>
            <Link
              as={NextLink}
              href={item.href}
              className="text-foreground hover:text-primary transition-colors font-medium px-2 py-1 rounded-md"
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
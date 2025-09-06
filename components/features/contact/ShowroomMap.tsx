// components/sections/contact/ShowroomMap.tsx
'use client';

import MainHeadline from '@/components/atoms/MainHeadline';
import { motion } from 'framer-motion';
import { useState } from 'react';

// 1. Define TypeScript Interface for Showroom
interface Showroom {
  id: number;
  name: string;
  address: string;
  isMain?: boolean;
}

// 2. Hard-coded Data
const showrooms: Showroom[] = [
  {
    id: 1,
    name: "Bole Main Showroom",
    address: "Bole Road, Next to Friendship Center, Addis Ababa, Ethiopia",
    isMain: true,
  },
  {
    id: 2,
    name: "Getu Commercial Showroom",
    address: "Getu Commercial Center, 3rd Floor, Addis Ababa, Ethiopia",
  },
  {
    id: 3,
    name: "Megenagna Showroom",
    address: "Megenagna, Zefmesh Grand Mall, Addis Ababa, Ethiopia",
  },
  {
    id: 4,
    name: "CMC Showroom",
    address: "CMC Area, Salitemihret Rd, Addis Ababa, Ethiopia",
  },
];

// 3. Main Component
export default function ShowroomMap() {
  const [selectedShowroom, setSelectedShowroom] = useState<Showroom>(showrooms[0]);

  // CORRECTED: Function to generate the Google Maps embed URL (NO API KEY NEEDED)
  const getMapSrc = (showroom: Showroom) => {
    // Encode the address for the URL
    const encodedAddress = encodeURIComponent(showroom.address);
    // This is the standard, simple embed URL that works without a key.
    return `https://maps.google.com/maps?q=${encodedAddress}&t=m&z=15&output=embed&iwloc=near`;
  };

  // Function to generate the direct Google Maps directions URL
  const getDirectionsUrl = (showroom: Showroom) => {
    const encodedAddress = encodeURIComponent(showroom.address);
    return `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24" id="locations">
      {/* Section Header */}
      <div className="text-center mb-12">
        <MainHeadline>Find Our Showrooms</MainHeadline>
        <p className="text-body text-text-light/80 dark:text-text-dark/80 mt-4 max-w-3xl mx-auto">
          Visit us at any of our locations across Addis Ababa. Experience the quality of Muko furniture in person.
        </p>
      </div>

      {/* Two-Column Layout */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Column 1: Showroom List */}
        <div className="w-full lg:w-1/3">
          <div className="space-y-4">
            {showrooms.map((showroom) => (
              <ShowroomCard
                key={showroom.id}
                showroom={showroom}
                isSelected={selectedShowroom.id === showroom.id}
                onSelect={() => setSelectedShowroom(showroom)}
                getDirectionsUrl={getDirectionsUrl(showroom)}
              />
            ))}
          </div>
        </div>

        {/* Column 2: Map Preview */}
        <div className="w-full lg:w-2/3">
          <motion.div
            key={selectedShowroom.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl dark:shadow-xl-dark"
          >
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no" // Removes scrollbars inside the iframe
              marginHeight={0}
              marginWidth={0}
              src={getMapSrc(selectedShowroom)}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Google Maps view of ${selectedShowroom.name}`}
              className="rounded-2xl"
            />
          </motion.div>
          
          {/* Practical Directions Link */}
          <div className="mt-4 text-center">
            <a
              href={getDirectionsUrl(selectedShowroom)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-body font-semibold text-primary hover:text-primary-dark hover:underline"
            >
              Get Directions to {selectedShowroom.name} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// 4. Showroom Card Component for the List
const ShowroomCard = ({
  showroom,
  isSelected,
  onSelect,
  getDirectionsUrl
}: {
  showroom: Showroom;
  isSelected: boolean;
  onSelect: () => void;
  getDirectionsUrl: string;
}) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`p-4 rounded-xl border-2 cursor-pointer transition-colors ${
        isSelected
          ? 'border-primary bg-primary/10 shadow-md'
          : 'border-background-dark/10 dark:border-background-light/10 bg-background-light dark:bg-background-dark hover:border-primary/30'
      }`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`font-semibold ${isSelected ? 'text-primary-dark' : 'text-text-light dark:text-text-dark'}`}>
            {showroom.name}
          </h3>
          <p className="text-small text-text-light/70 dark:text-text-dark/70 mt-1">
            {showroom.address}
          </p>
        </div>
        {showroom.isMain && (
          <span className="text-xs font-medium bg-gradient-badge-primary text-white px-2 py-1 rounded-full ml-2">
            Main
          </span>
        )}
      </div>
      
      {/* Get Directions Button */}
      <a
        href={getDirectionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="inline-block mt-3 text-xs font-semibold text-primary hover:text-primary-dark hover:underline"
      >
        Get Directions →
      </a>
    </motion.div>
  );
};
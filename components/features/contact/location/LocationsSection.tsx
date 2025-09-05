// components/sections/LocationsSection.tsx
'use client'; // Required for using useState and interactivity

import { useState } from 'react';
import { motion } from 'framer-motion';
import MainHeadline from '@/components/atoms/MainHeadline';
import BadgeText from '@/components/atoms/BadgeText';
import { BoltIcon, ClockIcon, DevicePhoneMobileIcon, MapPinIcon } from '@heroicons/react/24/outline';
import AccentHeading from '@/components/atoms/AccentHeading';

// 1. Define TypeScript Interface
interface Showroom {
  id: number;
  name: string;
  isMain: boolean;
  address: string;
  phone: string;
  operatingHours: { days: string; hours: string }[];
  features: string[];
}

// 2. Hard-coded Data
const showrooms: Showroom[] = [
  {
    id: 1,
    name: "Bole Main Showroom",
    isMain: true,
    address: "Bole Road, Next to Friendship Center, Addis Ababa",
    phone: "+251 11 987 6543",
    operatingHours: [
      { days: "Mon - Fri", hours: "8:30 AM - 7:00 PM" },
      { days: "Saturday", hours: "9:00 AM - 6:00 PM" },
      { days: "Sunday", hours: "10:00 AM - 4:00 PM" },
    ],
    features: ["5-Story Building", "Full Product Range", "Design Consultation", "Free Parking", "Cafe"]
  },
  {
    id: 2,
    name: "Getu Commercial Showroom",
    isMain: false,
    address: "Getu Commercial Center, 3rd Floor, Addis Ababa",
    phone: "+251 11 123 4567",
    operatingHours: [
      { days: "Mon - Sat", hours: "9:00 AM - 6:30 PM" },
      { days: "Sunday", hours: "Closed" },
    ],
    features: ["Modern Collections", "Central Location", "Express Delivery"]
  },
  {
    id: 3,
    name: "Megenagna Showroom",
    isMain: false,
    address: "Megenagna, Zefmesh Grand Mall, Addis Ababa",
    phone: "+251 11 555 7890",
    operatingHours: [
      { days: "Mon - Sun", hours: "10:00 AM - 8:00 PM" },
    ],
    features: ["Open 7 Days", "Family Packages", "Mall Parking"]
  },
  {
    id: 4,
    name: "CMC Showroom",
    isMain: false,
    address: "CMC Area, Salitemihret Rd, Addis Ababa",
    phone: "+251 11 246 8135",
    operatingHours: [
      { days: "Mon - Fri", hours: "8:00 AM - 6:00 PM" },
      { days: "Saturday", hours: "8:00 AM - 5:00 PM" },
    ],
    features: ["Custom Orders", "Industrial Style", "Expert Staff"]
  }
];

// 3. Main Parent Component
export default function LocationsSection() {
  // Initialize state with the main showroom
  const [activeShowroom, setActiveShowroom] = useState<Showroom>(
    showrooms.find(showroom => showroom.isMain) || showrooms[0]
  );

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      {/* Section Header */}
      <div className="text-center mb-12 lg:mb-16">
      <AccentHeading size='sm' align='center'
        gradient="linear-gradient(90deg, #4361EE 0%, #3A0CA3 100%)"
        >
         Our Locations 
        </AccentHeading>
        <MainHeadline>Visit Our Showrooms</MainHeadline>
        <p className="text-body text-text-light dark:text-text-dark mt-4 max-w-3xl mx-auto">
          Experience the quality and craftsmanship of Muko furniture in person. Our expert staff is ready to assist you at any of our locations across Addis Ababa.
        </p>
      </div>

      {/* Two-Column Layout */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Column 1: 2x2 Selector Grid */}
        <div className="w-full lg:w-2/5">
          <div className="grid grid-cols-2 gap-4">
            {showrooms.map((showroom) => (
              <ShowroomCard
                key={showroom.id}
                showroom={showroom}
                isActive={activeShowroom.id === showroom.id}
                onClick={() => setActiveShowroom(showroom)}
              />
            ))}
          </div>
        </div>

        {/* Column 2: Details Pane */}
        <div className="w-full lg:w-3/5">
          <ShowroomDetails showroom={activeShowroom} />
        </div>
      </div>
    </section>
  );
}

// 4. Individual Card Component
const ShowroomCard = ({ showroom, isActive, onClick }: { showroom: Showroom; isActive: boolean; onClick: () => void }) => {
  return (
    <motion.button
      type="button" // Good for accessibility
      onClick={onClick}
      className={`p-4 rounded-xl text-left transition-all duration-200 border-2 ${
        isActive
          ? 'border-primary bg-primary/10 shadow-lg' // Active state
          : 'border-background-dark/10 dark:border-background-light/10 bg-background-light dark:bg-background-dark hover:border-primary/50' // Inactive & Hover state
      }`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <h3 className={`font-semibold ${isActive ? 'text-primary-dark' : 'text-text-light dark:text-text-dark'}`}>
        {showroom.name}
      </h3>
      {showroom.isMain && (
        <BadgeText >
          Flagship
        </BadgeText>
      )}
    </motion.button>
  );
};

// 5. Details Pane Component
const ShowroomDetails = ({ showroom }: { showroom: Showroom }) => {
  return (
    <motion.div
      key={showroom.id} // Key prop tells React to treat different showrooms as different components, allowing animations
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full p-6 lg:p-8 rounded-2xl bg-background-light dark:bg-background-dark shadow-xl dark:shadow-xl-dark border border-background-dark/10 dark:border-background-light/10"
    >
      {/* Showroom Name and Main Badge */}
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-subheading font-bold text-text-light dark:text-text-dark">{showroom.name}</h2>
        {showroom.isMain && (
          <BadgeText >
            Main Showroom
          </BadgeText>
        )}
      </div>

      {/* Address */}
      <div className="mb-6">
            <BadgeText gradient="custom"
            customGradient="linear-gradient(90deg, #8B5CF6 0%, #EC4899 100%)"
            rounded="lg"
            icon={<MapPinIcon className='w-4 h-4'/>}
            className='font-semibold text-text-light dark:text-text-dark mb-1'
            > Adress
            </BadgeText>
        <p className="text-body text-text-light/80 dark:text-text-dark/80">{showroom.address}</p>
      </div>

      {/* Phone */}
      <div className="mb-6">
                <BadgeText gradient="custom"
                customGradient="linear-gradient(90deg, #8B5CF6 0%, #EC4899 100%)"
                rounded="lg"
                icon={<DevicePhoneMobileIcon className='w-4 h-4'/>}
                className='font-semibold text-text-light dark:text-text-dark mb-1'
                > Phone
                </BadgeText>    
            <br/>    
            <a
          href={`tel:${showroom.phone}`}
          className="text-body text-primary hover:text-primary-dark transition-colors"
        >
          {showroom.phone}
        </a>
      </div>

      {/* Operating Hours */}
      <div className="mb-6">
            <BadgeText gradient="custom"
            customGradient="linear-gradient(90deg, #8B5CF6 0%, #EC4899 100%)"
            rounded="lg"
            icon={<ClockIcon className="w-4 h-4" />}
            className='font-semibold text-text-light dark:text-text-dark mb-1 py-2'
            > Operating hours 
            </BadgeText>       
             <ul className="space-y-1">
          {showroom.operatingHours.map((slot, index) => (
            <li key={index} className="flex justify-between text-body text-text-light/80 dark:text-text-dark/80">
              <span>{slot.days}</span>
              <span>{slot.hours}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Features */}
      <div>
            <BadgeText gradient="custom"
            customGradient="linear-gradient(90deg, #8B5CF6 0%, #EC4899 100%)"
            rounded="lg"
           icon={<BoltIcon className='w-4 h-4'/>}

            className='font-semibold text-text-light dark:text-text-dark mb-1'
            > Features 
            </BadgeText> 
            
            <div className="flex flex-wrap gap-2">
          {showroom.features.map((feature, index) => (
            <BadgeText key={index} >
              {feature}
            </BadgeText>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
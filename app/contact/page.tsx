// app/contact/page.tsx

import LocationsSection from "@/components/features/contact/location/LocationsSection";
import { HeroSection } from "@/components/organisms/HeroSection";
import { ContactFormWrapper } from "@/wrappers/ContactFormWrapper";

export default function ContactPage() {
  return (
    <>
    <HeroSection
      imageUrl="/features/ui/homepage-hero.jpg"
      imageAlt="Modern furniture collection showcasing sofas, chairs, and tables in a beautifully designed living space"
      badgeText="New Collection 2024"
      headline="Transform Your Home with Elegant Furniture"
      subheadline="Discover handcrafted pieces that blend comfort, style, and functionality for your perfect living space"
      ctaText="Explore Collection"
      ctaLink="/collection"
      minHeight="xl"
      contentWidth="wide"
      overlayOpacity={30} />
      <LocationsSection />
      <ContactFormWrapper heading="Contact Us" />
      
     
      
      </>
  );
}
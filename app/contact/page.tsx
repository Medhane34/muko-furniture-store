// app/contact/page.tsx

import ContactMethods from "@/components/features/contact/ContactMethods";
import LocationsSection from "@/components/features/contact/location/LocationsSection";
import ShowroomMap from "@/components/features/contact/ShowroomMap";
import FaqSection from "@/components/organisms/FaqSection";
import { HeroSection } from "@/components/organisms/HeroSection";
import { ContactFormWrapper } from "@/wrappers/ContactFormWrapper";

export default function ContactPage() {
    const faqs = [
  { question: "How soon can I expect results?", answer: "Most customers see results within 2–4 weeks after launch." },
  { question: "Do you create ad visuals and copy?", answer: "Yes! Our team handles all creative, copywriting, and design." },
  { question: "What if the ads don’t work?", answer: "We optimize and test until you get results. No long-term contracts." },
  { question: "Is there a minimum budget?", answer: "We recommend a minimum ad spend of 5,000 ETB/month for best results." },
];
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
      <ContactMethods /> {/* Add it here, right after the Hero */}

      <LocationsSection />
      <ContactFormWrapper heading="Contact Us" />
      
     <FaqSection 
heading="FAQs About Our Facebook Ads Service" faqs={faqs} 
  className="mt-12"
/>
<ShowroomMap/>
      
      </>
  );
}
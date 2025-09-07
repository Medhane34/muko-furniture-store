// app/contact/page.tsx

import ContactMethods from "@/components/features/contact/ContactMethods";
import LocationsSection from "@/components/features/contact/location/LocationsSection";
import ShowroomMap from "@/components/features/contact/ShowroomMap";
import FaqSection from "@/components/organisms/FaqSection";
import { HeroSection } from "@/components/organisms/HeroSection";
import { ContactFormWrapper } from "@/wrappers/ContactFormWrapper";

export default function ContactPage() {
 const faqs = [
  { question: "Where does Muko source its furniture from?", answer: " We partner with a curated selection of reputable manufacturers and brands from around the world, including Turkey, China, Vietnam, and Europe. Our focus is on importing furniture that offers the perfect balance of exceptional quality, modern design, and enduring value for the Ethiopian market." },
  { question: "What is your delivery process and area?", answer: "We offer reliable delivery services throughout Addis Ababa and its surrounding areas. Once your order is ready, our professional team will contact you to schedule a convenient delivery time. We handle your furniture with care and can often place it in your chosen room." },
  { question: "Do you offer assembly service?", answer: "Yes, we do! For most items, our delivery team can provide basic assembly service to get your new furniture set up in your home. Please let us know at the time of purchase or scheduling if you require this service." },
  { question: "What if an item arrives damaged or has a defect?", answer: "We stand behind our products. All our furniture is covered by a manufacturer's warranty against defects. If you receive a damaged item or discover a defect, please contact our customer service team immediately with photos. We will arrange for a repair, replacement, or refund according to our warranty policy." },
  { question: "Can I return a product if I don't like it?", answer: " Due to the nature of imported goods, we have a specific returns policy. Returns are typically accepted for unused items in their original packaging within a specified period. We highly encourage visiting our showroom to see products in person or consulting with our staff before purchasing to ensure you love your choice." },

];

  return (
    <>
    <HeroSection
      imageUrl="/features/contact/contact-hero.png"
      imageAlt="Modern furniture collection showcasing sofas, chairs, and tables in a beautifully designed living space"
      badgeText="connect"
      headline="Let’s Talk Muko"
      subheadline="Got a question about our collections, deliveries, or services? Our team is just a message away. Whether you’re furnishing a single room or an entire home, we’re here to guide you every step of the way."
      ctaText="Get in Touch"
      ctaLink="#contact"
      minHeight="xl"
      contentWidth="wide"
      overlayOpacity={30} />
      <ContactMethods /> {/* Add it here, right after the Hero */}

      <LocationsSection />
      <div className="div" id="contact">
             <ContactFormWrapper heading="Contact Us" />

      </div>
      
     <FaqSection 
heading="FAQs About Our Facebook Ads Service" faqs={faqs} 
  className="mt-12"
/>
<ShowroomMap/>
      
      </>
  );
}
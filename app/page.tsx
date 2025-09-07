"use client"
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { button as buttonClone } from "@/components/primitives"; // or "@/components/atoms/buttonVariants"

import { fadeInUp,  } from "@/lib/motion"; //motion variants 
import { motion } from "framer-motion";
import { ProductCard,  } from "@/components/molecules";
import MainHeadline from '@/components/atoms/MainHeadline';
import Highlight from '@/components/atoms/MainHeadline';

import { TagIcon, ClockIcon, CheckIcon } from '@heroicons/react/24/outline';
import { AboutSneakpeak } from "@/components/features/homepage/AboutSneakpeak";
import CollectionGrid from "@/components/features/CollectionGrid";

import { WhyUs } from '@/components/features/homepage/WhyUs';
import { Target, Zap, Users, Shield } from 'lucide-react';
import FaqSection from "@/components/organisms/FaqSection";
import { CTASection } from "@/components/organisms/CTASection";
import { TestimonialSection } from "@/components/organisms/TestimonialSection";
import { TestimonialCarousel } from "@/components/organisms/TestimonialCarousel";
import { HeroSection } from "@/components/organisms/HeroSection";

export default function Home() {
  const whyUsItems = [
    {
      icon: Target,
      title: "Curated Quality",
      description: "Globally Sourced, Locally Trusted."
    },
    {
      icon: Zap,
      title: "Unbeatable Value",
      description: "Superior Quality, Fair Price."
    },
    {
      icon: Users,
      title: "Guaranteed Trust",
      description: "Reliable Warranty & Support."
    },
    {
      icon: Shield,
      title: "Expert Service",
      description: "From Selection to Delivery."
    }
  ];

  const faqs = [
  { question: "Where does Muko source its furniture from?", answer: " We partner with a curated selection of reputable manufacturers and brands from around the world, including Turkey, China, Vietnam, and Europe. Our focus is on importing furniture that offers the perfect balance of exceptional quality, modern design, and enduring value for the Ethiopian market." },
  { question: "What is your delivery process and area?", answer: "We offer reliable delivery services throughout Addis Ababa and its surrounding areas. Once your order is ready, our professional team will contact you to schedule a convenient delivery time. We handle your furniture with care and can often place it in your chosen room." },
  { question: "Do you offer assembly service?", answer: "Yes, we do! For most items, our delivery team can provide basic assembly service to get your new furniture set up in your home. Please let us know at the time of purchase or scheduling if you require this service." },
  { question: "What if an item arrives damaged or has a defect?", answer: "We stand behind our products. All our furniture is covered by a manufacturer's warranty against defects. If you receive a damaged item or discover a defect, please contact our customer service team immediately with photos. We will arrange for a repair, replacement, or refund according to our warranty policy." },
  { question: "Can I return a product if I don't like it?", answer: " Due to the nature of imported goods, we have a specific returns policy. Returns are typically accepted for unused items in their original packaging within a specified period. We highly encourage visiting our showroom to see products in person or consulting with our staff before purchasing to ensure you love your choice." },

];

//testimonials data 
// Example usage data
const testimonialsData = [
  {
    id: "1",
    name: "Alemnesh Kebede",
    role: "CEO",
    company: "Addis Fashion House",
    content: "Aligoo Digital transformed our online presence. Our e-commerce sales increased by 200% within 3 months of working with them. Their understanding of the Ethiopian market is unparalleled.",
    rating: 5,
    image: "/avatars/avatar-1.png"
  },
  {
    id: "2", 
    name: "Michael Tesfaye",
    role: "Marketing Director",
    company: "Habesha Restaurant",
    content: "The website and digital marketing strategy provided by Aligoo helped us reach a wider audience in Addis Ababa. Our reservation rates tripled and we're now fully booked every weekend.",
    rating: 5,
    image: "/avatars/avatar-3d-2.jpeg"
  },
  {
    id: "3",
    name: "Sarah Mengistu",
    role: "Founder",
    company: "Sheba Handicrafts",
    content: "As a small business, we needed cost-effective solutions. Aligoo delivered beyond our expectations. Our online store now generates 60% of our total revenue.",
    rating: 5,
    image: "/avatars/avatar-3d-2.jpeg"
  }
];

  return (
    <>
    <HeroSection
          imageUrl="/features/ui/homepage-hero.jpg"
          imageAlt="Modern furniture collection showcasing sofas, chairs, and tables in a beautifully designed living space"
          badgeText="Welcome"
          headline="Design Your Dream Living Space."
          subheadline="At Muko, we believe your home should be a reflection of your finest taste. Explore our curated collections of premium furniture, designed in Addis Ababa to bring elegance, comfort, and functionality to your everyday life."
          ctaText="Explore Collection"
          ctaLink="#colllections"
          minHeight="xl"
          contentWidth="wide"
          overlayOpacity={50} />
      
      <div className="div" id="colllections">
      <CollectionGrid />
      </div>
      
       <WhyUs
        heading="The Muko Difference. Why Choose Us?"
        subheading="We combine global expertise with local understanding to deliver exceptional results"
        items={whyUsItems}
        columns={4}
        backgroundColor="gray"
        animation="stagger"
      />
{/* About Sneakpeak */}
      <AboutSneakpeak
        badge="Since 2010"
        headline="Bringing the World's Finest Furniture Home."
        description="For years, Muko Home Center has been a trusted name in Addis Ababa, dedicated to importing exceptional furniture from renowned international brands. We carefully select each piece for its quality,design, and value, ensuring your home reflects a standard of global elegance and comfort. Our commitment is to your complete satisfaction, backed by reliable service and care."
        imageUrl="/features/homepage/about-us-muko.png"
        imageAlt="Aligoo Digital Agency Team"
        ctaText="Learn About Our Journey"
        ctaLink="/about"
      />

          <TestimonialCarousel />

      
<FaqSection 
heading="Your Questions, Answered. Shopping with Confidence." faqs={faqs} 
  className="mt-12"
/>
    <CTASection
        badge="Guidance"
        heading="Expert Help Is Just a Click Away."
        subheading="JNot sure where to start? Our furniture experts are here to help you choose the perfect pieces for your home and budget."
        ctaText="Get Free Consultation"
        ctaLink="/contact"
        backgroundImage="/homepage-hero.jpg"
      
      />
      {/* <TestimonialSection
        title="Success Stories from Ethiopian Businesses"
        subtitle="See how we've helped local companies thrive in the digital space"
        testimonials={testimonialsData}
        backgroundColor="gray"
        layout="carousel"
      /> */}
   </>
  );
}

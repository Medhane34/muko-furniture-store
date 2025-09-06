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

import BadgeText from '@/components/atoms/BadgeText';
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
      title: "Data-Driven Strategies",
      description: "We use analytics and insights to create campaigns that deliver measurable results and ROI for your business."
    },
    {
      icon: Zap,
      title: "Lightning Fast Development",
      description: "Our modern tech stack ensures your website loads quickly and performs exceptionally across all devices."
    },
    {
      icon: Users,
      title: "Local Expertise",
      description: "Deep understanding of the Ethiopian market and consumer behavior to create relevant digital solutions."
    },
    {
      icon: Shield,
      title: "Ongoing Support",
      description: "Continuous maintenance, updates, and optimization to keep your digital presence ahead of the competition."
    }
  ];

  const faqs = [
  { question: "How soon can I expect results?", answer: "Most customers see results within 2–4 weeks after launch." },
  { question: "Do you create ad visuals and copy?", answer: "Yes! Our team handles all creative, copywriting, and design." },
  { question: "What if the ads don’t work?", answer: "We optimize and test until you get results. No long-term contracts." },
  { question: "Is there a minimum budget?", answer: "We recommend a minimum ad spend of 5,000 ETB/month for best results." },
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
          badgeText="New Collection 2024"
          headline="Transform Your Home with Elegant Furniture"
          subheadline="Discover handcrafted pieces that blend comfort, style, and functionality for your perfect living space"
          ctaText="Explore Collection"
          ctaLink="/collection"
          minHeight="xl"
          contentWidth="wide"
          overlayOpacity={30} />
      
      <CollectionGrid />
       <WhyUs
        heading="Why Partner with Aligoo Digital?"
        subheading="We combine global expertise with local understanding to deliver exceptional results"
        items={whyUsItems}
        columns={4}
        backgroundColor="gray"
        animation="stagger"
      />
{/* About Sneakpeak */}
      <AboutSneakpeak
        badge="Since 2023"
        headline="Transforming Ethiopian Businesses Digitally"
        description="Aligoo Digital combines cutting-edge technology with deep local market understanding to deliver exceptional results for our clients across Addis Ababa and beyond."
        imageUrl="/homepage-hero.jpg"
        imageAlt="Aligoo Digital Agency Team"
        ctaText="Learn About Our Journey"
        ctaLink="/about"
      />

          <TestimonialCarousel />

      
<FaqSection 
heading="FAQs About Our Facebook Ads Service" faqs={faqs} 
  className="mt-12"
/>
    <CTASection
        badge="Start Your Journey"
        heading="Ready to Elevate Your Digital Presence?"
        subheading="Join 100+ Ethiopian businesses that trust us with their digital success"
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

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
import { ProductCard, HeroSection } from "@/components/molecules";
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
    <><HeroSection
      badgeText="THE LABOR DAY SALE"
      headline="Get the Best Prices of the Year"
      highlight="on Our Newest Styles and Best Sellers!"
      subheading="We design conversion-focused websites that don’t just look stunning—but are built to attract, engage, and convert your ideal customers."
      imageUrl="/homepage-hero.jpg"
      imageAlt="Children jumping on a sofa bed"
      ctaText="VIEW THE SALE"
      ctaHref="#sale"
      showArrow={true} />
      
{/* About Sneakpeak */}
      <AboutSneakpeak
        badge="Since 2023"
        headline="Transforming Ethiopian Businesses Digitally"
        description="Aligoo Digital combines cutting-edge technology with deep local market understanding to deliver exceptional results for our clients across Addis Ababa and beyond."
        imageUrl="/images/about-showcase.jpg"
        imageAlt="Aligoo Digital Agency Team"
        ctaText="Learn About Our Journey"
        ctaLink="/about"
      />

            <CollectionGrid />

      <WhyUs
        heading="Why Partner with Aligoo Digital?"
        subheading="We combine global expertise with local understanding to deliver exceptional results"
        items={whyUsItems}
        columns={4}
        backgroundColor="gray"
        animation="stagger"
      />
<FaqSection heading="FAQs About Our Facebook Ads Service" faqs={faqs} />
<CTASection
        badge="Start Your Journey"
        heading="Ready to Elevate Your Digital Presence?"
        subheading="Join 100+ Ethiopian businesses that trust us with their digital success"
        ctaText="Get Free Consultation"
        ctaLink="/contact"
        backgroundImage="/shop/sofa/sofa-1.jpg"
        overlayOpacity={20}
        textColor="light"
      />
      <TestimonialSection
        title="Success Stories from Ethiopian Businesses"
        subtitle="See how we've helped local companies thrive in the digital space"
        testimonials={testimonialsData}
        backgroundColor="gray"
        layout="carousel"
      />
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title()}>Make&nbsp;</span>
          <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
          <br />
          <span className={title()}>
            websites regardless of your design experience.
          </span>
          <div className={subtitle({ class: "mt-4" })}>
            Beautiful, fast and modern React UI library.
          </div>


        </div>

<MainHeadline>
  Unleash Your <span className={title({ color: "yellow"})}>Creativity</span>
</MainHeadline>

<BadgeText 
  gradient="success" 
  icon={<CheckIcon className="w-4 h-4" />}
  rounded="full"
>
  Verified
</BadgeText>

// Standard color variants
<BadgeText color="success" size="sm">
  Active
</BadgeText>

<BadgeText color="warning" variant="outline">
  Pending
</BadgeText>

// With animation
<BadgeText 
  gradient="primary" 
  animate="pulse"
  icon={<ClockIcon className="w-4 h-4" />}
>
  Limited Time
</BadgeText>

// Custom gradient
<BadgeText 
  gradient="custom"
  customGradient="linear-gradient(90deg, #8B5CF6 0%, #EC4899 100%)"
  rounded="lg"
>
  Custom Badge
</BadgeText>

// Multiple badges example
<div className="flex gap-2 flex-wrap">
  <BadgeText gradient="primary">New</BadgeText>
  <BadgeText color="success">Featured</BadgeText>
  <BadgeText gradient="warning" animate="pulse">Sale</BadgeText>
</div>
        <div className="flex gap-3">
          {/*     <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "none",
            variant: "shadow",
          })}
          href={siteConfig.links.docs}
        >
          Documentation
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link> */}
        </div>
        <div className="p-6">
          {/*  <LinkStyle href="/about" size="lg" state="active">
       About Us
     </LinkStyle> */}

        </div>
        <div className="mt-8">
          {/* <Snippet hideCopyButton hideSymbol variant="bordered">
      <span>
        Get started by editing <Code color="primary">app/page.tsx</Code>
      </span>
    </Snippet> */}
          {/* <motion.button {...buttonHover}>Click Me</motion.button>  */}


        </div>
      </section></>
  );
}

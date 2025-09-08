"use client"
import { CraftsmanshipShowcase } from "@/components/features/aboutus/CraftsmanshipShowcase";
import { OurStory } from "@/components/features/aboutus/OurStory";
import { TeamShowcase } from "@/components/features/aboutus/TeamShowcase";
import { ValuesCommitment } from "@/components/features/aboutus/ValuesCommitment";
import { CTASection } from "@/components/organisms/CTASection";
import { HeroSection } from '@/components/organisms/HeroSection';
import { TestimonialCarousel } from "@/components/organisms/TestimonialCarousel";
import TestimonialGalaxy from "@/components/organisms/TestimonialGalaxy/TestimonialGalaxy";
import { title } from "@/components/primitives";
import { Heart, Award, ZoomIn, TreePine, Users, Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <>
    <HeroSection
      imageUrl="/features/about/about-us-hero.png"
      imageAlt="Modern furniture collection showcasing sofas, chairs, and tables in a beautifully designed living space"
      badgeText="Trust"
      headline="Your Partner in Design & Quality."
      subheadline="For years, Muko Home Center has been a cornerstone for families in Addis Ababa, transforming houses into homes. We bypass the middleman to import directly from renowned manufacturers, offering you unparalleled quality at honest prices. Our story is built on trust, one delivered sofa and satisfied customer at a time."
      ctaText="Discover Our Journey"
      ctaLink="#story"
      minHeight="xl"
      contentWidth="wide"
      overlayOpacity={50} />
      <div className="di" id="story">
      <OurStory
              headline="Our Story of Trusted Curation"
              subtitle="A journey of passion, craftsmanship, and Ethiopian pride"
              foundingYear="2015"
              founderName="Kokeb & Tati"
              founderRole="Founders"
              storyContent={[
              "Muko Home Center began with a clear vision: to bridge the gap between international furniture quality and the Ethiopian home. Founder Michael Kebede recognized a desire for diverse, well-crafted, and stylish pieces that were otherwise difficult to source.",
          "We meticulously build relationships with trusted manufacturers across the globe, selecting only pieces that meet our rigorous standards for durability, design, and value. Our reputation grew not from a workshop, but from our unwavering eye for quality and commitment to customer delight.",
          "Today, we are proud to have helped furnish thousands of homes in Addis Ababa and beyond. Our story is defined by trust—your trust in us to bring the best of global furniture to your doorstep, supported by reliable service and expertise."
      ]}
              milestone={[
                {
            year: "2015",
            title: "Our Vision Began",
            description: "Founded with a mission to import quality furniture"
          },
            {
            year: "2018", 
            title: "First Showroom",
            description: "Opened our doors in Bole to showcase our collection"
          },
          {
            year: "2020",
            title: "Online Launch",
            description: "Launched our e-commerce platform for Ethiopia"
          },
          {
            year: "2023",
            title: "5,000+ Homes",
            description: "Furnished over 5,000 homes across Ethiopia"
          }  ]}
              imageSrc="/homepage-hero.jpg"
              imageAlt="MUKO Furniture founder in workshop"
              ctaText="Meet Our Artisans"
              ctaLink="/about/team" />
      </div>
    
{/* Craftsmanship Showcase */}
      <CraftsmanshipShowcase
        headline = "The MUKO Standard"
  subtitle = "Our commitment to quality you can trust"
        craftItems={[
          {
      id: "sourcing",
      title: "Global Sourcing",
      description: "We partner with world-class manufacturers known for their excellence and ethical production.",
      image: "/homepage-hero.jpg",
      details: [
        "Rigorous manufacturer vetting process",
        "Focus on sustainable and ethical production",
        "Materials meet international safety standards",
        "Direct partnerships ensure value"
      ],
      icon: Heart
    },
          {
      id: "inspection",
      title: "Stringent Inspection",
      description: "Every piece undergoes a multi-point quality check before it reaches your home.",
      image: "/homepage-hero.jpg",
      details: [
        "Pre-shipment quality assurance audits",
        "Post-delivery inspection in our warehouse",
        "Structural integrity and stability checks",
        "Finish and fabric quality verification"
      ],
      icon: ZoomIn
    },
    {
      id: "testing",
      title: "Performance Testing",
      description: "We ensure durability by validating products against rigorous performance standards.",
      image: "/homepage-hero.jpg",
      details: [
        "Frame stability and weight capacity tests",
        "Fabric durability and abrasion resistance checks",
        "Hardware and mechanism lifecycle testing",
        "Safety and compliance certification"
      ],
      icon: Award
    }
        ]}
        warranty={{
          years: 2,
          description: "comprehensive warranty on frames and mechanisms for your peace of mind"
        }}
      />

     {/*  <TeamShowcase
        headline="Ethiopian Craftsmen, Global Quality"
        subtitle="Each artisan brings generations of knowledge to every piece they create"
        teamMembers={[
          {
            id: "1",
            name: "Solomon Tadesse",
            role: "Head Woodcarver",
            expertise: ["Ornate Carving", "Traditional Patterns", "Detail Work"],
            years: 30,
            image: "/avatars/avatar-3d-4.jpeg",
            story: "Learned carving from his grandfather in Harar",
            favoriteTool: "Set of 12 hand carving chisels",
            projects: 2000
          },
          {
            id: "2",
            name: "Marta Girma",
            role: "Textile Artist", 
            expertise: ["Traditional Weaving", "Fabric Dyeing", "Pattern Design"],
            years: 15,
            image: "/avatars/avatar-3d-4.jpeg",
            story: "Preserves ancient Ethiopian weaving techniques",
            favoriteTool: "Handloom from her village",
            projects: 800
          },
          {
            id: "3",
            name: "Daniel Assefa",
            role: "Assembly Master",
            expertise: ["Structural Integrity", "Joinery", "Final Assembly"],
            years: 20,
            image: "/avatars/avatar-3d-4.jpeg",
            story: "Ensures every piece meets MUKO's strict standards",
            favoriteTool: "Custom-made mallet",
            projects: 3000
          }
        ]}
        studioStats={{
          totalTeam: 18,
          totalExperience: 225,
          projectsCompleted: 6500
        }}
      /> */}

      {/* <TestimonialGalaxy 
        testimonials={[{
          quote: "hello",
          author: "hello",
          role: "hello",
          rating: 4,
          avatarUrl: "hel",
          extendedQuote: "helo"
        }]} // Overrides defaults
        theme="space"
        autoPlay={true}
        visibleCount={4}
      /> */}
      {/* Values Commitment */}
      <ValuesCommitment
        headline="These principles guide every decision we make and every piece we deliver"
        subtitle="Our Values"
        values={[
           {
      icon: Award,
      title: "Curated Excellence",
      description: "Rigorous selection of furniture that meets our high standards for design and durability",
      features: [
        "Partnerships with quality international brands",
        "Focus on timeless design and functionality",
        "Materials tested for longevity and safety",
        "Style that transcends trends"
      ],
      color: 'primary'
    },
          {
            icon: Award,
            title: "Artisan Excellence",
            description: "Preserving and evolving Ethiopian craftsmanship traditions",
            features: [
              "Master-apprentice programs",
              "Continuous skills training",
              "Traditional technique preservation",
              "Innovation in design"
            ],
            color: 'primary'
          },
          {
      icon: Shield,
      title: "Trust & Assurance",
      description: "Standing behind every product with reliable service and support",
      features: [
        "Comprehensive warranty on all products",
        "Transparent pricing with no hidden costs",
        "Dedicated customer service team",
        "Hassle-free return policy"
      ],
      color: 'blue'
    },
           {
      icon: Users,
      title: "Ethiopian Community", 
      description: "Supporting local employment and making quality furniture accessible",
      features: [
        "Creating local jobs in retail and logistics",
        "Investing in Ethiopian customer service talent",
        "Making global design accessible in Addis Ababa",
        "Supporting local interior design partnerships"
      ],
      color: 'green'
    },
        ]}
        commitmentStatement="We believe furniture should tell a story—of Ethiopian heritage, of skilled hands, of sustainable choices, and of families gathering together for generations."
      />
      <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
       <CTASection
              badge="Discover"
              heading="Modern Comfort, Timeless Design."
              subheading="Discover furniture where exceptional Ethiopian craftsmanship meets contemporary elegance. Each piece is built with premium materials and attention to detail, designed to become a cherished part of your home for years to come."
              ctaText="Explore The Collection"
              ctaLink="/all"
              backgroundImage="/features/about/about-us-cta.png"
            
            />
      </section>
      
            
            <TestimonialCarousel />

        </>
  );
}

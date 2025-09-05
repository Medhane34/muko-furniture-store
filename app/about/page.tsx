"use client"
import { CraftsmanshipShowcase } from "@/components/features/aboutus/CraftsmanshipShowcase";
import { OurStory } from "@/components/features/aboutus/OurStory";
import { TeamShowcase } from "@/components/features/aboutus/TeamShowcase";
import { ValuesCommitment } from "@/components/features/aboutus/ValuesCommitment";
import { HeroSection } from '@/components/organisms/HeroSection';
import { TestimonialCarousel } from "@/components/organisms/TestimonialCarousel";
import TestimonialGalaxy from "@/components/organisms/TestimonialGalaxy/TestimonialGalaxy";
import { title } from "@/components/primitives";
import { Heart, Award, ZoomIn, TreePine, Users } from "lucide-react";

export default function AboutPage() {
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

    <OurStory
        headline="From Our Workshop to Your Home"
        subtitle="A journey of passion, craftsmanship, and Ethiopian pride"
        foundingYear="2015"
        founderName="Michael Kebede"
        founderRole="Founder & Master Craftsman"
        storyContent={[
          "MUKO Furniture began when Michael, a third-generation woodworker, decided to blend traditional Ethiopian techniques with contemporary design. His vision was simple: create furniture that honors our heritage while fitting modern lifestyles.",
          "Starting with just two artisans in a small Addis Ababa workshop, we focused on quality over quantity. Each piece was crafted with attention to detail that quickly earned us a reputation for excellence.",
          "Today, while we've grown to serve customers across Ethiopia, we still maintain that small-workshop mentality. Every piece that leaves our workshop carries the same commitment to quality that started it all."
        ]}
        milestone={[
          {
            year: "2015",
            title: "Humble Beginnings",
            description: "Started in a small Addis workshop"
          },
          {
            year: "2017",
            title: "First Breakthrough",
            description: "Featured in Ethiopian Home Magazine"
          },
          {
            year: "2019",
            description: "Launched online store",
            title: "hello"
          },
          {
            year: "2024",
            title: "National Presence",
            description: "Serving all major Ethiopian cities"
          }
        ]}
        imageSrc="/homepage-hero.jpg"
        imageAlt="MUKO Furniture founder in workshop"
        ctaText="Meet Our Artisans"
        ctaLink="/about/team" />
{/* Craftsmanship Showcase */}
      <CraftsmanshipShowcase
        headline="Ethiopian Craftsmanship, Global Standards"
        subtitle="Every piece tells a story of dedication, skill, and passion"
        craftItems={[
          {
            id: "materials",
            title: "Sustainable Ethiopian Hardwoods",
            description: "We use only ethically sourced woods from managed Ethiopian forests",
             image: "/homepage-hero.jpg",      
              details: [
              "Wanza and Zelkova hardwoods",
              "5-year air-drying process",
              "Natural oil finishes only",
              "Water-resistant treatments"
            ],
            icon: Heart
          },
          {
            id: "techniques", 
            title: "Generational Knowledge",
            description: "Techniques passed down through generations of Ethiopian craftsmen",
            image: "/homepage-hero.jpg",
            details: [
              "Mortise and tenon joinery",
              "Hand-carved details",
              "Traditional weaving techniques",
              "Modern comfort engineering"
            ],
            icon: Award
          },
          {
            id: "quality",
            title: "Rigorous Quality Control",
            description: "Every piece undergoes 27 quality checks before delivery",
            image: "/homepage-hero.jpg",
            details: [
              "Weight testing to 300kg",
              "Frame stress testing",
              "Fabric durability checks",
              "Final aesthetic approval"
            ],
            icon: ZoomIn
          }
        ]}
        warranty={{
          years: 15,
          description: "on all solid wood frames and structural components"
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
        headline="Built on Ethiopian Values, Made for Modern Homes"
        subtitle="These principles guide every decision we make and every piece we create"
        values={[
          {
            icon: TreePine,
            title: "Environmental Stewardship",
            description: "Honoring Ethiopia's natural resources through sustainable practices",
            features: [
              "Reforestation partnerships",
              "Water-based, non-toxic finishes", 
              "Energy-efficient workshop",
              "Biodegradable packaging"
            ],
            color: 'green'
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
            icon: Users,
            title: "Community First",
            description: "Investing in the people and communities that make us possible",
            features: [
              "Living wage commitments",
              "Local supplier partnerships",
              "Community workshop access",
              "Education scholarships"
            ],
            color: 'blue'
          },
          {
            icon: Heart, 
            title: "Customer Legacy",
            description: "Creating furniture that becomes part of your family's story",
            features: [
              "Multi-generational warranties",
              "Heirloom restoration services",
              "Custom design consultations",
              "Personalized care guides"
            ],
            color: 'amber'
          }
        ]}
        commitmentStatement="We believe furniture should tell a story—of Ethiopian heritage, of skilled hands, of sustainable choices, and of families gathering together for generations."
      />
            <TestimonialCarousel />

        </>
  );
}

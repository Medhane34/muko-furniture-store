
// Sofa Product Wrapper Before Mockup Transition 

'use client';

import { useMemo } from "react";
import { ProductGrid } from "@/components/organisms";
import { sofaProducts, SofaProduct } from "@/lib/mocks/sofaProducts";
import { FilterState } from '@/types/filter';
import ProductFilterSidebar from "@/components/organisms/ProductFilterSidebar";
import { getColorName } from '@/lib/colors'; // Import the helper
import { SortControls } from "@/components/atoms"; // Import SortControls
import { SortOption } from '@/types/sort'; // Import from central location
import { Product } from "@/types/product";

interface SofaProductsWrapperProps {
  sortOption: SortOption;
  visibleProducts: number;
  filters: FilterState;
  onFiltersChange: (newFilters: FilterState) => void;
    onSortChange: (option: SortOption) => void; // New callback for sort
  onQuickView?: (product: Product) => void; // Add this

}

export default function SofaProductsWrapper({ 
  sortOption, 
  visibleProducts, 
  filters,  
     onSortChange, // New prop

  onFiltersChange,
  onQuickView, 

}: SofaProductsWrapperProps) {
  
  // Calculate min/max prices
  const [minPrice, maxPrice] = useMemo(() => {
    const prices = sofaProducts.map(p => p.price);
    return prices.length ? [Math.min(...prices), Math.max(...prices)] : [0, 10000];
  }, [sofaProducts]);

  // Calculate all available color names
  const allColorNames = useMemo(() => {
    const allHexCodes = sofaProducts.flatMap(product => product.colors || []);
    const allNames = allHexCodes
      .map(hex => getColorName(hex))
      .filter((name): name is string => name !== undefined);
    
    return Array.from(new Set(allNames)).sort();
  }, [sofaProducts]);

  // Filter products
  const filteredProducts: SofaProduct[] = sofaProducts.filter(product => {
    if (!product) return false;
    if (product.isNew === undefined || product.isOnSale === undefined) return false;

    return (
      (!filters.isNew || product.isNew === true) &&
      (!filters.isOnSale || product.isOnSale === true) &&
      (product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]) &&
      // Color filter logic
      (filters.colors.length === 0 || 
        (product.colors && product.colors.some(hexCode => {
          const colorName = getColorName(hexCode);
          return colorName && filters.colors.includes(colorName);
        }))
      )
    );
  });

  // Sort products
  const sortedProducts: SofaProduct[] = [...filteredProducts].sort((a, b) => {
    try {
      switch (sortOption) {
        case 'price-asc': return (a.price || 0) - (b.price || 0);
        case 'price-desc': return (b.price || 0) - (a.price || 0);
        case 'name-asc': return (a.name || '').localeCompare(b.name || '');
        case 'name-desc': return (b.name || '').localeCompare(a.name || '');
        case 'newest': return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'on-sale': return (b.isOnSale ? 1 : 0) - (a.isOnSale ? 1 : 0);
        default: return 0;
      }
    } catch (error) {
      console.error("Sorting error:", error);
      return 0;
    }
  });

  const products = sortedProducts.slice(0, visibleProducts);

return (
    <div className="flex flex-col gap-6"> {/* Changed to column layout */}
      
      {/* NEW: Top Bar with Sort Controls aligned right */}
      <div className="flex justify-between items-center">
        {/* Left side - Optional: could add results count or title */}
        <div className="text-sm text-gray-600">
          Showing {products.length} of {filteredProducts.length} products
        </div>
        
        {/* Right side - Sort Controls */}
        <SortControls 
          currentSort={sortOption} 
          onSortChange={onSortChange} 
        />
      </div>

      {/* Main Content Area - Sidebar + Grid */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar - unchanged */}
        <div className="w-full md:w-1/4 lg:w-1/5">
          <div className="sticky top-24 h-fit">
            <ProductFilterSidebar
              filters={filters}
              onFiltersChange={onFiltersChange}
              minPrice={minPrice}
              maxPrice={maxPrice}
              allColorNames={allColorNames}
            />
          </div>
        </div>

        {/* Product Grid - unchanged */}
        <div className="w-full md:w-3/4 lg:w-4/5">
          <ProductGrid products={products} sortOption={sortOption} columns={3} 
            onQuickView={onQuickView} 

          />
        </div>
      </div>
    </div>
  );
}

// sofa page before transition 
'use client';

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import { SortOption } from "@/types/sort"; // Import from centralized location
import { FilterState } from "@/types/filter";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import SofaProductsWrapper from "@/wrappers/SofaProductsWrapper";
import QuickViewDrawer from "@/components/organisms/QuickViewDrawer";
import { sofaProducts } from "@/lib/mocks/sofaProducts";
import { Suspense, useState } from "react";
import { Product } from "@/types/product";
import AccentHeading from '@/components/atoms/AccentHeading';
import { FeaturedProductsSection } from "@/components/organisms/FeaturedProductsSection";

import { HeroSection } from '@/components/features/product/HeroSection';
import { SocialProofSection } from "@/components/organisms/SocialProofSection";

export default function SofaProductsPage() {
  const [sortOption, setSortOption] = useState<SortOption>('price-asc');
  const [visibleProducts, setVisibleProducts] = useState(6);
  const [filters, setFilters] = useState<FilterState>({ 
    isNew: false, 
    isOnSale: false, 
    colors: [],
    priceRange: [0, 50000]
  });
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const totalProducts = sofaProducts.length;

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const handleCloseQuickView = () => {
    setQuickViewProduct(null);
  };

  // Filter featured sofas (assuming you have an isFeatured property)
  const featuredSofas = sofaProducts.filter(product => product.isFeatured); 
// value for social proof section 
  const sofaSocialProof = [
    { value: 10000, label: 'Sofas Delivered', suffix: '+' },
    { value: 4.8, label: 'Customer Rating', suffix: '/5 ★' },
    { value: 98, label: 'Recommend Us', suffix: '%' }
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

      
      <section className="container mx-auto px-4 py-8">
      
        <FeaturedProductsSection
          title="Featured Sofas"
          subtitle="Discover our premium sofa collection crafted for comfort and style"
          products={featuredSofas}
          viewAllLink="/sofa"
          columns={3}
          sortOption={sortOption}
          onSortChange={setSortOption}
          productLimit={3} // Show only 3 products
        />
        
     
      </section>
     {/* Social Proof Break */}
       <SocialProofSection
        title="Why Customers Love Our Sofas"
        items={sofaSocialProof}
        layout="grid-3"
      backgroundImage="/features/ui/homepage-hero.jpg"
      overlayOpacity={0.7}
      />
      <section className="container mx-auto px-4 py-8">
       <Suspense fallback={<p className="font-sans text-body">Loading products...</p>}>
          <ErrorBoundary>
            <SofaProductsWrapper
              sortOption={sortOption}
              onSortChange={setSortOption}
              visibleProducts={visibleProducts}
              filters={filters}
              onFiltersChange={setFilters}
              onQuickView={handleQuickView} // Pass the quick view handler
            />
          </ErrorBoundary>
        </Suspense>
      {/* Load More Button */}
        {visibleProducts < totalProducts && (
          <motion.button
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            onClick={() => setVisibleProducts(prev => prev + 6)}
            className="mt-8 px-6 py-2 bg-primary text-gray-900 rounded-lg font-sans text-body hover:bg-primary-dark hover:text-gray-900 dark:bg-primary-dark dark:text-gray-100"
          >
            Load More Sofas
          </motion.button>
        )}

        {/* Quick View Drawer */}
        <QuickViewDrawer
          isOpen={!!quickViewProduct}
          onClose={handleCloseQuickView}
          product={quickViewProduct} />
      </section>
       

        
      </>
  );
}


"use client"
import { CraftsmanshipShowcase } from "@/components/features/aboutus/CraftsmanshipShowcase";
import { OurStory } from "@/components/features/aboutus/OurStory";
import { TeamShowcase } from "@/components/features/aboutus/TeamShowcase";
import { ValuesCommitment } from "@/components/features/aboutus/ValuesCommitment";
import { HeroSection } from '@/components/features/product/HeroSection';
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
        imageSrc="/about/founder-story.jpg"
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
            image: "/craftsmanship/ethiopian-wood.jpg",
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
            image: "/craftsmanship/traditional-joinery.jpg",
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
            image: "/craftsmanship/quality-check.jpg",
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

      <TeamShowcase
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
      />

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


// components/feature/product/ProductSpecsSection.tsx
"use client";
import React from "react";
import { Divider } from "@heroui/divider";
import { Badge } from "@/components/atoms/Badge"; // Import your custom Badge atom
import { Product } from "@/types/product"; // Import the type

interface ProductSpecsSectionProps {
  product: Product;
}

export default function ProductSpecsSection({ product }: ProductSpecsSectionProps) {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Grid Layout */}
        <div className="grid  md:grid-cols-[3fr_1fr] gap-8 md:gap-12">
          {/* Column 1: Description & Features */}
          <div className="space-y-6 ">
             <Divider className="my-4" />

              <h4 className="text-subheading font-semibold text-gray-900 dark:text-white">Mehr Info</h4>
                    <Divider className="my-4" />
            {/* Description */}
            <p className="text-body text-gray-700 dark:text-gray-300">
              {product.description}
            </p>
            {/* Features List */}
            <ul className="space-y-3">
              {product.features?.map((feature, index) => (
                <li key={index} className="flex items-start">
                  {/* Custom Bullet Point */}
                  <span className="bg-primary dark:bg-primary-dark rounded-full w-2 h-2 mt-2 shrink-0 mr-3"></span>
                  <span className="text-body text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
                  <Divider className="my-4" />
{/* Availability & Shipping */}
            <div className="flex flex-col gap-2">
              <Badge color={product.stock > 0 ? "success" : "warning"} className="w-fit">
                {product.stock > 0 ? "Sofort Lieferbar." : "Auf Nachbestellung"}
              </Badge>
              <p className="text-small text-gray-600 dark:text-gray-400">
                Versand innerhalb von 1-3 Werktagen.
              </p>
            </div>
          </div>

          {/* Column 2: Specifications & Details */}
          <div className="space-y-6">
            {/* Divider only on mobile */}
            <Divider className="md:hidden" />

            {/* Specifications List */}
            <div className="space-y-4">
             <Divider className="my-4" />

              <h4 className="text-subheading font-semibold text-gray-900 dark:text-white">Mehr Info</h4>
                    <Divider className="my-4" />

              <dl className="grid grid-cols-[max-content,1fr] gap-x-4 gap-y-2">
                <dt className="text-body font-semibold text-gray-900 dark:text-white">Material:</dt>
                <dd className="text-body text-gray-600 dark:text-gray-400">{product.material}</dd>

                <dt className="text-body font-semibold text-gray-900 dark:text-white">Größe:</dt>
                <dd className="text-body text-gray-600 dark:text-gray-400">{product.dimensions}</dd>

                <dt className="text-body font-semibold text-gray-900 dark:text-white">Gewicht:</dt>
                <dd className="text-body text-gray-600 dark:text-gray-400">{product.weight}</dd>
              </dl>
            </div>
      <Divider className="my-4" />

    
            {/* SKU */}
            <p className="text-small text-gray-500">
              <span className="font-semibold">Artikel NR:</span> {product.sku}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


// related product section 

// components/organisms/RelatedProductSection
'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/motion';
import { ProductGrid, Product } from '@/components/organisms';

interface RelatedProductsSectionProps {
  category: string;
  currentProductSlug: string;
  products: Product[];
  maxProducts?: number;
  className?: string;
}

export default function RelatedProductsSection({
  category,
  currentProductSlug,
  products,
  maxProducts = 3,
  className = '',
}: RelatedProductsSectionProps) {
  // Filter out current product and limit to maxProducts
  const relatedProducts = products
    .filter(product => product.slug !== currentProductSlug)
    .slice(0, maxProducts);

  console.log('RelatedProductsSection category:', category); // Debug
  console.log('RelatedProductsSection currentProductSlug:', currentProductSlug); // Debug
  console.log('RelatedProductsSection relatedProducts:', relatedProducts.map(p => p._id)); // Debug

  if (relatedProducts.length === 0) {
    console.warn('RelatedProductsSection: No related products found'); // Debug
    return null;
  }

  return (
    <section className={`py-8 ${className}`}>
      <motion.h3
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="font-sans text-heading text-gray-900 dark:text-gray-100 mb-6"
      >
        Related {category.charAt(0).toUpperCase() + category.slice(1)}
      </motion.h3>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative"
      >
        <ProductGrid
          products={relatedProducts}
          sortOption="none" // No sorting for related products
          columns={3}
        />
      </motion.div>
    </section>
  );
}
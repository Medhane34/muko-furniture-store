// components/organisms/FeaturedProductsSection.tsx
'use client';

import { Product } from '@/types/product';
import { SortOption } from '@/types/sort';
import { ProductGrid } from '@/components/organisms/ProductGrid';
import MainHeadline from '@/components/atoms/MainHeadline';

import { Button } from '@/components/atoms/Button';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '../atoms/SectionHeading';
import AccentHeading from '../atoms/AccentHeading';
import { BodyText } from '../atoms';
import { Link } from '@heroui/link';

export interface FeaturedProductsSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
  columns?: 3 | 4;
  productLimit?: number; // NEW: Add product limit prop
  sortOption?: SortOption;
  onSortChange?: (option: SortOption) => void;
  className?: string;
}

export function FeaturedProductsSection({
  title,
  subtitle,
  products,
  viewAllLink,
  columns = 4,
  productLimit = 3, // NEW: Default to 3 products
  sortOption = 'newest',
  onSortChange,
  className = ''
}: FeaturedProductsSectionProps) { 
    const displayedProducts = products.slice(0, productLimit);

  return (
    <section className={`container mx-auto px-4 py-12 ${className}`}>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* Heading Sidebar (20% on desktop, full width on mobile) */}
        <div className="w-full lg:w-1/5">
          <div className="sticky top-24 space-y-6">
         <AccentHeading size="sm" gradient="linear-gradient(90deg, #4361EE 0%, #3A0CA3 100%)" className='justify-start'>
           Curated 
        </AccentHeading>
        <MainHeadline>
       {title}
        </MainHeadline>
            
        <BodyText>{subtitle}</BodyText>
            
            {viewAllLink && (
              <Button
                variant="outline"
                size="md"
                rightIcon={ArrowRight}
                onClick={() => window.location.href = viewAllLink}
                className="w-full lg:w-auto"
                aria-label={`View all ${title}`}
              >
                <Link href='#collection'>
                View All
                </Link>
              </Button>
            )}
          </div>od
        </div>

        {/* Product Grid (80% on desktop, full width on mobile) */}
        <div className="w-full lg:w-4/5">
          <ProductGrid
            products={displayedProducts} // Use limited products
            sortOption={sortOption}
            columns={columns}
          />
        </div>

      </div>
    </section>
  );
}
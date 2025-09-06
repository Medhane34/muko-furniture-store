// lib/sanity/wrappers/FeaturedProductsWrapper.tsx
'use client';

import { useEffect, useState } from 'react';
import { fetchFeaturedProducts } from '@/lib/sanity/functions/featuredProducts';
import { transformSanityProducts } from '@/lib/sanity/utils/transformers';
import { Product } from '@/types/product';
import { FeaturedProductsSection, FeaturedProductsSectionProps } from '@/components/organisms/FeaturedProductsSection';
import { SanityProduct } from '@/lib/sanity/utils/transformers';
import { Spinner } from '@heroui/spinner';

interface FeaturedProductsWrapperProps extends Omit<FeaturedProductsSectionProps, 'products'> {
  categorySlug: string;
}

export function FeaturedProductsWrapper({ categorySlug, ...props }: FeaturedProductsWrapperProps) {
  const [sanityProducts, setSanityProducts] = useState<SanityProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFeaturedProducts() {
      try {
        const data = await fetchFeaturedProducts(categorySlug, props.productLimit || 3);
        if (data) {
          setSanityProducts(data);
        } else {
          setError('No featured products found');
        }
      } catch (err) {
        setError('Failed to load featured products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadFeaturedProducts();
  }, [categorySlug, props.productLimit]);

  // Transform Sanity data to Product type
  const products = transformSanityProducts(sanityProducts);

  return (
    <>
      {loading ? (
        <div className="flex justify-center py-38">
        <Spinner classNames={{label: "text-foreground mt-4 text-center"}} label="spinner" variant="spinner" /> 
        </div>
              
      ) : error ? (
        <div className="text-center py-8 text-red-600">{error}</div>
      ) : (
        <FeaturedProductsSection {...props} products={products} />
      )}
    </>
  );
}
// lib/sanity/wrappers/RelatedProductsSectionWrapper.tsx
import { RelatedProductsSection } from '@/components/organisms';
import { fetchRelatedProducts } from '@/lib/sanity/functions/fetchRelatedProducts';

interface RelatedProductsSectionWrapperProps {
  categorySlug: string;
  currentProductSlug: string;
  maxProducts?: number;
  className?: string;
}

export async function RelatedProductsSectionWrapper({
  categorySlug,
  currentProductSlug,
  maxProducts = 3,
  className = '',
}: RelatedProductsSectionWrapperProps) {
  const products = await fetchRelatedProducts({
    categorySlug,
    currentProductSlug,
    limit: maxProducts,
  });

  if (products.length === 0) {
    console.warn('RelatedProductsSectionWrapper: No related products found'); // Debug
    return null;
  }

  return (
    <RelatedProductsSection
      category={categorySlug}
      currentProductSlug={currentProductSlug}
      products={products}
      maxProducts={maxProducts}
      className={className}
    />
  );
}
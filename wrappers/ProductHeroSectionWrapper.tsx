
// lib/sanity/wrappers/ProductHeroSectionWrapper.tsx
import { fetchProductBySlug } from '@/lib/sanity/functions/productBySlug';
import { transformSanityProduct } from '@/lib/sanity/utils/transformers';
import { Product } from '@/types/product';
import { ProductHeroSection } from '@/components/features/product/ProductHeroSection';

interface ProductHeroSectionWrapperProps {
  slug: string;
}

export async function ProductHeroSectionWrapper({ slug }: ProductHeroSectionWrapperProps) {
  const sanityProduct = await fetchProductBySlug(slug);
  if (!sanityProduct) {
    return <div>Product not found</div>;
  }

  const product = transformSanityProduct(sanityProduct);
  return <ProductHeroSection product={product} />;
}
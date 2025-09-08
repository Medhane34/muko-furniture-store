// app/product/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { client as sanityClient } from '@/lib/sanity/client';
import ProductSteps, { productSteps } from '@/components/features/product/ProductSteps';
import { CTAForm } from '@/components/features/product/CTAForm';
import { fetchProductBySlug } from '@/lib/sanity/functions/productBySlug';
import { transformSanityProduct } from '@/lib/sanity/utils/transformers';
import { Product } from '@/types/product';
import RelatedProductsSection from '@/components/organisms/RelatedProductsSection';
import { ProductHeroSectionWrapper } from '@/wrappers/ProductHeroSectionWrapper';
import ProductSpecsSection from '@/components/features/product/ProductSpecsSection';
import { CTAFormWrapper } from '@/wrappers/CTAFormWrapper';
import { RelatedProductsSectionWrapper } from '@/wrappers/RelatedProductsSectionWrapper';

// Remove the ProductPageProps interface and use the Promise signature
export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // Await the params promise
  const { slug } = await params;
  console.log('ProductPage: Processing slug:', slug);

  const sanityProduct = await fetchProductBySlug(slug);
  if (!sanityProduct) {
    console.warn(`ProductPage: No product found for slug: ${slug}`);
    notFound();
  }

  const product = transformSanityProduct(sanityProduct);
  const category = sanityProduct.organization?.category?.slug?.current || 'unknown';
  console.log('ProductPage: Transformed product:', JSON.stringify(product, null, 2));
  console.log('ProductPage: Category:', category);

  return (
    <section className="container mx-auto px-4 py-8">
      <ProductHeroSectionWrapper slug={slug} />
      <ProductSteps />
      <ProductSpecsSection product={product} />
      <RelatedProductsSectionWrapper
        categorySlug={category}
        currentProductSlug={slug}
        maxProducts={3}
      />
      <CTAFormWrapper
        product={product}
        heading="Order Now"
      />
    </section>
  );
}

export async function generateStaticParams() {
  const query = `*[_type == "product" && defined(basicInfo.slug.current)] { "slug": basicInfo.slug.current }`;
  try {
    const slugs = await sanityClient.fetch<{ slug: string }[]>(query);
    console.log('generateStaticParams: Generated slugs:', JSON.stringify(slugs, null, 2));
    const params = slugs
      .filter(({ slug }) => slug && typeof slug === 'string')
      .map(({ slug }) => ({ slug }));
    console.log('generateStaticParams: Generated params:', JSON.stringify(params, null, 2));
    return params;
  } catch (error) {
    console.error('generateStaticParams: Error fetching slugs:', error);
    return [];
  }
}

export const revalidate = 60;
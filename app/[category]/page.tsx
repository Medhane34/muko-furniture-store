// app/[category]/page.tsx
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { fetchSanityData } from '@/lib/sanity/client';
import { transformSanityProducts } from '@/lib/sanity/utils/transformers';
import { CategoryPageClient } from '@/components/organisms/CategoryPageClient';



export const revalidate = 60; // ISR: Revalidate every 60 seconds
 const CATEGORY_HERO_QUERY = `*[_type == "category" && slug.current == $categorySlug][0] {
  name,
  slug { current },
  description,
  image { asset -> { url } },
  heroBadgeText,
  heroHeadline,
  heroSubheadline,
  heroCtaText,
  heroCtaLink,
  heroOverlayOpacity,
  heroContentWidth,
  heroMinHeight
}`;

 const CATEGORY_PRODUCTS_QUERY = `*[_type == "product" && !(_id in path("drafts.**")) && organization.category->slug.current == $categorySlug][0...$limit] {
  _id,
  basicInfo { name, slug { current }, sku },
  description,
  pricingStatus { price, originalPrice, stock, status },
  media { images[] { asset -> { url } } },
  specifications { material, dimensions, weight, colors },
  features,
  statusFlags { isNew, isOnSale, isFeatured, promotionText },
  rating { average, count },
  organization { category -> { name, slug { current } }, tags },
  seo { metaTitle, metaDescription }
}`;

 const FEATURED_PRODUCTS_QUERY = `*[_type == "product" && !(_id in path("drafts.**")) && organization.category->slug.current == $categorySlug && statusFlags.isFeatured == true][0...$limit] {
  _id,
  basicInfo { name, slug { current }, sku },
  description,
  pricingStatus { price, originalPrice, stock, status },
  media { images[] { asset -> { url } } },
  specifications { material, dimensions, weight, colors },
  features,
  statusFlags { isNew, isOnSale, isFeatured, promotionText },
  rating { average, count },
  organization { category -> { name, slug { current } }, tags },
  seo { metaTitle, metaDescription }
}`;

 const SOCIAL_PROOF_QUERY = `*[_type == "socialProof" && category->slug.current == $categorySlug][0] {
  title,
  subtitle,
  items[] { value, label, prefix, suffix },
  layout,
  backgroundImage { asset -> { url } },
  overlayOpacity
}`;

// Static params for valid categories
export async function generateStaticParams() {
  const categories = await fetchSanityData(
    `*[_type == "category" && !(_id in path("drafts.**"))] {
      slug { current }
    }`
  );
  return categories.map((category: { slug: { current: string } }) => ({
    category: category.slug.current,
  }));
}

interface CategoryPageProps {
  params: { category: string };
}

async function fetchCategoryData(category: string) {
/*   const validCategories = ['sofas', 'dinning', 'beds', 'chairs', 'accessories'];
 */ const validCategories = ['decor', 'sofa', 'all', 'beds', 'dining', 'chairs'];
  if (!validCategories.includes(category)) {
    notFound();
  }

  const [categoryData, sanityProducts, sanityFeaturedProducts, socialProofData] = await Promise.all([
    fetchSanityData(CATEGORY_HERO_QUERY, { categorySlug: category }),
    fetchSanityData(CATEGORY_PRODUCTS_QUERY, { categorySlug: category, limit: 20 }),
    fetchSanityData(FEATURED_PRODUCTS_QUERY, { categorySlug: category, limit: 4 }),
    fetchSanityData(SOCIAL_PROOF_QUERY, { categorySlug: category }),
  ]);

  if (!categoryData) {
    notFound();
  }

  const products = transformSanityProducts(sanityProducts || []);
  const featuredProducts = transformSanityProducts(sanityFeaturedProducts || []);

  const defaultSocialProof = {
    title: 'Trusted by Thousands',
    items: [
      { value: '500+', label: 'Happy Customers' },
      { value: '4.8/5', label: 'Average Rating' },
      { value: '1000+', label: 'Products Sold' },
    ],
    layout: 'grid-3',
    backgroundImage: '/images/default-social-proof.jpg',
    overlayOpacity: 0.7,
  };

  return {
    categoryData,
    products,
    featuredProducts,
    socialProofData: socialProofData || defaultSocialProof,
  };
}

export default async function CategoryPage({ 
  params 
}: { 
  params: Promise<{ category: string }> 
}) {
  // Type assertion to tell TypeScript we know what we're doing
  const { category } = await params as unknown as { category: string };
   
  const data = await fetchCategoryData(category);

  return (
    <Suspense fallback={<p className="font-sans text-body">Loading...</p>}>
      <CategoryPageClient {...data} category={category} />
    </Suspense>
  );
}
// lib/sanity/functions/featuredProducts.ts
import { client as sanityClient } from '../client';
import { SanityProduct } from '@/lib/sanity/utils/transformers';
import { FEATURED_PRODUCTS_QUERY } from '../queries/featuredProducts';

export async function fetchFeaturedProducts(categorySlug: string, limit: number = 3): Promise<SanityProduct[] | null> {
  try {
    const data = await sanityClient.fetch<SanityProduct[]>(FEATURED_PRODUCTS_QUERY, { categorySlug, limit });
    console.log(`Featured Products for ${categorySlug}:`, JSON.stringify(data, null, 2)); // Debug log
    return data || [];
  } catch (error) {
    console.error(`Error fetching featured products for ${categorySlug}:`, error);
    return [];
  }
}
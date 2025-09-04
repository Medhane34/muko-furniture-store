
// lib/sanity/functions/productBySlug.ts
import { client as sanityClient } from '../client';
import { SanityProduct } from '@/lib/sanity/utils/transformers';
import { PRODUCT_BY_SLUG_QUERY } from '../queries/productBySlug';

export async function fetchProductBySlug(slug: string): Promise<SanityProduct | null> {
  try {
    const data = await sanityClient.fetch<SanityProduct>(PRODUCT_BY_SLUG_QUERY, { slug });
    console.log(`Product for slug ${slug}:`, JSON.stringify(data, null, 2)); // Debug log
    return data || null;
  } catch (error) {
    console.error(`Error fetching product for slug ${slug}:`, error);
    return null;
  }
}
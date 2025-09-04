
// lib/sanity/functions/productsByCategory.ts
import { client } from '../client';
import { transformSanityProducts, transformSanityProduct } from '../utils/transformers';
import { SanityProduct } from '../utils/transformers';
import { PRODUCTS_BY_CATEGORY_QUERY } from '../queries/productsByCategory';

export async function fetchProductsByCategory(categorySlug: string): Promise<SanityProduct[] | null> {
  try {
    const data = await client.fetch<SanityProduct[]>(PRODUCTS_BY_CATEGORY_QUERY, { categorySlug });
    console.log(`Products for ${categorySlug}:`, JSON.stringify(data, null, 2));
    return data || [];
  } catch (error) {
    console.error(`Error fetching products for ${categorySlug}:`, error);
    return [];
  }
}
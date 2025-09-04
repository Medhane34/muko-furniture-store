// lib/sanity/functions/fetchRelatedProducts.ts
import { client as sanityClient } from '../client';
import { SanityProduct } from '@/lib/sanity/utils/transformers';
import { Product } from '@/types/product';
import { transformSanityProduct } from '@/lib/sanity/utils/transformers';
import { RELATED_PRODUCTS_QUERY } from '../queries/relatedProducts';

interface FetchRelatedProductsParams {
  categorySlug: string;
  currentProductSlug: string;
  limit?: number;
}

export async function fetchRelatedProducts({
  categorySlug,
  currentProductSlug,
  limit = 3,
}: FetchRelatedProductsParams): Promise<Product[]> {
  try {
    const sanityProducts = await sanityClient.fetch<SanityProduct[]>(
      RELATED_PRODUCTS_QUERY,
      { categorySlug, currentProductSlug, limit }
    );
    console.log(`fetchRelatedProducts: Fetched for category ${categorySlug}, excluding ${currentProductSlug}:`, JSON.stringify(sanityProducts, null, 2)); // Debug
    return sanityProducts.map(transformSanityProduct);
  } catch (error) {
    console.error(`fetchRelatedProducts: Error for category ${categorySlug}:`, error);
    return [];
  }
}
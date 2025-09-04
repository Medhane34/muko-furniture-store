// lib/sanity/functions/sofaProducts.ts
import { client as sanityClient} from '../client';
import { SanityProduct } from '../utils/transformers';
import { SOFA_PRODUCTS_QUERY } from '../queries/sofaProducts';

export async function fetchSofaProducts(): Promise<SanityProduct[] | null> {
  try {
    const data = await sanityClient.fetch<SanityProduct[]>(SOFA_PRODUCTS_QUERY);
    console.log('Sofa Products:', JSON.stringify(data, null, 2)); // Debug log
    return data || [];
  } catch (error) {
    console.error('Error fetching sofa products:', error);
    return [];
  }
}
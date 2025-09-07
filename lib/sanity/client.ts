// lib/sanity/client.ts
import { createClient } from 'next-sanity';
const ProductImportToken = 'skbSeDhMCdNu7i0WNsXuPswvTi8RXXdcSeDCVhHycchhfwKaN8Fijs0dZQakVYRTYhKyUGj1Hs7pmlKCexnjb6BevIM0AdG8rj7hSNN6GNYUxXeAOe6g7gbdsPL7vcIXysCvntGfDnsOZzMukKNuD4C1SR7NeU6XyhXtdhcLWECYRtO6R4Xg';

export const client = createClient({
  projectId: 'jbhd4biu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: ProductImportToken,
});

// Utility function to fetch data with GROQ queries
export async function fetchSanityData<T = any>(query: string, params: Record<string, any> = {}): Promise<T> {
  try {
    const data = await client.fetch(query, params, {
      // Optional: Configure caching or revalidation
      cache: 'no-store', // Ensures fresh data; adjust based on needs (e.g., 'force-cache' for CDN)
    });
    return data;
  } catch (error) {
    console.error(`Error fetching Sanity data for query: ${query}`, error);
    throw new Error('Failed to fetch data from Sanity');
  }
}

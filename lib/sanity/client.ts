// lib/sanity/client.ts
import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: 'jbhd4biu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
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

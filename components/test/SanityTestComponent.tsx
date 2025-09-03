'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { fetchAllProducts } from '@/lib/sanity/functions/products';

export default function SanityTestComponent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testSanityConnection = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Testing Sanity connection...');
        const sanityProducts = await fetchAllProducts();
        
        console.log('Products fetched from Sanity:', sanityProducts);
        setProducts(sanityProducts);
        
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        console.error('Sanity test failed:', err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    testSanityConnection();
  }, []);

  if (loading) {
    return (
      <div className="p-8 bg-blue-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Testing Sanity Connection...</h2>
        <p>Fetching products from Sanity.io</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-4 text-red-800">Connection Failed</h2>
        <p className="text-red-600">Error: {error}</p>
        <p className="text-sm text-red-700 mt-2">
          Check your Sanity project ID, dataset, and CORS settings.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-green-50 rounded-lg">
      <h2 className="text-lg font-semibold mb-4 text-green-800">✅ Sanity Connection Successful!</h2>
      
      <div className="mb-4">
        <p className="text-green-600">
          Found {products.length} products in Sanity dataset.
        </p>
      </div>

      {/* Display products for verification */}
      <div className="mt-6">
        <h3 className="font-medium mb-3">Products from Sanity:</h3>
        <div className="space-y-3">
          {products.map((product) => (
            <div key={product._id} className="p-3 bg-white rounded border">
              <h4 className="font-semibold">{product.name}</h4>
              <p className="text-sm text-gray-600">SKU: {product.sku}</p>
              <p className="text-sm">Price: ETB {product.price}</p>
          <p className="text-sm">Details: {product.description}</p>

              {product.imageUrl && (
                <p className="text-xs text-gray-500">
                  Image: {product.imageUrl.substring(0, 50)}...
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Raw data preview for debugging */}
      <details className="mt-6">
        <summary className="cursor-pointer text-sm font-medium">Debug Data</summary>
        <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">
          {JSON.stringify(products, null, 2)}
        </pre>
      </details>
    </div>
  );
}
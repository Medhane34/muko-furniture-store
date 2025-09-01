'use client';

import { useEffect } from 'react';
import { RelatedProductsSection } from '@/components/organisms';
import { Product } from '@/components/organisms/ProductGrid';

interface ProductViewProps {
  product: Product;
  category: string;
  relatedProducts: Product[];
}

export default function ProductView({
  product,
  category,
  relatedProducts,
}: ProductViewProps) {
  useEffect(() => {
    console.log('ProductView slug:', product.slug); // Debug
    console.log('ProductView product:', product); // Debug
    console.log('ProductView category:', category); // Debug
  }, [product, category]);

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="font-sans text-heading text-gray-900 dark:text-gray-100 mb-6">
        {product.name}
      </h2>
      {/* Placeholder for product details */}
      <div className="mb-8">
        <p className="font-sans text-body text-gray-900 dark:text-gray-100">
          {product.description}
        </p>
        <p className="font-sans text-body font-bold">
          ${product.price.toFixed(2)}
        </p>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full max-w-md mt-4"
        />
      </div>
      <RelatedProductsSection
        category={category}
        currentProductSlug={product.slug}
        products={relatedProducts}
      />
    </section>
  );
}
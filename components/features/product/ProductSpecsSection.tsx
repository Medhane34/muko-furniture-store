// components/features/product/ProductSpecsSection.tsx
'use client';

import React from 'react';
import { Divider } from '@heroui/divider';
import { Badge } from '@/components/atoms/Badge';
import { Product } from '@/types/product';

interface ProductSpecsSectionProps {
  product: Product;
}

export default function ProductSpecsSection({ product }: ProductSpecsSectionProps) {
  console.log('ProductSpecsSection: Product data:', JSON.stringify(product, null, 2)); // Debug: Log product data

  return (
    <section className="py-16  dark:text-text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-[3fr_1fr] gap-8 md:gap-12">
          {/* Column 1: Description & Features */}
          <div className="space-y-6">
            <Divider className="my-4" />
            <h4 className="text-subheading font-semibold text-gray-900 dark:text-white">More Details</h4>
            <Divider className="my-4" />
            {/* Description */}
            <p className="text-body text-gray-700 dark:text-gray-300">
              {product.description || 'No description available.'}
            </p>
            {/* Features List */}
            {product.features && product.features.length > 0 ? (
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-primary dark:bg-primary-dark rounded-full w-2 h-2 mt-2 shrink-0 mr-3"></span>
                    <span className="text-body text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-body text-gray-700 dark:text-gray-300">No features listed.</p>
            )}
            <Divider className="my-4" />
            {/* Availability & Shipping */}
            <div className="flex flex-col gap-2">
              <Badge color={product.stock > 0 ? 'success' : 'warning'} className="w-fit">
                {product.stock > 0 ? 'Limited Stock' : 'Out of Stock.'}
              </Badge>
              
            </div>
          </div>

          {/* Column 2: Specifications & Details */}
          <div className="space-y-6">
            <Divider className="md:hidden" />
            <div className="space-y-4">
              <Divider className="my-4" />
              <h4 className="text-subheading font-semibold text-gray-900 dark:text-white">More Info</h4>
              <Divider className="my-4" />
              <dl className="grid grid-cols-[max-content,1fr] gap-x-4 gap-y-2">
                <dt className="text-body font-semibold text-gray-900 dark:text-white">Material:</dt>
                <dd className="text-body text-gray-600 dark:text-gray-400">{product.material || 'N/A'}</dd>
                <dt className="text-body font-semibold text-gray-900 dark:text-white">Dimensions:</dt>
                <dd className="text-body text-gray-600 dark:text-gray-400">{product.dimensions || 'N/A'}</dd>
                <dt className="text-body font-semibold text-gray-900 dark:text-white">Weight:</dt>
                <dd className="text-body text-gray-600 dark:text-gray-400 pb-4">{product.weight || 'N/A'}</dd>
              </dl>
            </div>
            <Divider className="my-4" />
            <p className="text-small text-gray-500">
              <span className="font-semibold">SKU:</span> {product.sku || 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
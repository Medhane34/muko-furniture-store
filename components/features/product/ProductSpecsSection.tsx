// components/organisms/ProductSpecsSection.tsx
"use client";
import React from "react";
import { Divider } from "@heroui/divider";
import { Badge } from "@/components/atoms/Badge"; // Import your custom Badge atom
import { Product } from "@/types/product"; // Import the type

interface ProductSpecsSectionProps {
  product: Product;
}

export default function ProductSpecsSection({ product }: ProductSpecsSectionProps) {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Grid Layout */}
        <div className="grid  md:grid-cols-[3fr_1fr] gap-8 md:gap-12">
          {/* Column 1: Description & Features */}
          <div className="space-y-6 ">
             <Divider className="my-4" />

              <h4 className="text-subheading font-semibold text-gray-900 dark:text-white">Mehr Info</h4>
                    <Divider className="my-4" />
            {/* Description */}
            <p className="text-body text-gray-700 dark:text-gray-300">
              {product.description}
            </p>
            {/* Features List */}
            <ul className="space-y-3">
              {product.features?.map((feature, index) => (
                <li key={index} className="flex items-start">
                  {/* Custom Bullet Point */}
                  <span className="bg-primary dark:bg-primary-dark rounded-full w-2 h-2 mt-2 shrink-0 mr-3"></span>
                  <span className="text-body text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
                  <Divider className="my-4" />
{/* Availability & Shipping */}
            <div className="flex flex-col gap-2">
              <Badge color={product.stock > 0 ? "success" : "warning"} className="w-fit">
                {product.stock > 0 ? "Sofort Lieferbar." : "Auf Nachbestellung"}
              </Badge>
              <p className="text-small text-gray-600 dark:text-gray-400">
                Versand innerhalb von 1-3 Werktagen.
              </p>
            </div>
          </div>

          {/* Column 2: Specifications & Details */}
          <div className="space-y-6">
            {/* Divider only on mobile */}
            <Divider className="md:hidden" />

            {/* Specifications List */}
            <div className="space-y-4">
             <Divider className="my-4" />

              <h4 className="text-subheading font-semibold text-gray-900 dark:text-white">Mehr Info</h4>
                    <Divider className="my-4" />

              <dl className="grid grid-cols-[max-content,1fr] gap-x-4 gap-y-2">
                <dt className="text-body font-semibold text-gray-900 dark:text-white">Material:</dt>
                <dd className="text-body text-gray-600 dark:text-gray-400">{product.material}</dd>

                <dt className="text-body font-semibold text-gray-900 dark:text-white">Größe:</dt>
                <dd className="text-body text-gray-600 dark:text-gray-400">{product.dimensions}</dd>

                <dt className="text-body font-semibold text-gray-900 dark:text-white">Gewicht:</dt>
                <dd className="text-body text-gray-600 dark:text-gray-400">{product.weight}</dd>
              </dl>
            </div>
      <Divider className="my-4" />

    
            {/* SKU */}
            <p className="text-small text-gray-500">
              <span className="font-semibold">Artikel NR:</span> {product.sku}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
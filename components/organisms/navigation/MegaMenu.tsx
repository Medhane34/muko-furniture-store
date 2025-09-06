
// components/navigation/MegaMenu.tsx
import React from 'react';
import { NavigationItem } from '@/config/navigation';
import NextLink from 'next/link';
import Image from 'next/image';
import { Link } from '@heroui/link';

interface MegaMenuProps {
  category: NavigationItem;
}

export const MegaMenu = ({ category }: MegaMenuProps) => {
  const { subCategories, featured, promo } = category;

  return (
    <div className="p-4 lg:p-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
        {/* Column 1 & 2: Subcategories */}
        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            {subCategories?.map((subCategory, index) => (
              <Link
                key={index}
                as={NextLink}
                href={subCategory.href}
                className="block p-3 rounded-md hover:bg-default-100 transition-colors"
              >
                <span className="font-semibold text-foreground">{subCategory.label}</span>
                {subCategory.description && (
                  <p className="text-sm text-default-500 mt-1">{subCategory.description}</p>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Column 3: Featured Products */}
        {featured && featured.length > 0 && (
          <div className="col-span-1">
            <h3 className="font-bold text-foreground mb-4">Best Sellers</h3>
            <div className="space-y-4">
              {featured.map((product, index) => (
                <Link key={index} as={NextLink} href={product.href} className="flex gap-3 group">
                  <div className="flex-shrink-0 w-16 h-16 bg-default-100 rounded-md overflow-hidden">
                    {product.imageSrc && (
                      <Image
                        src={product.imageSrc}
                        alt={product.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                      {product.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {product.oldPrice && (
                        <span className="text-sm text-default-500 line-through">{product.oldPrice}</span>
                      )}
                      <span className="text-sm font-semibold text-foreground">{product.price}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Column 4: Promo Content */}
        {promo && (
          <div className="col-span-1">
            <div className="bg-default-50 rounded-lg overflow-hidden">
              {promo.imageSrc && (
                <div className="relative h-32 bg-default-200">
                  <Image
                    src={promo.imageSrc}
                    alt={promo.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h4 className="font-bold text-foreground mb-1">{promo.title}</h4>
                <p className="text-sm text-default-600 mb-3">{promo.description}</p>
                <Link
                  as={NextLink}
                  href={promo.ctaLink}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  {promo.ctaText} →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
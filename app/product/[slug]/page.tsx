'use client';

import { useEffect, use } from 'react';
import { sofaProducts } from '@/lib/mocks/sofaProducts';
import { chairProducts } from '@/lib/mocks/chairProducts';
import { Product } from '@/types/product';
import { ProductHeroSection, ProductSteps } from '@/components/';
import { RelatedProductsSection } from '@/components/organisms';
import { notFound } from 'next/navigation';
import ProductSpecsSection from '@/components/features/product/ProductSpecsSection';
import { CTAForm } from '@/components/features/product/CTAForm';

// Mock data for beds and dining tables
const bedProducts: Product[] = [
  {
    _id: '1',
    name: 'Comfy Bed',
    description: 'A comfortable bed for your bedroom',
    price: 799.99,
    imageUrl: '/images/bed1.jpg',
    isNew: true,
    isOnSale: false,
    slug: 'comfy-bed',
    stock: 8,
    material: 'Wood',
    dimensions: '180x200 cm',
    weight: '80 kg',
    colors: ["Gray", "Black", "Blue", "Brown"],
    features: ['Orthopedic mattress', 'Sturdy frame', 'Easy assembly'],
    reviews: [
      { rating: 5, comment: 'Best bed ever!', user: 'Bob' },
    ],
    sku: "MKO-SF-220-BL",
    isFeatured: false
  },
  // Add more beds
];

const diningTableProducts: Product[] = [
  {
    _id: '1',
    name: 'Elegant Dining Table',
    description: 'An elegant wooden dining table',
    price: 499.99,
    imageUrl: '/images/table1.jpg',
    isNew: true,
    isOnSale: false,
    slug: 'elegant-dining-table',
    stock: 5,
    material: 'Oak Wood',
    dimensions: '120x80 cm',
    weight: '40 kg',
    colors: ["gray", "white", "blue", "black"],
    features: ['Extendable', 'Scratch-resistant', 'Easy to clean'],
    reviews: [
      { rating: 4, comment: 'Beautiful table', user: 'Alice' },
    ],
    sku: "MKO-SF-220-BL",
    isFeatured: false
  },
  // Add more dining tables
];

// Define valid categories
type Category = 'sofas' | 'chairs' | 'beds' | 'dining-tables';

// Map categories to product arrays
const categoryProducts: Record<Category, Product[]> = {
  sofas: sofaProducts,
  chairs: chairProducts,
  beds: bedProducts,
  'dining-tables': diningTableProducts,
};

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default  function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } =  use(params);

  // Find the product and its category
  let product: Product | null = null;
  let category: Category | '' = '';
  for (const [cat, products] of Object.entries(categoryProducts) as [Category, Product[]][]) {
    product = products.find(p => p.slug === slug) ?? null;
    if (product) {
      category = cat;
      break;
    }
  }

  useEffect(() => {
    console.log('ProductDetailPage slug:', slug); // Debug
    console.log('ProductDetailPage product:', product); // Debug
    console.log('ProductDetailPage category:', category); // Debug
  }, [slug, product, category]);

  if (!product || !category) {
    console.warn('ProductDetailPage: Product or category not found for slug:', slug); // Debug
    notFound();
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <ProductHeroSection product={product} />
      <ProductSteps/>
      <ProductSpecsSection product={product} />

      {/* Other sections will be added here */}
      <RelatedProductsSection
        category={category}
        currentProductSlug={slug}
        products={categoryProducts[category]}
      />
      <CTAForm
        product={product}
        onSubmit={(data) => console.log('Order:', data)}
        heading="Order Now"
      />
    </section>
  );
}
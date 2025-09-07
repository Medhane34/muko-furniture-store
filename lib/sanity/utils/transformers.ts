
// lib/sanity/utils/transformers.ts
import { Product } from '@/types/product';

export interface SanityProduct {
  _id: string;
  basicInfo: {
    name: string;
    slug: { current: string };
    sku: string;
  };
  description: string;
  pricingStatus: {
    price: number;
    originalPrice?: number;
    stock: number;
    status: string;
  };
  media: {
    images?: Array<{
      asset?: {
        url?: string;
      };
    }>;
  };
  specifications: {
    material?: string;
    dimensions?: string;
    weight?: string;
    colors?: string[];
  };
  features?: string[];
  statusFlags?: {
    isNew?: boolean;
    isOnSale?: boolean;
    isFeatured?: boolean;
    promotionText?: string;
  };
  reviews?: Array<{
    rating: number;
    comment: string;
    user: string;
    date: string;
  }>;
  organization: {
    category: {
      slug: any;
      name: string;
    };
    tags: string[];
  };
  seo: {
    metaTitle?: string;
    metaDescription?: string;
  };
  rating?: {
    average: number;
    count: number;
  };
}

export function transformSanityProduct(sanityProduct: SanityProduct): Product {
  // Safe slug extraction
  const slug =
    sanityProduct.basicInfo?.slug?.current ||
    sanityProduct.basicInfo?.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') ||
    `product-${sanityProduct._id}`;

  // Safe image URL extraction
  const imageUrl = sanityProduct.media?.images?.[0]?.asset?.url || '/images/placeholder.jpg';

  // Debug log
  console.log('transformSanityProduct: Raw product:', JSON.stringify(sanityProduct, null, 2));
  console.log('transformSanityProduct: Raw statusFlags:', sanityProduct.statusFlags);

  return {
    _id: sanityProduct._id,
    name: sanityProduct.basicInfo?.name || 'Unnamed Product',
    description: sanityProduct.description || '',
    price: sanityProduct.pricingStatus?.price || 0,
    imageUrl: imageUrl,
    isNew: sanityProduct.statusFlags?.isNew ?? false,
    isOnSale: sanityProduct.statusFlags?.isOnSale ?? false,
    slug: slug,
    stock: sanityProduct.pricingStatus?.stock || 0,
    material: sanityProduct.specifications?.material,
    dimensions: sanityProduct.specifications?.dimensions,
    weight: sanityProduct.specifications?.weight,
    colors: sanityProduct.specifications?.colors || [],
    features: sanityProduct.features || [],
    reviews: [], // No longer used
    rating: sanityProduct.rating || { average: 0, count: 0 },
    sku: sanityProduct.basicInfo?.sku || `SKU-${sanityProduct._id}`,
    originalPrice: sanityProduct.pricingStatus?.originalPrice,
    promotionText: sanityProduct.statusFlags?.promotionText,
    isFeatured: sanityProduct.statusFlags?.isFeatured ?? false,
    category: sanityProduct.organization?.category || undefined, // Extract category
  };
}

export function transformSanityProducts(sanityProducts: SanityProduct[]): Product[] {
  return sanityProducts
    .filter((item) => item != null) // Remove null/undefined items
    .map((sanityProduct) => {
      console.log('transformSanityProducts: Processing product ID:', sanityProduct._id);
      return transformSanityProduct(sanityProduct);
    });
}
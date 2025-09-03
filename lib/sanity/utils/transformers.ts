import { Product } from '@/types/product';

export interface SanityProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  images?: Array<{
    asset?: {
      url?: string;
    };
  }>;
  isNew?: boolean;
  isOnSale?: boolean;
  slug?: {  // Make slug optional
    current?: string;  // Make current optional
  };
  stock: number;
  material?: string;
  dimensions?: string;
  weight?: string;
  colors?: string[];
  features?: string[];
  reviews?: Array<{
    rating: number;
    comment: string;
    user: string;
  }>;
  rating?: {
    average: number;
    count: number;
  };
  sku: string;
  originalPrice?: number;
  promotionText?: string;
  isFeatured?: boolean;
}

export function transformSanityProduct(sanityProduct: SanityProduct): Product {
  // Safe slug extraction with fallbacks
  const slug = sanityProduct.slug?.current || 
               sanityProduct.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 
               `product-${sanityProduct._id}`;
  
  // Safe image URL extraction
  const imageUrl = sanityProduct.images?.[0]?.asset?.url || '/images/placeholder.jpg';
  
  return {
    _id: sanityProduct._id,
    name: sanityProduct.name || 'Unnamed Product',
    description: sanityProduct.description || '',
    price: sanityProduct.price || 0,
    imageUrl: imageUrl,
    isNew: sanityProduct.isNew || false,
    isOnSale: sanityProduct.isOnSale || false,
    slug: slug, // Use the safely extracted slug
    stock: sanityProduct.stock || 0,
    material: sanityProduct.material,
    dimensions: sanityProduct.dimensions,
    weight: sanityProduct.weight,
    colors: sanityProduct.colors || [],
    features: sanityProduct.features || [],
    reviews: sanityProduct.reviews || [],
    rating: sanityProduct.rating,
    sku: sanityProduct.sku || `SKU-${sanityProduct._id}`,
    originalPrice: sanityProduct.originalPrice,
    promotionText: sanityProduct.promotionText,
    isFeatured: sanityProduct.isFeatured || false
  };
}

export function transformSanityProducts(sanityProducts: SanityProduct[]): Product[] {
  return sanityProducts.map(transformSanityProduct);
}
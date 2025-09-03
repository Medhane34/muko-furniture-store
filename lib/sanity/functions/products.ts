import { Product } from '@/types/product';
import { client } from '../client';
import { transformSanityProducts, transformSanityProduct } from '../utils/transformers';
import { SanityProduct } from '../utils/transformers';

// Query to get all products
const ALL_PRODUCTS_QUERY= `*[_type == "product"] {
  _id,
  basicInfo {
    name,
    slug { current },
    sku
  },
  description,
  pricingStatus {
    price,
    originalPrice,
    stock,
    status
  },
  media {
    images[] {
      asset -> { url }
    }
  },
  specifications {
    material,
    dimensions,
    weight,
    colors
  },
  features,
  statusFlags {
    isNew,
    isOnSale,
    isFeatured,
    promotionText
  },
  reviews[] {
    rating,
    comment,
    user,
    date
  },
  organization {
    category -> { name },
    tags
  },
  seo {
    metaTitle,
    metaDescription
  },
  "rating": {
    "average": math::avg(reviews.rating),
    "count": count(reviews)
  }
}`;


// Query to get a product by slug
const PRODUCT_BY_SLUG_QUERY = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  description,
  price,
  images[] {
    asset -> {
      url
    }
  },
  isNew,
  isOnSale,
  slug {
    current
  },
  stock,
  material,
  dimensions,
  weight,
  colors,
  features,
  reviews[] {
    rating,
    comment,
    user
  },
  rating {
    average,
    count
  },
  sku,
  originalPrice,
  promotionText,
  isFeatured
}`;

export async function fetchAllProducts(): Promise<Product[]> {
  try {
    console.log('Fetching products from Sanity...');
    const sanityProducts: SanityProduct[] = await client.fetch(ALL_PRODUCTS_QUERY);
    console.log('Raw Sanity products:', sanityProducts);
    
    const transformedProducts = transformSanityProducts(sanityProducts);
    console.log('Transformed products:', transformedProducts);
    
    return transformedProducts;
  } catch (error) {
    console.error('Error fetching products from Sanity:', error);
    return [];
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const sanityProduct: SanityProduct = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug });
    
    if (!sanityProduct) {
      console.log('No product found for slug:', slug);
      return null;
    }
    
    return transformSanityProduct(sanityProduct);
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return null;
  }
}
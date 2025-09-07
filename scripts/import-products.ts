// scripts/import-products.ts
import { createClient } from 'next-sanity';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const ProductImportToken = process.env.SANITY_API_TOKEN;

if (!ProductImportToken) {
  throw new Error('Missing SANITY_API_TOKEN environment variable');
}

export const client = createClient({
  projectId: 'jbhd4biu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: ProductImportToken,
});

// Your actual Beds category ID
const BEDS_CATEGORY_ID = 'ef652f54-78f2-40a0-aa89-66df40958835';

// Product data structure matching your Sanity schema
interface ProductData {
  _type: 'product';
  basicInfo: {
    name: string;
    slug: { _type: 'slug'; current: string };
    sku: string;
  };
  pricingStatus: {
    price: number;
    originalPrice?: number;
    stock: number;
    status: 'inStock' | 'outOfStock' | 'lowStock' | 'discontinued' | 'preOrder';
  };
  media: {
    images: { _type: 'image'; asset: { _type: 'reference'; _ref: string } }[];
  };
  description: string;
  specifications?: {
    material?: string;
    dimensions?: string;
    weight?: string;
    colors?: string[];
  };
  features?: string[];
  statusFlags: {
    isNew: boolean;
    isOnSale: boolean;
    isFeatured: boolean;
    promotionText?: string;
  };
  rating?: {
    average: number;
    count: number;
  };
  organization: {
    category: { _type: 'reference'; _ref: string };
    tags?: string[];
  };
}

// Only 2 test bed products
const sampleProducts: ProductData[] = [
  // Your existing bed products here...
  
  // ADD THESE 10 CHAIR PRODUCTS:
  {
    _type: 'product',
    basicInfo: {
      name: 'Modern Accent Chair - Velvet',
      slug: { _type: 'slug', current: 'modern-accent-chair-velvet' },
      sku: 'MKO-CH-101'
    },
    pricingStatus: {
      price: 299.99,
      originalPrice: 349.99,
      stock: 15,
      status: 'inStock'
    },
    media: {
      images: []
    },
    description: 'Elegant velvet accent chair with tapered legs and comfortable cushioning. Perfect for living rooms or bedrooms.',
    specifications: {
      material: 'Velvet upholstery, solid wood frame',
      dimensions: '65L x 70W x 85H cm',
      weight: '18 kg',
      colors: ['#800020', '#00008B', '#228B22'] // Burgundy, Navy Blue, Forest Green
    },
    features: [
      'Premium velvet fabric',
      'Tapered wooden legs',
      'High-density foam cushioning',
      'Easy to assemble'
    ],
    statusFlags: {
      isNew: true,
      isOnSale: true,
      isFeatured: true,
      promotionText: 'New Arrival'
    },
    rating: {
      average: 4.7,
      count: 23
    },
    organization: {
      category: { _type: 'reference', _ref: 'YOUR_CHAIRS_CATEGORY_ID' }, // Replace with actual chairs category ID
      tags: ['new', 'accent', 'living-room']
    }
  },
  {
    _type: 'product',
    basicInfo: {
      name: 'Ergonomic Office Chair - Executive',
      slug: { _type: 'slug', current: 'ergonomic-office-chair-executive' },
      sku: 'MKO-CH-102'
    },
    pricingStatus: {
      price: 449.99,
      originalPrice: 499.99,
      stock: 12,
      status: 'inStock'
    },
    media: {
      images: []
    },
    description: 'Premium executive office chair with lumbar support, adjustable height, and breathable mesh back.',
    specifications: {
      material: 'Mesh, leather, metal base',
      dimensions: '65L x 65W x 120H cm',
      weight: '25 kg',
      colors: ['#000000', '#808080', '#8B4513'] // Black, Gray, Brown
    },
    features: [
      'Adjustable lumbar support',
      'Breathable mesh back',
      '360-degree swivel',
      'Padded armrests',
      'Height adjustable'
    ],
    statusFlags: {
      isNew: false,
      isOnSale: true,
      isFeatured: true,
      promotionText: 'Best Seller'
    },
    rating: {
      average: 4.8,
      count: 67
    },
    organization: {
      category: { _type: 'reference', _ref: 'YOUR_CHAIRS_CATEGORY_ID' },
      tags: ['office', 'ergonomic', 'executive']
    }
  },
  {
    _type: 'product',
    basicInfo: {
      name: 'Mid-Century Modern Lounge Chair',
      slug: { _type: 'slug', current: 'mid-century-modern-lounge-chair' },
      sku: 'MKO-CH-103'
    },
    pricingStatus: {
      price: 599.99,
      stock: 8,
      status: 'inStock'
    },
    media: {
      images: []
    },
    description: 'Iconic mid-century modern design with walnut legs and premium fabric upholstery. Timeless elegance for any space.',
    specifications: {
      material: 'Premium fabric, solid walnut legs',
      dimensions: '75L x 80W x 80H cm',
      weight: '22 kg',
      colors: ['#F5F5DC', '#808080', '#000000'] // Beige, Gray, Black
    },
    features: [
      'Mid-century design',
      'Solid walnut legs',
      'Comfortable angled back',
      'Durable construction'
    ],
    statusFlags: {
      isNew: true,
      isOnSale: false,
      isFeatured: true
    },
    rating: {
      average: 4.9,
      count: 18
    },
    organization: {
      category: { _type: 'reference', _ref: 'YOUR_CHAIRS_CATEGORY_ID' },
      tags: ['new', 'mid-century', 'lounge']
    }
  },
  {
    _type: 'product',
    basicInfo: {
      name: 'Wingback Chair - Classic',
      slug: { _type: 'slug', current: 'wingback-chair-classic' },
      sku: 'MKO-CH-104'
    },
    pricingStatus: {
      price: 499.99,
      originalPrice: 599.99,
      stock: 6,
      status: 'inStock'
    },
    media: {
      images: []
    },
    description: 'Traditional wingback chair with high back and rolled arms. Perfect for reading nooks or formal living spaces.',
    specifications: {
      material: 'Linen blend, solid wood frame',
      dimensions: '85L x 90W x 110H cm',
      weight: '28 kg',
      colors: ['#F5F5DC', '#8B4513', '#800020'] // Beige, Brown, Burgundy
    },
    features: [
      'Classic wingback design',
      'High back support',
      'Rolled arms',
      'Durable linen blend fabric'
    ],
    statusFlags: {
      isNew: false,
      isOnSale: true,
      isFeatured: false
    },
    rating: {
      average: 4.6,
      count: 34
    },
    organization: {
      category: { _type: 'reference', _ref: 'YOUR_CHAIRS_CATEGORY_ID' },
      tags: ['classic', 'traditional', 'reading']
    }
  },
  {
    _type: 'product',
    basicInfo: {
      name: 'Modern Rocking Chair - Nursery',
      slug: { _type: 'slug', current: 'modern-rocking-chair-nursery' },
      sku: 'MKO-CH-105'
    },
    pricingStatus: {
      price: 349.99,
      stock: 10,
      status: 'inStock'
    },
    media: {
      images: []
    },
    description: 'Comfortable modern rocking chair perfect for nurseries, breastfeeding, or relaxing. Smooth rocking motion.',
    specifications: {
      material: 'Upholstered fabric, curved wood base',
      dimensions: '70L x 75W x 95H cm',
      weight: '20 kg',
      colors: ['#FFFFFF', '#F5F5DC', '#87CEEB'] // White, Beige, Light Blue
    },
    features: [
      'Smooth rocking motion',
      'Padded arms and seat',
      'Compact nursery size',
      'Stable curved base'
    ],
    statusFlags: {
      isNew: true,
      isOnSale: false,
      isFeatured: true,
      promotionText: 'Perfect for Nurseries'
    },
    rating: {
      average: 4.7,
      count: 42
    },
    organization: {
      category: { _type: 'reference', _ref: 'YOUR_CHAIRS_CATEGORY_ID' },
      tags: ['new', 'nursery', 'rocking']
    }
  },
  {
    _type: 'product',
    basicInfo: {
      name: 'Industrial Bar Stool - Adjustable',
      slug: { _type: 'slug', current: 'industrial-bar-stool-adjustable' },
      sku: 'MKO-CH-106'
    },
    pricingStatus: {
      price: 199.99,
      originalPrice: 249.99,
      stock: 20,
      status: 'inStock'
    },
    media: {
      images: []
    },
    description: 'Industrial-style bar stool with adjustable height and comfortable padded seat. Perfect for kitchen islands or home bars.',
    specifications: {
      material: 'Metal frame, faux leather seat',
      dimensions: '45L x 45W x 65-95H cm',
      weight: '12 kg',
      colors: ['#000000', '#808080', '#8B4513'] // Black, Gray, Brown
    },
    features: [
      'Adjustable height',
      'Padded faux leather seat',
      'Industrial metal frame',
      'Footrest bar',
      '360-degree swivel'
    ],
    statusFlags: {
      isNew: false,
      isOnSale: true,
      isFeatured: false
    },
    rating: {
      average: 4.5,
      count: 89
    },
    organization: {
      category: { _type: 'reference', _ref: 'YOUR_CHAIRS_CATEGORY_ID' },
      tags: ['bar', 'industrial', 'kitchen']
    }
  },
  {
    _type: 'product',
    basicInfo: {
      name: 'Scandinavian Dining Chair - Set of 2',
      slug: { _type: 'slug', current: 'scandinavian-dining-chair-set' },
      sku: 'MKO-CH-107'
    },
    pricingStatus: {
      price: 399.99,
      stock: 15,
      status: 'inStock'
    },
    media: {
      images: []
    },
    description: 'Minimalist Scandinavian dining chairs with curved backrest and comfortable seat. Sold as a set of 2.',
    specifications: {
      material: 'Solid beech wood, fabric seat',
      dimensions: '45L x 50W x 80H cm',
      weight: '15 kg (set of 2)',
      colors: ['#F5F5DC', '#FFFFFF', '#8B4513'] // Beige, White, Brown
    },
    features: [
      'Set of 2 chairs',
      'Solid beech wood construction',
      'Curved backrest for comfort',
      'Scandinavian minimalist design'
    ],
    statusFlags: {
      isNew: true,
      isOnSale: false,
      isFeatured: true
    },
    rating: {
      average: 4.6,
      count: 56
    },
    organization: {
      category: { _type: 'reference', _ref: 'YOUR_CHAIRS_CATEGORY_ID' },
      tags: ['new', 'dining', 'scandinavian']
    }
  },
  {
    _type: 'product',
    basicInfo: {
      name: 'Folding Chair - Portable',
      slug: { _type: 'slug', current: 'folding-chair-portable' },
      sku: 'MKO-CH-108'
    },
    pricingStatus: {
      price: 49.99,
      stock: 50,
      status: 'inStock'
    },
    media: {
      images: []
    },
    description: 'Lightweight and portable folding chair perfect for events, camping, or extra seating. Easy to store.',
    specifications: {
      material: 'Steel frame, plastic seat',
      dimensions: '45L x 45W x 80H cm (folded: 10cm)',
      weight: '3.5 kg',
      colors: ['#000000', '#FFFFFF', '#0000FF'] // Black, White, Blue
    },
    features: [
      'Lightweight and portable',
      'Easy fold mechanism',
      'Durable steel frame',
      'Stackable design'
    ],
    statusFlags: {
      isNew: false,
      isOnSale: false,
      isFeatured: false
    },
    rating: {
      average: 4.3,
      count: 124
    },
    organization: {
      category: { _type: 'reference', _ref: 'YOUR_CHAIRS_CATEGORY_ID' },
      tags: ['folding', 'portable', 'event']
    }
  },
  {
    _type: 'product',
    basicInfo: {
      name: 'Leather Club Chair - Executive',
      slug: { _type: 'slug', current: 'leather-club-chair-executive' },
      sku: 'MKO-CH-109'
    },
    pricingStatus: {
      price: 899.99,
      stock: 4,
      status: 'inStock'
    },
    media: {
      images: []
    },
    description: 'Premium executive leather club chair with deep seating and nailhead trim. Luxurious addition to any office or study.',
    specifications: {
      material: 'Genuine leather, solid wood frame',
      dimensions: '90L x 95W x 100H cm',
      weight: '35 kg',
      colors: ['#8B4513', '#000000', '#800020'] // Brown, Black, Burgundy
    },
    features: [
      'Genuine leather upholstery',
      'Deep comfortable seating',
      'Nailhead trim details',
      'Solid wood frame'
    ],
    statusFlags: {
      isNew: false,
      isOnSale: false,
      isFeatured: true
    },
    rating: {
      average: 4.9,
      count: 27
    },
    organization: {
      category: { _type: 'reference', _ref: 'YOUR_CHAIRS_CATEGORY_ID' },
      tags: ['premium', 'leather', 'executive']
    }
  },
  {
    _type: 'product',
    basicInfo: {
      name: 'Papasan Chair - Rattan',
      slug: { _type: 'slug', current: 'papasan-chair-rattan' },
      sku: 'MKO-CH-110'
    },
    pricingStatus: {
      price: 279.99,
      originalPrice: 329.99,
      stock: 7,
      status: 'inStock'
    },
    media: {
      images: []
    },
    description: 'Comfortable papasan chair with rattan frame and plush cushion. Perfect for relaxing and reading.',
    specifications: {
      material: 'Rattan frame, cotton cushion',
      dimensions: '100L x 100W x 90H cm',
      weight: '18 kg',
      colors: ['#D2B48C', '#F5F5DC', '#FFFFFF'] // Tan, Beige, White
    },
    features: [
      'Natural rattan frame',
      'Plush removable cushion',
      '360-degree swivel base',
      'Boho-chic style'
    ],
    statusFlags: {
      isNew: true,
      isOnSale: true,
      isFeatured: false
    },
    rating: {
      average: 4.7,
      count: 38
    },
    organization: {
      category: { _type: 'reference', _ref: 'YOUR_CHAIRS_CATEGORY_ID' },
      tags: ['new', 'boho', 'rattan']
    }
  }
];

// Import function
async function importProducts() {
  try {
    console.log('Starting test import of 2 bed products...');
    
    // Verify the category exists
    const category = await client.fetch(`*[_id == $id][0]`, { id: BEDS_CATEGORY_ID });
    if (!category) {
      console.error(`ERROR: Category with ID ${BEDS_CATEGORY_ID} not found!`);
      console.log('Please check your category ID and try again.');
      return;
    }
    
    console.log(`✓ Category found: ${category.name}`);
    console.log('Importing products...');
    
    // Create each product document
    for (const product of sampleProducts) {
      const result = await client.create(product);
      console.log(`✓ Product created: ${result.basicInfo.name}`);
    }
    
    console.log('✅ Success! products imported successfully!');
    console.log('You can now check them in your Sanity Studio.');
    
  } catch (error) {
    console.error('❌ Error importing products:', error);
  }
}

// Run the import
importProducts();
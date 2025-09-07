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
const BEDS_CATEGORY_ID = '12ead605-3024-4717-9e4f-7137c32909a2';

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

const sampleProducts: ProductData[] = [
  // ADD THESE 8 DECOR PRODUCTS:
  {
    _type: 'product',
    basicInfo: {
      name: 'Abstract Canvas Wall Art - Large',
      slug: { _type: 'slug', current: 'abstract-canvas-wall-art-large' },
      sku: 'MKO-DC-101'
    },
    pricingStatus: {
      price: 199.99,
      originalPrice: 249.99,
      stock: 15,
      status: 'inStock'
    },
    media: {
      images: []
    },
    description: 'Stunning abstract canvas wall art that adds modern elegance to any room. Hand-stretched canvas with vibrant colors.',
    specifications: {
      material: 'Canvas, wooden frame',
      dimensions: '120L x 80W x 4H cm',
      weight: '8 kg',
      colors: ['#FF6B6B', '#4ECDC4', '#45B7D1'] // Coral, Teal, Blue
    },
    features: [
      'Hand-stretched canvas',
      'Gallery wrapped edges',
      'Ready to hang',
      'Fade-resistant inks'
    ],
    statusFlags: {
      isNew: true,
      isOnSale: true,
      isFeatured: true,
      promotionText: 'Wall Art Collection'
    },
    rating: {
      average: 4.8,
      count: 42
    },
    organization: {
      category: { _type: 'reference', _ref: BEDS_CATEGORY_ID },
      tags: ['new', 'wall-art', 'modern']
    }
  },
  {
    _type: 'product',
    basicInfo: {
      name: 'Decorative Floor Lamp - Modern',
      slug: { _type: 'slug', current: 'decorative-floor-lamp-modern' },
      sku: 'MKO-DC-102'
    },
    pricingStatus: {
      price: 159.99,
      stock: 12,
      status: 'inStock'
    },
    media: {
      images: []
    },
    description: 'Elegant floor lamp with tripod base and fabric shade. Provides ambient lighting and serves as a decorative statement piece.',
    specifications: {
      material: 'Metal, fabric shade',
      dimensions: '160H x 45W cm',
      weight: '12 kg',
      colors: ['#000000', '#808080', '#8B4513'] // Black, Gray, Brown
    },
    features: [
      'Tripod stability base',
      'Adjustable height',
      'Energy efficient LED compatible',
      'Soft diffused lighting'
    ],
    statusFlags: {
      isNew: false,
      isOnSale: false,
      isFeatured: true
    },
    rating: {
      average: 4.7,
      count: 38
    },
    organization: {
      category: { _type: 'reference', _ref: BEDS_CATEGORY_ID },
      tags: ['lighting', 'floor-lamp', 'decorative']
    }
  },
  {
    _type: 'product',
    basicInfo: {
      name: 'Vintage Wall Clock - Roman Numerals',
      slug: { _type: 'slug', current: 'vintage-wall-clock-roman-numerals' },
      sku: 'MKO-DC-103'
    },
    pricingStatus: {
      price: 89.99,
      originalPrice: 109.99,
      stock: 20,
      status: 'inStock'
    },
    media: {
      images: []
    },
    description: 'Classic vintage wall clock with Roman numerals and silent movement. Adds timeless elegance to any wall.',
    specifications: {
      material: 'Wood, glass, quartz movement',
      dimensions: '40D x 5H cm',
      weight: '2.5 kg',
      colors: ['#8B4513', '#000000', '#F5F5DC'] // Brown, Black, Beige
    },
    features: [
      'Silent quartz movement',
      'Roman numeral design',
      'Battery operated (AA included)',
      'Easy to hang'
    ],
    statusFlags: {
      isNew: false,
      isOnSale: true,
      isFeatured: false
    },
    rating: {
      average: 4.6,
      count: 67
    },
    organization: {
      category: { _type: 'reference', _ref: BEDS_CATEGORY_ID },
      tags: ['vintage', 'clock', 'wall-decor']
    }
  },
  {
    _type: 'product',
    basicInfo: {
      name: 'Ceramic Table Vase Set - 3 Pieces',
      slug: { _type: 'slug', current: 'ceramic-table-vase-set-3-pieces' },
      sku: 'MKO-DC-104'
    },
    pricingStatus: {
      price: 79.99,
      stock: 25,
      status: 'inStock'
    },
    media: {
      images: []
    },
    description: 'Beautiful set of 3 ceramic vases in varying heights. Perfect for fresh or artificial flower arrangements.',
    specifications: {
      material: 'Ceramic, gloss finish',
      dimensions: 'Tall: 30H cm, Medium: 22H cm, Small: 15H cm',
      weight: '4 kg (set)',
      colors: ['#FFFFFF', '#F5F5DC', '#87CEEB'] // White, Beige, Light Blue
    },
    features: [
      'Set of 3 vases',
      'Handcrafted ceramic',
      'Gloss finish',
      'Waterproof'
    ],
    statusFlags: {
      isNew: true,
      isOnSale: false,
      isFeatured: true
    },
    rating: {
      average: 4.5,
      count: 29
    },
    organization: {
      category: { _type: 'reference', _ref: BEDS_CATEGORY_ID },
      tags: ['new', 'vases', 'ceramic']
    }
  },
  {
    _type: 'product',
    basicInfo: {
      name: 'Desk Lamp with USB Port - Adjustable',
      slug: { _type: 'slug', current: 'desk-lamp-usb-port-adjustable' },
      sku: 'MKO-DC-105'
    },
    pricingStatus: {
      price: 69.99,
      originalPrice: 89.99,
      stock: 18,
      status: 'inStock'
    },
    media: {
      images: []
    },
    description: 'Modern desk lamp with adjustable arm and built-in USB charging port. Perfect for home office or study desk.',
    specifications: {
      material: 'Metal, plastic, LED',
      dimensions: '45H x 35W x 15D cm',
      weight: '1.8 kg',
      colors: ['#000000', '#FFFFFF', '#808080'] // Black, White, Gray
    },
    features: [
      'Adjustable gooseneck design',
      'Built-in USB charging port',
      'Energy efficient LED',
      '3 brightness levels'
    ],
    statusFlags: {
      isNew: false,
      isOnSale: true,
      isFeatured: false
    },
    rating: {
      average: 4.4,
      count: 53
    },
    organization: {
      category: { _type: 'reference', _ref: BEDS_CATEGORY_ID },
      tags: ['desk-lamp', 'office', 'USB-charging']
    }
  },
  {
    _type: 'product',
    basicInfo: {
      name: 'Decorative Throw Pillow Set - Bohemian',
      slug: { _type: 'slug', current: 'decorative-throw-pillow-set-bohemian' },
      sku: 'MKO-DC-106'
    },
    pricingStatus: {
      price: 129.99,
      stock: 30,
      status: 'inStock'
    },
    media: {
      images: []
    },
    description: 'Set of 4 bohemian-style throw pillows with intricate patterns. Adds color and texture to sofas and beds.',
    specifications: {
      material: 'Cotton cover, polyester filling',
      dimensions: '18x18 inches (set of 4)',
      weight: '3 kg (set)',
      colors: ['#FF6B6B', '#4ECDC4', '#F7DC6F', '#BB8FCE'] // Coral, Teal, Yellow, Purple
    },
    features: [
      'Set of 4 pillows',
      'Removable covers',
      'Machine washable',
      'Hypoallergenic filling'
    ],
    statusFlags: {
      isNew: true,
      isOnSale: false,
      isFeatured: true
    },
    rating: {
      average: 4.7,
      count: 48
    },
    organization: {
      category: { _type: 'reference', _ref: BEDS_CATEGORY_ID },
      tags: ['new', 'pillows', 'bohemian']
    }
  },
  {
    _type: 'product',
    basicInfo: {
      name: 'Wall Shelf Set - Floating',
      slug: { _type: 'slug', current: 'wall-shelf-set-floating' },
      sku: 'MKO-DC-107'
    },
    pricingStatus: {
      price: 149.99,
      originalPrice: 179.99,
      stock: 14,
      status: 'inStock'
    },
    media: {
      images: []
    },
    description: 'Set of 3 floating wall shelves in varying lengths. Perfect for displaying books, plants, and decorative items.',
    specifications: {
      material: 'Solid wood, metal brackets',
      dimensions: 'Long: 90cm, Medium: 60cm, Short: 30cm',
      weight: '10 kg (set)',
      colors: ['#8B4513', '#000000', '#FFFFFF'] // Brown, Black, White
    },
    features: [
      'Set of 3 shelves',
      'Hidden mounting system',
      'Weight capacity: 15kg per shelf',
      'Easy installation'
    ],
    statusFlags: {
      isNew: false,
      isOnSale: true,
      isFeatured: false
    },
    rating: {
      average: 4.6,
      count: 37
    },
    organization: {
      category: { _type: 'reference', _ref: BEDS_CATEGORY_ID },
      tags: ['shelves', 'wall-storage', 'decorative']
    }
  },
  {
    _type: 'product',
    basicInfo: {
      name: 'Decorative Mirror - Sunburst Design',
      slug: { _type: 'slug', current: 'decorative-mirror-sunburst-design' },
      sku: 'MKO-DC-108'
    },
    pricingStatus: {
      price: 219.99,
      stock: 7,
      status: 'inStock'
    },
    media: {
      images: []
    },
    description: 'Stunning sunburst design mirror that adds glamour and light to any room. Creates the illusion of more space.',
    specifications: {
      material: 'Metal, glass mirror',
      dimensions: '80D x 5H cm',
      weight: '6.5 kg',
      colors: ['#FFD700', '#C0C0C0'] // Gold, Silver
    },
    features: [
      'Sunburst design',
      'High-quality mirror glass',
      'Secure hanging hardware',
      'Adds light and space'
    ],
    statusFlags: {
      isNew: true,
      isOnSale: false,
      isFeatured: true
    },
    rating: {
      average: 4.9,
      count: 23
    },
    organization: {
      category: { _type: 'reference', _ref: BEDS_CATEGORY_ID },
      tags: ['new', 'mirror', 'statement-piece']
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
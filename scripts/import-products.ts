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
const BEDS_CATEGORY_ID = '228ebc5e-e832-47bd-938d-dfc973cb03ba';

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
  // ADD THESE 8 BATHROOM PRODUCTS:
  {
    _type: 'product',
    basicInfo: {
      name: 'Rainfall Shower System - Premium',
      slug: { _type: 'slug', current: 'rainfall-shower-system-premium' },
      sku: 'MKO-BT-101'
    },
    pricingStatus: {
      price: 349.99,
      originalPrice: 399.99,
      stock: 15,
      status: 'inStock'
    },
    media: {
      images: []
    },
    description: 'Luxurious rainfall shower system with adjustable settings. Features multiple spray patterns, thermostatic control, and brushed nickel finish for a spa-like experience every day.',
    specifications: {
      material: 'Brass core with brushed nickel finish',
      dimensions: 'Showerhead: 30cm diameter, Arm: 25cm extension',
      weight: '5.2 kg',
      colors: ['#C0C0C0', '#000000'] // Silver, Black
    },
    features: [
      '8-inch rainfall showerhead',
      '5 spray settings',
      'Thermostatic temperature control',
      'Pressure balancing valve',
      'Easy installation system'
    ],
    statusFlags: {
      isNew: true,
      isOnSale: true,
      isFeatured: true,
      promotionText: 'Luxury Spa Experience'
    },
    rating: {
      average: 4.8,
      count: 67
    },
    organization: {
      category: { _type: 'reference', _ref: BEDS_CATEGORY_ID },
      tags: ['new', 'premium', 'shower']
    }
  },
  {
    _type: 'product',
    basicInfo: {
      name: 'Freestanding Soaking Bathtub - Modern',
      slug: { _type: 'slug', current: 'freestanding-soaking-bathtub-modern' },
      sku: 'MKO-BT-102'
    },
    pricingStatus: {
      price: 1899.99,
      stock: 4,
      status: 'inStock'
    },
    media: {
      images: []
    },
    description: 'Elegant freestanding soaking bathtub with sleek modern design. Deep soak depth provides ultimate relaxation, while the minimalist design complements any bathroom style.',
    specifications: {
      material: 'Acrylic with fiberglass reinforcement',
      dimensions: '170L x 80W x 65H cm',
      weight: '45 kg',
      colors: ['#FFFFFF', '#F5F5F5'] // White, Off-White
    },
    features: [
      'Deep soaking design (65cm depth)',
      'Non-slip bottom',
      'Quick-drain system',
      'UV-resistant finish',
      'Easy to clean surface'
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
      tags: ['new', 'bathtub', 'luxury']
    }
  },
  {
    _type: 'product',
    basicInfo: {
      name: 'Smart Shower Cabin - Steam & Hydro',
      slug: { _type: 'slug', current: 'smart-shower-cabin-steam-hydro' },
      sku: 'MKO-BT-103'
    },
    pricingStatus: {
      price: 4299.99,
      originalPrice: 4999.99,
      stock: 2,
      status: 'inStock'
    },
    media: {
      images: []
    },
    description: 'Advanced smart shower cabin with steam function, hydro massage, and digital controls. Transform your bathroom into a personal spa with multiple wellness programs.',
    specifications: {
      material: 'Tempered glass, stainless steel, acrylic',
      dimensions: '120L x 120W x 220H cm',
      weight: '180 kg',
      colors: ['#000000', '#C0C0C0'] // Black, Silver
    },
    features: [
      'Steam generator with aromatherapy',
      '6 hydro massage jets',
      'Digital control panel',
      'LED mood lighting',
      'FM radio and Bluetooth speakers',
      'Anti-fog system'
    ],
    statusFlags: {
      isNew: false,
      isOnSale: true,
      isFeatured: true,
      promotionText: 'Home Spa Solution'
    },
    rating: {
      average: 4.7,
      count: 18
    },
    organization: {
      category: { _type: 'reference', _ref: BEDS_CATEGORY_ID },
      tags: ['premium', 'smart', 'wellness']
    }
  },
  {
    _type: 'product',
    basicInfo: {
      name: 'Vessel Sink - Handcrafted Stone',
      slug: { _type: 'slug', current: 'vessel-sink-handcrafted-stone' },
      sku: 'MKO-BT-104'
    },
    pricingStatus: {
      price: 499.99,
      stock: 8,
      status: 'inStock'
    },
    media: {
      images: []
    },
    description: 'Beautiful handcrafted stone vessel sink with natural variations. Each piece is unique with organic patterns and smooth finish. Perfect for creating a focal point in any bathroom.',
    specifications: {
      material: 'Natural stone (marble composite)',
      dimensions: '50L x 40W x 15H cm',
      weight: '18 kg',
      colors: ['#D3D3D3', '#A9A9A9', '#808080'] // Light Gray, Gray, Dark Gray
    },
    features: [
      'Handcrafted unique pieces',
      'Natural stone variations',
      'Polished smooth finish',
      'Heat and stain resistant',
      'Compatible with most faucets'
    ],
    statusFlags: {
      isNew: true,
      isOnSale: false,
      isFeatured: false
    },
    rating: {
      average: 4.6,
      count: 42
    },
    organization: {
      category: { _type: 'reference', _ref: BEDS_CATEGORY_ID },
      tags: ['new', 'sink', 'handcrafted']
    }
  },
  {
    _type: 'product',
    basicInfo: {
      name: 'Wall-Mounted Vanity - Double Storage',
      slug: { _type: 'slug', current: 'wall-mounted-vanity-double-storage' },
      sku: 'MKO-BT-105'
    },
    pricingStatus: {
      price: 899.99,
      originalPrice: 1099.99,
      stock: 6,
      status: 'inStock'
    },
    media: {
      images: []
    },
    description: 'Modern wall-mounted vanity with ample storage and sleek design. Features soft-close drawers, integrated lighting, and durable waterproof finish. Creates spacious feel in any bathroom.',
    specifications: {
      material: 'Engineered wood with waterproof coating',
      dimensions: '120L x 50W x 60H cm',
      weight: '65 kg',
      colors: ['#FFFFFF', '#000000', '#8B4513'] // White, Black, Brown
    },
    features: [
      'Wall-mounted space-saving design',
      'Soft-close drawers and doors',
      'Integrated LED lighting',
      'Waterproof and humidity resistant',
      'Easy access storage',
      'Pre-drilled sink installation'
    ],
    statusFlags: {
      isNew: false,
      isOnSale: true,
      isFeatured: true
    },
    rating: {
      average: 4.5,
      count: 89
    },
    organization: {
      category: { _type: 'reference', _ref: BEDS_CATEGORY_ID },
      tags: ['vanity', 'storage', 'modern']
    }
  },
  {
    _type: 'product',
    basicInfo: {
      name: 'Digital Bidet Toilet Seat - Smart',
      slug: { _type: 'slug', current: 'digital-bidet-toilet-seat-smart' },
      sku: 'MKO-BT-106'
    },
    pricingStatus: {
      price: 599.99,
      stock: 12,
      status: 'inStock'
    },
    media: {
      images: []
    },
    description: 'Advanced smart bidet toilet seat with heated seating, warm water wash, and air drying. Features automatic opening, night light, and energy saving mode for modern bathroom comfort.',
    specifications: {
      material: 'PP plastic, stainless steel nozzles',
      dimensions: 'Standard toilet seat size',
      weight: '6.5 kg',
      colors: ['#FFFFFF', '#C0C0C0'] // White, Silver
    },
    features: [
      'Heated seat with temperature control',
      'Warm water wash with adjustable pressure',
      'Warm air drying',
      'Automatic opening and closing',
      'Energy saving mode',
      'Self-cleaning nozzles'
    ],
    statusFlags: {
      isNew: true,
      isOnSale: false,
      isFeatured: true
    },
    rating: {
      average: 4.8,
      count: 156
    },
    organization: {
      category: { _type: 'reference', _ref: BEDS_CATEGORY_ID },
      tags: ['new', 'smart', 'bidet']
    }
  },
  {
    _type: 'product',
    basicInfo: {
      name: 'Towel Warmer - Chromotherapy',
      slug: { _type: 'slug', current: 'towel-warmer-chromotherapy' },
      sku: 'MKO-BT-107'
    },
    pricingStatus: {
      price: 299.99,
      originalPrice: 349.99,
      stock: 10,
      status: 'inStock'
    },
    media: {
      images: []
    },
    description: 'Luxury towel warmer with chromotherapy lighting and quick heating. Multiple rack design warms towels, robes, and keeps bathroom cozy. LED color therapy adds spa-like ambiance.',
    specifications: {
      material: 'Stainless steel, tempered glass',
      dimensions: '60L x 25W x 110H cm',
      weight: '12 kg',
      colors: ['#C0C0C0', '#000000'] // Silver, Black
    },
    features: [
      'Rapid heating technology',
      '4 towel bars capacity',
      '7-color chromotherapy LED',
      'Timer and thermostat control',
      'Energy efficient operation',
      'Wall mounted or freestanding'
    ],
    statusFlags: {
      isNew: false,
      isOnSale: true,
      isFeatured: false
    },
    rating: {
      average: 4.4,
      count: 74
    },
    organization: {
      category: { _type: 'reference', _ref: BEDS_CATEGORY_ID },
      tags: ['heating', 'luxury', 'spa']
    }
  },
  {
    _type: 'product',
    basicInfo: {
      name: 'Modern Medicine Cabinet - LED Mirror',
      slug: { _type: 'slug', current: 'modern-medicine-cabinet-led-mirror' },
      sku: 'MKO-BT-108'
    },
    pricingStatus: {
      price: 399.99,
      stock: 15,
      status: 'inStock'
    },
    media: {
      images: []
    },
    description: 'Smart medicine cabinet with integrated LED mirror and touch control. Features anti-fog function, Bluetooth speakers, and ample storage. Modern design with practical functionality.',
    specifications: {
      material: 'Tempered glass, aluminum frame, LED',
      dimensions: '80L x 15W x 90H cm',
      weight: '22 kg',
      colors: ['#000000', '#C0C0C0'] // Black, Silver
    },
    features: [
      'Integrated LED lighting with dimmer',
      'Anti-fog function',
      'Bluetooth speakers',
      'Touch control operation',
      'Adjustable shelves',
      'Soft-close doors'
    ],
    statusFlags: {
      isNew: true,
      isOnSale: false,
      isFeatured: true
    },
    rating: {
      average: 4.6,
      count: 38
    },
    organization: {
      category: { _type: 'reference', _ref: BEDS_CATEGORY_ID },
      tags: ['new', 'storage', 'smart']
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
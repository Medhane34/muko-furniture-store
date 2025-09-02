// lib/mock/sofaProducts.ts
import { Product } from '@/types/product';

export const sofaProducts: Product[] = [
  {
    _id: "1",
    name: "Modern L-Shaped Sofa with Ottoman",
    description: "A spacious and stylish L-shaped sofa perfect for large living rooms and family movie nights.",
    price: 24500,
    originalPrice: 27900, // On Sale!
    imageUrl: "/shop/sofa/sofa-1.jpg",
    isNew: false,
    isOnSale: true,
    slug: "modern-l-shaped-sofa-ottoman",
    stock: 8,
    material: "Premium Fabric & Solid Wood",
    dimensions: "280cm x 180cm x 85cm",
    weight: "120 kg",
    colors: ["#5d4037", "#78909c", "#ffffff"], // Brown, Grey, White
    features: ["Modular Design", "Storage Ottoman", "Stain-Resistant Fabric"],
    // NEW DATA: Rating and Promotion
    rating: {
      average: 3,
      count: 142
    },
    promotionText: "Limited Offer",
    sku: "MKO-SF-L-001",
    isFeatured:true
  },
  {
    _id: "2",
    name: "Minimalist Scandinavian 2-Seater",
    description: "Elegant and compact two-seater sofa with clean lines, ideal for smaller spaces and apartments.",
    price: 12900,
    imageUrl: "/shop/sofa/sofa-2.jpg",
    isNew: true, // New Arrival!
    isOnSale: false,
    slug: "scandinavian-2-seater",
    stock: 15,
    material: "Bouclé Fabric & Beechwood",
    dimensions: "160cm x 90cm x 75cm",
    weight: "55 kg",
    colors: ["#f5f5f5", "#90a4ae"], // Light Beige, Blue Grey
    features: ["Bouclé Texture", "Tapered Wooden Legs", "Machine Washable Covers"],
    // NEW DATA: Rating
    rating: {
      average: 4.9,
      count: 89
    },
    sku: "MKO-SF-S-002",
    isFeatured:true
  },
  {
    _id: "3",
    name: "Classic Leather Chesterfield Sofa",
    description: "A timeless leather chesterfield sofa that adds a touch of luxury and sophistication to any room.",
    price: 38700,
    imageUrl: "/shop/sofa/sofa-3.jpg",
    isNew: false,
    isOnSale: false,
    slug: "classic-leather-chesterfield",
    stock: 3, // Low Stock
    material: "Full-Grain Aniline Leather",
    dimensions: "200cm x 95cm x 90cm",
    weight: "110 kg",
    colors: ["#3e2723", "#d84315"], // Dark Brown, Cognac
    features: ["Hand-Tufted Details", "Antique Brass Finish", "Reinforced Frame"],
    rating: {
      average: 4.8,
      count: 56
    },
    promotionText: "Exclusive", // Another type of promotion
    sku: "MKO-SF-C-003",
    isFeatured:true
  },
  {
    _id: "4",
    name: "Classic Leather Chesterfield Sofa",
    description: "A timeless leather chesterfield sofa that adds a touch of luxury and sophistication to any room.",
    price: 38700,
    imageUrl: "/shop/sofa/sofa-3.jpg",
    isNew: false,
    isOnSale: false,
    slug: "classic-leather-chesterfield",
    stock: 3, // Low Stock
    material: "Full-Grain Aniline Leather",
    dimensions: "200cm x 95cm x 90cm",
    weight: "110 kg",
    colors: ["#3e2723", "#d84315"], // Dark Brown, Cognac
    features: ["Hand-Tufted Details", "Antique Brass Finish", "Reinforced Frame"],
    rating: {
      average: 4.8,
      count: 56
    },
    promotionText: "Exclusive", // Another type of promotion
    sku: "MKO-SF-C-003",
    isFeatured:false 
  },
  {
    _id: "5",
    name: "Classic Leather Chesterfield Sofa",
    description: "A timeless leather chesterfield sofa that adds a touch of luxury and sophistication to any room.",
    price: 38700,
    imageUrl: "/shop/sofa/sofa-3.jpg",
    isNew: false,
    isOnSale: false,
    slug: "classic-leather-chesterfield",
    stock: 3, // Low Stock
    material: "Full-Grain Aniline Leather",
    dimensions: "200cm x 95cm x 90cm",
    weight: "110 kg",
    colors: ["#3e2723", "#d84315"], // Dark Brown, Cognac
    features: ["Hand-Tufted Details", "Antique Brass Finish", "Reinforced Frame"],
    rating: {
      average: 4.8,
      count: 56
    },
    promotionText: "Exclusive", // Another type of promotion
    sku: "MKO-SF-C-003",
    isFeatured:false
  },
  {
    _id: "6",
    name: "Classic Leather Chesterfield Sofa",
    description: "A timeless leather chesterfield sofa that adds a touch of luxury and sophistication to any room.",
    price: 38700,
    imageUrl: "/shop/sofa/sofa-3.jpg",
    isNew: false,
    isOnSale: false,
    slug: "classic-leather-chesterfield",
    stock: 3, // Low Stock
    material: "Full-Grain Aniline Leather",
    dimensions: "200cm x 95cm x 90cm",
    weight: "110 kg",
    colors: ["#3e2723", "#d84315"], // Dark Brown, Cognac
    features: ["Hand-Tufted Details", "Antique Brass Finish", "Reinforced Frame"],
    rating: {
      average: 4.8,
      count: 56
    },
    promotionText: "Exclusive", // Another type of promotion
    sku: "MKO-SF-C-003",
    isFeatured:true
  },
  // Add more products with different combinations of isNew, isOnSale, rating, etc.
];
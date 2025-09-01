import { Product } from '@/types/product';

export const sofaProducts: Product[] = [
  {
    _id: "1",
    name: "Modern L-Shaped Sofa",
    description: "A stylish, comfortable L-shaped sofa for your living room.",
    price: 12000,
    imageUrl: "/shop/sofa/sofa-1.jpg",
    isNew: true,
    isOnSale: false,
    slug: "modern-l-shaped-sofa",
    stock: 10,
    material: "Fabric",
    dimensions: "200x150x80 cm",
    weight: "50 kg",
    colors: ["Gray", "Black", "Blue", "Brown"],
    features: ["Comfortable cushioning", "Durable material", "Easy to clean"],
    reviews: [
      { rating: 5, comment: "Great sofa!", user: "John Doe" },
      { rating: 4, comment: "Very comfortable", user: "Jane Smith" },
    ],
    sku: "MKO-SF-220-BL",

  },
  // Add more products with new fields
];
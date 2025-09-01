import { Product } from '@/types/product';

export const chairProducts: Product[] = [
  {
    _id: "1",
    name: "Bar Stool",
    description: "Sleek bar stool for modern kitchens.",
    price: 8000,
    imageUrl: "/images/chair1.jpg",
    isNew: true,
    isOnSale: false,
    slug: "bar-stool",
    stock: 15,
    material: "Wood",
    dimensions: "50x50x100 cm",
    weight: "10 kg",
    colors: ["Gray", "Black", "Blue", "Brown"],
    features: ["Adjustable height", "Comfortable seat", "Sturdy base"],
    reviews: [
      { rating: 4, comment: "Good quality", user: "Alice" },
    ],
  },
  // Add more products with new fields
];
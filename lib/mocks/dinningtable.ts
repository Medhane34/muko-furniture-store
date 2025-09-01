import { Product } from '@/types/product';

export const diningTableProducts: Product[] = [
  {
    _id: "1",
    name: "Elegant Dining Table",
    description: "An elegant wooden dining table",
    price: 499.99,
    imageUrl: "/images/table1.jpg",
    isNew: true,
    isOnSale: false,
    slug: "elegant-dining-table",
    stock: 5,
    material: "Oak Wood",
    dimensions: "120x80 cm",
    weight: "40 kg",
    colors: ["Gray", "Black", "Blue", "Brown"],
    features: ["Extendable", "Scratch-resistant", "Easy to clean"],
    reviews: [
      { rating: 4, comment: "Beautiful table", user: "Alice" },
    ],
  },
  // Add more dining tables with new fields
];
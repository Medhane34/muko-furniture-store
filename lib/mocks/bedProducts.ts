import { Product } from '@/types/product';

export const bedProducts: Product[] = [
  {
    _id: "1",
    name: "Comfy Bed",
    description: "A comfortable bed for your bedroom",
    price: 799.99,
    imageUrl: "/images/bed1.jpg",
    isNew: true,
    isOnSale: false,
    slug: "comfy-bed",
    stock: 8,
    material: "Wood",
    dimensions: "180x200 cm",
    weight: "80 kg",
    colors: ["Gray", "Black", "Blue", "Brown"],
    features: ["Orthopedic mattress", "Sturdy frame", "Easy assembly"],
    reviews: [
      { rating: 5, comment: "Best bed ever!", user: "Bob" },
    ],
  },
  // Add more beds with new fields
];
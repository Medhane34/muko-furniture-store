export interface SofaProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isNew?: boolean;
  isOnSale?: boolean;
  slug: string;
}

export const sofaProducts: SofaProduct[] = [
  {
    _id: "1",
    name: "Modern L-Shaped Sofa",
    description: "A stylish, comfortable L-shaped sofa for your living room.",
    price: 12000,
    imageUrl: "/shop/sofa/sofa-1.jpg",
    isNew: true,
    slug: "modern-l-shaped-sofa",
  },
  {
    _id: "2",
    name: "Classic 3-Seater Sofa",
    description: "A timeless classic with plush cushions and sturdy frame.",
    price: 9500,
    imageUrl: "/shop/sofa/sofa-2.jpg",
    isOnSale: true,
    slug: "classic-3-seater-sofa",
  },
  {
    _id: "3",
    name: "Leather Recliner Sofa",
    description: "Luxurious leather recliner for ultimate comfort.",
    price: 15000,
    imageUrl: "/shop/sofa/sofa-3.jpg",
    slug: "leather-recliner-sofa",
  },
  {
    _id: "4",
    name: "Fabric Sectional Sofa",
    description: "Versatile sectional sofa in soft fabric.",
    price: 11000,
    imageUrl: "/shop/sofa/sofa-4.jpg",
    isNew: true,
    slug: "fabric-sectional-sofa",
  },
  {
    _id: "5",
    name: "Velvet Chesterfield Sofa",
    description: "Elegant velvet chesterfield for a sophisticated look.",
    price: 13000,
    imageUrl: "/shop/sofa/sofa-5.jpg",
    isOnSale: true,
    slug: "velvet-chesterfield-sofa",
  },
  {
    _id: "6",
    name: "Minimalist 2-Seater Sofa",
    description: "Simple and modern 2-seater sofa.",
    price: 8000,
    imageUrl: "/shop/sofa/sofa-1.jpg",
    slug: "minimalist-2-seater-sofa",
  },
  {
    _id: "7",
    name: "Minimalist 3-Seater Sofa",
    description: "Simple and modern 2-seater sofa.",
    price: 8000,
    imageUrl: "/shop/sofa/sofa-1.jpg",
    slug: "minimalist-2-seater-sofa",
  },
  {
    _id: "8",
    name: "Minimalist 2-Seater Sofa",
    description: "Simple and modern 2-seater sofa.",
    price: 8000,
    imageUrl: "/shop/sofa/sofa-1.jpg",
    slug: "minimalist-2-seater-sofa",
  },
  {
    _id: "9",
    name: "Minimalist 2-Seater Sofa",
    description: "Simple and modern 2-seater sofa.",
    price: 8000,
    imageUrl: "/shop/sofa/sofa-1.jpg",
    slug: "minimalist-2-seater-sofa",
  },
  {
    _id: "10",
    name: "Minimalist 2-Seater Sofa",
    description: "Simple and modern 2-seater sofa.",
    price: 8000,
    imageUrl: "/shop/sofa/sofa-1.jpg",
    slug: "minimalist-2-seater-sofa",
  },
  {
    _id: "11",
    name: "Minimalist 2-Seater Sofa",
    description: "Simple and modern 2-seater sofa.",
    price: 8000,
    imageUrl: "/shop/sofa/sofa-1.jpg",
    slug: "minimalist-2-seater-sofa",
  },
  {
    _id: "12",
    name: "Minimalist 2-Seater Sofa",
    description: "Simple and modern 2-seater sofa.",
    price: 8000,
    imageUrl: "/shop/sofa/sofa-1.jpg",
    slug: "minimalist-2-seater-sofa",
  },
  {
    _id: "13",
    name: "Minimalist 2-Seater Sofa",
    description: "Simple and modern 2-seater sofa.",
    price: 8000,
    imageUrl: "/shop/sofa/sofa-1.jpg",
    slug: "minimalist-2-seater-sofa",
  },
  {
    _id: "14",
    name: "Minimalist 2-Seater Sofa",
    description: "Simple and modern 2-seater sofa.",
    price: 8000,
    imageUrl: "/shop/sofa/sofa-1.jpg",
    slug: "minimalist-2-seater-sofa",
  },
  {
    _id: "15",
    name: "Minimalist 2-Seater Sofa",
    description: "Simple and modern 2-seater sofa.",
    price: 8000,
    imageUrl: "/shop/sofa/sofa-1.jpg",
    slug: "minimalist-2-seater-sofa",
  },
  {
    _id: "16",
    name: "Minimalist 2-Seater Sofa",
    description: "Simple and modern 2-seater sofa.",
    price: 8000,
    imageUrl: "/shop/sofa/sofa-1.jpg",
    slug: "minimalist-2-seater-sofa",
  },
  // Add more if needed for testing
];
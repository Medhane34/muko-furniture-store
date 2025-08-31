export interface ChairProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isNew?: boolean;
  isOnSale?: boolean;
  slug: string;
}

export const chairProducts: ChairProduct[] = [
  {
    _id: "1",
    name: "Bar Stool",
    description: "Sleek bar stool for modern kitchens.",
    price: 8000,
    imageUrl:"/chairs/chair-1.jpg",
    isNew: true,
    slug: "bar-stool",
  },
  {
    _id: "2",
    name: "Dining Chair",
    description: "Comfortable dining chair with cushioned seat.",
    price: 6000,
    imageUrl: "/chairs/chair-6.jpg",
    isOnSale: true,
    slug: "dining-chair",
  },
  {
    _id: "3",
    name: "Office Chair",
    description: "Ergonomic office chair with adjustable height.",
    price: 10000,
    imageUrl: "/chairs/chair-2.jpg",
    slug: "office-chair",
  },
  {
    _id: "4",
    name: "Accent Chair",
    description: "Stylish accent chair for living rooms.",
    price: 9000,
    imageUrl: "/chairs/chair-5.jpg",
    isNew: true,
    slug: "accent-chair",
  },
  {
    _id: "5",
    name: "Rocking Chair",
    description: "Traditional rocking chair for relaxation.",
    price: 7000,
    imageUrl: "/chairs/chair-5.jpg",
    slug: "rocking-chair",
  },
  {
    _id: "6",
    name: "Folding Chair",
    description: "Portable folding chair for events.",
    price: 4000,
    imageUrl: "/chairs/chair-6.jpg",
    isOnSale: true,
    slug: "folding-chair",
  },
  {
    _id: "7",
    name: "Armchair",
    description: "Cozy armchair for reading.",
    price: 11000,
    imageUrl: "/chairs/chair-2.jpg",
    slug: "armchair",
  },
  {
    _id: "8",
    name: "Swivel Chair",
    description: "Swivel chair with wheels for mobility.",
    price: 9500,
    imageUrl: "/chairs/chair-3.jpg",
    isNew: true,
    slug: "swivel-chair",
  },
  {
    _id: "9",
    name: "Lounge Chair",
    description: "Relaxing lounge chair for outdoor use.",
    price: 12000,
    imageUrl: "/chairs/chair-1.jpg",
    slug: "lounge-chair",
  },
  {
    _id: "10",
    name: "Bean Bag Chair",
    description: "Casual bean bag chair for kids.",
    price: 5000,
    imageUrl: "/chairs/chair-4.jpg",
    isOnSale: true,
    slug: "bean-bag-chair",
  },
  {
    _id: "11",
    name: "High Chair",
    description: "Baby high chair for feeding.",
    price: 7000,
    imageUrl: "/chairs/chair-5.jpg",
    slug: "high-chair",
  },
  {
    _id: "12",
    name: "Gaming Chair",
    description: "Ergonomic gaming chair with RGB lights.",
    price: 15000,
    imageUrl: "/chairs/chair-6.jpg",
    isNew: true,
    slug: "gaming-chair",
  },
  // Add more if needed for 4-5 rows
];
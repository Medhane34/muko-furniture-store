// config/navigation.ts

export interface NavigationItem {
  [x: string]: any;
  label: string;
  href: string;
  subCategories?: SubCategory[];
  featured?: FeaturedProduct[];
  promo?: PromoContent;
}

export interface SubCategory {
  label: string;
  href: string;
  description?: string;
}

export interface FeaturedProduct {
  name: string;
  href: string;
  imageSrc: string;
  price: string;
  oldPrice?: string; // For showing a discount
}

export interface PromoContent {
  imageSrc: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

// Main Navigation Configuration
export const navigationConfig: NavigationItem[] = [
  {
    label: "Living Room",
    href: "/collections/living-room",
    subCategories: [
      { label: "All Living Room", href: "/collections/living-room" },
      { label: "Sofas & Loveseats", href: "/collections/sofas-loveseats" },
      { label: "Sectionals", href: "/collections/sectionals" },
      { label: "Recliners", href: "/collections/recliners" },
      { label: "Accent Chairs", href: "/collections/accent-chairs" },
      { label: "Coffee Tables", href: "/collections/coffee-tables" },
      { label: "End Tables", href: "/collections/end-tables" },
      { label: "Console Tables", href: "/collections/console-tables" },
      { label: "TV Stands", href: "/collections/tv-stands" },
      { label: "Bookcases", href: "/collections/bookcases" },
    ],
    featured: [
      {
        name: "Addis Ababa Sectional",
        href: "/product/addis-ababa-sectional",
        imageSrc: "/images/featured/featured-sofa-1.jpg",
        price: "ETB 12,499",
        oldPrice: "ETB 14,999",
      },
      {
        name: "Modern Leather Loveseat",
        href: "/product/modern-leather-loveseat",
        imageSrc: "/images/featured/featured-sofa-2.jpg",
        price: "ETB 8,900",
      },
    ],
    promo: {
      imageSrc: "/images/promo/living-room-set.jpg",
      title: "Create Your Perfect Space",
      description: "Explore our curated living room sets and save up to 20%.",
      ctaText: "Shop Living Room Sets",
      ctaLink: "/collections/living-room-sets",
    },
  },
  {
    label: "Bedroom",
    href: "/collections/bedroom",
    subCategories: [
      { label: "All Bedroom", href: "/collections/bedroom" },
      { label: "Beds & Frames", href: "/collections/beds-frames" },
      { label: "Dressers", href: "/collections/dressers" },
      { label: "Nightstands", href: "/collections/nightstands" },
      { label: "Chests", href: "/collections/chests" },
      { label: "Bunk Beds", href: "/collections/bunk-beds" },
      { label: "Mattresses", href: "/collections/mattresses" },
    ],
    featured: [
      {
        name: "King Size Platform Bed",
        href: "/product/king-platform-bed",
        imageSrc: "/images/featured/featured-bed-1.jpg",
        price: "ETB 9,999",
      },
      {
        name: "5-Drawer Double Dresser",
        href: "/product/5-drawer-dresser",
        imageSrc: "/images/featured/featured-dresser-1.jpg",
        price: "ETB 7,200",
      },
    ],
    promo: {
      imageSrc: "/images/promo/bedroom-set.jpg",
      title: "Restful Nights",
      description: "Complete your sanctuary with a matched bedroom set.",
      ctaText: "Shop Bedroom Sets",
      ctaLink: "/collections/bedroom-sets",
    },
  },
  {
    label: "Dining & Kitchen",
    href: "/collections/dining-kitchen",
    subCategories: [
      { label: "All Dining & Kitchen", href: "/collections/dining-kitchen" },
      { label: "Dining Tables", href: "/collections/dining-tables" },
      { label: "Dining Chairs", href: "/collections/dining-chairs" },
      { label: "Bar Stools", href: "/collections/bar-stools" },
      { label: "Benches", href: "/collections/benches" },
      { label: "Buffets & Sideboards", href: "/collections/buffets-sideboards" },
      { label: "China Cabinets", href: "/collections/china-cabinets" },
    ],
    // ... (featured and promo can be added here) ...
  },
  {
    label: "Home Office",
    href: "/collections/home-office",
    subCategories: [
      { label: "All Home Office", href: "/collections/home-office" },
      { label: "Desks", href: "/collections/desks" },
      { label: "Office Chairs", href: "/collections/office-chairs" },
      { label: "Filing Cabinets", href: "/collections/filing-cabinets" },
      { label: "Bookcases", href: "/collections/office-bookcases" },
    ],
    // ... (featured and promo can be added here) ...
  },
  {
    label: "Outdoor",
    href: "/collections/outdoor",
    subCategories: [
      { label: "All Outdoor", href: "/collections/outdoor" },
      { label: "Patio Sets", href: "/collections/patio-sets" },
      { label: "Lounge Chairs", href: "/collections/lounge-chairs" },
      { label: "Dining Tables", href: "/collections/outdoor-dining-tables" },
      { label: "Side Tables", href: "/collections/outdoor-side-tables" },
      { label: "Umbrellas", href: "/collections/umbrellas" },
    ],
    // ... (featured and promo can be added here) ...
  },
  {
    label: "Storage",
    href: "/collections/storage",
    subCategories: [
      { label: "All Storage", href: "/collections/storage" },
      { label: "Entryway Benches", href: "/collections/entryway-benches" },
      { label: "Coat Racks", href: "/collections/coat-racks" },
      { label: "Shoe Racks", href: "/collections/shoe-racks" },
      { label: "Storage Cabinets", href: "/collections/storage-cabinets" },
      { label: "Shelving Units", href: "/collections/shelving-units" },
    ],
    // ... (featured and promo can be added here) ...
  },
  {
    label: "Decor",
    href: "/collections/decor",
    subCategories: [
      { label: "All Decor", href: "/collections/decor" },
      { label: "Rugs", href: "/collections/rugs" },
      { label: "Mirrors", href: "/collections/mirrors" },
      { label: "Lighting", href: "/collections/lighting" },
      { label: "Wall Art", href: "/collections/wall-art" },
    ],
    // ... (featured and promo can be added here) ...
  },
  // Simple link items (no mega menu)
 /*  {
    label: "Sale",
    href: "/sale",
  },
  {
    label: "Contact",
    href: "/contact",
  }, */
];

// config/navigation.ts (add this to your existing file)

// Mobile-specific navigation configuration
export const mobileNavigationConfig = [
  {
    key: "new",
    label: "New",
    href: "#",
    children: [
      { key: "new-all", href: "#", label: "Shop All New Arrivals" },
    ]
  },
  {
    key: "sale",
    label: "Sale",
    href: "#",
    children: [
      { key: "sale-all", href: "#", label: "Shop All Sales" },
      { key: "clearance", href: "#", label: "Clearance: Up to 40% off" },
    ]
  },
  {
    key: "storage",
    label: "Storage",
    href: "#",
    children: [
      { key: "storage-all", href: "#", label: "All Storage" },
      { key: "cabinets", href: "#", label: "Storage Cabinets" },
      { key: "shelves", href: "#", label: "Shelving Units" },
    ]
  },
  {
    key: "tables",
    label: "Tables",
    href: "#",
    children: [
      { key: "tables-all", href: "#", label: "All Tables" },
      { key: "dining-tables", href: "#", label: "Dining Tables" },
      { key: "coffee-tables", href: "#", label: "Coffee Tables" },
    ]
  },
  {
    key: "chairs",
    label: "Chairs",
    href: "#",
    children: [
      { key: "chairs-all", href: "#", label: "All Chairs" },
      { key: "dining-chairs", href: "#", label: "Dining Chairs" },
      { key: "accent-chairs", href: "#", label: "Accent Chairs" },
    ]
  },
  {
    key: "sofas",
    label: "Sofas",
    href: "#",
    children: [
      { key: "sofas-all", href: "#", label: "All Sofas" },
      { key: "sectionals", href: "#", label: "Sectionals" },
      { key: "loveseats", href: "#", label: "Loveseats" },
    ]
  },
  {
    key: "smart-furniture",
    label: "Smart Furniture",
    href: "#",
    children: [
      { key: "smart-all", href: "#", label: "All Smart Furniture" },
    ]
  },
  {
    key: "bedroom",
    label: "Bedroom",
    href: "#",
    children: [
      { key: "bedroom-all", href: "#", label: "All Bedroom" },
      { key: "beds", href: "#", label: "Beds & Frames" },
      { key: "dressers", href: "#", label: "Dressers" },
    ]
  },
  {
    key: "outdoor",
    label: "Outdoor",
    href: "#",
    children: [
      { key: "outdoor-all", href: "#", label: "All Outdoor" },
      { key: "patio-sets", href: "#", label: "Patio Sets" },
    ]
  },
  {
    key: "furniture-sets",
    label: "Furniture Sets",
    href: "#",
    children: [
      { key: "sets-all", href: "#", label: "All Furniture Sets" },
    ]
  },
  {
    key: "decoration-inspiration",
    label: "Decoration Inspiration",
    href: "#",
    children: [
      { key: "inspiration-all", href: "#", label: "All Inspiration" },
    ]
  },
];
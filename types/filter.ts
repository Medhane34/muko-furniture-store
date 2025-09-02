export interface FilterState {
  isNew: boolean;
  isOnSale: boolean;
  // Phase 1: Price Range
  priceRange: [number, number]; // Tuple representing [minPrice, maxPrice]
  colors: string[]; // Array of selected color names, e.g., ['Brown', 'Gray']

} 

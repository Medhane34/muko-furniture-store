import { ProductGrid, SortOption } from "@/components/organisms";
import { sofaProducts, SofaProduct } from "@/lib/mocks/sofaProducts";
import { FilterState } from "@/components/molecules";

export default function SofaProductsWrapper({ sortOption, visibleProducts, filters }: { sortOption: SortOption; visibleProducts: number; filters: FilterState }) {
  console.log("SofaProductsWrapper sofaProducts:", sofaProducts); // Debug: Log entire array

  // Filter products first
  const filteredProducts: SofaProduct[] = sofaProducts.filter(product => {
    if (!product) {
      console.warn("SofaProductsWrapper: Found undefined/null product in sofaProducts");
      return false;
    }
    if (product.isNew === undefined || product.isOnSale === undefined) {
      console.warn("SofaProductsWrapper: Invalid product, missing isNew or isOnSale:", product);
      return false;
    }
    return (
      (!filters.isNew || product.isNew === true) &&
      (!filters.isOnSale || product.isOnSale === true)
    );
  });

  // Sort filtered products
  const sortedProducts: SofaProduct[] = [...filteredProducts].sort((a, b) => {
    try {
      switch (sortOption) {
        case 'price-asc':
          return (a.price || 0) - (b.price || 0);
        case 'price-desc':
          return (b.price || 0) - (a.price || 0);
        case 'name-asc':
          return (a.name || '').localeCompare(b.name || '');
        case 'name-desc':
          return (b.name || '').localeCompare(a.name || '');
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'on-sale':
          return (b.isOnSale ? 1 : 0) - (a.isOnSale ? 1 : 0);
        default:
          return 0;
      }
    } catch (error) {
      console.error("Sorting error in SofaProductsWrapper:", error); // Debug
      return 0;
    }
  });

  // Slice for visible products
  const products = sortedProducts.slice(0, visibleProducts);
  console.log("SofaProductsWrapper filters:", filters); // Debug
  console.log("SofaProductsWrapper visibleProducts:", visibleProducts); // Debug
  console.log("SofaProductsWrapper filteredProducts count:", filteredProducts.length); // Debug
  console.log("SofaProductsWrapper sortedProducts:", products.map(p => p._id)); // Debug
  return <ProductGrid products={products} sortOption={sortOption} columns={3} />;
}
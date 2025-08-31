import { ProductGrid, SortOption } from "@/components/organisms/ProductGrid";
import { sofaProducts, SofaProduct } from "@/lib/mocks/sofaProducts";

export default function SofaProductsWrapper({ sortOption, visibleProducts }: { sortOption: SortOption; visibleProducts: number }) {
  // In the future, replace with server-side fetching in a Server Component
  const sortedProducts: SofaProduct[] = [...sofaProducts].sort((a, b) => {
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

  const products = sortedProducts.slice(0, visibleProducts);
  console.log("SofaProductsWrapper visibleProducts:", visibleProducts); // Debug
  console.log("SofaProductsWrapper sortedProducts:", products.map(p => p._id)); // Debug
  return <ProductGrid products={products} sortOption={sortOption} columns={3} />;
}
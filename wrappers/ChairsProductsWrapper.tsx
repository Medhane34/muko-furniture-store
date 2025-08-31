import { ProductGrid, SortOption } from "@/components/organisms/ProductGrid";
import { chairProducts, ChairProduct } from "@/lib/mocks/chairProducts";

export default function ChairsProductsWrapper({ sortOption }: { sortOption: SortOption }) {
  // In the future, replace with server-side fetching in a Server Component
  const products: ChairProduct[] = chairProducts;
  console.log("ChairsProductsWrapper sortOption:", sortOption); // Debug
  return <ProductGrid products={products} sortOption={sortOption} columns={4} rows={3} />;
}
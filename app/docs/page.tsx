'use client';

import { title } from "@/components/primitives";
import { SofaProductsWrapper, ChairsProductsWrapper } from "@/wrappers";
import { SortControls, SortOption } from "@/components/atoms/SortControls";
import { useState } from "react";

export default function DocsPage() {
  const [sofaSort, setSofaSort] = useState<SortOption>('price-asc');
  const [chairSort, setChairSort] = useState<SortOption>('price-asc');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className={title()}>Docs</h1>
      <h2 className="font-sans text-heading mt-8">Sofas</h2>
      <SortControls sortOption={sofaSort} onSortChange={setSofaSort} className="mb-6" />
      <SofaProductsWrapper sortOption={sofaSort} />
      <h2 className="font-sans text-heading mt-8">Chairs</h2>
      <SortControls sortOption={chairSort} onSortChange={setChairSort} className="mb-6" />
    </div>
  );
}
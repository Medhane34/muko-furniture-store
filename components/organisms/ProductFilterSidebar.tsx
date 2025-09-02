'use client';

import { Slider } from "@heroui/slider";
import { Checkbox } from "@heroui/checkbox";
import { useEffect, useState } from "react";
import { FilterState } from '@/types/filter';
import { colorMap } from '@/lib/colors';

interface ProductFilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (newFilters: FilterState) => void;
  minPrice: number;
  maxPrice: number;
  allColorNames: string[]; // New prop: array of available color names
}

export default function ProductFilterSidebar({ 
  filters, 
  onFiltersChange, 
  minPrice, 
  maxPrice,
  allColorNames 
}: ProductFilterSidebarProps) {
  const [sliderValue, setSliderValue] = useState<[number, number]>([minPrice, maxPrice]);

  useEffect(() => {
    setSliderValue(filters.priceRange);
  }, [filters.priceRange, minPrice, maxPrice]);

  const handleSliderChange = (value: number | number[]) => {
    const newRange = value as number[];
    setSliderValue([newRange[0], newRange[1]]);
    onFiltersChange({
      ...filters,
      priceRange: [newRange[0], newRange[1]],
    });
  };

  const handleCheckboxChange = (key: keyof FilterState, value?: string) => {
    if (key === 'colors' && value) {
      // Special handling for colors array
      const newColors = filters.colors.includes(value)
        ? filters.colors.filter(c => c !== value)
        : [...filters.colors, value];
      
      onFiltersChange({
        ...filters,
        colors: newColors,
      });
    } else {
      // Standard boolean toggling for other filters
      onFiltersChange({
        ...filters,
        [key]: !filters[key],
      });
    }
  };

  const formatPrice = (value: number) => `ETB ${value.toLocaleString()}`;

  return (
    <aside className="w-64 space-y-8">
      {/* Price Range Filter */}
      <div className="space-y-4">
        <h3 className="font-sans text-subheading font-semibold">Price Range</h3>
        <Slider
          label="Select a price range"
          size="sm"
          minValue={minPrice}
          maxValue={maxPrice}
          step={100}
          value={sliderValue}
          onChange={(value) => {
            const newRange = value as number[];
            setSliderValue([newRange[0], newRange[1]]);
          }} // Updates the UI while sliding
          onChangeEnd={handleSliderChange}
          formatOptions={{ style: "currency", currency: "ETB" }}
          className="max-w-md"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>{formatPrice(sliderValue[0])}</span>
          <span>{formatPrice(sliderValue[1])}</span>
        </div>
      </div>

      {/* Status Filters */}
      <div className="space-y-3">
        <Checkbox 
          isSelected={filters.isNew} 
          onValueChange={() => handleCheckboxChange('isNew')}
        >
          New Arrivals
        </Checkbox>
        <Checkbox 
          isSelected={filters.isOnSale} 
          onValueChange={() => handleCheckboxChange('isOnSale')}
        >
          On Sale
        </Checkbox>
      </div>

      {/* Color Filter - NEW SECTION */}
      <div className="space-y-3">
        <h3 className="font-sans text-subheading font-semibold">Color</h3>
        <div className="space-y-2">
          {allColorNames.map((colorName) => {
            const hexCode = colorMap[colorName];
            const isSelected = filters.colors.includes(colorName);
            
            return (
              <Checkbox
                key={colorName}
                isSelected={isSelected}
                onValueChange={() => handleCheckboxChange('colors', colorName)}
                classNames={{
                  base: "w-full max-w-full",
                  label: "w-full flex items-center gap-3",
                }}
              >
                <div className="flex items-center gap-3 w-full">
                  <span 
                    className="w-5 h-5 rounded-full border border-gray-300 shadow-sm"
                    style={{ backgroundColor: hexCode }}
                    aria-hidden="true"
                  />
                  <span className="font-sans text-body text-gray-900 dark:text-gray-100 capitalize">
                    {colorName.toLowerCase()}
                  </span>
                </div>
              </Checkbox>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
'use client';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/drawer";
import { Button as HeroButton } from "@heroui/button"; // Aliased import
import { Image } from "@heroui/image";
import { Product } from "@/types/product";
import { X, Heart, Share2 } from "lucide-react";

import { Button } from "@/components/atoms/Button"; // Your custom button



interface QuickViewDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export default function QuickViewDrawer({ isOpen, onClose, product }: QuickViewDrawerProps) {
  if (!product) return null;

  return (
    <Drawer 
      isOpen={isOpen} 
      onClose={onClose}
      placement="right"
      size="md"
      classNames={{
        base: "z-50",
        wrapper: "z-50",
        backdrop: "z-50",
      }}
    >
      <DrawerContent className="h-full">
        {(onClose) => (
          <>
            {/* Header */}
            <DrawerHeader className="flex flex-col gap-1 border-b border-divider p-6">
              <div className="flex justify-between items-center">
                <h2 className="font-sans text-subheading font-semibold">Quick View</h2>
                {/* <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onPress={onClose}
                  aria-label="Close quick view"
                >
                  <X size={20} />
                </Button> */}
              </div>
            </DrawerHeader>

            <DrawerBody className="p-6 overflow-y-auto">
              {/* Product Image */}
              <div className="relative aspect-square mb-6 rounded-lg overflow-hidden">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-4">
                <h3 className="font-sans text-body font-semibold text-foreground">
                  {product.name}
                </h3>
                
                <p className="font-sans text-subheading font-bold text-foreground">
                  ETB {product.price.toLocaleString()}
                </p>
                
                {/* Key Details */}
                <div className="space-y-2 text-sm text-default-600">
                  <p><strong>SKU:</strong> {product.sku}</p>
                  
                  {product.material && (
                    <p><strong>Material:</strong> {product.material}</p>
                  )}
                  
                  {product.dimensions && (
                    <p><strong>Size:</strong> {product.dimensions}</p>
                  )}
                  
                  {product.colors && product.colors.length > 0 && (
                    <div className="flex items-center gap-2">
                      <strong>Colors:</strong>
                      <div className="flex gap-1">
                        {product.colors.slice(0, 3).map((color, index) => (
                          <span
                            key={index}
                            className="w-4 h-4 rounded-full border border-default-200"
                            style={{ backgroundColor: color }}
                            aria-hidden="true"
                          />
                        ))}
                        {product.colors.length > 3 && (
                          <span className="text-xs">+{product.colors.length - 3}</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Shortened Description */}
                <p className="text-sm text-default-600 line-clamp-4">
                  {product.description}
                </p>
              </div>
            </DrawerBody>

            <DrawerFooter className="p-6 border-t border-divider gap-4">
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <HeroButton
                  variant="bordered"
                  onPress={() => {
                    window.location.href = `/product/${product.slug}`;
                  }}
                  className="flex-1"
                >
                  View Full Details
                </HeroButton>
                
                <HeroButton

                  color="primary"
                  onPress={() => {
                    console.log("Add to cart:", product._id);
                    onClose();
                  }}
                  className="flex-1"
                >
                  Inquire Now
                </HeroButton>
              </div>
              
              {/* Optional: Add to wishlist or share buttons */}
              {/* Optional buttons - Also use your custom Button */}
              <div className="flex justify-center gap-4 pt-2">
                <Button
                  variant="solid"
                  size="sm"
                  leftIcon={Heart}
                  onClick={() => console.log("Save for later")}
                >
                  Save for later
                </Button>
                <Button
                  variant="solid"
                  size="sm"
                  leftIcon={Share2}
                  onClick={() => console.log("Share product")}
                >
                  Share
                </Button>
              </div>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
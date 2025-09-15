// components/ImageWithSkeleton.tsx
import { Skeleton } from "@heroui/skeleton";
import { useState, useEffect, useRef } from "react";

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export function ImageWithSkeleton({ src, alt, width, height, className }: ImageWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);
  const loadStartTime = useRef<number | null>(null);

  // Debug logs
  useEffect(() => {
    console.log("Component mounted, src:", src); // Debug on mount
    loadStartTime.current = performance.now(); // Record start time
  }, [src]);

  // Handle image load with minimum delay
  const handleImageLoad = () => {
    console.log("Image load started:", src); // Debug on load start
    const loadTime = performance.now() - (loadStartTime.current || 0);
    console.log("Load time (ms):", loadTime);

    // Enforce minimum 1000ms delay unless load takes longer
    const delay = Math.max(0, 1000 - loadTime);
    setTimeout(() => {
      console.log("Delay applied (ms):", delay);
      setIsLoading(false); // Hide skeleton after delay
    }, delay);
  };

  const handleImageError = () => {
    console.log("Image error:", src); // Debug on error
    setIsLoading(true); // Keep skeleton on error
  };

  return (
    <div style={{ position: "relative", width, height }}>
      {isLoading && (
        <Skeleton
          className="rounded-lg"
         
        />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </div>
  );
}
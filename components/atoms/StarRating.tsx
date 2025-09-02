// components/atoms/StarRating.tsx
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
  className?: string;
}

export function StarRating({ rating, size = 14, className = "" }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {/* Render full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} size={size} className="fill-primary stroke-primary" />
      ))}
      {/* Render half star if needed */}
      {hasHalfStar && (
        <Star size={size} className="fill-primary stroke-primary" />
      )}
      {/* Render empty stars */}
      {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
        <Star key={`empty-${i}`} size={size} className="stroke-gray-300" />
      ))}
    </div>
  );
}
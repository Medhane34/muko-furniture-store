export interface HeroSectionProps {
  imageUrl: string;
  imageAlt: string;
  badgeText?: string;
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaLink?: string;
  ctaOnClick?: () => void;
  overlayOpacity?: number;
  contentWidth?: 'narrow' | 'medium' | 'wide';
  minHeight?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}
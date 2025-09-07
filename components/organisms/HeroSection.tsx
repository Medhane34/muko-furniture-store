'use client';

import Image from 'next/image';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import BadgeText from '../atoms/BadgeText';
import { HandThumbUpIcon } from '@heroicons/react/24/outline';

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

// Helper functions
const getMinHeightClass = (size: string) => {
  const sizes = {
    sm: 'min-h-[400px] md:min-h-[450px]',
    md: 'min-h-[500px] md:min-h-[550px]',
    lg: 'min-h-[600px] md:min-h-[650px]',
    xl: 'min-h-[700px] md:min-h-[750px]',
  };
  return sizes[size as keyof typeof sizes] || sizes.lg;
};

const getContentWidthClass = (width: string) => {
  const widths = {
    narrow: 'max-w-md',
    medium: 'max-w-lg',
    wide: 'max-w-xl',
  };
  return widths[width as keyof typeof widths] || widths.medium;
};

export function HeroSection({
  imageUrl,
  imageAlt,
  badgeText,
  headline,
  subheadline,
  ctaText,
  ctaLink,
  ctaOnClick,
  overlayOpacity = 40,
  contentWidth = 'medium',
  minHeight = 'lg',
  className = ''
}: HeroSectionProps) {
  
  const handleCtaClick = () => {
    if (ctaOnClick) {
      ctaOnClick();
    } else if (ctaLink) {
      window.location.href = ctaLink;
    }
  };

  // Split headline for highlighting last two words
  const words = headline.trim().split(/\s+/);
  const mainText = words.length > 2 ? words.slice(0, -2).join(' ') : (words.length === 1 ? '' : words[0]);
  const highlightText = words.length >= 2 ? words.slice(-2).join(' ') : (words[0] || '');

  return (
    <section className={`relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden ${getMinHeightClass(minHeight)} ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black"
          style={{ opacity: `${overlayOpacity}%` }}
          aria-hidden="true"
        />
      </div>

      {/* Content Container */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        {/* Content Column - Left aligned */}
        <div className={`py-56 ${getContentWidthClass(contentWidth)}`}>
          {/* Badge */}
          {badgeText && (
            <BadgeText
            gradient="custom"
            customGradient="linear-gradient(90deg, #8B5CF6 0%, #EC4899 100%)"
            rounded="lg"icon={<HandThumbUpIcon className="w-4 h-4" />} 
            >
              {badgeText}
            </BadgeText>
           
          )}
          
          {/* Headline with highlighted last two words */}
          <h1 className="font-sans text-3xl md:text-4xl lg:text-heading font-bold text-white mb-4 md:mb-6">
            {mainText}
            {mainText && ' '}
            <span className="text-primary animate-scale-in">
              {highlightText}
            </span>
            {/* Alternative: Gradient highlight */}
            {/* <span className="bg-gradient-to-r from-gradient-from to-gradient-to text-transparent bg-clip-text animate-scale-in">
              {highlightText}
            </span> */}
          </h1>
          
          {/* Subheadline */}
          {subheadline && (
            <p className="font-sans text-lg md:text-xl lg:text-subheading text-white/90 mb-6 md:mb-8 leading-relaxed">
              {subheadline}
            </p>
          )}
          
          {/* CTA Button */}
          {ctaText && (
            <Button
              variant="solid"
              size="lg"
              onClick={handleCtaClick}
              className="bg-white text-gray-900 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              {ctaText}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
import React from 'react';
import { cn } from '@/utils/cn';

export interface MainHeadlineProps {
  /** The main headline text */
  children: React.ReactNode;
  /** Size variant of the headline */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Additional CSS class */
  className?: string;
  /** HTML tag to use for the headline */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Whether to apply gradient to the entire text or use highlighted parts */
  gradientStyle?: 'full' | 'partial';
  /** Animation type */
  animate?: 'fade-in' | 'slide-up' | 'scale-in' | 'none';
}

const MainHeadline: React.FC<MainHeadlineProps> = ({
  children,
  size = 'lg',
  align = 'left',
  className = '',
  as = 'h2',
  gradientStyle = 'partial',
  animate = 'none',
  ...props
}) => {
  const HeadlineTag = as;
  
  // Size classes
  const sizeClasses = {
    sm: 'text-heading', // Uses your Tailwind config
    md: 'text-subheading',
    lg: 'text-[1.75rem] md:text-[2.25rem] lg:text-[2.5rem] xl:text-[3rem]',
    xl: 'text-[2rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem]'
  };
  
  // Alignment classes
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };
  
  // Gradient classes
  const gradientClass = gradientStyle === 'full' 
    ? 'bg-gradient-to-r from-[#FF3366] to-[#FF9933] bg-clip-text text-transparent' 
    : '';
  
  // Animation classes
  const animationClasses = {
    'none': '',
    'fade-in': 'animate-fade-in',
    'slide-up': 'animate-slide-up',
    'scale-in': 'animate-scale-in'
  };

  const combinedClassName = cn(
    'font-bold leading-tight mb-4 transition-colors',
    sizeClasses[size],
    alignClasses[align],
    gradientClass,
    animationClasses[animate],
    className
  );

  return (
    <HeadlineTag 
      className={combinedClassName}
      {...props}
    >
      {children}
    </HeadlineTag>
  );
};

export default MainHeadline;
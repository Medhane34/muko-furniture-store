import React from 'react';
import { cn } from '@/utils/cn';
import styles from './MainHeadline.module.css';

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
  /** Highlight color variant (for partial/full) */
  highlightColor?: 'primary' | 'secondary';
  /** Animation type */
  animate?: 'fade-in' | 'slide-up' | 'scale-in' | 'none';
}

const MainHeadline: React.FC<MainHeadlineProps> = ({
  children,
  size = 'lg',
  align = 'center',
  className = '',
  as = 'h2',
  gradientStyle = 'partial',
  highlightColor = 'primary',
  animate = 'none',
  ...props
}) => {
  const HeadlineTag = as;

  // Size classes (from your Tailwind config)
  const sizeClasses = {
    sm: 'text-heading',
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

  // Gradient classes based on highlightColor
  const gradientClass = {
    primary: 'bg-gradient-to-r from-gradient-from to-gradient-to bg-clip-text text-transparent',
    secondary: 'bg-gradient-to-r from-gradient-secondaryFrom to-gradient-secondaryTo bg-clip-text text-transparent',
  }[highlightColor];

  // Animation classes (from your Tailwind config)
  const animationClasses = {
    'none': '',
    'fade-in': 'animate-fade-in',
    'slide-up': 'animate-slide-up',
    'scale-in': 'animate-scale-in'
  };

  const baseClassName = cn(
    styles.mainHeadline,
    'font-bold leading-tight mb-4 transition-colors text-text-light dark:text-text-dark', // Light theme uses #1F2937, dark uses #F9FAFB
    sizeClasses[size],
    alignClasses[align],
    animationClasses[animate],
    gradientStyle === 'full' ? gradientClass : '',
    className
  );

  // Highlighting logic for partial
  let content = children;
  if (gradientStyle === 'partial' && typeof children === 'string') {
    const words = children.trim().split(/\s+/);
    const mainText = words.length > 2 ? words.slice(0, -2).join(' ') : (words.length === 1 ? '' : words[0]);
    const highlightText = words.length >= 2 ? words.slice(-2).join(' ') : (words[0] || '');

    content = (
      <>
        {mainText}
        {mainText && ' '}
        <span className={cn(styles.highlight, gradientClass)}>{highlightText}</span>
      </>
    );
  } // Else: Render children as-is (e.g., if JSX)

  // Ensure non-highlighted text is white in dark mode for partial style
  if (gradientStyle === 'partial' && typeof children === 'string' && content) {
    content = (
      <span className="dark:text-text-dark">
        {content}
      </span>
    );
  }

  return (
    <HeadlineTag 
      className={baseClassName}
      {...props}
    >
      {content}
    </HeadlineTag>
  );
};

export default MainHeadline;
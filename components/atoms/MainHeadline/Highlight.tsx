import React from 'react';
import { cn } from '@/utils/cn';

interface HighlightProps {
  children: React.ReactNode;
  gradient?: 'primary' | 'secondary';
  className?: string;
  animate?: 'fade-in' | 'scale-in' | 'none';
}

const Highlight: React.FC<HighlightProps> = ({ 
  children, 
  gradient = 'primary',
  className = '',
  animate = 'none',
  ...props
}) => {
  const gradientClasses = {
    primary: 'gradient-text-primary',
    secondary: 'gradient-text-secondary'
  };
  
  const animationClasses = {
    'none': '',
    'fade-in': 'animate-fade-in',
    'scale-in': 'animate-scale-in'
  };
  
  return (
    <span 
      className={cn(
        'font-extrabold inline-block', 
        gradientClasses[gradient],
        animationClasses[animate],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Highlight;
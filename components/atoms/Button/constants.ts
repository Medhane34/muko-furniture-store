// components/atoms/Button/constants.ts
import { ButtonVariant, ButtonSize, ButtonColor } from './types';

export const variantStyles: Record<ButtonVariant, Record<ButtonColor, string>> = {
  solid: {
    primary: 'bg-primary text-gray-900 hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:ring-offset-2',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark focus:ring-2 focus:ring-secondary focus:ring-offset-2',
    gray: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
  },
  outline: {
    primary: 'border border-primary text-primary hover:bg-primary/10 focus:ring-2 focus:ring-primary focus:ring-offset-2',
    secondary: 'border border-secondary text-secondary hover:bg-secondary/10 focus:ring-2 focus:ring-secondary focus:ring-offset-2',
    gray: 'border border-gray-600 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
  },
};

export const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-none', // sharp edges
  md: 'px-4 py-2 text-body rounded-none', // sharp edges
  lg: 'px-6 py-3 text-subheading rounded-none', // sharp edges
};

export const iconSizeStyles: Record<ButtonSize, number> = {
  sm: 16,
  md: 18,
  lg: 20,
};
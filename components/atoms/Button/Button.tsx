// components/atoms/Button/Button.tsx
'use client';

import { motion } from "framer-motion";
import { ButtonProps } from './types';
import { variantStyles, sizeStyles, iconSizeStyles } from './constants';
import { Spinner } from "@heroui/spinner";

export function Button({
  variant = 'solid',
  size = 'md',
  color = 'primary',
  isLoading = false,
  isDisabled = false,
  isFullWidth = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  children,
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-sans font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  const variantStyle = variantStyles[variant][color];
  const sizeStyle = sizeStyles[size];
  const widthStyle = isFullWidth ? 'w-full' : '';
  
  const iconSize = iconSizeStyles[size];
  
  const isActuallyDisabled = isDisabled || isLoading;

  const handleClick = () => {
    if (!isActuallyDisabled && onClick) {
      onClick();
    }
  };

  return (
    <motion.button
      type={type}
      className={`${baseStyles} ${variantStyle} ${sizeStyle} ${widthStyle} ${className}`}
      disabled={isActuallyDisabled}
      onClick={handleClick}
      whileHover={isActuallyDisabled ? {} : { scale: 1.02 }}
      whileTap={isActuallyDisabled ? {} : { scale: 0.98 }}
      transition={{ duration: 0.1 }}
      aria-busy={isLoading}
    >
      {/* Loading Spinner */}
      {isLoading && (
        <Spinner 
          size="sm" 
          color="current" 
          className="mr-2" 
          aria-label="Loading..."
        />
      )}
      
      {/* Left Icon */}
      {!isLoading && LeftIcon && (
        <LeftIcon size={iconSize} className="mr-2" aria-hidden="true" />
      )}
      
      {/* Button Text */}
      <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
      
      {/* Right Icon */}
      {!isLoading && RightIcon && (
        <RightIcon size={iconSize} className="ml-2" aria-hidden="true" />
      )}
    </motion.button>
  );
}
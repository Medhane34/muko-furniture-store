import React from 'react';
import styles from './AccentHeading.module.css';

export interface AccentHeadingProps {
  /** The text to display with gradient styling */
  children: React.ReactNode;
  /** Custom gradient definition */
  gradient?: string;
  /** Size variant of the text */
  size?: 'sm' | 'md' | 'lg';
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Additional CSS class */
  className?: string;
}

const AccentHeading: React.FC<AccentHeadingProps> = ({
  children,
  gradient = 'linear-gradient(90deg, #FF3366 0%, #FF9933 100%)',
  size = 'md',
  align = 'left',
  className = ''
}) => {
  const combinedClassName = `
    ${styles.accentHeading}
    ${styles[size]}
    ${styles[align]}
    ${className}
  `.trim();

  return (
    <span 
      className={combinedClassName}
      style={{ backgroundImage: gradient }}
    >
      {children}
    </span>
  );
};

export default AccentHeading;
/* import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Link as HeroUILink, type LinkProps as HeroUILinkProps } from '@heroui/link';
import { link } from '@/components/primitives';

// Animation variants for the underline
const underlineVariants = {
  initial: {
    scaleX: 0,
    originX: 1, // Start from right
  },
  hover: {
    scaleX: 1,
    originX: 0, // Grow to left
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  active: {
    scaleX: 1,
    originX: 0, // Always visible for active state
  },
};

interface LinkProps extends HeroUILinkProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'plain';
  state?: 'active' | 'inactive';
  fullWidth?: boolean;
  noUnderline?: boolean;
}

export const LinkStyle = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    { size = 'md', variant = 'default', state = 'inactive', fullWidth = false, noUnderline = false, className, children, ...props },
    ref
  ) => {
    const shouldShowUnderline = variant === 'default' && !noUnderline;

    return (
      <div className="relative inline-flex">
        <HeroUILink
          ref={ref}
          className={link({ size, variant, state, fullWidth, noUnderline, className })}
          {...props}
        >
          {children}
        </HeroUILink>
        {shouldShowUnderline && (
          <motion.div
            className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-primary-dark"
            variants={underlineVariants}
            initial="initial"
            animate={state === 'active' ? 'active' : 'initial'}
            whileHover={state !== 'active' ? 'hover' : undefined}
          />
        )}
      </div>
    );
  }
); */
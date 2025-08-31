"use client";
import React from "react";
import clsx from "clsx";

export interface BodyTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: "sm" | "md" | "lg";
  color?: "default" | "muted" | "primary";
  as?: "p" | "span" | "div";
  children: React.ReactNode;
}

const sizeClasses = {
  sm: "text-small",
  md: "text-body",
  lg: "text-lg",
};

const colorClasses = {
  default: "text-text-light dark:text-text-dark",
  muted: "text-gray-500 dark:text-gray-400",
  primary: "text-primary",
};

const BodyText = React.forwardRef<HTMLParagraphElement, BodyTextProps>(
  (
    {
      size = "md",
      color = "default",
      as: Component = "p",
      className,
      children,
      ...props
    },
    ref
  ) => (
    <Component
      ref={ref}
      className={clsx(
        "leading-relaxed",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
);

BodyText.displayName = "BodyText";
export default BodyText;

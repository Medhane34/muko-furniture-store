"use client";
import React from "react";
import clsx from "clsx";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: "primary" | "success" | "warning" | "danger" | "info" | "gray";
  size?: "sm" | "md" | "lg";
  rounded?: boolean;
  children: React.ReactNode;
}

const colorClasses = {
  primary: "bg-primary text-gray-900",
  success: "bg-green-500 text-white",
  warning: "bg-yellow-400 text-gray-900",
  danger: "bg-red-500 text-white",
  info: "bg-blue-500 text-white",
  gray: "bg-gray-300 text-gray-900",
};

const sizeClasses = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base",
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      color = "primary",
      size = "md",
      rounded = true,
      className,
      children,
      ...props
    },
    ref
  ) => (
    <span
      ref={ref}
      className={clsx(
        "inline-block font-semibold uppercase tracking-wide",
        colorClasses[color],
        sizeClasses[size],
        rounded ? "rounded-full" : "rounded",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
);

Badge.displayName = "Badge";
export default Badge;

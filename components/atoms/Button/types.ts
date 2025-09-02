// components/atoms/Button/types.ts
import { LucideIcon } from "lucide-react";

export type ButtonVariant = 'solid' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonColor = 'primary' | 'secondary' | 'gray';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  isLoading?: boolean;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}
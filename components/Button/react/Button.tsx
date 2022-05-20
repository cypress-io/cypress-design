import clsx from 'clsx';
import * as React from 'react';
import { ButtonSizes, ButtonVariants, SizeClassesTable, VariantClassesTable } from '../constants';

export interface ButtonProps {
  variant?: ButtonVariants;
  size?: ButtonSizes;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  children
}) => {
  return (
    <button className={clsx(
      "border rounded flex outline-none leading-20px text-14px gap-8px items-center", 
      VariantClassesTable[variant], 
      SizeClassesTable[size],
      className)} 
      disabled={disabled}>
        { children }
    </button>
  );
};

export default Button;

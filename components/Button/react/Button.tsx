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
  const finalVariant = (disabled && !['secondary', 'link'].includes(variant)) ? 'disabled' : variant
  const finalDisabled = disabled || variant === 'disabled';
  return (
    <button className={clsx(
      "border rounded flex outline-none leading-20px text-14px gap-8px items-center disabled:cursor-not-allowed", 
      VariantClassesTable[finalVariant], 
      SizeClassesTable[size],
      className)} 
      disabled={finalDisabled}>
        { children }
    </button>
  );
};

export default Button;

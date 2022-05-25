import clsx from 'clsx';
import * as React from 'react';
import type { ButtonSizes, ButtonVariants } from '../constants';
import { SizeClassesTable, VariantClassesTable, StaticClasses } from '../constants';

export interface ButtonProps {
  variant?: ButtonVariants;
  size?: ButtonSizes;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = '32',
  disabled = false,
  className,
  children
}) => {
  const finalVariant = (disabled && !['secondary', 'link'].includes(variant)) ? 'disabled' : variant
  const finalDisabled = disabled || variant === 'disabled';
  return (
    <button className={clsx(
      StaticClasses, 
      VariantClassesTable[finalVariant], 
      SizeClassesTable[size],
      className)} 
      disabled={finalDisabled}>
        { children }
    </button>
  );
};

export default Button;

import clsx from 'clsx';
import * as React from 'react';
import type { ButtonSizes, ButtonVariants } from '../constants';
import {
  SizeClassesTable,
  VariantClassesTable,
  StaticClasses,
} from '../constants';

export interface ButtonProps {
  variant?: ButtonVariants;
  size?: ButtonSizes;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Button: React.FC<
  ButtonProps & React.HTMLProps<HTMLButtonElement>
> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  children,
  ...rest
}) => {
  const finalVariant =
    disabled && !['secondary', 'link'].includes(variant) ? 'disabled' : variant;
  const finalDisabled = disabled || variant === 'disabled';
  return (
    <button
      {...rest}
      type="button"
      className={clsx(
        StaticClasses,
        VariantClassesTable[finalVariant],
        SizeClassesTable[size],
        className
      )}
      disabled={finalDisabled}
    >
      {children}
    </button>
  );
};

export default Button;

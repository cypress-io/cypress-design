import React, { FunctionComponent, ReactNode } from 'react'
import { CustomIcon } from './custom-icons/CustomIcon'

// prettier-ignore
type BannerProps = {
  variant?: 'default' | 'info' | 'info-alt' | 'success' | 'warning' | 'danger';
  children: ReactNode;
  className?: string;
  onClose?: () => void;
}

export const Banner: FunctionComponent<BannerProps> = ({
  variant = 'default',
  children,
  className,
  onClose,
  ...props
}) => (
  <div className={`banner banner-${variant} ${className || ''}`} {...props}>
    {children}
    {onClose && (
      <button
        type="button"
        aria-label="Close"
        className="banner--close btn btn-link pull-right"
        onClick={onClose}
      >
        <CustomIcon name="close" />
      </button>
    )}
  </div>
)

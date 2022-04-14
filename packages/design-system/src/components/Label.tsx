import React, { FunctionComponent, ReactNode } from 'react'
import { Label as ReactLabel } from 'react-bootstrap'

// prettier-ignore
interface LabelProps {
  children: ReactNode;
  className?: string,
  bsStyle: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'light'
  dataPendo?: string
}

export const Label: FunctionComponent<LabelProps> = ({
  bsStyle,
  children,
  className,
  dataPendo,
  ...rest
}) => (
  <ReactLabel
    {...rest}
    bsStyle={bsStyle}
    className={className}
    data-pendo={dataPendo}
  >
    {children}
  </ReactLabel>
)

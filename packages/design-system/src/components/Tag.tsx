import React, { FunctionComponent, ReactNode } from 'react'
import { Label as ReactLabel } from 'react-bootstrap'

// prettier-ignore
interface LabelProps {
  className?: string;
  color?: string;
  minWidth?: number;
  children: ReactNode;
  backgroundColor: string
}

// https://stackoverflow.com/a/11868398/8157186
function getContrastYIQ(hexcolor: string) {
  hexcolor = hexcolor.replace('#', '')
  const r = parseInt(hexcolor.substr(0, 2), 16)
  const g = parseInt(hexcolor.substr(2, 2), 16)
  const b = parseInt(hexcolor.substr(4, 2), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? 'black' : 'white'
}

export const Tag: FunctionComponent<LabelProps> = ({
  className = '',
  color,
  backgroundColor,
  children,
  minWidth = 0,
}) => {
  return (
    <ReactLabel
      className={className}
      style={{
        minWidth,
        backgroundColor,
        color: color || getContrastYIQ(backgroundColor),
      }}
    >
      {children}
    </ReactLabel>
  )
}

import React, { Children, FunctionComponent, ReactNode } from 'react'
import cs from 'clsx'

interface HorizontalListProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode
  className?: string
  divider?: ReactNode
  margin?: number
  noWrap?: boolean
}

export const HorizontalList: FunctionComponent<HorizontalListProps> = ({
  children,
  className,
  divider,
  margin = 16,
  noWrap = false,
  ...rest
}) => {
  const count = Children.count(children)

  return (
    <div {...rest} className={cs('horizontal-list', className)}>
      {Children.map(children, (child, idx) => {
        if (!child) {
          return null
        }

        return (
          <>
            <span style={{ whiteSpace: noWrap ? 'nowrap' : 'normal' }}>
              {child}
            </span>
            {idx !== count - 1 && (
              <span
                className="horizontal-list__item-divider"
                style={{
                  marginLeft: margin,
                  marginRight: margin,
                  whiteSpace: noWrap ? 'nowrap' : 'normal',
                }}
              >
                {divider || '•'}
              </span>
            )}
          </>
        )
      })}
    </div>
  )
}

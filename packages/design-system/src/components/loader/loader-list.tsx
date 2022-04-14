import { ContentLoader, palette } from '@frontend/design-system'
import _ from 'lodash'
import React from 'react'

interface LoaderListItemProps {
  num?: number
  width?: number
  height?: number
  isSingleLine?: boolean
}

const LoaderListItem: React.FunctionComponent<LoaderListItemProps> = ({
  num,
  width = 400,
  height = 85,
  isSingleLine = false,
}) => {
  return (
    <div key={num} className="loader-bg">
      <div style={{ maxWidth: width }}>
        <ContentLoader
          height={height}
          width={width}
          speed={2}
          primaryColor={palette.gray100}
          secondaryColor={palette.gray200}
          className="loader"
        >
          <rect
            x="0"
            y={height}
            rx="3"
            ry="3"
            width={height}
            height="5"
            transform="rotate(270, 0, 85)"
          />
          <rect x="32" y="27" rx="3" ry="3" width={width} height="10" />
          {!isSingleLine && (
            <rect x="32" y="52" rx="3" ry="3" width="125" height="10" />
          )}
        </ContentLoader>
      </div>
    </div>
  )
}

interface LoaderListProps {
  className?: string
  width?: number
  height?: number
  rows?: number
  isSingleLine?: boolean
}

export const LoaderList: React.FunctionComponent<LoaderListProps> = ({
  className,
  width,
  height,
  rows = 8,
  isSingleLine,
}) => {
  return (
    <div className={`loading-list-container ${className || ''}`}>
      {_.times(rows, (n) => {
        return (
          <LoaderListItem
            key={n}
            width={width}
            height={height}
            isSingleLine={isSingleLine}
          />
        )
      })}
    </div>
  )
}

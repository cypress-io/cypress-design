import pluralize from 'pluralize'
import React, { FunctionComponent, ReactNode } from 'react'

type FilterEmptyStateProps = {
  children?: ReactNode
  filter: string
  icon?: ReactNode
  info?: string
  searchQuery?: string
  url?: string
}

export const FilterEmptyState: FunctionComponent<FilterEmptyStateProps> = ({
  children,
  filter,
  icon,
  info,
  searchQuery,
  url,
}) => {
  if (searchQuery) {
    return (
      <span>
        No {pluralize(filter)} matching {searchQuery} found
      </span>
    )
  }

  return (
    <div className="filter-empty-state">
      {icon && (
        <>
          {icon}
          <br />
        </>
      )}
      {info && (
        <>
          {info}
          <br />
        </>
      )}
      {url && (
        <div className="learn-more">
          <a target="_blank" href={url}>
            Learn more
          </a>
        </div>
      )}
      {children}
    </div>
  )
}

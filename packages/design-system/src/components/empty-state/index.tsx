import React, { FunctionComponent, ReactNode } from 'react'

type EmptyStateProps = {
  children?: ReactNode
}

const EmptyState: FunctionComponent<EmptyStateProps> = ({ children }) => {
  return (
    <div className="empty-state">
      {children ? (
        <React.Fragment>{children}</React.Fragment>
      ) : (
        <span>FIXME: Change this default message</span>
      )}
    </div>
  )
}

export { EmptyState }
export { ChartEmptyState } from './ChartEmptyState'
export { FilterEmptyState } from './FilterEmptyState'
export { TextEmptyState } from './TextEmptyState'
export { PanelEmptyState } from './PanelEmptyState'

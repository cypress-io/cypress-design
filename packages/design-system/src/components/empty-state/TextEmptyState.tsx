import React, { FunctionComponent, ReactNode } from 'react'

type TextEmptyStateProps = {
  children?: ReactNode
}

export const TextEmptyState: FunctionComponent<TextEmptyStateProps> = ({
  children,
}) => {
  return <span className="text-empty-state text-muted">{children || '—'}</span>
}

import { Panel } from '../Panel'
import React, { FunctionComponent, ReactNode } from 'react'

type ChartEmptyStateProps = {
  children?: ReactNode
  loading?: boolean
}

const ChartEmptyState: FunctionComponent<ChartEmptyStateProps> = ({
  children,
  loading = false,
}) => {
  if (loading) {
    return (
      <Panel.Body className="chart-empty-state">
        <span>
          <i className="fa fa-spinner fa-spin" /> Reticulating splines...
        </span>
      </Panel.Body>
    )
  }

  return (
    <Panel.Body className="chart-empty-state">
      <img src="/img/undraw_visual_data_re_mxxo.svg" />
      {children}
    </Panel.Body>
  )
}

export { ChartEmptyState }

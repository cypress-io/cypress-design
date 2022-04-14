import React, { FunctionComponent } from 'react'
import { Link } from '@reach/router'
import styles from './module.TooltipOverlay.scss'

interface TooltipOverlayProps {
  variant:
    | 'default'
    | 'running'
    | 'failed'
    | 'passed'
    | 'timedOut'
    | 'errored'
    | 'noTests'
    | 'overLimit'
    | 'cancelled'
    | undefined
  titleText: string
  contentRows: React.ReactNode[]
  to: string
}

export const TooltipOverlay: FunctionComponent<TooltipOverlayProps> = ({
  variant = 'default',
  titleText,
  contentRows,
  to,
}) => {
  return (
    <Link className={`${styles.container} ${styles[variant]}`} to={to}>
      <span className={styles.title}>{titleText}</span>
      {contentRows.map((row, index) => (
        <div key={`tooltip-content-row-${index}`} className={styles.contentRow}>
          {row}
        </div>
      ))}
    </Link>
  )
}

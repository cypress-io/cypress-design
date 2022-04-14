import cs from 'clsx'
import React, { FunctionComponent } from 'react'
import Tooltip from 'rc-tooltip'
import styles from './module.FlakyBadge.scss'
import pluralize from 'pluralize'

type FlakyBadgeProps = {
  count?: number | null
  showTooltip?: boolean
}

export const FlakyBadge: FunctionComponent<FlakyBadgeProps> = ({
  count,
  showTooltip = true,
}) => {
  const label = 'Flaky'
  const countLabel = count ? `${count} ${label}` : label

  const title = (
    <span className={cs('row-content__title', styles.flakyBadge)}>
      {countLabel}
    </span>
  )

  return showTooltip ? (
    <Tooltip
      placement="top"
      overlay={
        <span>
          {count ? `${count} ${pluralize('test', count || 1)}` : 'This test'}{' '}
          both passed and failed when retried within a run
        </span>
      }
    >
      {title}
    </Tooltip>
  ) : (
    title
  )
}

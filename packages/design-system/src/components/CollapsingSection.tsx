import React, { FunctionComponent, ReactNode, useState } from 'react'
import cs from 'clsx'
import { BetaBadge } from './badges/BetaBadge'
import { IconButton } from './buttons/IconButton'

import styles from './module.CollapsingSection.scss'
import { isBoolean } from 'lodash'

type CollapsingSectionProps = {
  title: ReactNode
  isBeta?: boolean
  shouldBeCollapsed?: boolean
  subtitle?: ReactNode | null
  isCollapsedSection?: boolean
  setIsCollapsedSection?: (v: boolean) => void
}

export const CollapsingSection: FunctionComponent<CollapsingSectionProps> = ({
  title,
  isBeta,
  shouldBeCollapsed = false,
  subtitle,
  isCollapsedSection,
  setIsCollapsedSection,
  children,
  ...props
}) => {
  const [isCollapsed, setIsCollapsed] = useState(shouldBeCollapsed)

  const collapsedSection = isBoolean(isCollapsedSection)
    ? isCollapsedSection
    : isCollapsed

  return (
    <div data-cy="collapsing-section" className={styles.container} {...props}>
      <div
        data-cy="collapsing-header"
        className={styles.header}
        onClick={() =>
          setIsCollapsedSection
            ? setIsCollapsedSection(!collapsedSection)
            : setIsCollapsed(!isCollapsed)
        }
      >
        <div className={styles.title}>
          <h5>{title}</h5>
          {isBeta && <BetaBadge />}
        </div>
        <div
          className={cs([
            styles.subtitleContainer,
            { [styles.subtitleContainerMaxWidth]: Boolean(subtitle) },
          ])}
        >
          {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
          <IconButton icon={collapsedSection ? 'chevron-down' : 'chevron-up'} />
        </div>
      </div>
      {!collapsedSection && children}
    </div>
  )
}

import { Panel } from '../Panel'
import React, { FunctionComponent, ReactNode } from 'react'
import cs from 'clsx'

type PanelEmptyStateProps = {
  title?: string
  subtitle: string | ReactNode
  heading?: string
  withoutShadow?: boolean
  ctaLinkMessage?: string
  ctaLinkUrl?: string
  ctaButton?: ReactNode
  ctaButtonMessage?: string
  ctaButtonUrl?: string
  icon?: string
}

const PanelEmptyState: FunctionComponent<PanelEmptyStateProps> = ({
  title,
  subtitle,
  ctaLinkUrl,
  heading,
  withoutShadow,
  ctaLinkMessage,
  icon = 'empty-state-graph',
  ctaButton,
  ctaButtonMessage,
  ctaButtonUrl,
}) => {
  return (
    <Panel
      className={cs({
        'panel-empty-state-without-shadow': withoutShadow,
      })}
    >
      {heading && (
        <Panel.Heading>
          <Panel.Title>{heading}</Panel.Title>
        </Panel.Heading>
      )}
      <Panel.Body className="panel-empty-state">
        <img src={`/img/${icon}.svg`} />
        {title && <span className="panel-empty-state__title">{title}</span>}
        <span className="panel-empty-state__subtitle">{subtitle}</span>
        <div className="panel-empty-state__cta">
          {ctaButtonMessage && ctaButtonUrl && (
            <a href={ctaButtonUrl} className="btn btn-default">
              {ctaButtonMessage}
            </a>
          )}
          {ctaButton}
          {ctaLinkUrl && ctaLinkMessage && (
            <a href={ctaLinkUrl} target="_blank">
              {ctaLinkMessage}
            </a>
          )}
        </div>
      </Panel.Body>
    </Panel>
  )
}

export { PanelEmptyState }

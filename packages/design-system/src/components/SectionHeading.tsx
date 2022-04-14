import React, { FunctionComponent, ReactNode } from 'react'

import { BetaBadge } from '@frontend/design-system'

type SectionHeadingProps = {
  title: ReactNode
  isBeta?: boolean
}

export const SectionHeading: FunctionComponent<SectionHeadingProps> = ({
  title,
  isBeta,
}) => {
  return (
    <h6 className="section-heading">
      {title} {isBeta && <BetaBadge />}
    </h6>
  )
}

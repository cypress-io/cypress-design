import React, { FunctionComponent } from 'react'

type BetaBadgeProps = {
  isSup?: boolean
}

export const BetaBadge: FunctionComponent<BetaBadgeProps> = ({
  isSup = false,
}) => {
  if (isSup) {
    return <sup className="beta-badge">beta</sup>
  }
  return <small className="beta-badge">beta</small>
}

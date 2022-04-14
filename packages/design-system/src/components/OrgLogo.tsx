import { Avatar, palette } from '@frontend/design-system'
import initials from 'initials'
import React, { FunctionComponent } from 'react'

interface OrgLogoProps {
  org: { name: string } | null
  logo?: string | null
  size?: 'x16' | 'x24' | 'x32' | 'x48' | 'x64' | 'x80' | 'x96' | 'x128'
}

const DefaultOrgLogo: FunctionComponent<OrgLogoProps> = ({
  org,
  size = 'x32',
}) => {
  if (!org) {
    return null
  }

  const orgInitials = initials(org.name) as string
  const px = Number(size.replace('x', ''))

  return (
    <svg className="org-avatar-default" height={px} width={px}>
      <title>Avatar for {org.name}</title>
      <circle
        cx={px / 2}
        cy={px / 2}
        r={px / 2 - 1}
        fill={palette.gray100}
        stroke={palette.grayA1}
      />
      <text
        x={px / 2}
        y={px / 2}
        fontSize={px / 2.25}
        fill={palette.gray800}
        fontFamily={palette.fontSans}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {orgInitials.toUpperCase().substring(0, 2)}
      </text>
    </svg>
  )
}

const OrgLogo: FunctionComponent<OrgLogoProps> = ({
  org,
  logo,
  size = 'x32',
}) => {
  return logo ? (
    // Temporal solution to remove the logo when is deleted, the logo will be null,
    // but it'll get the logo of the org because the state is not sync
    <Avatar entity={{ avatar: logo, name: org?.name }} size={size} />
  ) : (
    <DefaultOrgLogo org={org} size={size} />
  )
}

export { OrgLogo }

import * as React from 'react'
import { SidebarNavigationHead } from './_SidebarNavigationHead'
import { SidebarNavigationLink } from './_SidebarNavigationLink'
import { SidebarNavigationGroup } from './_SidebarNavigationGroup'
import { SidebarNavigationFooter } from '@cypress-design/react-SidebarNavigation/_SidebarNavigationFooter'
import type { SidebarNavigationInterface } from '@cypress-design/constants-SidebarNavigation'
// import landscapeIllustration from './landscapeIllustration.svg'

const landscapeIllustration = `<svg width="320" height="960" viewBox="0 0 320 960" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_42_3605)">
<path d="M320 0H0V960H320V0Z" fill="#1B1E2E"/>
<path d="M320 0H0V960H320V0Z" fill="#1B1E2E"/>
<mask id="mask0_42_3605" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="320" height="960">
<path d="M320 0H0V960H320V0Z" fill="white"/>
</mask>
<g mask="url(#mask0_42_3605)">
<path opacity="0.17" d="M285.243 1606.32C181.13 1579.31 61.8353 1524.37 -19.1718 1430.26C-111.506 1322.88 -161.99 1140.8 -162.137 1005.48C-162.338 838.46 -100.889 729.422 -8.25876 623.391C-8.25876 623.391 36.3534 584.333 57.364 597.266C92.6582 619.035 118.869 660.063 139.908 706.542C148.468 725.508 156.179 745.386 163.284 765.228C165.183 770.526 167.036 775.81 168.845 781.08C181.439 817.684 192.233 853.415 202.88 882.157C236.429 972.781 293.276 1086.73 301.989 1181.78C308.527 1253.04 328.509 1321.09 349.148 1389.47C359.989 1425.39 371.01 1461.42 380.349 1498.03C387.39 1525.67 385.231 1550.42 376.135 1569.52C361.223 1601.01 327.364 1617.28 285.243 1606.32Z" fill="#2E3247"/>
<path opacity="0.1" d="M-7.91508 591.111C-48.8272 622.12 -84.8721 655.818 -114.714 690.96C-245.997 846.34 -134.939 977.97 -134.939 977.97C-102.768 1021.83 -70.8744 1065.85 -38.4482 1109.58C17.066 1184.45 55.6666 1267.06 156.852 1312.77C191.596 1328.46 234.133 1352.05 281.545 1368.81C279.823 1361.8 278.015 1354.85 276.121 1347.98C263.032 1300.19 246.821 1255.47 238.28 1216.97C211.306 1095.59 210.989 924.04 122.036 830.926C55.3494 761.074 23.06 676.69 -7.91508 591.111Z" fill="#434861"/>
<path opacity="0.08" d="M-160.035 989.79C-160.035 989.79 -135.378 1105.8 -93.7906 1180.47C-52.2034 1255.14 -12.3822 1332.25 34.7711 1363.55C81.9245 1394.85 161.273 1369.72 199.374 1298.93C237.475 1228.14 195.327 1128.08 195.327 1128.08C182.885 1095.62 170.522 1063.12 158.034 1030.7C136.63 975.171 120.585 918.007 84.978 872.017C62.0674 842.379 28.9841 791.085 -4.18297 780.275C-36.1126 769.877 -108.526 807.411 -131.12 856.289C-153.714 905.166 -168.508 925.035 -160.03 989.806L-160.035 989.79Z" fill="#5A5F7A"/>
</g>
</g>
<defs>
<clipPath id="clip0_42_3605">
<rect width="320" height="960" fill="white"/>
</clipPath>
</defs>
</svg>
`

import clsx from 'clsx'

const svgDataUrl = `data:image/svg+xml,${encodeURIComponent(
  landscapeIllustration,
)}`

export const SidebarNavigation: React.FC<SidebarNavigationInterface> = ({
  items,
  currentProject,
  onProjectChange,
  projects,
  className,
  currentOrganization,
  ...rest
}) => {
  return (
    <nav
      className={clsx('bg-gray-900 text-white h-[100%]', 'bg-cover bg-scroll')}
      style={{
        backgroundImage: `url(${svgDataUrl})`,
      }}
    >
      <SidebarNavigationHead
        currentOrganization={currentOrganization}
        currentProject={currentProject}
        onProjectChange={onProjectChange || (() => {})}
        projects={projects}
      />
      HELLO
      <img src={`${svgDataUrl}`} />
      <ul {...rest} className={clsx('list-none p-0', className)}>
        {items.map((item, index) =>
          'items' in item ? (
            <SidebarNavigationGroup key={index} group={item} />
          ) : (
            <SidebarNavigationLink key={index} item={item} />
          ),
        )}
      </ul>
      <SidebarNavigationFooter />
    </nav>
  )
}

export default SidebarNavigation

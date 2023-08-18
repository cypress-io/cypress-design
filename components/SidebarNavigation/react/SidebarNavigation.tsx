import * as React from 'react'
import { SidebarNavigationHead } from './_SidebarNavigationHead'
import { SidebarNavigationLink } from './_SidebarNavigationLink'
import { SidebarNavigationGroup } from './_SidebarNavigationGroup'
import { SidebarNavigationFooter } from '@cypress-design/react-SidebarNavigation/_SidebarNavigationFooter'
import type { SidebarNavigationInterface } from '@cypress-design/constants-SidebarNavigation'
import clsx from 'clsx'

// TODO: configure rollup to import svg from filesystem
// import landscapeIllustration from './landscapeIllustration.svg'

const landscapeIllustration = `<svg width="320" height="428" viewBox="0 0 320 428" fill="none" xmlns="http://www.w3.org/2000/svg">
<defs>
<clipPath id="clip0_47_3619">
<rect width="320" height="428" fill="white"/>
</clipPath>
</defs>
<g clip-path="url(#clip0_47_3619)">
<mask id="mask0_47_3619" mask-type="luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="320" height="428">
<rect width="320" height="428" fill="white"/>
</mask>
<g mask="url(#mask0_47_3619)">
<rect width="320" height="428" fill="#1B1E2E"/>
<mask id="mask1_47_3619" mask-type="luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="320" height="428">
<rect width="320" height="428" fill="white"/>
</mask>
<g mask="url(#mask1_47_3619)">
<path opacity="0.17" d="M285.243 1074.32C181.13 1047.31 61.8352 992.37 -19.1719 898.26C-111.506 790.88 -161.99 608.8 -162.137 473.48C-162.338 306.46 -100.889 197.422 -8.25885 91.391C-8.25885 91.391 36.3533 52.333 57.3639 65.266C92.6581 87.035 118.869 128.063 139.908 174.542C148.468 193.508 156.179 213.386 163.284 233.228C165.183 238.526 167.036 243.81 168.845 249.08C181.439 285.684 192.233 321.415 202.88 350.157C236.429 440.781 293.276 554.73 301.989 649.78C308.527 721.04 328.509 789.09 349.148 857.47C359.989 893.39 371.01 929.42 380.349 966.03C387.39 993.67 385.231 1018.42 376.135 1037.52C361.223 1069.01 327.364 1085.28 285.243 1074.32Z" fill="#2E3247"/>
<path opacity="0.1" d="M-7.91513 59.1111C-48.8273 90.1201 -84.8721 123.818 -114.714 158.96C-245.997 314.34 -134.939 445.97 -134.939 445.97C-102.768 489.83 -70.8744 533.85 -38.4482 577.58C17.066 652.45 55.6666 735.06 156.852 780.77C191.596 796.46 234.133 820.05 281.545 836.81C279.823 829.8 278.015 822.85 276.121 815.98C263.032 768.19 246.821 723.47 238.28 684.97C211.306 563.59 210.989 392.04 122.036 298.926C55.3493 229.074 23.0599 144.69 -7.91513 59.1111Z" fill="#434861"/>
<path opacity="0.08" d="M-160.035 457.79C-160.035 457.79 -135.378 573.8 -93.7907 648.47C-52.2035 723.14 -12.3823 800.25 34.771 831.55C81.9244 862.85 161.273 837.72 199.374 766.93C237.475 696.14 195.327 596.08 195.327 596.08C182.885 563.62 170.522 531.12 158.034 498.7C136.63 443.171 120.585 386.007 84.9779 340.017C62.0673 310.379 28.984 259.085 -4.18307 248.275C-36.1127 237.877 -108.526 275.411 -131.12 324.289C-153.714 373.166 -168.508 393.035 -160.03 457.806L-160.035 457.79Z" fill="#5A5F7A"/>
</g>
</g>
</g>
</svg>
`

// Build a URL suitable for use as background image
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
      className={clsx(
        'bg-gray-900 text-white h-[100%]',
        'bg-cover bg-scroll bg-no-repeat bg-bottom-left',
      )}
      style={{
        backgroundImage: `url("${svgDataUrl}")`,
      }}
    >
      <SidebarNavigationHead
        currentOrganization={currentOrganization}
        currentProject={currentProject}
        onProjectChange={onProjectChange || (() => {})}
        projects={projects}
      />

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

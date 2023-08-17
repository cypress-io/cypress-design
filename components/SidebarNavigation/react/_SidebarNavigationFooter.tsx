import * as React from 'react'
import clsx from 'clsx'
import {
  IconActionQuestionMarkDefault,
  IconArrowRight,
} from '@cypress-design/react-icon'

export interface SidebarNavigationFooterProps {}

// Temporary asset
const cypressSVGLogo = (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.2513 12.6996C12.546 12.6996 13.6007 13.39 14.1426 14.5943L14.1854 14.6886L16.3599 13.9502L16.3136 13.8388C15.4716 11.7882 13.5321 10.5136 11.2513 10.5136C9.6479 10.5136 8.34459 11.0276 7.26765 12.0829C6.19757 13.1313 5.65569 14.4504 5.65569 16.0043C5.65569 17.5444 6.19757 18.8567 7.26765 19.9051C8.34459 20.9604 9.6479 21.4744 11.2513 21.4744C13.5321 21.4744 15.4716 20.1998 16.3136 18.1508L16.3599 18.0395L14.182 17.2994L14.1409 17.3971C13.6556 18.5808 12.5752 19.2884 11.2513 19.2884C10.3493 19.2884 9.58787 18.9732 8.98423 18.353C8.37374 17.7243 8.06506 16.9345 8.06506 16.006C8.06506 15.0706 8.36688 14.2963 8.98423 13.6384C9.58615 13.0148 10.3493 12.6996 11.2513 12.6996Z"
      fill="white"
    />
    <path
      d="M24.8708 10.7158L21.772 18.5569L18.6526 10.7158H16.1009L20.4755 21.4178L17.3631 28.966L17.2186 29.3086C17.1192 29.5482 16.9022 29.7168 16.6518 29.7515C16.4358 29.7615 16.2185 29.7666 16 29.7666V32C16.2262 32 16.4524 31.9954 16.6784 31.9863C17.824 31.9383 18.8478 31.2205 19.2851 30.1566L27.2819 10.7158H24.8708Z"
      fill="white"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M16 29.7667C23.6031 29.7667 29.7667 23.6031 29.7667 16C29.7667 8.39688 23.6031 2.23333 16 2.23333C8.39688 2.23333 2.23333 8.39688 2.23333 16C2.23333 23.6031 8.39688 29.7667 16 29.7667ZM16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
      fill="url(#paint0_angular_1_3111)"
    />
    <defs>
      <radialGradient
        id="paint0_angular_1_3111"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(16 16) rotate(90) scale(16)"
      >
        <stop stop-color="white" />
        <stop offset="0.494792" stop-color="#58D09E" />
        <stop offset="0.927083" stop-color="#58D09E" stop-opacity="0" />
        <stop offset="1" stop-color="#58D09E" stop-opacity="0" />
      </radialGradient>
    </defs>
  </svg>
)

const landscapesIllustration = (
  <svg
    width="320"
    height="960"
    viewBox="0 0 320 960"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_1_3085)">
      <path
        opacity="0.17"
        d="M285.243 1606.32C181.13 1579.31 61.8354 1524.37 -19.1717 1430.26C-111.506 1322.88 -161.99 1140.8 -162.137 1005.48C-162.338 838.46 -100.889 729.422 -8.25866 623.391C-8.25866 623.391 36.3535 584.333 57.3641 597.266C92.6583 619.035 118.869 660.063 139.908 706.542C148.468 725.508 156.179 745.386 163.284 765.228C165.183 770.526 167.036 775.81 168.845 781.08C181.439 817.684 192.233 853.415 202.88 882.157C236.429 972.781 293.276 1086.73 301.989 1181.78C308.527 1253.04 328.509 1321.09 349.148 1389.47C359.99 1425.39 371.01 1461.42 380.349 1498.03C387.39 1525.67 385.231 1550.42 376.135 1569.52C361.223 1601.01 327.364 1617.28 285.243 1606.32Z"
        fill="#2E3247"
      />
      <path
        opacity="0.1"
        d="M-7.91504 591.111C-48.8272 622.12 -84.8721 655.818 -114.714 690.96C-245.997 846.34 -134.939 977.97 -134.939 977.97C-102.768 1021.83 -70.8744 1065.85 -38.4482 1109.58C17.066 1184.45 55.6666 1267.06 156.852 1312.77C191.596 1328.46 234.133 1352.05 281.545 1368.81C279.823 1361.8 278.015 1354.85 276.121 1347.98C263.032 1300.19 246.821 1255.47 238.28 1216.97C211.306 1095.59 210.989 924.04 122.036 830.926C55.3495 761.074 23.06 676.69 -7.91504 591.111Z"
        fill="#434861"
      />
      <path
        opacity="0.08"
        d="M-160.035 989.79C-160.035 989.79 -135.378 1105.8 -93.7905 1180.47C-52.2033 1255.14 -12.3821 1332.25 34.7712 1363.55C81.9246 1394.85 161.273 1369.72 199.374 1298.93C237.475 1228.14 195.327 1128.08 195.327 1128.08C182.885 1095.62 170.522 1063.12 158.034 1030.7C136.63 975.171 120.585 918.007 84.9781 872.017C62.0675 842.379 28.9842 791.085 -4.18287 780.275C-36.1125 769.877 -108.526 807.411 -131.12 856.289C-153.714 905.166 -168.508 925.035 -160.03 989.806L-160.035 989.79Z"
        fill="#5A5F7A"
      />
    </g>
    <defs>
      <clipPath id="clip0_1_3085">
        <rect width="320" height="960" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

export const SidebarNavigationFooter: React.FC<
  SidebarNavigationFooterProps
> = () => {
  return (
    <footer
      className={clsx([
        `flex list-none mt-[32px] pl-[16px] p-[8px] bg-[url(${landscapesIllustration})] bg-no-repeat bg-cover`,
      ])}
    >
      <div>{cypressSVGLogo}</div>
      <div className={clsx('ml-auto flex flex-col ')}>
        <div className={clsx('p-1')}>
          <IconArrowRight className={clsx('p1 bg-gray-900')} />
        </div>
        <div className={clsx('p-1')}>
          <IconActionQuestionMarkDefault />
        </div>
      </div>
    </footer>
  )
}

import * as React from 'react'
import clsx from 'clsx'

export interface SidebarNavigationFooterProps {}

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

export const SidebarNavigationFooter: React.FC<
  SidebarNavigationFooterProps
> = () => {
  return (
    <footer className={clsx('list-none pl-[32px] py-[8px]')}>
      <div>{cypressSVGLogo}</div>
    </footer>
  )
}

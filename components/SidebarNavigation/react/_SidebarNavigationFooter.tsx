import * as React from 'react'
import clsx from 'clsx'
import {
  IconActionQuestionMarkDefault,
  IconArrowRight,
} from '@cypress-design/react-icon'

const cypressLogo = (
  <svg
    width="33"
    height="32"
    viewBox="0 0 33 32"
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
      d="M2.31325 16C2.31325 8.39688 8.4768 2.23333 16.0799 2.23333V0C7.24336 0 0.0799179 7.16344 0.0799179 16H2.31325Z"
      fill="url(#paint0_linear_14495_912)"
    />
    <path
      d="M16.0799 29.7667C8.4768 29.7667 2.31325 23.6031 2.31325 16H0.0799179C0.0799179 24.8366 7.24336 32 16.0799 32V29.7667Z"
      fill="url(#paint1_linear_14495_912)"
    />
    <path
      d="M16.0799 2.23333C23.683 2.23333 29.8466 8.39688 29.8466 16H32.0799C32.0799 7.16344 24.9165 0 16.0799 0V2.23333Z"
      fill="url(#paint2_linear_14495_912)"
    />
    <path
      d="M29.8466 16C29.8466 23.6031 23.683 29.7667 16.0799 29.7667V32C24.9165 32 32.0799 24.8366 32.0799 16H29.8466Z"
      fill="url(#paint3_linear_14495_912)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_14495_912"
        x1="0.0799179"
        y1="16"
        x2="16.0799"
        y2="0"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#ACE8CF" />
        <stop offset="1" stop-color="#58CE9D" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_14495_912"
        x1="0.0799179"
        y1="16"
        x2="16.0799"
        y2="32"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#ACE8CF" />
        <stop offset="0.951184" stop-color="white" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_14495_912"
        x1="16.0799"
        y1="0"
        x2="32.0799"
        y2="16"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#59CE9D" />
        <stop offset="1" stop-color="#58D09E" stop-opacity="0.37" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_14495_912"
        x1="32.0799"
        y1="16"
        x2="16.0799"
        y2="32"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#58D09E" stop-opacity="0.41" />
        <stop offset="0.6875" stop-color="#58D09E" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>
)

export interface SidebarNavigationFooterProps {}

export const SidebarNavigationFooter: React.FC<
  SidebarNavigationFooterProps
> = () => {
  return (
    <footer className={clsx([`flex list-none mt-[32px] pl-[16px] p-[8px]`])}>
      {cypressLogo}
      <div className={clsx('ml-auto flex flex-col gap-[8px]')}>
        <div
          className={clsx(
            'flex items-center justify-center p-0 w-[32px] h-[32px] bg-gray-800 rounded-[32px]',
          )}
        >
          <IconArrowRight />
        </div>
        <div
          className={clsx(
            'flex items-center justify-center p-0 w-[32px] h-[32px] bg-gray-800 rounded-[32px]',
          )}
        >
          <IconActionQuestionMarkDefault />
        </div>
      </div>
    </footer>
  )
}

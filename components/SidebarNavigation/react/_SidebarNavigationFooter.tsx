import * as React from 'react'
import clsx from 'clsx'
import {
  IconActionQuestionMarkDefault,
  IconArrowRight,
  IconTechnologyCypress,
} from '@cypress-design/react-icon'

export interface SidebarNavigationFooterProps {}

export const SidebarNavigationFooter: React.FC<
  SidebarNavigationFooterProps
> = () => {
  return (
    <footer className={clsx([`flex list-none mt-[32px] pl-[16px] p-[8px]`])}>
      <IconTechnologyCypress />
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

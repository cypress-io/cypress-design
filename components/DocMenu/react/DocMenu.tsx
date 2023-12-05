import * as React from 'react'
import { NavGroup, NavItemLink } from '@cypress-design/constants-docmenu'
import { DocLink, LinkComponentType } from './_DocLink'
import { DocGroup } from './_DocGroup'
import clsx from 'clsx'

export type NavItem = NavGroup | NavItemLink

export interface DocMenuProps extends React.HTMLAttributes<HTMLUListElement> {
  items: NavItem[]
  activePath?: string
  collapsible?: boolean
  LinkComponent?: LinkComponentType
}

export const DocMenu: React.FC<DocMenuProps> = ({
  items,
  activePath = '<unknown>',
  collapsible = true,
  LinkComponent = 'a',
  ...rest
}) => {
  const [activeTop, setActiveTop] = React.useState(0)
  const [activeHeight, setActiveHeight] = React.useState(36)
  const [hasActiveItem, setHasActiveItem] = React.useState(false)

  const container = React.useRef<HTMLDivElement>(null)

  const setActivePos = React.useCallback(
    (opts: { top: number; height: number }) => {
      const containerTop = container.current?.getBoundingClientRect().top || 0
      setHasActiveItem(true)
      setActiveTop(opts.top - containerTop)
      setActiveHeight(opts.height)
    },
    [],
  )

  return (
    <div ref={container}>
      {hasActiveItem ? (
        <div
          className="absolute h-[36px] w-[4px] z-50 rounded-full bg-indigo-500 transition-all duration-300 ml-[6.5px] mt-[4px]"
          style={{
            top: `${activeTop + 4}px`,
            height: `${activeHeight - 8}px`,
          }}
        />
      ) : null}
      <ul {...rest} className={clsx('list-none p-0', rest.className)}>
        {items.map((item, index) =>
          'items' in item ? (
            <li key={index} className="relative list-none p-0">
              <DocGroup
                index={index}
                group={item}
                activePath={activePath}
                collapsible={collapsible}
                LinkComponent={LinkComponent}
                onActive={setActivePos}
                onCollapse={() => setHasActiveItem(false)}
              />
            </li>
          ) : (
            <DocLink
              key={index}
              item={item}
              active={item.href === activePath}
              collapsible={collapsible}
              LinkComponent={LinkComponent}
            />
          ),
        )}
      </ul>
    </div>
  )
}

export default DocMenu

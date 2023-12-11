import * as React from 'react'
import { IconChevronDownSmall } from '@cypress-design/react-icon'
import clsx from 'clsx'
import {
  type NavGroup,
  type NavItemLink,
  classes,
} from '@cypress-design/constants-docmenu'
import {
  DocLink,
  type DocLinkForward,
  type LinkComponentType,
} from './_DocLink'

export interface DocGroupProps {
  group: NavGroup
  activePath: string
  collapsible: boolean
  onActivePosition: (opts: { top: number; height: number }) => void
  updateMarkerPosition?: () => void
  depth?: number
  LinkComponent?: LinkComponentType
  hideMarker: () => void
}

export interface DocGroupForward {
  reTriggerSetActiveGroup: () => void
}

export const DocGroup = React.forwardRef<DocGroupForward, DocGroupProps>(
  (
    {
      group,
      activePath,
      collapsible,
      depth = 0,
      onActivePosition,
      updateMarkerPosition,
      LinkComponent = 'a',
      hideMarker,
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(group.collapsed !== true)
    const $groupElements = React.useRef<DocGroupElementsForward>(null)

    function toggleMenu(open: boolean) {
      if (!collapsible) return
      setOpen(open)
    }

    const hasActiveItemRecursively = React.useCallback(
      (items = group.items): boolean => {
        return items.some((item) => {
          if ('items' in item) {
            return hasActiveItemRecursively(item.items)
          }
          return item.href === activePath
        })
      },
      [group.items, activePath],
    )

    const Head = collapsible ? 'button' : group.href ? 'a' : 'div'

    const setActivePosition = React.useCallback(
      ({ top, height }: { top: number; height: number }) => {
        if (open) {
          onActivePosition({ top, height })
        }
      },
      [onActivePosition, open],
    )

    function reTriggerSetActiveGroup() {
      $groupElements.current?.reTriggerSetActiveGroup()
    }

    React.useEffect(() => {
      if (hasActiveItemRecursively()) {
        if (open) {
          reTriggerSetActiveGroup()
        } else {
          hideMarker()
        }
      } else {
        updateMarkerPosition?.()
      }
    }, [open, updateMarkerPosition, hideMarker, hasActiveItemRecursively])

    React.useImperativeHandle(ref, () => ({
      reTriggerSetActiveGroup,
    }))

    const onUpdateMarkerPosition = React.useCallback(() => {
      if (hasActiveItemRecursively()) {
        reTriggerSetActiveGroup()
      } else {
        updateMarkerPosition?.()
      }
    }, [hasActiveItemRecursively, updateMarkerPosition])

    return (
      <>
        <Head
          onClick={() => toggleMenu(!open)}
          href={group.href}
          className={clsx(classes.button, {
            [classes.topButton]: depth === 0,
            [classes.leafButton]: depth,
            'text-indigo-500': activePath === group.href,
          })}
        >
          {collapsible ? (
            <IconChevronDownSmall
              stroke-color="gray-400"
              size={depth ? '8' : '16'}
              className={clsx(classes.expandedIcon, {
                'rotate-0': open,
                '-rotate-90': !open,
                'ml-[16px]': depth,
              })}
            />
          ) : null}
          {group.label}
        </Head>
        <DocGroupElements
          ref={$groupElements}
          className={!open ? 'hidden' : undefined}
          items={group.items}
          activePath={activePath}
          collapsible={collapsible}
          depth={depth}
          onActivePosition={setActivePosition}
          updateMarkerPosition={onUpdateMarkerPosition}
          LinkComponent={LinkComponent}
          hideMarker={hideMarker}
        />
      </>
    )
  },
)

export interface DocGroupElementsProps
  extends React.HTMLAttributes<HTMLUListElement> {
  items: (NavGroup | NavItemLink)[]
  activePath: string
  collapsible: boolean
  onActivePosition: (opts: { top: number; height: number }) => void
  updateMarkerPosition?: () => void
  depth: number
  LinkComponent: LinkComponentType
  hideMarker: () => void
  className?: string
}

export interface DocGroupElementsForward {
  reTriggerSetActiveGroup: () => void
}

export const DocGroupElements = React.forwardRef<
  DocGroupElementsForward,
  DocGroupElementsProps
>(
  (
    {
      items,
      activePath,
      collapsible,
      depth = 0,
      onActivePosition,
      updateMarkerPosition,
      LinkComponent,
      hideMarker,
      className,
      ...rest
    },
    ref,
  ) => {
    const $groups = React.useRef<DocGroupForward[]>([])
    const $items = React.useRef<DocLinkForward[]>([])

    const hasActiveItemRecursively = React.useCallback(
      (localItems = items): boolean => {
        return localItems.some((item) => {
          if ('items' in item) {
            return hasActiveItemRecursively(item.items)
          }
          return item.href === activePath
        })
      },
      [items, activePath],
    )

    function reTriggerSetActiveGroup() {
      $groups.current.forEach((group) => {
        group?.reTriggerSetActiveGroup()
      })
      $items.current.forEach((item) => {
        item?.setActiveMarkerPosition()
      })
    }

    React.useImperativeHandle(ref, () => ({
      reTriggerSetActiveGroup,
    }))

    const onUpdateMarkerPosition = React.useCallback(() => {
      if (hasActiveItemRecursively()) {
        reTriggerSetActiveGroup()
      } else {
        updateMarkerPosition?.()
      }
    }, [hasActiveItemRecursively, updateMarkerPosition])

    return (
      <ul
        {...rest}
        className={clsx('list-none p-0', className, {
          'border-l border-gray-100': depth === 0 && collapsible,
          'ml-[8px]': depth >= 0,
        })}
      >
        {items.map((item, index) =>
          'items' in item ? (
            <li key={index} className="relative list-none p-0">
              <DocGroup
                ref={(el: DocGroupForward) => {
                  $groups.current[index] = el
                }}
                group={item}
                activePath={activePath}
                depth={depth + 1}
                collapsible={collapsible}
                LinkComponent={LinkComponent}
                hideMarker={hideMarker}
                onActivePosition={onActivePosition}
                updateMarkerPosition={onUpdateMarkerPosition}
              />
            </li>
          ) : (
            <DocLink
              ref={(el: DocLinkForward) => {
                $items.current[index] = el
              }}
              key={index}
              item={item}
              active={item.href === activePath}
              collapsible={collapsible}
              depth={depth}
              onActive={onActivePosition}
              LinkComponent={LinkComponent}
            />
          ),
        )}
      </ul>
    )
  },
)

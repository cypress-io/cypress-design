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
import { MarkerIsMovingContext } from './markerIsMoving'

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

const hasActiveItemRecursively = (
  items: (NavGroup | NavItemLink)[],
  localActivePath: string,
): boolean => {
  return items.some((item) => {
    if ('items' in item) {
      return hasActiveItemRecursively(item.items, localActivePath)
    }
    return item.href === localActivePath
  })
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
    const $listWrapper = React.useRef<HTMLDivElement>(null)

    function toggleMenu(localOpen: boolean) {
      if (!collapsible) return
      hideShowAbsoluteMarker(localOpen)
      setOpen(localOpen)
      readjustMarkerPosition(localOpen)
    }

    const hasActiveItemRecursivelyMemo = React.useMemo(() => {
      return hasActiveItemRecursively(group.items, activePath)
    }, [group.items, activePath])

    const Head = collapsible ? 'button' : group.href ? 'a' : 'div'

    const setActivePosition = React.useCallback(
      ({ top, height }: { top: number; height: number }) => {
        if (open) {
          onActivePosition({ top, height })
        }
      },
      [onActivePosition, open],
    )

    const { setMarkerIsMoving } = React.useContext(MarkerIsMovingContext)

    function reTriggerSetActiveGroupParent() {
      $groupElements.current?.reTriggerSetActiveGroup()
    }

    /**
     * To make the marker follow smooth open/close animation of the menu groups
     * We replace the absolute marker by one in the link. After the transition, the
     * marker is replaced by the absolute one again.
     */
    function hideShowAbsoluteMarker(localOpen: boolean) {
      $listWrapper.current?.addEventListener(
        'transitionstart',
        () => {
          setMarkerIsMoving(true)
        },
        { once: true },
      )
      $listWrapper.current?.addEventListener(
        'transitionend',
        () => {
          if (localOpen || !hasActiveItemRecursivelyMemo) {
            updateMarkerPosition?.()
          }
          setMarkerIsMoving(false)
        },
        { once: true },
      )
    }

    function readjustMarkerPosition(localOpen: boolean) {
      if (hasActiveItemRecursivelyMemo) {
        if (localOpen) {
          reTriggerSetActiveGroupParent()
        } else {
          hideMarker()
        }
      } else {
        updateMarkerPosition?.()
      }
    }

    React.useImperativeHandle(ref, () => ({
      reTriggerSetActiveGroup: reTriggerSetActiveGroupParent,
    }))

    const onUpdateMarkerPosition = React.useCallback(() => {
      if (hasActiveItemRecursivelyMemo) {
        reTriggerSetActiveGroupParent()
      } else {
        updateMarkerPosition?.()
      }
    }, [hasActiveItemRecursivelyMemo, updateMarkerPosition])

    return (
      <>
        <Head
          onClick={() => toggleMenu(!open)}
          href={group.href}
          className={clsx(classes.button, {
            [classes.topButton]: depth === 0,
            [classes.leafButton]: depth,
            'text-indigo-500 dark:text-indigo-400': activePath === group.href,
            'text-gray-900 dark:text-gray-100':
              hasActiveItemRecursivelyMemo && activePath !== group.href,
            'text-gray-800 dark:text-gray-200':
              !hasActiveItemRecursivelyMemo && activePath !== group.href,
          })}
        >
          {collapsible ? (
            <IconChevronDownSmall
              stroke-color="gray-400"
              size={depth ? '8' : '16'}
              className={clsx(classes.expandedIcon, {
                'rotate-0': open,
                '-rotate-90': !open,
                'ml-[28px]': depth,
              })}
            />
          ) : null}
          {group.label}
        </Head>
        <div
          className={clsx('grid transition-all relative', {
            'grid-rows-[0fr]': !open && collapsible,
            'grid-rows-[1fr]': open || !collapsible,
          })}
          ref={$listWrapper}
        >
          {open && collapsible && depth === 0 ? (
            <div className={classes.openListBorderLeft} />
          ) : null}
          <DocGroupElements
            ref={$groupElements}
            className="overflow-hidden"
            items={group.items}
            activePath={activePath}
            collapsible={collapsible}
            depth={depth}
            onActivePosition={setActivePosition}
            updateMarkerPosition={onUpdateMarkerPosition}
            LinkComponent={LinkComponent}
            hideMarker={hideMarker}
          />
        </div>
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
  reTriggerSetActiveGroup: (index?: number) => void
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

    const reTriggerSetActiveGroup = React.useCallback(
      (index: number = 0) => {
        $items.current.forEach((item) => {
          item?.setActiveMarkerPosition()
        })
        // calculate the index of the calling group in the list of groups
        // "index" is the index of the calling group in the list of items (groups and links)
        const indexGroup =
          index -
          // remove all the items that are not groups from the array and count them
          items.slice(0, index).filter((item) => !('items' in item)).length

        // only update groups that come after the toggled one
        // others will not need to update the marker
        // since they are "before" in the rendering tree
        $groups.current.slice(indexGroup + 1).forEach((group) => {
          group?.reTriggerSetActiveGroup()
        })
      },
      [items],
    )

    React.useImperativeHandle(ref, () => ({
      reTriggerSetActiveGroup,
    }))

    const onUpdateMarkerPosition = React.useCallback(
      (index: number) => {
        if (hasActiveItemRecursively(items, activePath)) {
          reTriggerSetActiveGroup(index)
        } else {
          updateMarkerPosition?.()
        }
      },
      [updateMarkerPosition, reTriggerSetActiveGroup, items, activePath],
    )

    return (
      <ul {...rest} className={clsx('list-none p-0', className)}>
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
                updateMarkerPosition={() => onUpdateMarkerPosition(index)}
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
              onActive={(opts) =>
                depth < 0 ? hideMarker() : onActivePosition(opts)
              }
              LinkComponent={LinkComponent}
            />
          ),
        )}
      </ul>
    )
  },
)

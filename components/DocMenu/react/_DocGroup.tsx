import * as React from 'react'
import { IconChevronDownSmall } from '@cypress-design/react-icon'
import clsx from 'clsx'
import {
  type NavGroup,
  type NavItemLink,
  classes,
} from '@cypress-design/constants-docmenu'
import {
  Context,
  DocLink,
  type DocLinkForward,
  type LinkComponentType,
} from './_DocLink'

export interface DocGroupProps {
  group: NavGroup
  context: Context
  onActivePosition: (opts: { top: number; height: number }) => void
  updateMarkerPosition: () => void
  markerIsMoving: boolean
  depth?: number
  LinkComponent?: LinkComponentType
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
      depth = 0,
      onActivePosition,
      markerIsMoving,
      context,
      updateMarkerPosition,
      LinkComponent = 'a',
    },
    ref,
  ) => {
    const { setMarkerIsMoving, activePath, collapsible, hideMarker } = context

    const hasActiveItemRecursivelyMemo = React.useMemo(() => {
      return hasActiveItemRecursively(group.items, activePath)
    }, [group.items, activePath])

    const [open, setOpen] = React.useState(!group.collapsed)
    const $groupElements = React.useRef<DocGroupElementsForward>(null)
    const $listWrapper = React.useRef<HTMLDivElement>(null)

    const toggleMenu = (localOpen: boolean) => {
      if (!collapsible || markerIsMoving) return
      hideShowAbsoluteMarker(localOpen)
      setOpen(localOpen)
      readjustMarkerPosition(localOpen)
    }

    const Head = collapsible ? 'button' : group.href ? 'a' : 'div'

    const setActivePosition = React.useCallback(
      ({ top, height }: { top: number; height: number }) => {
        if (open) {
          onActivePosition({ top, height })
        }
      },
      [onActivePosition, open],
    )

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
            updateMarkerPosition()
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
        updateMarkerPosition()
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
          className={clsx('relative', collapsible && 'transition-all grid', {
            'grid-rows-[0fr]': !open && collapsible,
            'grid-rows-[1fr]': open && collapsible,
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
            depth={depth}
            context={context}
            markerIsMoving={markerIsMoving}
            onActivePosition={setActivePosition}
            updateMarkerPosition={onUpdateMarkerPosition}
            LinkComponent={LinkComponent}
          />
        </div>
      </>
    )
  },
)

export interface DocGroupElementsProps
  extends React.HTMLAttributes<HTMLUListElement> {
  items: (NavGroup | NavItemLink)[]
  onActivePosition: (opts: { top: number; height: number }) => void
  markerIsMoving: boolean
  updateMarkerPosition?: () => void
  depth: number
  LinkComponent: LinkComponentType
  className?: string
  context: Context
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
      depth = 0,
      onActivePosition,
      updateMarkerPosition,
      markerIsMoving,
      LinkComponent,
      className,
      context,
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

    const { activePath, hideMarker } = context

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
                depth={depth + 1}
                LinkComponent={LinkComponent}
                markerIsMoving={markerIsMoving}
                context={context}
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
              depth={depth}
              markerIsMoving={markerIsMoving}
              context={context}
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

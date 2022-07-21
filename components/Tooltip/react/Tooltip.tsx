import clsx from 'clsx'
import * as React from 'react'
import {
  Placement,
  offset,
  flip,
  arrow,
  autoUpdate,
  useFloating,
  useInteractions,
  useHover,
  useFocus,
  useRole,
  useDismiss,
  safePolygon,
  FloatingPortal,
} from '@floating-ui/react-dom-interactions'

export interface TooltipProps {
  /**
   * Where the tooltip should be placed relative to the target.
   */
  placement?: Placement
  /**
   * background color of the tooltip.
   */
  color?: 'light' | 'dark'
  className?: string
  tabIndex?: number | string
  children?: React.ReactNode
  /**
   * The content of the tooltip.
   */
  popper?: React.ReactNode
}

const ROTATE_MAP = {
  bottom: 180,
  left: 270,
  top: 0,
  right: 90,
}

export const Tooltip: React.FC<
  TooltipProps & React.HTMLProps<HTMLDivElement>
> = ({ placement, color = 'light', className, children, popper, ...rest }) => {
  const arrowRef = React.useRef(null)
  const [open, setOpen] = React.useState(false)

  const [container] = React.useState(() => {
    // This will be executed only on the initial render
    // https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
    return document.createElement('div')
  })

  React.useEffect(() => {
    document.body.appendChild(container)
    return () => {
      document.body.removeChild(container)
    }
  }, [])

  const {
    x,
    y,
    reference,
    floating,
    strategy,
    placement: calculatedPlacement,
    context,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
  } = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    middleware: [flip(), offset(0), arrow({ element: arrowRef, padding: 24 })],
    whileElementsMounted: autoUpdate,
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      handleClose: safePolygon(),
    }),
    useFocus(context),
    useRole(context, { role: 'tooltip' }),
    useDismiss(context),
  ])

  const placementSide = calculatedPlacement.split('-')[0]
  const arrowRotate = ROTATE_MAP[placementSide]

  let arrowXRule = 'left',
    arrowYRule = 'top'

  if (arrowX && arrowY) {
    arrowXRule = 'left'
    arrowYRule = 'top'
  } else if (arrowX) {
    arrowXRule = 'left'
    arrowYRule = placementSide === 'top' ? 'bottom' : 'top'
  } else if (arrowY) {
    arrowXRule = placementSide === 'left' ? 'right' : 'left'
    arrowYRule = 'top'
  }

  return (
    <>
      <div
        {...getReferenceProps()}
        ref={reference}
        className={className}
        {...rest}
      >
        {children}
      </div>
      <FloatingPortal>
        {open && (
          <div
            {...getFloatingProps({
              ref: floating,
              style: {
                position: strategy,
                top: y ?? '',
                left: x ?? '',
                padding: '16px',
              },
            })}
          >
            <svg
              ref={arrowRef}
              viewBox="0 0 48 48"
              width="24"
              height="24"
              className={clsx('absolute', [
                color === 'dark' && 'stroke-gray-800 fill-gray-900',
                color === 'light' && 'stroke-gray-100 fill-white',
              ])}
              style={{
                transform: `rotate(${arrowRotate}deg)`,
                filter:
                  placementSide === 'bottom' || color === 'dark'
                    ? undefined
                    : 'drop-shadow(0 1px 1px rgba(225, 227, 237, .8))',
                [arrowXRule]: `${arrowX ?? -6}px`,
                [arrowYRule]: `${arrowY ?? -6}px`,
              }}
              fill="none"
            >
              <rect x="0" y="0" width="48" height="4" strokeWidth="0" />
              <path
                d="M 0 3 C 12 3 18 18 24 18 C 30 18 36 3 48 3"
                stroke-width="2"
              />
            </svg>
            <div
              className={clsx(
                'rounded shadow border p-8px text-16px leading-24px min-w-160px text-center',
                [
                  color === 'dark' &&
                    'bg-gray-900 shadow-gray-800 border-gray-800',
                  color === 'light' &&
                    'bg-white shadow-gray-100 border-gray-100',
                  (!x || !y) && 'invisible',
                ]
              )}
            >
              {popper}
            </div>
          </div>
        )}
      </FloatingPortal>
    </>
  )
}

export default Tooltip

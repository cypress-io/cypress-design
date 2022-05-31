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
} from '@floating-ui/react-dom-interactions'

export interface TooltipProps {
  placement?: Placement
  color?: 'light' | 'dark'
  className?: string
  children?: React.ReactNode
  popper?: React.ReactNode
}

const ROTATE_MAP = {
  bottom: 180,
  left: 270,
  top: 0,
  right: 90,
}

export const Tooltip: React.FC<TooltipProps> = ({
  placement,
  color = 'light',
  className,
  children,
  popper,
}) => {
  const arrowRef = React.useRef(null)
  const [open, setOpen] = React.useState(false)

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
    middleware: [flip(), offset(0), arrow({ element: arrowRef, padding: 8 })],
    whileElementsMounted: autoUpdate,
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      handleClose: safePolygon({
        restMs: 50,
      }),
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
      <div {...getReferenceProps()} ref={reference} className={className}>
        {children}
      </div>
      {open && (
        <div
          {...getFloatingProps({
            ref: floating,
            className: 'Tooltip',
            style: {
              position: strategy,
              top: y ?? '',
              left: x ?? '',
              padding: '16px',
            },
          })}
        >
          <div
            className={clsx(
              'rounded shadow border p-8px text-16px leading-24px min-w-160px text-center',
              [
                color === 'dark' &&
                  'bg-gray-900 shadow-gray-800 border-gray-800',
                color === 'light' && 'bg-white shadow-gray-100 border-gray-100',
              ]
            )}
          >
            <svg
              ref={arrowRef}
              viewBox="0 0 48 24"
              width="24"
              height="12"
              className={clsx('absolute', {
                'stroke-gray-800 fill-gray-900': color === 'dark',
                'stroke-gray-100 fill-white': color === 'light',
              })}
              style={{
                transform: `rotate(${arrowRotate}deg)`,
                filter:
                  placementSide === 'bottom'
                    ? undefined
                    : color === 'dark'
                    ? 'drop-shadow(0 0 2px rgba(30, 30, 30, 1))'
                    : 'drop-shadow(0 1px 1px rgba(225, 227, 237, .8))',
                [arrowXRule]: `${arrowX ?? 0}px`,
                [arrowYRule]: `${arrowY ?? 6}px`,
              }}
              fill="none"
            >
              <rect x="0" y="0" width="48" height="4" strokeWidth="0" />
              <path
                d="M 0 3 C 12 3 18 18 24 18 C 30 18 36 3 48 3"
                stroke-width="2"
              />
            </svg>
            {popper}
          </div>
        </div>
      )}
    </>
  )
}

export default Tooltip

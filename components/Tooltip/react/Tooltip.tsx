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
} from '@floating-ui/react-dom-interactions'

export interface TooltipProps {
  placement?: Placement
  color?: 'light' | 'dark'
  className?: string
  children?: React.ReactNode
  popper?: React.ReactNode
}

const ROTATE_MAP = {
  top: 180,
  right: 270,
  bottom: 0,
  left: 90,
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
    middleware: [flip(), offset(16), arrow({ element: arrowRef, padding: 8 })],
    whileElementsMounted: autoUpdate,
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context),
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
            },
          })}
          className={clsx(
            'rounded shadow border p-8px text-16px leading-24px min-w-160px text-center',
            [
              color === 'dark' && 'bg-gray-900 shadow-gray-800 border-gray-800',
              color === 'light' && 'bg-white shadow-gray-100 border-gray-100',
            ]
          )}
        >
          <svg
            ref={arrowRef}
            viewBox="0 0 24 12"
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
                  : 'drop-shadow(0 -1px 1px rgba(225, 227, 237, 1))',
              [arrowXRule]: `${arrowX ?? -17}px`,
              [arrowYRule]: `${arrowY ?? -11}px`,
            }}
            fill="none"
          >
            <rect x="0" y="10" width="24" height="2" strokeWidth="0" />
            <path d="M 0 10.5 C 6 10.5 9 3 12 3 C 15 3 18 10.5 24 10.5" />
          </svg>
          {popper}
        </div>
      )}
    </>
  )
}

export default Tooltip

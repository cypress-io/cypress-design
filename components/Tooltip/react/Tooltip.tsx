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
  color,
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
            'bg-white rounded shadow shadow-gray-100 border border-gray-100 p-8px text-16px leading-24px min-w-160px text-center'
          )}
        >
          <svg
            ref={arrowRef}
            viewBox="0 0 24 12"
            width="24"
            height="12"
            className="absolute stroke-gray-100 fill-white"
            style={{
              transform: `rotate(${arrowRotate}deg)`,
              filter: `drop-shadow(0 -2px 1px rgba(225, 227, 237, .5))`,
              [arrowXRule]: `${arrowX ?? -17}px`,
              [arrowYRule]: `${arrowY ?? -11}px`,
            }}
            fill="none"
          >
            <line
              x1="0"
              y1="11.5"
              x2="22"
              y2="11.5"
              stroke="white"
              stroke-width="2"
            />
            <path d="M 0 10.5 C 6 10.5 9 3 12 3 C 15 3 18 10.5 24 10.5" />
          </svg>
          {popper}
        </div>
      )}
    </>
  )
}

export default Tooltip

import clsx from 'clsx'
import * as React from 'react'
import { createPortal } from 'react-dom'
import {
  Placement,
  offset,
  flip,
  arrow,
  shift,
  autoUpdate,
  useFloating,
  useInteractions,
  useHover,
  useFocus,
  useRole,
  useDismiss,
  safePolygon,
  OffsetOptions,
  ShiftOptions,
} from '@floating-ui/react'

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
  children?: React.ReactNode
  /**
   * The content of the tooltip.
   */
  popper?: React.ReactNode
  /**
   * classname for the popper container
   */
  popperClassName?: string
  /**
   * Disable the tooltip.
   * This hides the popper and makes the tooltip inactive.
   */
  disabled?: boolean
  /**
   * If true, the tooltip will be hidden when hovering the popper/tooltip
   */
  interactive?: boolean
  /**
   * If set, the tooltip will always respect the given placement
   */
  forcePlacement?: boolean
  /**
   * If true, the tooltip will be open.
   */
  open?: boolean
  /**
   * The padding between the arrow and the edges of the floating element. The default is 24px
   */
  arrowPadding?: number
  /**
   * Options for shifting the floating element to keep it in view. The default is { padding: 16 }
   */
  shiftOptions?: ShiftOptions
  /**
   * Options for translating the floating element along the specified axes.
   * The default is 16px
   */
  offsetOptions?: OffsetOptions | number
}

const ROTATE_MAP = {
  bottom: 180,
  left: 270,
  top: 0,
  right: 90,
}

export const Tooltip: React.FC<
  TooltipProps & React.HTMLProps<HTMLDivElement>
> = ({
  placement,
  color = 'light',
  className,
  popperClassName,
  children,
  popper,
  disabled,
  interactive,
  forcePlacement,
  open: _open = false,
  arrowPadding = 24,
  shiftOptions = {
    padding: 16,
  },
  offsetOptions = 16,
  ...rest
}) => {
  const arrowRef = React.useRef(null)
  const [open, setOpen] = React.useState(_open)

  React.useEffect(() => {
    setOpen(_open)
  }, [_open])

  const {
    floatingStyles,
    refs,
    placement: calculatedPlacement,
    context,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
  } = useFloating({
    placement,
    open,
    onOpenChange: (newOpen) => !_open && setOpen(newOpen),
    middleware: [
      forcePlacement
        ? {
            name: 'no-flip',
            fn: (obj) => obj,
          }
        : flip(),
      offset(offsetOptions),
      arrow({ element: arrowRef, padding: arrowPadding }),
      shift(shiftOptions),
    ],
    whileElementsMounted: autoUpdate,
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      handleClose: interactive ? safePolygon() : undefined,
      enabled: !disabled && !_open,
    }),
    useFocus(context, {
      enabled: !disabled && !_open,
    }),
    useRole(context, { role: 'tooltip' }),
    useDismiss(context, {
      enabled: !_open,
    }),
  ])

  const placementSide = calculatedPlacement.split(
    '-',
  )[0] as keyof typeof ROTATE_MAP
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

  const getColors = () => {
    switch (color) {
      case 'light':
        return {
          svg: 'stroke-none fill-white',
          block: 'text-gray-900 border-transparent',
          background: 'bg-white',
        }
      case 'dark':
        return {
          svg: 'stroke-none fill-gray-900',
          block: 'text-white border-transparent',
          background: 'bg-gray-900',
        }
      default:
        return {}
    }
  }

  const colors = getColors()

  return (
    <>
      <div
        ref={refs.setReference}
        className={className}
        {...rest}
        {...getReferenceProps()}
      >
        {children}
      </div>
      {disabled
        ? null
        : open
          ? // NOTE: we could have used the "FloatingPortal" component
            // but it fails miserably and the native portal from react 18 is great...
            createPortal(
              <div
                ref={refs.setFloating}
                style={{ ...floatingStyles, zIndex: 100 }}
                role="tooltip"
                className={popperClassName}
                {...getFloatingProps()}
              >
                <div
                  className={clsx('rounded shadow-tooltip border', [
                    colors.background,
                    colors.block,
                  ])}
                >
                  <svg
                    ref={arrowRef}
                    viewBox="0 0 48 24"
                    width="24"
                    height="12"
                    className={clsx('absolute z-10', colors.svg)}
                    style={{
                      transform: `rotate(${arrowRotate}deg)`,
                      filter:
                        placementSide === 'bottom' || color === 'dark'
                          ? 'drop-shadow(0 1px 1px rgba(225, 227, 237, .3))'
                          : 'drop-shadow(0 1px 1px rgba(225, 227, 237, .8))',
                      [arrowXRule]: `${arrowX ?? -16}px`,
                      [arrowYRule]: `${arrowY ? arrowY + 6 : -10}px`,
                    }}
                    fill="none"
                  >
                    <rect x="0" y="0" width="48" height="4" strokeWidth="0" />
                    <path
                      d="M 0 3 C 12 3 18 18 24 18 C 30 18 36 3 48 3"
                      strokeWidth="2"
                    />
                  </svg>
                  <div
                    className={clsx(
                      'rounded text-[16px] leading-[24px] min-w-[160px] text-center p-[8px] relative z-20',
                      colors.background,
                    )}
                  >
                    <span className="sr-only">Tooltip: </span>
                    {popper}
                  </div>
                </div>
              </div>,
              document.body,
              'cy-tooltip-portal',
            )
          : null}
    </>
  )
}

export default Tooltip

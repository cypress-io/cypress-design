export interface Tab {
  id: string
  /**
   * The label of the tab
   */
  label: string
  /**
   * is the tab active
   * (multiple tabs can be active at the same time)
   */
  active?: boolean
  /**
   * icon on the left side of the label
   */
  icon?: any
  /**
   * icon on the right side of the label
   */
  iconAfter?: any
  /**
   * icon on the left side of the label
   * (overrides icon prop)
   */
  iconBefore?: any
  tag?: string
  /**
   * allows for tabs to be links as well
   * NOTE: the link will be prevented from navigating. It is only there for accessibility, semantics, SEO and right click -> open in new tab
   */
  href?: string
}

export const classesMap = {
  default: {
    wrapper:
      'p-[4px] inline-flex gap-[8px] rounded border border-gray-100 bg-white text-gray-700 relative',
    button:
      'flex items-center px-[12px] h-[24px] leading-[20px] text-[14px] rounded font-medium whitespace-nowrap',
    active: 'text-black relative z-20',
    activeStatic: '!text-white',
    inActive: 'hover:bg-gray-50',
    activeMarker:
      'absolute bottom-[4px] top-[4px] rounded duration-300 ease-in-out',
    activeMarkerColor:
      'bg-indigo-500 filter hue-rotate-180 brightness-200 saturate-150 z-10',
    activeMarkerBlender:
      'z-30 bg-white mix-blend-difference pointer-events-none',
    activeMarkerStatic:
      'bg-indigo-500 absolute -z-10 rounded right-0 left-0 bottom-0 top-0',
    tag: '',
  },
  'dark-small': {
    wrapper:
      'p-[4px] inline-flex gap-[4px] rounded border border-gray-900 bg-gray-1000 text-gray-400 relative',
    button:
      'flex items-center px-[8px] h-[20px] leading-[16px] text-[12px] rounded font-medium whitespace-nowrap',
    active: 'text-black relative z-20',
    activeStatic: '!text-white',
    inActive: 'hover:bg-gray-900',
    activeMarker:
      'absolute bottom-[4px] top-[4px] rounded duration-300 ease-in-out',
    activeMarkerColor:
      'bg-gray-800 filter hue-rotate-180 brightness-200 saturate-150 z-10',
    activeMarkerBlender:
      'z-30 bg-white mix-blend-difference pointer-events-none',
    activeMarkerStatic:
      'bg-gray-800 absolute -z-10 rounded right-0 left-0 bottom-0 top-0',
    tag: '',
  },
  'dark-default': {
    wrapper:
      'p-[4px] inline-flex gap-[8px] rounded border border-gray-900 bg-gray-1000 text-gray-400 relative',
    button:
      'flex items-center px-[12px] h-[24px] leading-[20px] text-[14px] rounded font-medium whitespace-nowrap',
    active: 'text-black relative z-20',
    activeStatic: '!text-white',
    inActive: 'hover:bg-gray-900',
    activeMarker:
      'absolute bottom-[4px] top-[4px] rounded duration-300 ease-in-out',
    activeMarkerColor:
      'bg-gray-800 filter hue-rotate-180 brightness-200 saturate-150 z-10',
    activeMarkerBlender:
      'z-30 bg-white mix-blend-difference pointer-events-none',
    activeMarkerStatic:
      'bg-gray-800 absolute -z-10 rounded right-0 left-0 bottom-0 top-0',
    tag: '',
  },
  'underline-small': {
    wrapper:
      'py-[4px] flex gap-[8px] border-b border-gray-100 text-gray-700 dark:text-white relative',
    button:
      'flex items-center px-[12px] h-[24px] leading-[20px] text-[14px] rounded font-medium whitespace-nowrap relative',
    active: 'text-gray-900 dark:text-gray-400 z-20',
    activeStatic: 'relative',
    inActive:
      'before:transition-color before:duration-300 before:absolute hover:before:bg-gray-200 before:bottom-[-6.5px] before:h-[4px] before:left-0 before:right-0 before:rounded-full',
    activeMarker:
      'absolute bottom-[-2.5px] h-[4px] rounded-full z-10 duration-300 ease-in-out',
    activeMarkerColor: 'bg-indigo-500',
    activeMarkerBlender: 'hidden',
    activeMarkerStatic:
      'absolute bg-indigo-500 rounded-full right-0 left-0 bottom-[-6.5px] h-[4px]',
    tag: 'ml-[8px] px-[4px] bg-indigo-300/20 rounded text-gray-500 text-[12px] leading-[16px]',
  },
  'underline-large': {
    wrapper:
      'py-[4px] flex gap-[8px] border-b border-gray-100 text-gray-700 dark:text-white relative',
    button:
      'flex items-center px-[12px] h-[32px] leading-[24px] text-[16px] rounded font-medium whitespace-nowrap relative',
    active: 'text-gray-900 dark:text-gray-400 z-20',
    activeStatic: 'relative',
    inActive:
      'before:transition-color before:duration-300 before:absolute hover:before:bg-gray-200 before:bottom-[-6.5px] before:h-[4px] before:left-0 before:right-0 before:rounded-full',
    activeMarker:
      'absolute bottom-[-2.5px] h-[4px] rounded-full z-10 duration-300 ease-in-out',
    activeMarkerColor: 'bg-indigo-500',
    activeMarkerBlender: 'hidden',
    activeMarkerStatic:
      'absolute bg-indigo-500 rounded-full right-0 left-0 bottom-[-6.5px] h-[4px]',
    tag: '',
  },
} as const

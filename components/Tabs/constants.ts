export interface Tab {
  id: string
  label: string
  active?: boolean
  icon?: any
  iconAfter?: any
  iconBefore?: any
  tag?: string
}

export const classesMap = {
  default: {
    wrapper:
      'p-[4px] inline-flex gap-[8px] rounded border border-gray-100 bg-white text-gray-700 relative',
    button:
      'flex items-center px-[12px] h-[24px] leading-[20px] text-[14px] rounded font-medium whitespace-nowrap',
    active: 'text-black relative z-20',
    inActive: 'hover:bg-gray-50',
    activeMarker:
      'absolute bottom-[4px] top-[4px] rounded  duration-300 ease-in-out',
    activeMarkerColor:
      'bg-indigo-500 hue-rotate-180 brightness-200 saturate-150 z-10',
    activeMarkerBlender:
      'z-30 bg-white mix-blend-difference pointer-events-none',
    tag: '',
  },
  'underline-small': {
    wrapper:
      'py-[4px] flex gap-[8px] border-b border-gray-100 text-gray-700 relative',
    button:
      'flex items-center px-[12px] h-[24px] leading-[20px] text-[14px] rounded font-medium whitespace-nowrap relative',
    active: 'text-gray-900 z-20',
    inActive:
      'before:transition-color before:duration-300 before:absolute hover:before:bg-gray-200 before:bottom-[-6.5px] before:h-[4px] before:left-0 before:right-0 before:rounded-full',
    activeMarker:
      'absolute bottom-[-2.5px] h-[4px] rounded-full z-10 duration-300 ease-in-out',
    activeMarkerColor: 'bg-indigo-500',
    activeMarkerBlender: 'hidden',
    tag: 'ml-[8px] px-[4px] bg-indigo-300/20 rounded text-gray-500 text-[12px] leading-[16px]',
  },
  'underline-large': {
    wrapper:
      'py-[4px] flex gap-[8px] border-b border-gray-100 text-gray-700 relative',
    button:
      'flex items-center px-[12px] h-[32px] leading-[24px] text-[16px] rounded font-medium whitespace-nowrap relative',
    active: 'text-gray-900 z-20',
    inActive:
      'before:transition-color before:duration-300 before:absolute hover:before:bg-gray-200 before:bottom-[-6.5px] before:h-[4px] before:left-0 before:right-0 before:rounded-full',
    activeMarker:
      'absolute bottom-[-2.5px] h-[4px] rounded-full z-10 duration-300 ease-in-out',
    activeMarkerColor: 'bg-indigo-500',
    activeMarkerBlender: 'hidden',
    tag: '',
  },
} as const

export interface Tab {
  id: string
  label: string
  active?: boolean
}

export const classesMap = {
  default: {
    wrapper:
      'p-[4px] inline-flex gap-[8px] rounded border border-gray-100 bg-white text-gray-700 relative',
    button:
      'flex items-center px-[12px] h-[24px] leading-[20px] text-[14px] rounded font-medium',
    active: 'text-black relative z-20',
    inActive: 'hover:bg-gray-50',
    activeMarker:
      'absolute bottom-[4px] top-[4px] rounded  duration-300 ease-in-out',
    activeMarkerColor:
      'bg-indigo-500 hue-rotate-180 brightness-200 saturate-150 z-10',
    activeMarkerBlender:
      'z-30 bg-white mix-blend-difference pointer-events-none',
  },
  'underline-small': {
    wrapper:
      'p-[4px] inline-flex gap-[8px] rounded border border-gray-100 bg-white text-gray-700 relative',
    button:
      'flex items-center px-[12px] h-[24px] leading-[20px] text-[14px] rounded font-medium',
    active: 'text-gray-1000 relative z-20',
    inActive: 'hover:bg-gray-50',
    activeMarker:
      'absolute bottom-[4px] top-[4px] rounded z-10 duration-300 ease-in-out bg-indigo-500 hue-rotate-180 brightness-200 saturate-150',
    activeMarkerColor:
      'bg-indigo-500 hue-rotate-180 brightness-200 saturate-150',
    activeMarkerBlender:
      'absolute bottom-[4px] top-[4px] rounded z-30 duration-300 ease-in-out bg-white mix-blend-difference pointer-events-none',
  },
  'underline-large': {
    wrapper:
      'p-[4px] inline-flex gap-[8px] rounded border border-gray-100 bg-white text-gray-700 relative',
    button:
      'flex items-center px-[12px] h-[24px] leading-[20px] text-[14px] rounded font-medium',
    active: 'text-gray-1000 relative z-20',
    inActive: 'hover:bg-gray-50',
    activeMarker:
      'absolute bottom-[4px] top-[4px] rounded z-10 duration-300 ease-in-out bg-indigo-500 hue-rotate-180 brightness-200 saturate-150',
    activeMarkerColor:
      'bg-indigo-500 hue-rotate-180 brightness-200 saturate-150',
    activeMarkerBlender:
      'absolute bottom-[4px] top-[4px] rounded z-30 duration-300 ease-in-out bg-white mix-blend-difference pointer-events-none',
  },
} as const

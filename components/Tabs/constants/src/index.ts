import type { OpenIconProps } from '@cypress-design/icon-registry'
export { default as throttle } from './throttle'

type IconProps = Omit<OpenIconProps, 'name'>

export interface Tab {
  id: string
  /**
   * The label of the tab
   */
  label: string
  /**
   * is the tab active
   * (multiple tabs can be active at the same time)
   * @deprecated use `activeId` prop instead
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
  [key: `data-${string}`]: any
}

export const variants = {
  default: {
    classes: {
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
      tag: 'ml-[8px] px-[4px] bg-gray-200/30 rounded text-gray-500 text-[12px] leading-[16px]',
    },
    icon: {
      size: '16',
      // <wind-keep fillColor="transparent"/>
      fillColor: 'transparent',
    } satisfies IconProps,
  },
  'dark-small': {
    classes: {
      wrapper:
        'p-[4px] inline-flex gap-[4px] rounded border border-gray-900 bg-gray-1000 text-gray-400 relative',
      button:
        'flex items-center px-[8px] h-[20px] leading-[16px] text-[12px] rounded font-medium whitespace-nowrap',
      active: 'text-white relative z-20',
      activeStatic: '',
      inActive: 'hover:bg-gray-900',
      activeMarker:
        'absolute bottom-[4px] top-[4px] rounded duration-300 ease-in-out',
      activeMarkerColor: 'z-10 bg-gray-800',
      activeMarkerBlender: 'z-30 mix-blend-overlay pointer-events-none',
      activeMarkerStatic:
        'bg-gray-800 absolute -z-10 rounded right-0 left-0 bottom-0 top-0',
      tag: 'ml-[8px] px-[4px] bg-gray-200/30 rounded text-gray-200 text-[12px] leading-[16px]',
    },
    icon: {
      size: '16',
      // <wind-keep fillColor="transparent"/>
      fillColor: 'transparent',
    } satisfies IconProps,
  },
  'dark-large': {
    classes: {
      wrapper:
        'p-[4px] inline-flex gap-[8px] rounded border border-gray-900 bg-gray-1000 text-gray-400 relative',
      button:
        'flex items-center px-[12px] h-[24px] leading-[20px] text-[14px] rounded font-medium whitespace-nowrap',
      active: 'text-white relative z-20',
      activeStatic: '',
      inActive: 'hover:bg-gray-900',
      activeMarker:
        'absolute bottom-[4px] top-[4px] rounded duration-300 ease-in-out',
      activeMarkerColor: 'z-10 bg-gray-800',
      activeMarkerBlender: 'z-30 mix-blend-overlay pointer-events-none',
      activeMarkerStatic:
        'bg-gray-800 absolute -z-10 rounded right-0 left-0 bottom-0 top-0',
      tag: 'ml-[8px] px-[4px] bg-gray-200/30 rounded text-gray-200 text-[12px] leading-[16px]',
    },
    icon: {
      size: '16',
      // <wind-keep fillColor="transparent"/>
      fillColor: 'transparent',
    } satisfies IconProps,
  },
  'underline-small': {
    classes: {
      wrapper:
        'py-[4px] flex gap-[8px] border-0 border-b border-solid border-gray-100 text-gray-700 relative',
      button:
        'flex items-center px-[12px] h-[24px] leading-[20px] text-[14px] rounded font-medium whitespace-nowrap hocus:no-underline relative',
      active: 'text-indigo-500 z-20',
      activeStatic: 'relative',
      inActive:
        'text-gray-700 hocus:no-underline hocus:text-gray-700 before:transition-color before:duration-300 before:absolute hover:before:bg-gray-200 before:bottom-[-6.5px] before:h-[4px] before:left-0 before:right-0 before:rounded-full',
      activeMarker:
        'absolute bottom-[-2.5px] h-[4px] rounded-full z-10 duration-300 ease-in-out',
      activeMarkerColor: 'bg-indigo-500',
      activeMarkerBlender: 'hidden',
      activeMarkerStatic:
        'absolute bg-indigo-500 rounded-full right-0 left-0 bottom-[-6.5px] h-[4px]',
      tag: 'ml-[8px] px-[4px] bg-gray-200/20 rounded text-gray-500 text-[12px] leading-[16px]',
    },
    icon: {
      size: '16',
      // <wind-keep fillColor="transparent"/>
      fillColor: 'transparent',
    } satisfies IconProps,
  },
  'underline-center': {
    classes: {
      wrapper:
        'py-[4px] flex justify-center items-center h-[64px] gap-[32px] text-gray-700 relative',
      subWrapper:
        'absolute bottom-0 left-0 right-0 block h-[1px] rounded-full bg-gradient-to-r from-transparent via-gray-100 via-gray-100 via-gray-100 to-transparent',
      button:
        'flex items-center px-[12px] h-full leading-[20px] text-[14px] rounded font-medium whitespace-nowrap hocus:no-underline relative',
      active: 'text-indigo-500 z-20',
      activeStatic: 'relative',
      inActive:
        'text-gray-700 hocus:no-underline hocus:text-gray-700 before:transition-color before:duration-300 before:absolute hover:before:bg-gray-200 before:bottom-[-5.5px] before:h-[4px] before:left-0 before:right-0 before:rounded-full',
      activeMarker:
        'absolute bottom-[-1.5px] h-[4px] rounded-full z-10 duration-300 ease-in-out',
      activeMarkerColor: 'bg-indigo-500',
      activeMarkerBlender: 'hidden',
      activeMarkerStatic:
        'absolute bg-indigo-500 rounded-full right-0 left-0 bottom-[-6.5px] h-[4px]',
      tag: 'ml-[8px] px-[4px] bg-indigo-300/20 rounded text-gray-500 text-[12px] leading-[16px]',
    },
    icon: {
      size: '16',
      // <wind-keep fillColor="transparent"/>
      fillColor: 'transparent',
    } satisfies IconProps,
  },
  'underline-large': {
    classes: {
      wrapper:
        'py-[4px] flex gap-[8px] border-0 border-b border-solid border-gray-100 text-gray-700 relative',
      button:
        'flex items-center px-[12px] h-[32px] leading-[24px] text-[16px] rounded font-medium whitespace-nowrap relative hocus:no-underline ',
      active: 'text-indigo-500 z-20',
      activeStatic: 'relative',
      inActive:
        'text-gray-700 hocus:text-gray-700 before:transition-color before:duration-300 before:absolute hover:before:bg-gray-200 before:bottom-[-6.5px] before:h-[4px] before:left-0 before:right-0 before:rounded-full',
      activeMarker:
        'absolute bottom-[-2.5px] h-[4px] rounded-full z-10 duration-300 ease-in-out',
      activeMarkerColor: 'bg-indigo-500',
      activeMarkerBlender: 'hidden',
      activeMarkerStatic:
        'absolute bg-indigo-500 rounded-full right-0 left-0 bottom-[-6.5px] h-[4px]',
      tag: 'ml-[8px] px-[4px] bg-gray-100/50 rounded text-gray-500',
    },
    icon: {
      size: '24',
      // <wind-keep fillColor="transparent"/>
      fillColor: 'transparent',
    } satisfies IconProps,
  },
} as const

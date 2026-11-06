// Every element sets the properties Tailwind's preflight would otherwise reset
// (dialog padding and border, button background and border, border styles),
// so the modal renders the same in apps that disable preflight.
export const ClassModal =
  'pointer-events-auto fixed box-border flex flex-col rounded border-0 bg-white p-0 outline outline-4 outline-gray-500/[.40] backdrop:bg-gray-900/[.80] backdrop:backdrop-blur-sm'
export const ClassModalStandardDimensions =
  'max-h-[80vh] min-w-[200px] sm:min-w-[390px] max-w-[calc(100vw-32px)] sm:max-w-[70vw] shrink-0'
export const ClassModalFullscreenDimensions =
  'h-[calc(100vh-32px)] sm:w-[calc(100vw-32px)]'

// Each size replaces ClassModalStandardDimensions entirely, so a fixed width
// is never clamped by its `sm:max-w-[70vw]`.
export const ClassModalSizes = {
  sm: 'max-h-[80vh] max-w-[calc(100vw-32px)] shrink-0 w-[480px]',
  md: 'max-h-[80vh] max-w-[calc(100vw-32px)] shrink-0 w-[592px]',
  lg: 'max-h-[80vh] max-w-[calc(100vw-32px)] shrink-0 w-[720px]',
  xl: 'max-h-[80vh] max-w-[calc(100vw-32px)] shrink-0 w-[840px]',
} as const
export type ModalSize = keyof typeof ClassModalSizes

export const ClassTitleBox =
  'flex shrink-0 items-center justify-between box-border rounded-t-md border-b border-gray-100 [border-bottom-style:solid] p-[16px] sm:px-[24px]'
export const ClassTitle = 'text-[18px] font-medium leading-[28px] text-gray-900'
export const ClassHelpLinkDash = 'mx-[8px] h-[1px] w-[32px] bg-gray-100'
export const ClassHelpLink =
  'flex items-center text-[16px] font-normal leading-[24px] text-indigo-500'
export const ClassCloseButton =
  'rounded-full border-0 bg-transparent p-[4px] outline-none focus-visible:ring-2 focus-visible:ring-indigo-500'
export const ClassContent = 'overflow-y-auto box-border p-[16px] sm:px-[24px]'
export const ClassFooter =
  'shrink-0 box-border border-t border-gray-100 [border-top-style:solid] p-[16px] sm:px-[24px]'

export * from './bodyScroll'

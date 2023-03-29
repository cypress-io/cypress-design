export interface Tab {
  id: string
  label: string
  active?: boolean
}

export const classes = {
  wrapper:
    'p-[4px] inline-flex gap-[8px] rounded border border-gray-100 bg-white text-gray-700',
  button:
    'flex items-center px-[12px] h-[24px] leading-[20px] text-[14px] rounded font-medium',
  active: 'bg-indigo-500 text-white',
  inActive: 'hover:bg-gray-50',
} as const

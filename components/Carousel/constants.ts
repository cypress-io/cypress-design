export const CssClasses = {
  carousel: 'relative overflow-hidden',
  navigation:
    'card absolute flex top-0 bottom-0 m-auto cursor-pointer rounded-full border border-gray-100 h-48px w-48px items-center justify-center',
  navigationNext: 'right-1',
  navigationPrev: 'left-1',
  pagination: 'flex justify-center mt-12',
  paginationDot:
    'inline-block rounded bg-gray-100 w-2 h-2 mx-6px cursor-pointer border border-gray-200 transition-all',
  paginationDotActive: 'bg-indigo-400 !border-indigo-500 w-6',
  slide: 'text-purple-500 w-full h-full flex-[1_0_100%] justify-center flex',
  slides: 'w-full h-full flex list-style-none scroll-smooth overflow-hidden',
}

export const SharedSettings = {
  foo: '-',
  bar: 42,
  baz: false,
}

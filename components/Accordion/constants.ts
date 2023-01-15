export const CssClasses = {
  details: '',
  summary:
    'details-none min-h-65px py-12px card open:rounded-b-none px-24px flex flex-row flex-nowrap items-center',
  summaryColor: 'bg-white',
  summaryTitle: 'text-18px leading-28px font-medium',
  summaryTitleColor: 'text-indigo-500',
  summaryDescription: 'text-14px leading-20px font-normal',
  summaryDescriptionColor: 'text-gray-700',
  icon: 'mr-24px flex-shrink-0',
  separator: 'w-1px h-40px bg-gray-100 mr-16px',
  chevron: 'flex-shrink-0 transition transform rotate-0 open:rotate-180',
  contentWrapper: 'border border-gray-100 rounded-b-md border-t-0',
  content: 'px-24px py-16px',
}

export interface AccordionProps {
  /**
   * Main indigo title.
   * > [NOTE] Its color and font can be customized using `titleClassName`.
   */
  title: string
  /**
   * Second line in the heading.
   */
  description?: string
  /**
   * Icon to be displayed on the left of the the heading.
   */
  icon?: any
  /**
   * Should we add a vertical separator between the icon and the text.
   */
  separator?: boolean
  /**
   * Change the font and color of the heading title
   */
  titleClassName?: string
  /**
   * Change the font and color of the heading description
   */
  descriptionClassName?: string
  /**
   * Additional classes to add to the header of the accordion
   * > [NOTE] useful to change the background color of the header
   */
  headingClassName?: string
  /**
   * When using content that needs ti be edge to edge,
   * removes the content wrapper from the content.
   */
  fullWidthContent?: boolean
}

export const FIGMA_URL =
  'https://www.figma.com/file/1WJ3GVQyMV5e7xVxPg3yID/Design-System?node-id=2232%3A3477'

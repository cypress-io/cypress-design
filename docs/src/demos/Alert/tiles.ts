// Demo ladder for the Alert page, simplest → most complex. The order here
// is the order on the page. Each `name` maps to vue/<name>.vue and
// react/<name>.tsx; a missing React file renders a placeholder tile.
export default [
  { name: 'Default', title: 'Default' },
  { name: 'Variants', title: 'Variants' },
  { name: 'Sizes', title: 'Sizes' },
  { name: 'SquareNoIcon', title: 'Square corners, no icon' },
  { name: 'Dismissible', title: 'Dismissible' },
  { name: 'Details', title: 'Collapsible details' },
  { name: 'Footer', title: 'Footer actions' },
]

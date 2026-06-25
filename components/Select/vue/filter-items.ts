import type { SelectItem } from '@cypress-design/constants-select'
import { getItemLabel, isSelectable } from '@cypress-design/constants-select'

export function filterAndCollapseHeadlines(
  items: SelectItem[],
  query: string,
): SelectItem[] {
  const trimmed = query.trim().toLowerCase()
  if (!trimmed) return items
  const keep = items.map((item) => {
    if (item.type === 'headline' || item.type === 'divider') return true
    if (item.type === 'button') return true
    const label = getItemLabel(item)
    // No label to match against (typically a `custom` row whose render
    // function is the opaque escape hatch). Keep these visible across any
    // query — they're not filterable by definition.
    if (!label) return true
    return label.toLowerCase().includes(trimmed)
  })
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (item.type !== 'headline') continue
    let hasContent = false
    for (let j = i + 1; j < items.length; j++) {
      const next = items[j]
      if (next.type === 'headline' || next.type === 'divider') break
      if (keep[j] && next.type !== 'button') {
        hasContent = true
        break
      }
    }
    if (!hasContent) keep[i] = false
  }
  return items.filter((_, i) => keep[i])
}

export function getSelectableIndices(items: SelectItem[]): number[] {
  const out: number[] = []
  items.forEach((item, i) => {
    if (isSelectable(item)) out.push(i)
  })
  return out
}

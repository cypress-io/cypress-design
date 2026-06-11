import type { SelectItem } from '@cypress-design/constants-select'
import { getItemLabel, isSelectable } from '@cypress-design/constants-select'

/**
 * Filter items by case-insensitive substring match against `label`.
 * Structural rows (headline / divider / button) are preserved; orphaned
 * headlines (those with no matching rows below them, up to the next
 * headline or divider) are dropped so the popover doesn't show stray
 * section headers after filtering.
 */
export function filterAndCollapseHeadlines(
  items: SelectItem[],
  query: string,
): SelectItem[] {
  const trimmed = query.trim().toLowerCase()
  if (!trimmed) return items

  // First pass: mark every item as kept or dropped.
  const keep = items.map((item) => {
    if (item.type === 'headline' || item.type === 'divider') return true
    if (item.type === 'button') return true
    const label = getItemLabel(item)
    if (!label) return true
    return label.toLowerCase().includes(trimmed)
  })

  // Second pass: drop headlines that have no non-structural kept item before
  // the next headline / divider.
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

/**
 * Indices of items that participate in keyboard traversal and selection.
 */
export function getSelectableIndices(items: SelectItem[]): number[] {
  const out: number[] = []
  items.forEach((item, i) => {
    if (isSelectable(item)) out.push(i)
  })
  return out
}

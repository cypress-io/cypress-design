import type { SelectItem } from './index'
import { getItemLabel, isInteractive, isSelectable } from './index'

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
    // No label to match against (typically a `custom` row whose render
    // function is the opaque escape hatch). Keep these visible across any
    // query — they're not filterable by definition.
    if (!label) return true
    return label.toLowerCase().includes(trimmed)
  })

  // Second pass: drop a headline if no real option row survived the filter
  // under it (looking ahead until the next headline or divider). Buttons
  // don't count — a section that ends up containing only an action button
  // still reads as an orphaned header to the user, so we collapse it too.
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

  // Third pass: drop orphaned dividers. A divider is orphaned when it has
  // no meaningful sibling on at least one side — either the next or the
  // previous kept sibling is another divider or nothing. This catches:
  //   * leading divider: the filter removed everything above it, so it
  //     dangles at the top of the popover;
  //   * trailing divider: the filter removed everything below it;
  //   * adjacent dividers: a section between two dividers is emptied and
  //     both dividers collapse into one visual seam.
  // Look both directions so the leading-divider case (previously missed)
  // is caught alongside the trailing-divider case.
  for (let i = 0; i < items.length; i++) {
    if (items[i].type !== 'divider' || !keep[i]) continue
    let nextKept: SelectItem | undefined
    for (let j = i + 1; j < items.length; j++) {
      if (!keep[j]) continue
      nextKept = items[j]
      break
    }
    let prevKept: SelectItem | undefined
    for (let j = i - 1; j >= 0; j--) {
      if (!keep[j]) continue
      prevKept = items[j]
      break
    }
    const nextIsOrphan = !nextKept || nextKept.type === 'divider'
    const prevIsOrphan = !prevKept || prevKept.type === 'divider'
    if (nextIsOrphan || prevIsOrphan) keep[i] = false
  }

  return items.filter((_, i) => keep[i])
}

/**
 * Indices of items that can be SELECTED (set as the Select's value).
 * Used for the checkbox / aria-selected mapping. Headlines, dividers,
 * buttons, and value-less custom rows are excluded.
 */
export function getSelectableIndices(items: SelectItem[]): number[] {
  const out: number[] = []
  items.forEach((item, i) => {
    if (isSelectable(item)) out.push(i)
  })
  return out
}

/**
 * Indices that keyboard nav walks — selectable rows plus `button` rows so
 * in-list actions are reachable without a pointer.
 */
export function getInteractiveIndices(items: SelectItem[]): number[] {
  const out: number[] = []
  items.forEach((item, i) => {
    if (isInteractive(item)) out.push(i)
  })
  return out
}

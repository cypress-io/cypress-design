---
name: spacing
description: Fetch when setting margins, padding, gaps, sizing, or any layout dimension. Skip for color-only or copy-only edits.
---

# Spacing — base-4 (4px baseline grid)

All margins, padding, gaps, spacing, and sizing values must align to a **4px baseline grid** — every value should be a multiple of 4 (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, …). This matches Tailwind's spacing scale where `h-4` == `height: 16px`, `p-2` == `padding: 8px`, etc. Don't reach for 5px, 7px, 10px, 14px, 18px — round to the nearest 4.

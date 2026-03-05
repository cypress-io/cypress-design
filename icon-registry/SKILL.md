---
name: add-icon-from-figma
description: Adds icons to the cypress-design icon-registry. Use when adding a new icon or when the user mentions icon-registry or icons-static. Requires Figma link and SVG (Copy as SVG).
---

# Add Icon

Step-by-step workflow for adding a new icon to the cypress-design system. See [ReadMe.md](https://github.com/cypress-io/cypress-design/blob/main/ReadMe.md#adding-a-new-icon) for canonical instructions.

## Step 1: Get inputs from user

Ask the user to provide:

1. **Figma link** – Link to the icon variant frame (e.g. `https://www.figma.com/design/...?node-id=16273-13239`). Used to derive the icon name, category, size, and style variant via `get_metadata`.
2. **SVG** – SVG from Copy as SVG (Right-click the frame → Copy/Paste as → Copy as SVG). This gives the correct viewBox and alignment.

**Workflow:**

1. Extract `node-id` from the Figma URL (e.g. `node-id=16273-13239` → `16273:13239`)
2. Call `mcp_Figma_Desktop_get_metadata` with that `nodeId` to get node name, width, height (for filename: size, style variant)
3. Derive the icon name/category from the Figma hierarchy (from metadata or user context)
4. Use the user-provided SVG as the source (do not fetch from MCP asset URLs)

## Step 2: Create icon file

- **Path**: `icon-registry/icons-static/`
- **Naming**: `<category>-<icon-name>[-small|-medium|-large][-outline]_x<dim>.svg`
- Append `-small`, `-medium`, or `-large` when Figma shows Size=Small/Medium/Large. Append `-outline` when Style=Outline. Create a new file for variants; do not overwrite the base icon.
- Size (`_x<dim>`) comes from the SVG viewBox (e.g. `viewBox="0 0 24 24"` → `_x24`). Metadata confirms it matches the frame.

## Step 3: Add and modify SVG content

Per [ReadMe](https://github.com/cypress-io/cypress-design/blob/main/ReadMe.md): remove width/height, use `currentColor`, add `icon-dark`/`icon-light` (or `icon-*-secondary`, `icon-dark-stroke icon-light-fill` for combined cases).

**Never modify viewBox.** Use the viewBox from the user-provided SVG as-is.

## Step 4: Changeset

**Add to existing changeset when possible.** Check `.changeset/` for a file that bumps the icon packages (icon-registry, react-icon, vue-icon). If one exists, edit it to add the new icon to the summary. If none exists, run `yarn changeset` and create one.

**Summary format:**

- Single icon: `Adding icon {icon-name}`
- Multiple icons: `Adding icons {name-1}, {name-2}, and {name-3}`

**Frontmatter** (same for all icon changesets, per [.changeset/config.json](https://github.com/cypress-io/cypress-design/blob/main/.changeset/config.json) fixed group):

```
---
'@cypress-design/icon-registry': minor
'@cypress-design/react-icon': minor
'@cypress-design/vue-icon': minor
---
```

## Step 5: Preview

```bash
yarn install && yarn start
```

Open `http://localhost:5173/Icons`, search for the icon name, and verify appearance.

## Step 6: Commit and PR

After human approval, commit changes and open a PR.

---

## Example

Examples are for reference only; do not create icons from them.

- `arrow-expand-small_x16.svg` — Icon / Arrow / Expand, x16, Size=Small
- `arrow-expand_x16.svg` — Icon / Arrow / Expand, x16, no size variant

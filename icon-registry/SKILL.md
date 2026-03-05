---
name: add-icon-from-figma
description: Adds icons to the cypress-design icon-registry. Use when adding a new icon or when the user mentions icon-registry or icons-static. Accepts Figma link or SVG code.
---

# Add Icon

Step-by-step workflow for adding a new icon to the cypress-design system. See [ReadMe.md](../ReadMe.md#adding-a-new-icon) for canonical instructions.

## Step 1: Get SVG

**Variant frame** = the 16×16 or 24×24 frame in Figma (not the inner path). Always select it; the MCP returns the inner asset otherwise.

**Option A (Figma link – preferred when Figma Desktop is open)**:

1. Extract `node-id` from the Figma URL (e.g. `node-id=1169-9738` → `1169:9738`)
2. Call `mcp_Figma_Desktop_get_design_context` and/or `get_metadata` with that `nodeId`
3. Note the Size variant (Small/Medium/Large) from the node name for the filename
4. Parse the response for the asset URL (e.g. `http://localhost:3845/assets/...svg`)
5. Run `curl -s "http://localhost:3845/assets/<hash>.svg"` in the terminal
6. Validate: SVG must have `viewBox="0 0 16 16"` or `viewBox="0 0 24 24"`. If not, use Option B.

**Option B**: Ask the user to copy as SVG from the variant frame (Right-click → Copy/Paste as → Copy as SVG).

## Step 2: Create icon file

- **Path**: `icon-registry/icons-static/`
- **Naming**: `<category>-<icon-name>[-small|-medium|-large]_x<dim>.svg`
- Append `-small`, `-medium`, or `-large` when Figma shows Size=Small/Medium/Large. Create a new file for variants; do not overwrite the base icon.
- Dimensions must match icon pixel size; if not, go up a layer in Figma.

## Step 3: Add and modify SVG content

Per [ReadMe](../ReadMe.md): remove width/height, use `currentColor`, add `icon-dark`/`icon-light` (or `icon-*-secondary`, `icon-dark-stroke icon-light-fill` for combined cases).

## Step 4: Changeset

```bash
yarn changeset
```

Use this changeset content (per [.changeset/config.json](../.changeset/config.json) fixed group):

```
---
'@cypress-design/icon-registry': minor
'@cypress-design/react-icon': minor
'@cypress-design/vue-icon': minor
---

Adding icon {icon-name}
```

For multiple icons: `Adding icons {name-1} and {name-2}`.

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

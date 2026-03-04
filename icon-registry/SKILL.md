---
name: add-icon-from-figma
description: Exports icons from Figma as SVG and adds them to the cypress-design icon-registry. Use when adding a new icon from Figma, exporting icons to the design system, or when the user mentions icon-registry or icons-static.
---

# Add Icon from Figma

Step-by-step workflow for adding a new icon to the cypress-design system. See [ReadMe.md](../ReadMe.md#adding-a-new-icon) for canonical instructions.

## Step 1: Export SVG from Figma

**Option A (Manual - primary)**: Right-click the icon layer in Figma → Copy/Paste as → Copy as SVG. This puts the SVG code on the clipboard. Reference: [copy-svg.png](../copy-svg.png) in repo root.

**Option B (Figma MCP - when available)**: Use `mcp_Figma_Desktop_get_design_context` with `nodeId` extracted from the Figma URL. For `node-id=6814-10841`, use `6814:10841`. Requires Figma Desktop open with the file. The response may include reference code that can be adapted to SVG.

## Step 2: Create icon file

- **Path**: `icon-registry/icons-static/`
- **Naming**: `<category>-<icon-name>_x<size>.svg` (e.g., `object-bug_x24.svg`)
- Category and name must match Figma layer structure
- Size (e.g., x24) must match icon dimensions (24x24px). If dimensions don't match, go up a layer in Figma.

## Step 3: Add and modify SVG content

Per the [ReadMe](../ReadMe.md):

- Remove `width` and `height` attributes from the SVG
- Replace main fill/stroke colors with `currentColor`
- Add `class="icon-dark"` to dark paths (typically strokes)
- Add `class="icon-light"` to light paths (typically fills)
- For secondary colors: `class="icon-*-secondary"`
- For paths with both fill and stroke: `class="icon-dark-stroke icon-light-fill"`

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

## Step 5: Preview

```bash
yarn install && yarn start
```

Open `http://localhost:5173/Icons` (or `http://127.0.0.1:5173/Icons.html`), search for the icon name, and verify appearance.

## Step 6: Commit and PR

After human approval, commit changes and open a PR.

---

## Example

Figma URL: `https://www.figma.com/design/1WJ3GVQyMV5e7xVxPg3yID/Design-System?node-id=6814-10841`

- **nodeId for MCP**: `6814:10841` (convert `-` to `:`)
- The actual icon name/category must be read from Figma (e.g., from layer panel) to determine the filename

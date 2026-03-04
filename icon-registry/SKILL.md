---
name: add-icon-from-figma
description: Adds icons to the cypress-design icon-registry. Use when adding a new icon or when the user mentions icon-registry or icons-static. Requires the user to provide the SVG code.
---

# Add Icon

Step-by-step workflow for adding a new icon to the cypress-design system. See [ReadMe.md](../ReadMe.md#adding-a-new-icon) for canonical instructions.

**Important**: Do NOT create icons from the example. The example is for reference only. The user must provide the SVG for the icon they want to add. If the user only provides a Figma link without SVG, ask them to copy the icon in Figma (Right-click → Copy/Paste as → Copy as SVG) and paste it here.

## Step 1: Get SVG from user

Ask the user to provide the SVG code. They can copy it from Figma: Right-click the icon layer → Copy/Paste as → Copy as SVG, then paste. Do not proceed until the user provides the SVG.

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

Naming: `arrow-collapse-small_x16.svg` for Icon / Arrow / Collapse, x16, Size=Small. Category and name come from the Figma layer structure; size from the icon dimensions.

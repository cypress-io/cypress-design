---
name: add-icon-from-figma
description: Adds icons to the cypress-design icon-registry. Use when adding a new icon or when the user mentions icon-registry or icons-static. Requires icon frame selection in Figma (or link) and SVG from Copy as SVG.
metadata:
  version: 1.0.0
---

# Add Icon

Step-by-step workflow for adding a new icon to the cypress-design system.

## Step 1: Get inputs from user

Ask the user to provide:

1. **Icon frame reference** (choose one):
   - **Preferred:** Select the icon variant frame in Figma. The Figma MCP will use the currently selected node when `nodeId` is omitted.
   - **Fallback:** Paste the Figma link to the icon variant frame (e.g. `https://www.figma.com/design/...?node-id=16273-13239`).
2. **SVG** (required) – The user must provide SVG code from Copy as SVG (Right-click the frame → Copy/Paste as → Copy as SVG). This gives the correct viewBox and alignment. **Never use SVG from the Figma MCP** — it does not export SVG; always use the user-provided SVG.

Selection is preferred: it avoids copy-pasting links and keeps Figma as the source of truth.

**Workflow:**

1. **If the user has selected the icon frame in Figma:** Call `get_metadata` and `get_design_context` **without** the `nodeId` parameter. The Figma MCP will use the currently selected node.
2. **If the user provided a Figma link:** Extract `node-id` from the URL (e.g. `node-id=16273-13239` → `16273:13239`) and pass it as `nodeId` to both tools.
3. Call `get_metadata` to get the variant frame's name, width, height (for filename: size, style variant).
4. **Derive icon name from design context:** Call `get_design_context`. The response includes a component/type name (e.g. `IconModifiedSquareAddedPlus`) that encodes the parent path (e.g. Icon / Modified / Square / Added - #plus). Parse it: split by PascalCase, skip the leading "Icon", join the rest with hyphens, lowercase → `modified-square-added-plus`.
5. Use the user-provided SVG as the source. **Never use SVG from the Figma MCP** — if the user has not provided SVG code, ask them for it before proceeding.
6. **Fallback:** When the component name cannot be parsed or is missing, **ask the user** for the icon name. Do not infer from branch names or other context.
7. If the SVG viewBox doesn't match the expected size (e.g. x24 should be 24x24), ask the user to try selecting the parent frame in Figma.

**Naming from design context:**

| Component name              | Filename                             |
| --------------------------- | ------------------------------------ |
| IconModifiedSquareAddedPlus | `modified-square-added-plus_x24.svg` |
| IconArrowExpand             | `arrow-expand_x16.svg`               |
| IconObjectBug               | `object-bug_x24.svg`                 |

Variant suffixes (Dimensions=x24, Size=Small) come from the variant frame metadata, not the component name.

## Step 2: Create icon file

- **Path**: `icon-registry/icons-static/`
- **Naming**: `<category>-<icon-name>[-small|-medium|-large][-outline]_x<dim>.svg`
- Append `-small`, `-medium`, or `-large` when Figma shows Size=Small/Medium/Large. Append `-outline` when Style=Outline. Create a new file for variants; do not overwrite the base icon.
- Size (`_x<dim>`) comes from the SVG viewBox (e.g. `viewBox="0 0 24 24"` → `_x24`). Metadata confirms it matches the frame.

## Step 3: Add and modify SVG content

Remove width/height, use `currentColor`, add `icon-dark`/`icon-light` (or `icon-*-secondary`, `icon-dark-stroke icon-light-fill` for combined cases).

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

**Naming source:** The icon name comes from the **parent component** of the variant frame. Call `get_design_context` (with the selected node or variant's nodeId)—the returned component name (e.g. `IconModifiedSquareAddedPlus`) encodes the path. Parse it: split by PascalCase, skip "Icon", join with hyphens, lowercase. Variant frames typically have names like "Dimensions=x16" or "Size=Small"—these describe the variant, not the icon.

---
name: Icon Export Skill
overview: Create a reusable skill/instruction file in the icon-registry folder for exporting icons from Figma and adding them to the cypress-design system, plus a separate history file documenting the prompts that led to this result.
todos: []
isProject: false
---

# Icon Export Skill and History Documentation

## Deliverables

1. **[SKILL.md](SKILL.md)** - Reusable skill for adding icons from Figma to the design system
2. **[HISTORY.md](HISTORY.md)** - Prompt history documenting how we arrived at the final skill

---

## 1. Skill File Structure (SKILL.md)

The skill will follow the [create-skill](.cursor/skills-cursor/create-skill/SKILL.md) format with YAML frontmatter and a workflow pattern. Key sections:

### Frontmatter

- `name`: `add-icon-from-figma`
- `description`: Specific, third-person, includes trigger terms (Figma, icon, export, icon-registry)

### Workflow Steps (aligned with [ReadMe.md](../ReadMe.md) "Adding a new icon" section)

**Step 1: Export SVG from Figma**

Two options to document:

- **Option A (Manual - primary)**: Right-click the icon layer in Figma → Copy/Paste as → Copy as SVG. This puts the SVG code on the clipboard. Reference: [copy-svg.png](../copy-svg.png) in repo root.
- **Option B (Figma MCP - when available)**: Use `mcp_Figma_Desktop_get_design_context` with `nodeId` extracted from the Figma URL. For `node-id=6814-10841`, use `6814:10841`. Requires Figma Desktop open with the file. The response may include reference code that can be adapted to SVG.

**Step 2: Create icon file**

- Path: `icons-static/`
- Naming: `<category>-<icon-name>_x<size>.svg` (e.g., `object-bug_x24.svg`)
- Category and name must match Figma layer structure
- Size (e.g., x24) must match icon dimensions (24x24px). If dimensions don't match, go up a layer in Figma.

**Step 3: Add and modify SVG content**

Per [ReadMe.md](../ReadMe.md) lines 98-104:

- Remove `width` and `height` attributes from the SVG
- Replace main fill/stroke colors with `currentColor`
- Add `class="icon-dark"` to dark paths (typically strokes)
- Add `class="icon-light"` to light paths (typically fills)
- For secondary colors: `class="icon-*-secondary"`
- For paths with both fill and stroke: `class="icon-dark-stroke icon-light-fill"`

**Step 4: Changeset**

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

**Step 5: Preview**

```bash
yarn install && yarn start
```

Open `http://localhost:5173/Icons` (or `http://127.0.0.1:5173/Icons.html`), search for the icon name, and verify appearance.

**Step 6: Commit and PR**

After human approval, commit changes and open a PR.

---

## 2. History File (HISTORY.md)

A chronological log of prompts that led to the skill:

| #   | Prompt summary                                                                                                     | Outcome                             |
| --- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------- |
| 1   | Create reusable skill for exporting icons from Figma and adding to design system; document prompts in history file | This plan                           |
| 2   | Use Figma icon (node-id=6814-10841) as example                                                                     | Example reference for skill         |
| 3   | Export SVG from Figma - explore best approach                                                                      | Document manual copy + Figma MCP    |
| 4   | Create icon file with naming convention                                                                            | Reference `icons-static` and ReadMe |
| 5   | Modify SVG per instructions                                                                                        | Reference ReadMe lines 98-104       |
| 6   | Run yarn changeset with specific format                                                                            | Fixed group format                  |
| 7   | Preview before commit                                                                                              | yarn start, Icons page, search      |
| 8   | Commit and create PR                                                                                               | Final step in workflow              |

The history file will be written in prose form, capturing the evolution of the request rather than a raw log.

---

## 3. Example Icon Reference

The Figma example: `https://www.figma.com/design/1WJ3GVQyMV5e7xVxPg3yID/Design-System?node-id=6814-10841`

- **nodeId for MCP**: `6814:10841` (convert `-` to `:`)
- The actual icon name/category must be read from Figma (e.g., from layer panel) to determine the filename

---

## 4. File Locations Summary

| File                       | Purpose                                    |
| -------------------------- | ------------------------------------------ |
| `SKILL.md`                 | Reusable instructions for the agent        |
| `HISTORY.md`               | Prompt history for this skill creation     |
| `icons-static/*.svg`       | Target directory for new icons             |
| `../ReadMe.md` (repo root) | Canonical "Adding a new icon" instructions |

---

## 5. Skill Placement

The skill will live in **project scope** at `SKILL.md`, so it is available to anyone working in this repo. It will be discoverable when users mention Figma, icons, icon-registry, or adding icons.

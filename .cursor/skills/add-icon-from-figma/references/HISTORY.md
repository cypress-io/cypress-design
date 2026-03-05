# Prompt History: Icon Export Skill

This document records the prompts that led to the creation of the [SKILL.md](../SKILL.md) file for adding icons from Figma to the cypress-design system.

## Evolution of the Request

The user wanted to create reusable instructions for exporting icons from Figma and adding them to the design system code. The skill should live in the `icon-registry` folder, and a separate history file should document how we arrived at the end result.

## Prompt 1: Initial Request

Create a reusable skill/instruction file for exporting icons from Figma and adding them to the design system. The skill should be located in the `icon-registry` folder. Document prompts in a separate history file in the same folder.

**Outcome**: This plan and the two deliverables (SKILL.md, HISTORY.md).

## Prompt 2: Example Icon

Use the Figma icon at `https://www.figma.com/design/1WJ3GVQyMV5e7xVxPg3yID/Design-System?node-id=6814-10841` as the example for the workflow.

**Outcome**: The example section in SKILL.md with nodeId `6814:10841` and the note that the icon name/category must be read from Figma (e.g., from the layer panel).

## Prompt 3: Export SVG from Figma

Explore the best way to export SVG from Figma. The goal is to obtain the SVG code; saving to a file is not strictly necessary.

**Outcome**: Two options documented in Step 1 of SKILL.md:

- **Option A (Manual)**: Right-click in Figma → Copy/Paste as → Copy as SVG. Reference to `copy-svg.png` in the repo.
- **Option B (Figma MCP)**: Use `mcp_Figma_Desktop_get_design_context` with the nodeId when Figma Desktop is open.

## Prompt 4: Create Icon File

Create the icon file inside `icon-registry/icons-static` using the naming convention described in the instructions.

**Outcome**: Step 2 documented with path, naming format `<category>-<icon-name>_x<size>.svg`, and alignment with Figma layer structure and dimensions.

## Prompt 5: Modify SVG Content

After creating the icon file, add the SVG code and modify it per the instructions linked from the GitHub README.

**Outcome**: Step 3 in SKILL.md with the full list of SVG modifications (remove width/height, replace colors with `currentColor`, add `icon-dark`/`icon-light` classes, etc.).

## Prompt 6: Changeset

Run `yarn changeset` and describe changes with the format for the three packages (`@cypress-design/icon-registry`, `@cypress-design/react-icon`, `@cypress-design/vue-icon`) with minor version bumps.

**Outcome**: Step 4 in SKILL.md with the exact changeset format and reference to the fixed group in `.changeset/config.json`.

## Prompt 7: Preview Before Commit

To preview the icon before committing to GitHub, run `yarn install`, `yarn start`, open localhost, go to the Icons page (e.g., `http://127.0.0.1:5173/Icons.html`), and search for the icon name.

**Outcome**: Step 5 in SKILL.md with the preview commands and URL.

## Prompt 8: Commit and PR

When the human is satisfied with the outcome, commit and create a PR.

**Outcome**: Step 6 in SKILL.md as the final step in the workflow.

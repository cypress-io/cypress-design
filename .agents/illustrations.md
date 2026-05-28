---
name: illustrations
description: Principles, style, theme, and guidelines for Cypress illustration work. Fetch when generating or reviewing illustrations, deciding on a visual approach, or briefing illustration work to AI or designers.
---

# Illustrations

Principles, style, theme, and guidelines for any Cypress illustration — marketing backgrounds, blog assets, product imagery, AI-generated work. The goal is an editorial watercolor language with a soft connection to the Cypress brand, not a heavy thematic universe. Landscape-inspired in feel, never literal scenery.

## Principles

**Establish a visual language and prompt against it relentlessly.** A documented style works because every constraint is encoded — palette, edges, contrast, framing, lighting, subject matter, and what to never do. Without the constraints written down, every generation drifts.

**Pick the right model for the style.** Different generative tools have different strengths. Don't assume one wins everywhere — compare outputs against the documented style before committing.

**Reuse a recognizable style across surfaces.** Marketing pages, blog assets, product illustrations, and editorial backgrounds sharing one visual language compounds brand equity. Style sprawl dilutes it.

**Tie illustrations to the feature they sell.** Each tab, section, or page gets one primary expression of the thing it's selling. If the focus is one button or one outcome, don't bury it in a wider scene.

**A static or animated illustration is often safer than a brand-new component.** When deadlines compress, swapping drastic UI changes for a polished image reduces risk without sacrificing perceived progress.

**Pick an illustration style the whole team can actually execute.** Advanced lighting, organic shapes, and painterly techniques look great in one designer's hands and fall apart when anyone else has to extend them. Bias toward styles that scale across the team — especially when there's no dedicated illustrator.

**Illustration is a craft. Patterns are not creativity.** Generating something that fits a pattern is not the same as creating something with intent. The taste and judgment that come from years of practice don't get replaced by a prompt — they're what make a prompt produce something worth shipping.

**Animated illustrations beat real recordings on marketing pages.** They tell a cleaner story, remove distracting detail, and age better than screenshots that go stale the moment the product changes.

**Ship retina-ready assets.** Always deliver @2x or vector. Blurry images immediately read as low-quality and undermine everything else on the page.

## House style

An editorial watercolor language. Atmospheric, landscape-inspired, restrained — never literal scenery, never decorative, never narrative. The connection to the brand is felt through mood, palette, and material — not stated through depicted subjects. Apply these constraints whenever generating or reviewing illustration work; they're what keep output from drifting between generations.

### Substrate

- Watercolor painted on very dark paper. Use `#1B1E2E` for general use and `#101118` for darker page backgrounds — match whatever page background the illustration sits on.
- Pigment is embedded in the darkness, not sitting on top of paper.
- No visible white or off-white paper anywhere in the image.
- No borders, torn edges, canvas edges, paper margins, or paper texture artifacts.
- Edges and washes bleed seamlessly into the canvas background with no visible boundary.

### Style

- Semi-abstract watercolor with visible pigment blooms, washes, and soft bleeding.
- Organic, painterly edges defined by tonal transitions — never drawn outlines, pencil sketches, ink lines, or heavy edge tracing.
- Edges read from color transitions and contrast, not from strokes.
- Avoid symmetry or mirrored layouts.
- Painterly and organic — not flat, not vector, not photorealistic, not cartoon or anime.

### Composition — backgrounds

- Visual mass and texture aggregate on the LEFT and RIGHT sides.
- The CENTER third stays calmer, darker, and lower contrast — reserved for headlines, body copy, and foreground illustrations.
- No central focal object on backgrounds.
- Shapes gently frame the center without enclosing it.
- If detail competes with legibility behind text, remove the detail. Prefer suggestion over definition.

### Composition — featured illustrations with a primary subject

- One primary subject, framed deliberately.
- Calm, confident composition; centered or intentionally offset, but balanced.
- One primary expression of the idea — no decorative noise stacked on top.
- Background must clearly contrast the subject's value range: dark subject → luminous background; light subject → deeper background.
- Silhouette clarity around the subject is mandatory.

### Palette (Cypress brand tokens)

Always map to the design-system tokens, not raw hex. Full token set hosted at `https://design.cypress.io/colors.css` and documented in [colors.md](./colors.md).

Base / background:

- `--cy-gray-1000` (`#1B1E2E`) — dominant. For darker page contexts you may see `#101118` in use; that's an off-token historical background — prefer `--cy-gray-1000` for new work.

Accent colors, used unevenly and restrained:

- **Jade** — `--cy-jade-300` (`#69D3A7`), `--cy-jade-400` (`#1FA971`) — primary energy / clarity / action
- **Purple** — `--cy-purple-300` (`#C8A7F5`), `--cy-purple-400` (`#A06CE4`) — depth, insight
- **Indigo** — `--cy-indigo-300` (`#9AA2FC`), `--cy-indigo-400` (`#6470F3`) — structure, depth, shadow
- **Teal** — `--cy-teal-300` (`#4BBFD2`), `--cy-teal-400` (`#0097A8`) — minimal, reflective
- **Orange** — `--cy-orange-300` (`#EDBB4A`), `--cy-orange-400` (`#DB7903`) — extremely restrained micro-accents only

Palette rules:

- Darkness dominates.
- Don't use all colors evenly — pick one primary energy color per piece.
- No pure white highlights.
- Avoid high saturation.
- Don't introduce hues outside this palette.

### Neutrals

- Cool, blue-leaning grays only (approx. HSL hue 220–235°), derived by desaturating indigo.
- No browns, tans, beige, or warm earth tones.

### Lighting and depth

- Internal, low-intensity, diffused lighting only.
- No visible light source, no spotlights, no bright highlights or glow clusters.
- Any glow is subtle and absorbed into surrounding pigment.
- Depth comes from tonal layering and overlap, not from value extremes.
- Lighting feels calm and intentional — never dramatic.

### Concept hierarchy (illustrations with a primary subject)

- The illustrated concept is the primary visual read.
- Background near the concept becomes quieter and less detailed; layering softens to create focus.
- The concept has clearer internal structure and visual stability than the surrounding field.
- Background may interact with or pass through the concept, but never overpower it.
- The illustrative form must be a bounded, intentional shape — not branching, fanning, fluid, or root-like. Feels engineered, evaluated, resolved.
- The form must be rendered in the same watercolor material as the background — never sticker-like, cut out, or floating on a clean void.

### Universal negative constraints

Never include:

- Text, letters, numbers, glyphs, runes, or symbols
- Logos, brand marks, or recognizable emblems
- UI elements, screens, panels, or interface metaphors
- Neon, glossy, metallic, or sci-fi materials
- Visible paper texture, white canvas, sketchbook borders, or exposed edges
- Literal landscapes, trees, plants, vines, or organic growth as the depicted subject — landscape character belongs to mood and texture, not to subject matter
- Sharp crystals, spikes, or fantasy ornamentation
- Medieval, ancient, or fantasy-dungeon aesthetics
- Characters or humanoid forms (unless the piece is intentionally about a person)
- Guns, firearms, or excessive aggression
- High-contrast focal points in the center of a background

### References protocol

- References are inspirational only — never copy specific subjects, poses, characters, compositions, or effects from them.
- Use prior Cypress illustration work for watercolor behavior, pigment density and bleed, contrast balance, glow softness, and overall mood.
- Use abstract landscape, geological, or material references for composition and atmospheric inspiration — not as instructions to depict those things literally.
- Spell out which references inform which property (e.g. "reference 1 for material feel; references 3+ for watercolor style only").

### Recommended model

- Nano Banana Pro currently produces the best results for this style.
- Compare any new model's output against the documented style and guidelines before committing.

### Calibration — when to adjust

- Reads elegant but generic → add a clearer subject or symbolic form for the piece's specific purpose.
- Reads as abstract process → emphasize the resolved result rather than the operation.
- Texture-heavy or busy → quiet the background near the subject and the content overlay area.
- Reads as a literal landscape or depicted scene → pull back. Landscape character is texture and mood, not subject matter. No "happy little trees."
- Subject blends into the background → adjust background luminosity in the opposite direction of the subject.

The result should feel intentional, atmospheric, restrained, and softly tied to the Cypress brand.

## Related

- [iconography.md](./iconography.md) — Icon-specific rules
- [colors.md](./colors.md) — Exact color tokens referenced in the palette
- [principles/ai.md](./principles/ai.md) — Using AI for generation
- [principles/visual-hierarchy.md](./principles/visual-hierarchy.md) — How illustration supports content hierarchy
- [index.md](./index.md) — Framing for why the design system matters and how illustration fits

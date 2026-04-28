# CSS Rules — BEM + Fluid Token Scaling

## Naming Convention (BEM)
- Use BEM: block__element--modifier
- Block: standalone component (header, card, product-grid)
- Element: part of a block (header__logo, card__title, product-grid__item)
- Modifier: variation of block/element (card--featured, card__title--large)

## Structure
- Horizon theme uses `{% stylesheet %}` tags inside sections, blocks, and snippets for scoped styles
- Global variables are in `snippets/theme-styles-variables.liquid` (auto-generated from settings)
- Project-specific custom variables go in `snippets/custom-variables.liquid`
- Fluid scaling tokens go in `assets/fluid-tokens.css` (shared across all sections)
- Only use external `/assets/section-{name}.css` files when styles are too large for inline or shared across multiple sections

## Formatting
- 2-space indentation
- One property per line
- Mobile first: write base styles for mobile, then @media for larger screens
- Group properties: positioning → box model → typography → visual → misc

---

## Fluid Scaling System (Token-Based)

### Concept
All values that scale use a proportional formula based on two global CSS variables:
- `--fluid-base` — viewport width of the Figma design (this project: 1440)
- `--fluid-cap` — viewport width where scaling stops growing (this project: 2560)

These are set in `theme.liquid` from theme settings ("Fluid scaling" in `settings_schema.json`).

### Token Convention
Tokens live in `assets/fluid-tokens.css` with the naming `--fluid-{mobile}-{desktop}`:
```css
--fluid-28-48: clamp(28px, calc(48 / var(--fluid-base) * 100vw), calc(48 / var(--fluid-base) * var(--fluid-cap) * 1px));
```
- First number = Figma mobile value (px)
- Second number = Figma desktop value (px)
- Order tokens by desktop value, smallest to largest

#### Same-Value Tokens (`--fluid-X-X`)
Tokens where mobile = desktop (e.g., `--fluid-32-32`) are **valid and expected**. They represent values that don't change between Figma mobile and desktop but MUST still scale proportionally above the design base (1440px). The mobile value acts as the floor — the value stays fixed from 0 to 1440px, then scales up to the cap.

Example: heading at 32px in both Figma mobile and desktop:
- `--fluid-32-32` → stays 32px up to 1440px, scales to ~57px at 2560px

### Formula
```css
--fluid-{mobile}-{desktop}: clamp(
  MOBILEpx,
  calc(DESKTOP / var(--fluid-base) * 100vw),
  calc(DESKTOP / var(--fluid-base) * var(--fluid-cap) * 1px)
);
```

### Workflow (How Tokens Get Created)
1. The dev provides values from Figma: "H1 is 28px mobile and 48px desktop"
2. Check if `--fluid-28-48` already exists in `fluid-tokens.css`
3. If NOT → add it to `fluid-tokens.css` with the full formula
4. Use `var(--fluid-28-48)` in the component — NEVER the formula inline
5. If it already exists → just use `var(--fluid-28-48)`, don't duplicate

**If a value is not provided:** ASK. Never invent Figma values.

### Token File Growth
The file starts empty and grows organically as sections are built:
```css
/* Hero section work */
--fluid-28-48: clamp(28px, ...);  /* h1 */
--fluid-15-18: clamp(15px, ...);  /* body */
--fluid-32-96: clamp(32px, ...);  /* section padding */

/* Footer work — reuses --fluid-15-18 */
--fluid-12-14: clamp(12px, ...);  /* small text */
```

### Override Per Section (navbar, footer, banner)
Full-width sections that need independent scaling get a `fluid_scale_override` setting:

```json
{
  "type": "select",
  "id": "fluid_scale_override",
  "label": "Scale behavior",
  "options": [
    { "value": "global", "label": "Use global setting" },
    { "value": "no_cap", "label": "Always scale (no cap)" },
    { "value": "1920",   "label": "Cap at 1920 px" },
    { "value": "2560",   "label": "Cap at 2560 px" }
  ],
  "default": "global",
  "info": "Controls how this section scales on large screens."
}
```

Liquid block for the override:
```liquid
{%- liquid
  assign override = section.settings.fluid_scale_override
  if override == 'global'
    assign section_cap = settings.fluid_scale_cap
  elsif override == 'no_cap'
    assign section_cap = '99999'
  else
    assign section_cap = override
  endif
-%}

<style>
  #shopify-section-{{ section.id }} {
    --fluid-cap: {{ section_cap }};
  }
</style>
```

---

## Full-Width Scaling Sections

When a section is full-width and scales with the viewport, **ALL interior elements** must use fluid tokens — not just section-level containers. This includes child components, UI elements, and any element whose dimensions should grow proportionally.

### What must scale inside a full-width section:
- **ALL font-sizes** — headings, body text, AND UI text (buttons, labels, prices)
- **ALL padding and gaps** — section-level AND component-level
- **ALL dimensions** — max-width, max-height, width, height of positioned elements
- **Container height** — use a fluid token, never fixed px

### What stays fixed:
- **Borders, border-radius, box-shadow** — always px
- **Mobile-only values** (below 750px breakpoint) — different layout, no scaling needed
- **Layout switches** (flex-direction, position, display) — stay as media queries

### Section Height
Use a fluid token for section height, not `aspect-ratio` with `min-height` (they conflict).

When the mobile height is larger than the desktop height (e.g., mobile hero at 780px, desktop at 740px), use the mobile value as the clamp floor:
```css
/* --fluid-780-740: clamp(780px, calc(740/base * 100vw), calc(740/base * cap * 1px)) */
height: var(--fluid-780-740);
```
This ensures the section never goes below 780px on tablet, and scales proportionally above ~1520px.

### Images Inside Scaling Sections
Background images and `<img>` tags must be sized for the **maximum container size at the cap viewport × 2 (retina)**:
- Calculate: max container width at cap ÷ 2 (if 50% column) × 2 (retina) = cap viewport width
- For CSS `background-image` (no srcset): use the higher width directly in `image_url`
- Serve different sizes per breakpoint to avoid loading oversized images on mobile:
```liquid
/* Mobile: viewport * 3x DPI */
--bg: url('{{ image | image_url: width: 1200 }}');
@media (min-width: 750px) {
  /* Desktop: max_column_width_at_cap * 2x retina */
  --bg: url('{{ image | image_url: width: 3000 }}');
}
```
- For `image_tag`: set `image_url: width:` to cover 2x retina at the max scaled display size

---

## Unit Rules by Property

### Scale with fluid token (`var(--fluid-X-Y)`)
- font-size — ALL text inside full-width scaling sections (headings, body, UI, buttons, labels)
- padding — section-level AND component-level inside scaling sections
- gap — section-level AND component-level inside scaling sections
- margin between sections
- dimensions (max-width, max-height, width, height) of positioned/constrained elements inside scaling sections

### Fixed in rem (standalone components NOT inside scaling sections)
- padding of buttons, cards, inputs, modals
- margin between elements inside a component
- gap inside component grids

### Fixed in px
- border-width, outline, box-shadow, border-radius

### In em
- width/height of inline icons and rating stars

### In % + constraint
- container width → `width: 100%; max-width: Xpx`
- grid columns → `fr`
- images → `width: 100%; aspect-ratio: X/Y; object-fit: cover`

### Component Spacing (fixed rem — standalone components only)

These values apply to components rendered **outside** full-width scaling sections (e.g., in the header, footer, modals, drawers). Inside scaling sections, use fluid tokens instead.

| Component | Padding | Gap |
|-----------|---------|-----|
| Button | `0.5rem 1rem` | `0.5rem` |
| Button small | `0.375rem 0.75rem` | `0.375rem` |
| Button large | `0.75rem 1.5rem` | `0.75rem` |
| Card | `1rem 1.5rem` | `0.75rem` |
| Card small | `0.75rem 1rem` | `0.5rem` |
| Input | `0.5rem 0.75rem` | — |
| Input large | `0.75rem 1rem` | — |
| Modal | `1.5rem 2rem` | `1rem` |
| Badge | `0.125rem 0.5rem` | — |

---

## Inside max-width Containers

When an element is inside a `max-width` container (e.g., header nav, mega menu, footer container, modals, sidebars):
- **DON'T** use fluid tokens for widths, heights, or max-widths — the container doesn't grow past its max-width
- **DO** use fluid tokens for font-sizes — readability still improves on larger viewports
- **DO** use fixed rem for gaps/padding — small adjustments don't break layout

**This is the OPPOSITE of full-width scaling sections** — where the container grows and everything inside must scale.

---

## Page-Width vs Full-Width Sections

Every section with a width setting must implement:
```css
/* Full-width: escape theme grid, no constraints */
.section--full-width {
  grid-column: 1 / -1;
}

/* Page-width: escape theme grid, constrain and center */
.section--page-width {
  grid-column: 1 / -1;
  max-width: var(--narrow-page-width, 1440px);
  margin-inline: auto;
}
```

---

## Images

- ALWAYS use Shopify's `image_tag` or `image_url` filters
- ALWAYS include `srcset` covering **2x retina at maximum scaled size**
- For scaling sections: max display width = column width at cap viewport (e.g., 50% of 2560 = 1280px). Retina = 2560px
- Mobile: cover **3x DPI** for high-end phones (414px × 3 = 1242px)
- ALWAYS include `width`, `height`, `loading="lazy"`, and descriptive `alt`
- Use `aspect-ratio` + `object-fit: cover` — NEVER fixed `height` on images
- For CSS `background-image` in scaling sections, serve responsive sizes via media queries in Liquid `{% style %}` blocks

## CSS Custom Properties
- Use custom properties for theming — never hardcode colors or font values
- **Font families**: ALWAYS use `var(--font-heading--family)` or `var(--font-body--family)`
- **Font sizes**: use `var(--fluid-X-Y)` tokens for ALL text inside scaling sections. Use theme `var(--font-size--*)` only for UI elements in non-scaling contexts (header nav, footer, modals)
- **Colors**: use scheme variables (`var(--color-foreground)`, `var(--color-primary)`, etc.). Hardcode hex only with comment for 1-4 occurrences
- **Spacing**: use `var(--fluid-X-Y)` inside scaling sections, fixed `rem` for standalone components

## Scope of Changes
- ONLY fix/format code that WE write or modify — do not reformat existing theme code
- If a file has inconsistent formatting from the original theme, leave it as-is unless we are working on that specific block
- Our code must be clean and properly indented even if surrounding code is not

## Strict Rules
- NEVER use !important unless overriding third-party code
- NEVER use IDs for styling, only classes
- NEVER nest selectors deeper than 3 levels
- NEVER use tag selectors for styling (no div {}, p {}, a {})
- NEVER use inline styles
- NEVER use `vw` alone without `clamp()` — always wrapped in a fluid token
- NEVER set fixed `height` in px on images — use `aspect-ratio`
- NEVER hardcode font-family — use theme variables
- NEVER write the clamp formula inline if the token already exists in `fluid-tokens.css`
- NEVER invent Figma values — always ask if not provided
- NEVER create two tokens with the same mobile-desktop pair
- NEVER hardcode the result of a calc — use the token
- NEVER use `aspect-ratio` on a section container when `min-height` is also needed — use a fluid height token instead
- NEVER leave image resolutions at base viewport size in scaling sections — size for cap × retina
- Avoid generic class names (.container, .wrapper) — prefix with block name
- If a rule MUST be violated, add a comment explaining why:
  ```css
  /* RULE EXCEPTION: !important needed to override Shopify checkout styles */
  .checkout-btn { color: var(--color-primary) !important; }
  ```

## Quick Decision Tree

1. Is it a border or shadow? → **px**
2. Is it a font-size inside a scaling section? → **var(--fluid-X-Y)** token (even UI text)
2b. Is it a font-size outside scaling sections (nav, footer, modals)? → **var(--font-size--*)** theme variable
3. Is it an icon next to text? → **em**
4. Is it padding/gap inside a scaling section? → **var(--fluid-X-Y)** token (even components)
4b. Is it padding/gap of a standalone component? → **rem** (see component spacing table)
5. Is it a section container height? → **var(--fluid-X-Y)** token (not aspect-ratio)
6. Is it the width of a container? → **max-width in px**
7. Is it an image proportion? → **aspect-ratio** + `width: 100%`
8. Is it a dimension inside a scaling section? → **var(--fluid-X-Y)** token
9. Is it a dimension inside a max-width container? → **px** or **rem** (not fluid)
10. None of the above → **rem** by default

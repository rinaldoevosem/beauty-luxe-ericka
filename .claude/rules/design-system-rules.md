# Design System Rules — Sterling Forever (Horizon)

## Color Palette

Only use colors from the approved Sterling Forever palette:

| Token | Hex | Usage |
|-------|-----|-------|
| Pure | `#FFFFFF` | White backgrounds, button text on dark |
| Porcelain | `#FAF8F7` | Off-white backgrounds, hover states on white |
| Cream Linen | `#F1E7DA` | Warm accent backgrounds |
| Silver Mist | `#D4D4D4` | Borders, dividers |
| Light Graphite | `#555555` | Body text, secondary text |
| Graphite | `#1F1F1F` | Primary text, headings on light bg |
| Cherry Editorial | `#8F1E2D` | Primary brand color, links, accents |
| Burgundy Deep | `#4A0E18` | Hover states, deep accent |
| Burgundy Black | `#310008` | Darkest tone, dark backgrounds, heading emphasis |

## Color Schemes (configured in config/settings_data.json)

The theme has 6 color schemes. Every section MUST support `color_scheme` setting:

| Scheme | Name | Background | Foreground | Primary |
|--------|------|------------|------------|---------|
| `scheme-1` | Pure White | `#FFFFFF` | `#555555` | `#8F1E2D` |
| `scheme-2` | Porcelain | `#FAF8F7` | `#555555` | `#8F1E2D` |
| `scheme-3` | Cream Linen | `#F1E7DA` | `#555555` | `#8F1E2D` |
| `scheme-4` | Cherry Editorial | `#8F1E2D` | `#FAF8F7` | `#FFFFFF` |
| `scheme-5` | Burgundy Black | `#310008` | `#FAF8F7` | `#FFFFFF` |
| `scheme-6` | Transparent | `rgba(0,0,0,0)` | `#FFFFFF` | `#FFFFFF` |

### CSS Variables from Color Schemes

When inside a `.color-{scheme}` container, these variables are available:
- `var(--color-background)` — section background
- `var(--color-foreground)` — body text
- `var(--color-foreground-heading)` — heading text
- `var(--color-primary)` — accent/link color
- `var(--color-primary-hover)` — accent hover
- `var(--color-border)` — borders and dividers
- `var(--color-button)` / `var(--color-button-text)` — primary button
- `var(--color-secondary-button)` / `var(--color-secondary-button-text)` — secondary button

## Color Priority (MANDATORY order)

1. **Color scheme CSS variables** — `var(--color-foreground)`, `var(--color-background)`, etc. ALWAYS preferred
2. **Derived/alpha variants** — `rgba(var(--color-foreground-rgb), 0.5)` for muted/subtle states
3. **Custom CSS property** (5+ occurrences) — Add to `snippets/custom-variables.liquid` with comment:
   ```css
   /* Custom: mega menu heading color, from Figma */
   --color-custom-mega-heading: #310008;
   ```
4. **Hardcode directly** (1-4 occurrences) — Use hex in the section's `{% stylesheet %}` with comment:
   ```css
   /* Non-palette color from Figma [section name] */
   color: #HEXVAL;
   ```

### Custom Variables File
- **Location**: `snippets/custom-variables.liquid`
- **Purpose**: Project-specific CSS variables NOT managed by theme settings
- **Rule**: Only add variables used 5+ times across the project
- **Rendered in**: `layout/theme.liquid` between `theme-styles-variables` and `color-schemes`

## Typography

### Fonts (configured in settings_data.json)
- **Body/Subheading**: Figtree Regular 400 — `var(--font-body--family)`
- **Headings**: Cormorant Medium Italic 500 — `var(--font-heading--family)`

### Font Variables
- `var(--font-body--family)` / `var(--font-body--weight)` / `var(--font-body--style)`
- `var(--font-heading--family)` / `var(--font-heading--weight)` / `var(--font-heading--style)`
- `var(--font-size--2xs)` through `var(--font-size--2xl)` for UI element sizes (nav, buttons, badges)

### Font Size Rules
- **Inside full-width scaling sections**: ALL text uses `var(--fluid-X-Y)` — headings, body, AND UI (buttons, labels, prices)
- **Outside scaling sections** (nav, footer, modals): use theme `var(--font-size--*)` variables
- Same-value tokens (`--fluid-X-X`) are valid for values identical in Figma mobile/desktop that must still scale above 1440px
- NEVER set `font-family` directly — use theme variables
- NEVER hardcode font sizes — use fluid tokens or theme size variables
- Use semantic heading levels (H1 > H2 > H3)

## Spacing

### Inside full-width scaling sections
- ALL padding, gaps, margins, dimensions: `var(--fluid-X-Y)` from `assets/fluid-tokens.css`
- This includes component-level padding (buttons, cards inside the section)
- Container height: use fluid token, not `aspect-ratio` with `min-height`
- Tokens are created from Figma measurements — never invented

### Standalone components (outside scaling sections)
- Button, card, input, modal, badge padding and gaps: fixed `rem` values
- See component spacing table in `css-rules.md`

### Fixed px (always)
- Borders, box-shadow, border-radius: always `px`

## Container & Layout
- **Narrow page width**: `var(--narrow-page-width)` = 1440px
- **Page margins**: 16px mobile, 40px desktop
- Page width classes (`page-width-narrow`, etc.) only set CSS variables, NOT max-width

## Creating New Sections

### Priority order:
1. **Try existing blocks first** — Horizon has reusable blocks (`@theme` blocks). Check if the section can be built entirely with existing blocks before creating custom ones
2. **Replicate with existing patterns** — If close to an existing section, duplicate and adjust
3. **Create custom only if impossible** to replicate with existing tools

### Section requirements:
- MUST have `color_scheme` setting in schema
- Apply via `class="color-{{ section.settings.color_scheme }}"` on wrapper
- Use scheme CSS variables for all colors inside the section

## Figma Reference
- File: Sterling Forever — Internal
- URL: https://www.figma.com/design/F8OZpTxCm1F62dFQ6lzF30

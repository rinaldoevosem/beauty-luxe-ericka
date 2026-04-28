# Liquid Rules — Horizon Theme

## Render vs Include
- ALWAYS use `{% render 'snippet' %}` — never `{% include %}`
- Include is deprecated and leaks global scope

## Reuse Before Creating
- Before creating any new component, CHECK if an existing snippet/section already does what is needed
- If it exists, reuse it — adjust with settings/parameters if needed
- Only create a new component when nothing existing can serve the purpose

## Follow the Theme's Patterns
- Horizon uses blocks extensively — prefer blocks for configurable content
- Match the existing code style and architecture of the theme
- The goal is consistency with the theme, not imposing our preferences

## LiquidDoc Documentation (Required)
- Every snippet and block (when statically rendered) MUST have a `{% doc %}` tag as the first element:
```liquid
{% doc %}
  Renders an icon SVG by name.

  @param {string} icon_name - Required. Name of the icon (cart, search, close)
  @param {string} [size] - Optional. 'small'|'medium'|'large'. Default: 'medium'

  @example
  {% render 'icon', icon_name: 'cart', size: 'medium' %}
{% enddoc %}
```

## Output and Translations
- Always escape user-generated content: `{{ variable | escape }}`
- Use translation keys for all visible text: `{{ 'general.title' | t }}`
- Never hardcode visible text — always use locales
- Schema setting defaults are acceptable as hardcoded English (Shopify limitation)

## CSS and JavaScript in Liquid
- Use `{% stylesheet %}` for scoped CSS in sections, blocks, and snippets
- Use `{% javascript %}` for inline JS (one per file)
- Note: Liquid is NOT rendered inside `{% stylesheet %}` or `{% javascript %}` tags
- For dynamic CSS values, use inline style attributes with CSS custom properties

## Scope of Changes
- Same rule as CSS: only fix/format Liquid code we write or modify
- Do not refactor existing theme Liquid unless we are specifically working on that section

## Strict Rules
- NEVER put heavy logic in templates — move to snippets
- NEVER hardcode text — use locales
- If a rule must be violated, add a Liquid comment explaining why

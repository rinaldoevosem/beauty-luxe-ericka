---
name: new-section
description: Creates a new Shopify section following Horizon theme standards (BEM, Component framework, stylesheet tag, schema)
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
argument-hint: [section-name] [description]
---

## Create a New Shopify Section

Create a new section called `$ARGUMENTS` following all project rules.

### Steps

1. **Search for a reusable section**: Before creating anything, search the theme for existing sections that do something similar.
   - **100% match**: Reuse as-is — do NOT create a new file
   - **Close match**: Duplicate as starting point, rename, modify the copy
   - **No match**: Create from scratch following the steps below

2. **Determine the theme's patterns**: Read 2-3 existing sections to understand:
   - Horizon uses `{% stylesheet %}` for scoped CSS (not external CSS files)
   - Horizon uses `{% javascript %}` for inline JS or `type="module"` script tags
   - Horizon uses `{% doc %}` for snippet documentation
   - Horizon uses blocks extensively

3. **Create the section file** in `/sections/` with:
   - `{% doc %}` or Liquid comment documenting purpose
   - Clean HTML with semantic elements
   - BEM classes for all styling
   - `{% stylesheet %}` tag for CSS
   - Schema with proper settings and blocks
   - All visible text uses translation keys

4. **Create snippets** in `/snippets/` if the section needs reusable parts:
   - Each snippet has `{% doc %}` tag with @param documentation
   - Own `{% stylesheet %}` tag for scoped CSS

5. **If interactive JS is needed**, create `/assets/{component-name}.js`:
   - Use Horizon's Component framework: `import { Component } from '@theme/component'`
   - Use refs (`ref="name"`) and declarative events (`on:click="/method"`)
   - Load with: `<script src="{{ 'name.js' | asset_url }}" type="module"></script>`

6. **Add translation keys** to:
   - `/locales/en.default.json` for UI text
   - `/locales/en.default.schema.json` for schema labels

7. **Verify** against all rules in `.claude/rules/`

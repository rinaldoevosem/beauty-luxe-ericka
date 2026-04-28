---
name: review-section
description: Reviews a Shopify section or snippet against all team rules (BEM, Liquid, JS, performance, a11y)
allowed-tools: Read, Grep, Glob
argument-hint: [section-file-path or section-name]
---

## Review a Shopify Section

Review the section `$ARGUMENTS` against ALL project rules.

### Checklist to Verify

**CSS / BEM** (from .claude/rules/css-rules.md):
- [ ] All classes follow BEM naming: block__element--modifier
- [ ] No !important (unless documented with comment)
- [ ] No ID selectors for styling
- [ ] No selectors nested deeper than 3 levels
- [ ] No inline styles (CSS variable assignments via style="" are OK)
- [ ] Uses CSS custom properties for colors, fonts, spacing
- [ ] Mobile first approach
- [ ] Styles in `{% stylesheet %}` tag (not external file unless justified)

**Liquid** (from .claude/rules/liquid-rules.md):
- [ ] Uses `render` not `include`
- [ ] Snippets have `{% doc %}` tag with @param documentation
- [ ] All visible text uses translation keys (no hardcoded text)
- [ ] User content is escaped with `| escape`
- [ ] No heavy logic in templates (moved to snippets)
- [ ] Reuses existing components where possible
- [ ] Dynamic CSS values use inline style with CSS custom properties

**JavaScript** (from .claude/rules/js-rules.md):
- [ ] Uses Horizon Component framework (`import { Component } from '@theme/component'`)
- [ ] Uses refs system (`ref="name"`) instead of querySelector
- [ ] Uses declarative events (`on:click="/method"`) instead of addEventListener in HTML
- [ ] No jQuery, no var
- [ ] No console.log or debugger
- [ ] Event listeners cleaned up in disconnectedCallback
- [ ] Data passed via `<script type="application/json">`
- [ ] Scripts loaded with type="module"
- [ ] JSON.parse wrapped in try/catch

**Performance & Accessibility** (from .claude/rules/performance-rules.md):
- [ ] Images use image_tag/image_url with srcset
- [ ] Images below fold have loading="lazy"
- [ ] Images have width, height, and descriptive alt text
- [ ] Scripts use type="module"
- [ ] Forms have proper labels
- [ ] Semantic HTML elements used correctly
- [ ] ARIA attributes correct (aria-hidden, aria-expanded, aria-label)
- [ ] Keyboard navigation (Escape closes panels)
- [ ] Focus management on open/close

**Design System** (from .claude/rules/design-system-rules.md):
- [ ] Uses Sterling Forever palette colors only
- [ ] Color priority: CSS variables > derived > custom property (5+) > hardcode (1-4 with comment)
- [ ] Typography uses theme font variables
- [ ] Section has color_scheme setting if applicable

### Output Format
For each issue found:
1. **File and line number**
2. **Rule violated**
3. **What's wrong**
4. **How to fix it**

End with a summary: total issues by severity (high/medium/low) and pass/fail verdict.

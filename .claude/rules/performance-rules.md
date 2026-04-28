# Performance & Accessibility Rules

## Images (Mandatory)
- ALWAYS use Shopify's `image_tag` or `img_url` filters — never raw `<img>` with hardcoded src
- ALWAYS include srcset for responsive images
- ALWAYS set loading="lazy" for images below the fold
- ALWAYS include width and height attributes to prevent layout shift
- ALWAYS add descriptive alt text — never empty alt="" unless purely decorative
- Use WebP format when possible via Shopify's image CDN

## Scripts
- ALWAYS use defer on non-critical scripts
- Use type="module" for Web Component scripts when possible
- NEVER load scripts in `<head>` without defer or async
- Lazy load scripts for components not visible on initial viewport
- Avoid external scripts unless absolutely necessary — each one blocks rendering

## Fonts
- Preload critical fonts: `<link rel="preload" as="font" type="font/woff2" crossorigin>`
- Limit to 2-3 font families maximum
- Use font-display: swap to prevent invisible text during load

## CSS
- Inline critical CSS for above-the-fold content when possible
- Load non-critical CSS with media="print" onload="this.media='all'" pattern
- Keep CSS files small — split per section/component

## HTML Semantics & Accessibility
- Use semantic HTML elements: header, nav, main, section, article, aside, footer
- NEVER use div for everything — choose the right element
- All form inputs MUST have associated `<label>` elements
- All interactive elements must be keyboard accessible
- Use aria attributes only when native HTML semantics are insufficient
- Ensure sufficient color contrast (WCAG AA minimum)

## Shopify-Specific Performance
- Use `{% render %}` over `{% include %}` (render is non-blocking)
- Minimize Liquid loops — paginate when possible
- Use section rendering API for dynamic content updates (no full page reload)
- Avoid excessive use of `{{ 'file' | asset_url }}` in loops — cache in a variable

## Strict Rules
- NEVER skip alt text on images
- NEVER skip labels on form inputs
- NEVER load all images eagerly — only above-the-fold images
- NEVER use document.write()
- If a rule must be violated, add a comment explaining why

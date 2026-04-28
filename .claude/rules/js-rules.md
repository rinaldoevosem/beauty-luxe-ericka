# JavaScript Rules — Horizon Web Components

## Architecture
- Use Horizon's Component framework: `import { Component } from '@theme/component'`
- Light DOM only — no Shadow DOM
- Each component = one class extending `Component`
- Register with `customElements.define('component-name', ClassName)`
- Component names MUST have a hyphen: sf-header, sf-mega-menu, sf-header-drawer
- Use refs system: `ref="name"` → `this.refs.name`, `ref="name[]"` → array
- Use declarative event binding: `on:click="/method"` (same component), `on:click="#id/method"` (cross-component)

## Passing Data from Liquid to Components
- Use `<script type="application/json">` inside the component
- Parse in `connectedCallback` after `super.connectedCallback()`
- Example:
```html
<sf-header-search>
  <script type="application/json">
    {
      "predictiveSearchUrl": "{{ routes.predictive_search_url }}",
      "predictiveSearchEnabled": {{ settings.predictive_search_enabled | json }}
    }
  </script>
</sf-header-search>
```

## File Structure
- One JS file per component in /assets/
- File name matches component: sf-header.js, sf-mega-menu.js
- Import theme utilities: `@theme/component`, `@theme/events`, `@theme/section-renderer`, `@theme/morph`

## Component Template
```javascript
import { Component } from '@theme/component';

/**
 * @typedef {Object} MyComponentRefs
 * @property {HTMLElement} container
 * @property {HTMLButtonElement[]} buttons
 */

/** @extends {Component<MyComponentRefs>} */
class MyComponent extends Component {
  connectedCallback() {
    super.connectedCallback();
    // refs are available here
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // cleanup here
  }

  // Called by on:click="/handleClick" in the template
  handleClick(event) {
    // ...
  }
}

if (!customElements.get('my-component')) {
  customElements.define('my-component', MyComponent);
}
```

## Strict Rules
- NEVER use jQuery — vanilla JS only
- NEVER use var — use const (preferred) then let
- NEVER leave console.log or debugger in production code
- NEVER use inline event handlers (onclick="", onsubmit="") — use `on:event` attributes
- NEVER use Shadow DOM in Shopify themes
- Always clean up event listeners in disconnectedCallback
- Use type="module" for script loading
- Use private methods (`#methodName`) for internal logic
- Use `async/await` over `.then()` chaining
- Wrap `JSON.parse` in try/catch for safety

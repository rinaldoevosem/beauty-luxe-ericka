---
paths:
  - "assets/**/*.js"
  - "sections/**/*.liquid"
  - "blocks/**/*.liquid"
  - "snippets/**/*.liquid"
---

# Horizon Component Framework

The theme uses a custom Web Components framework at `assets/component.js`. All interactive JavaScript components must use this framework.

## Core concepts

- `Component` extends `DeclarativeShadowElement` which extends `HTMLElement`
- Components auto-collect child elements with `ref` attributes into `this.refs`
- A `MutationObserver` keeps refs in sync when the DOM changes
- Declarative event binding via `on:{event}` attributes on HTML elements

## Refs system

Add `ref="name"` to HTML elements to make them available as `this.refs.name`:

```liquid
<my-component>
  <button ref="addButton" on:click="/handleAdd">Add</button>
  <div ref="priceDisplay">{{ product.price | money }}</div>
  <img ref="images[]" src="..." />
  <img ref="images[]" src="..." />
</my-component>
```

- Single ref: `ref="addButton"` → `this.refs.addButton` (Element)
- Array ref: `ref="images[]"` → `this.refs.images` (Element[])
- Optional refs: check existence before use (`if (this.refs.stockIndicator)`)
- Required refs: set `requiredRefs = ['addButton', 'priceDisplay']` to throw if missing

## Declarative event listeners

Use `on:{event}` attributes instead of `addEventListener`. The framework delegates events at the document level.

```html
<!-- Calls handleClick on the closest Component ancestor -->
<button on:click="/handleClick">Click me</button>

<!-- Pass data as path segment (parsed to string/number/boolean) -->
<button on:click="/handleFilter/sale">Sale</button>

<!-- Pass data as query params (parsed to object) -->
<button on:click="/handleFilter?type=sale&sort=price">Filter</button>

<!-- Target a specific component by CSS selector -->
<button on:click="#cart-drawer/open">Open Cart</button>
```

Supported events: `click`, `change`, `select`, `focus`, `blur`, `submit`, `input`, `keydown`, `keyup`, `toggle`, `pointerenter`, `pointerleave`.

## Component pattern

```javascript
import { Component } from '@theme/component';

/**
 * @typedef {Object} ProductCardRefs
 * @property {HTMLButtonElement} addButton - Add to cart button
 * @property {HTMLElement} priceDisplay - Price display element
 * @property {HTMLImageElement} [productImage] - Optional product image
 */

/** @extends {Component<ProductCardRefs>} */
class ProductCard extends Component {
  connectedCallback() {
    super.connectedCallback();
    // refs are available here
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // cleanup here
  }

  // Called by on:click="/handleAddToCart" in the template
  async handleAddToCart(event) {
    event.preventDefault();
    this.refs.addButton.disabled = true;

    try {
      await fetch('/cart/add.js', { method: 'POST', body: new FormData(event.target.form) });
      this.dispatchEvent(new CustomEvent('cart:item-added', { bubbles: true }));
    } catch (error) {
      console.error(error);
    }
  }

  // Public method — can be called by parent components
  updatePrice(newPrice) {
    if (this.refs.priceDisplay) {
      this.refs.priceDisplay.textContent = newPrice;
    }
  }
}

customElements.define('product-card', ProductCard);
```

## Communication patterns

- **Parent → Child**: call public methods directly (`this.refs.childComponent.someMethod()`)
- **Child → Parent**: dispatch `CustomEvent` with `bubbles: true`
- **Sibling → Sibling**: use `document.addEventListener` for custom events

## JSDoc type annotations

Always type refs with `@typedef` and `@extends`:

```javascript
/** @typedef {Object} MyRefs
 * @property {HTMLElement} container
 * @property {HTMLButtonElement[]} buttons
 */

/** @extends {Component<MyRefs>} */
class MyComponent extends Component {}
```

## Key rules

- Import from `@theme/component`, not a relative path
- Use private methods (`#methodName`) for internal logic
- Use `async/await` over `.then()` chaining
- Use `AbortController` for cancellable fetch requests; abort in `disconnectedCallback`
- Use `on:{event}` attributes in HTML, not `addEventListener` in JS
- Module-scoped utility functions (no `this` needed) should be `const fn = () => {}` outside the class

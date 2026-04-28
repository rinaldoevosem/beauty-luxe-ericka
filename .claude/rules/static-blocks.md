---
paths:
  - "blocks/**/*.liquid"
  - "sections/**/*.liquid"
  - "templates/**/*.json"
---

# Static Blocks

Static blocks are theme blocks rendered directly in Liquid by developers, not dynamically added by merchants. They have a fixed position and always appear in the theme editor (locked, can't be removed/reordered).

## Syntax

```liquid
{% content_for 'block', type: 'block-name', id: 'unique-id' %}
```

With default settings:

```liquid
{%
  content_for 'block', type: 'product-gallery', id: 'main-gallery', settings: {
    enable_zoom: true,
    thumbnails_position: "bottom"
  }
%}
```

## Static blocks require `{% doc %}`

When a block is statically rendered, it must have the `{% doc %}` tag as the header:

```liquid
{% doc %}
  Renders the product gallery.

  @example
  {% content_for 'block', type: 'product-gallery', id: 'main-gallery' %}
{% enddoc %}
```

## Mixing static and dynamic blocks

Use static blocks for fixed layout elements, and `{% content_for 'blocks' %}` for merchant-customizable areas:

```liquid
<div class="product-page">
  {% content_for 'block', type: 'breadcrumb', id: 'product-breadcrumb' %}

  <div class="product-main">
    {% content_for 'block', type: 'product-gallery', id: 'main-gallery' %}
    {% content_for 'block', type: 'product-title', id: 'product-title' %}
    {% content_for 'block', type: 'product-price', id: 'product-price' %}
    {% content_for 'block', type: 'product-form', id: 'product-form' %}

    <div class="product-extra-content">
      {% content_for 'blocks' %}
    </div>
  </div>
</div>
```

## Critical: only ONE `{% content_for 'blocks' %}` per file

If you need the dynamic blocks content in multiple places, capture it first:

```liquid
{% capture blocks_content %}
  {% content_for 'blocks' %}
{% endcapture %}

{% if condition %}
  <div class="layout-a">{{ blocks_content }}</div>
{% else %}
  <div class="layout-b">{{ blocks_content }}</div>
{% endif %}
```

Using `{% content_for 'blocks' %}` more than once causes: `Liquid syntax error: Duplicate entries for 'content_for "blocks"'`

## Nested blocks with `block_order`

When blocks are declared as objects in presets (not arrays), include `block_order`:

```json
{
  "blocks": {
    "header": {
      "type": "group",
      "blocks": {
        "title": { "type": "product-title" },
        "price": { "type": "price" }
      },
      "block_order": ["title", "price"]
    }
  },
  "block_order": ["header"]
}
```

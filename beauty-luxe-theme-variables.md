# Beauty Luxe — CSS Root Variables
## `snippets/theme-styles-variables.liquid`

Este archivo define **todas las variables CSS raíz** del proyecto. Deben mapearse directamente en el snippet `snippets/theme-styles-variables.liquid` del tema Horizon. Ninguna sección, bloque o snippet debe hardcodear colores, tipografía o espaciado — siempre referenciar estas variables.

---

## 1. Color Tokens

| Token | Hex | Variable CSS | Uso |
|---|---|---|---|
| `dark-100` | `#0A0A0A` | `--color-dark-100` | Texto primario, fondo navbar, botones |
| `dark-80` | `#525252` | `--color-dark-80` | Texto secundario, descripciones |
| `dark-60` | `#6C6C6C` | `--color-dark-60` | Texto terciario, placeholders, labels |
| `white-100` | `#FFFFFF` | `--color-white-100` | Fondo de página, fondos de tarjetas |
| `white-80` | `#D6D6D6` | `--color-white-80` | Texto secundario del footer |
| `white-60` | `#A9A9A9` | `--color-white-60` | Texto terciario del footer, copyright |
| `border-dark` | `#E7E7E7` | `--color-border-dark` | Bordes, divisores, swatches inactivos |
| `border-light` | `#3D3D3D` | `--color-border-light` | Bordes internos del footer, iconos sociales |
| `bg-gray` | `#F6F6F8` | `--color-bg-gray` | Filas alternas en tablas, fondo size selector |
| `accent` | `#FEDC5C` | `--color-accent` | Fondo badge "Our Most-Loved" |
| `green-main` | `#008236` | `--color-green-main` | Borde y texto badge Subscribe & Save |
| `green-bg` | `#0D8756` | `--color-green-bg` | Relleno badge Subscribe & Save (10% opacidad) |

---

## 2. Typography Tokens

### Familias de fuentes

| Variable CSS | Familia | Uso principal |
|---|---|---|
| `--font-heading` | `'Jost', sans-serif` | Headings H2, H3, acordeones |
| `--font-body` | `'Outfit', sans-serif` | Párrafos, labels, navegación, botones cuerpo |
| `--font-ui` | `'Inter', sans-serif` | Botones CTA, logo |

> **Nota de implementación:** Cargar `Jost`, `Outfit` e `Inter` desde Google Fonts en `layout/theme.liquid`. Weights requeridos: Jost 400 · Outfit 300, 400, 500 · Inter 500, 700.

---

### Escala tipográfica

| Token | Variable CSS | Familia | Weight | Size | Line-height | Notas |
|---|---|---|---|---|---|---|
| H2 | `--type-h2` | Jost | 400 | `32px` | `1.2` | Título principal de producto |
| H3 | `--type-h3` | Jost | 400 | `24px` | `1.2` | Subtítulos de sección |
| Accordion heading | `--type-accordion` | Jost | 400 | `20px` | `1.2` | Cabecera de acordeón |
| paragraph lg/medium | `--type-p-lg-medium` | Outfit | 500 | `16px` | `1.5` | Labels de selectores activos |
| paragraph lg/light | `--type-p-lg-light` | Outfit | 300 | `16px` | `1.5` | Texto de body principal |
| paragraph sm/regular | `--type-p-sm-regular` | Outfit | 400 | `14px` | `1.5` | Texto general secundario |
| paragraph sm/medium | `--type-p-sm-medium` | Outfit | 500 | `14px` | `1.5` | Labels, navegación |
| paragraph sm/light | `--type-p-sm-light` | Outfit | 300 | `14px` | `1.5` | Descripciones, footer links |
| paragraph xs/light | `--type-p-xs-light` | Outfit | 300 | `13px` | `1.5` | SKU, ratings, labels terciarios |
| paragraph xs/regular | `--type-p-xs-regular` | Outfit | 400 | `13px` | `1.5` | Breadcrumbs, badges secundarios |
| button | `--type-button` | Inter | 500 | `14px` | `1.5` | CTAs (uppercase) |
| logo | `--type-logo` | Inter | 700 | `26.245px` | `normal` | Logotipo "BEAUTY LUXE" |

---

## 3. Spacing & Layout Tokens

| Token | Variable CSS | Valor | Uso |
|---|---|---|---|
| Content padding | `--layout-content-padding` | `80px` | Padding horizontal del área de contenido |
| Content max-width | `--layout-content-width` | `1280px` | Ancho máximo del contenido (frame 1440px) |
| Column left | `--layout-col-left` | `738px` | Columna galería de producto |
| Column gap | `--layout-col-gap` | `52px` | Gap entre columnas del PDP |
| Column right | `--layout-col-right` | `486px` | Columna info de producto |

---

## 4. Implementación en Horizon

El bloque de código a colocar en `snippets/theme-styles-variables.liquid`:

```liquid
{%- comment -%}
  Beauty Luxe — Design Token Variables
  Mapeo de tokens de diseño a CSS custom properties.
  NO editar colores, tipografía ni espaciado directamente en secciones.
  Siempre referenciar estas variables.
{%- endcomment -%}

<style>
  :root {
    /* ─── Color Tokens ─────────────────────────────────────── */
    --color-dark-100:    #0A0A0A;
    --color-dark-80:     #525252;
    --color-dark-60:     #6C6C6C;
    --color-white-100:   #FFFFFF;
    --color-white-80:    #D6D6D6;
    --color-white-60:    #A9A9A9;
    --color-border-dark: #E7E7E7;
    --color-border-light:#3D3D3D;
    --color-bg-gray:     #F6F6F8;
    --color-accent:      #FEDC5C;
    --color-green-main:  #008236;
    --color-green-bg:    #0D8756;

    /* ─── Typography — Font Families ──────────────────────── */
    --font-heading: 'Jost', sans-serif;
    --font-body:    'Outfit', sans-serif;
    --font-ui:      'Inter', sans-serif;

    /* ─── Typography — Size Scale ──────────────────────────── */
    --type-h2-size:            32px;
    --type-h2-weight:          400;
    --type-h2-lh:              1.2;

    --type-h3-size:            24px;
    --type-h3-weight:          400;
    --type-h3-lh:              1.2;

    --type-accordion-size:     20px;
    --type-accordion-weight:   400;
    --type-accordion-lh:       1.2;

    --type-p-lg-size:          16px;
    --type-p-lg-weight-medium: 500;
    --type-p-lg-weight-light:  300;
    --type-p-lg-lh:            1.5;

    --type-p-sm-size:          14px;
    --type-p-sm-weight-regular:400;
    --type-p-sm-weight-medium: 500;
    --type-p-sm-weight-light:  300;
    --type-p-sm-lh:            1.5;

    --type-p-xs-size:          13px;
    --type-p-xs-weight-light:  300;
    --type-p-xs-weight-regular:400;
    --type-p-xs-lh:            1.5;

    --type-button-size:        14px;
    --type-button-weight:      500;
    --type-button-lh:          1.5;

    --type-logo-size:          26.245px;
    --type-logo-weight:        700;
    --type-logo-lh:            normal;

    /* ─── Layout ───────────────────────────────────────────── */
    --layout-content-padding: 80px;
    --layout-content-width:   1280px;
    --layout-col-left:        738px;
    --layout-col-gap:         52px;
    --layout-col-right:       486px;
  }
</style>
```

---

## 5. Reglas de uso

- **Nunca** hardcodear un color, tamaño de fuente o espaciado en una sección o bloque.
- Toda referencia de color debe usar `var(--color-*)`.
- Toda referencia tipográfica debe usar `var(--font-*)` y `var(--type-*)`.
- Los valores de layout deben usar `var(--layout-*)`.
- Para el badge Subscribe & Save usar `rgba(var(--color-green-bg-raw, 13 135 86) / 0.1)` o definir la opacidad directamente en el componente con `background: color-mix(in srgb, var(--color-green-bg) 10%, transparent)`.
- Seguir las convenciones CSS de Horizon: BEM, CSS nesting solo primer nivel, sin `!important`, sin IDs, especificidad máxima `0-4-0`.

---

## 6. Google Fonts — carga en `layout/theme.liquid`

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@400&family=Outfit:wght@300;400;500&family=Inter:wght@500;700&display=swap" rel="stylesheet">
```

---

*Referencia: Beauty Luxe — PDP Makeup Developer Spec · Horizon base theme · Prepared by Rinaldo — FancyLab / Ideal Evolved*

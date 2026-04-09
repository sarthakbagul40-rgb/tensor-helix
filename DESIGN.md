# DESIGN.md — Biryani Restaurant Website
> Extracted from Stitch project: **Biryani Restaurant Website** (`projects/13355104587923502799`)
> Design Theme: *"The Modern Heirloom"* — High-End Culinary Editorial

---

## 1. Project Metadata

| Property | Value |
|---|---|
| Project ID | `13355104587923502799` |
| Title | Biryani Restaurant Website |
| Device Type | Mobile |
| Color Mode | Light |
| Visibility | Private |

---

## 2. Typography

| Role | Font Family |
|---|---|
| Headline / Display | **Noto Serif** |
| Body | **Inter** |
| Label | **Inter** |
### Typography Usage Rules
- `display-lg` (Noto Serif) → Hero sections only, where text interacts with food photography.
- `headline-lg` → Use for prices — gives them a high-fashion editorial feel.
- `title-md` (Inter) → Dish names.
- `body-md` (Inter) → Dish descriptions.

---

## 3. Shape & Spacing

| Property | Value |
|---|---|
| Corner Roundness | `ROUND_EIGHT` (`xl` = 1.5rem / 16px–24px) |
| Spacing Scale | `3` |

> **Rule:** Always use `xl` (1.5rem) rounding. Never use the default 4px or 8px rounding — the system requires the premium, pill-shaped feel.

---

## 4. Color Palette

### Brand Override Colors

| Token | Hex | Description |
|---|---|---|
| Primary | `#F4C430` | Saffron Gold |
| Secondary | `#FF8C00` | Ember Orange |
| Tertiary | `#8B0000` | Deep Red / Spice |
| Neutral | `#FFFDF5` | Warm White |

### Full Named Color Tokens

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#755b00` | Main brand color, CTAs, accents |
| `on_primary` | `#ffffff` | Text/icons on primary |
| `primary_container` | `#f4c430` | Saffron — container fill |
| `on_primary_container` | `#695200` | Text on primary container |
| `primary_fixed` | `#ffdf90` | Fixed primary light |
| `primary_fixed_dim` | `#f0c12c` | Filter chips background |
| `on_primary_fixed` | `#241a00` | Text on primary_fixed |
| `on_primary_fixed_variant` | `#584400` | Accessible text on light bg |
| `secondary` | `#904d00` | Secondary brand |
| `on_secondary` | `#ffffff` | Text on secondary |
| `secondary_container` | `#fd8b00` | Ember orange — CTA buttons |
| `on_secondary_container` | `#603100` | Text on secondary_container |
| `secondary_fixed` | `#ffdcc3` | Light secondary fixed |
| `secondary_fixed_dim` | `#ffb77d` | Dim secondary fixed |
| `on_secondary_fixed` | `#2f1500` | Text on secondary fixed |
| `on_secondary_fixed_variant` | `#6e3900` | Variant text on secondary |
| `tertiary` | `#b52619` | Deep red — prices, Chef's Special |
| `on_tertiary` | `#ffffff` | Text on tertiary |
| `tertiary_container` | `#ffb9ae` | Tertiary container |
| `on_tertiary_container` | `#a71b10` | Text on tertiary container |
| `tertiary_fixed` | `#ffdad4` | Fixed tertiary light |
| `tertiary_fixed_dim` | `#ffb4a8` | Dim fixed tertiary |
| `on_tertiary_fixed` | `#410000` | Text on tertiary fixed |
| `on_tertiary_fixed_variant` | `#920703` | Variant on tertiary fixed |
| `surface` | `#fbf9f1` | Main page body (Warm White) |
| `surface_bright` | `#fbf9f1` | Same as surface |
| `surface_dim` | `#dcdad2` | Dim surface |
| `surface_variant` | `#e4e3db` | Subtle texture/pattern layer |
| `surface_tint` | `#755b00` | Tint overlay on surface |
| `surface_container_lowest` | `#ffffff` | Card lift — cleanest layer |
| `surface_container_low` | `#f5f4ec` | Section grouping |
| `surface_container` | `#f0eee6` | Standard container |
| `surface_container_high` | `#eae8e0` | Higher contrast container |
| `surface_container_highest` | `#e4e3db` | Input field background |
| `on_surface` | `#1b1c17` | Primary text (not pure black) |
| `on_surface_variant` | `#4e4634` | Secondary text / metadata |
| `inverse_surface` | `#30312c` | Dark overlay / snackbar bg |
| `inverse_on_surface` | `#f3f1e9` | Text on dark overlay |
| `inverse_primary` | `#f0c12c` | Bright primary on dark bg |
| `outline` | `#807661` | Standard outline (rarely used) |
| `outline_variant` | `#d1c5ad` | Ghost border at 15% opacity |
| `background` | `#fbf9f1` | Page background = surface |
| `on_background` | `#1b1c17` | Text on background |
| `error` | `#ba1a1a` | Error state |
| `on_error` | `#ffffff` | Text on error |
| `error_container` | `#ffdad6` | Error container |
| `on_error_container` | `#93000a` | Text on error container |

---

## 5. Surface Hierarchy (Tonal Layering)

```
Page Body          → surface (#fbf9f1)
Section Groups     → surface-container-low (#f5f4ec)
Cards (lifted)     → surface-container-lowest (#ffffff)
Input Fields       → surface-container-highest (#e4e3db)
```

> Cards create depth by sitting on a lighter container background — no shadows needed.

---

## 6. Elevation & Depth

| Element | Style |
|---|---|
| Floating elements (FAB, Nav) | `box-shadow: 0 12px 32px rgba(117, 91, 0, 0.08)` |
| Ghost border fallback | `outline-variant` at **15% opacity** |
| Glassmorphism (NavBar, Quick-Cart) | Semi-transparent `surface` + `backdrop-filter: blur(12px)` |

---

## 7. Components

### Buttons — "The Saffron Action"

| Type | Background | Text | Rounding |
|---|---|---|---|
| Primary CTA | Gradient: `secondary` → `secondary_container` @ 135° | `on_secondary_container` | `xl` 1.5rem |
| Tertiary / Ghost | Transparent | `primary` (#755b00) + icon | N/A |

```css
/* Signature CTA Button */
background: linear-gradient(135deg, #904d00, #fd8b00);
border-radius: 1.5rem;
color: #603100;
```

### Cards — "The Culinary Canvas"

```css
border-radius: 1.5rem;     /* xl */
overflow: hidden;
background: #ffffff;       /* surface-container-lowest */
box-shadow: 0 12px 32px rgba(117, 91, 0, 0.08);
```
- Image takes up **100% of top width**
- **No divider lines** — use `40px+` vertical whitespace between categories
- **No 1px borders** — depth from background color shift only

### Navigation Bar / Quick-Cart

```css
background: rgba(251, 249, 241, 0.75);   /* surface at 75% */
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
```

### Input Fields

```css
/* Default */
background: #e4e3db;   /* surface-container-highest */
border: none;

/* Focused */
background: #ffffff;   /* surface-container-lowest */
border: 2px solid rgba(117, 91, 0, 0.15);   /* primary ghost border */
```

### Filter Chips (Dietary — "Vegan", "Spicy", etc.)

```css
background: #f0c12c;   /* primary_fixed_dim */
color: #241a00;        /* on_primary_fixed */
border: none;
border-radius: 1.5rem;
```

### Background Texture / Spice Pattern

```css
/* SVG mandala / spice-seed pattern as mask on surface_variant */
background-color: #e4e3db;
opacity: 0.04;   /* "felt, not seen" */
```

---

## 8. Do's and Don'ts

### ✅ Do
- Allow food photography to **overlap** the text area in hero sections.
- Use `headline-lg` for prices — editorial, high-fashion.
- Use **whitespace** as a structural tool (prefer `+16px` padding over adding a border).
- Define boundaries solely through **background color shifts** ("No-Line" rule).

### ❌ Don't
- Use pure black `#000000` for text — use `on_surface` (`#1b1c17`).
- Use standard 4px or 8px rounding — always use `xl` (1.5rem).
- Use 1px solid borders to section content — ever.
- Use 1px dividers between list items — use a `surface-container-low` zebra stripe instead.

---

## 9. Accessibility

- All text in `primary` or `tertiary` colors against `surface` **must** meet WCAG AA contrast.
- If contrast is insufficient, use `on_primary_fixed_variant` (`#584400`) for text on light backgrounds.
- Never use pure white `#ffffff` as a text color except on dark/colored backgrounds.

---

## 10. Design System Philosophy: "The Modern Heirloom"

> *"We are not just building a menu; we are curating a digital table."*

The aesthetic balances the heavy, storied weight of Indian tradition with the airy, breathable luxury of modern minimalism — **"The Breathable Spice"** approach:

- High-contrast typography scales
- Intentional asymmetry (not everything centered)
- Food photography that "breaks" out of containers
- Overlapping elements to evoke movement and steam
- Saffron, clay, and spice as the palette roots

---

*Generated from Stitch MCP — Project `projects/13355104587923502799` | Date: 2026-04-06*

# Varavel Design System

Welcome to the official Varavel Design System. This document serves as the single source of truth for the visual, typographic, and architectural rules used to build user interfaces within the `@varavel/ui` ecosystem using Svelte and TailwindCSS.

Our primary goal is to deliver an exceptional User Experience (UX) through minimalism. Every component should be intuitive, highly readable, and free of visual clutter.

## Design Philosophy

1. **Minimalism:** Remove unnecessary elements. Focus on content, functionality, and clean layouts.
2. **Mathematical Precision:** All elements align to a strict grid system to maintain visual harmony.
3. **Accessibility and UX:** Components must be easy to navigate, with clear interactive states and high legibility across all devices and themes.

---

## Typography

We have standardized our typography using the **Geist** font family, which is specifically optimized for modern development tools and interfaces.

_Note: The Geist font family is fully integrated and pre-configured within the `@varavel/ui` core theme (`theme.css`). It is an "all-included" setup, meaning no external font imports or installations are required on your end._

### 1. Interface and Text (Sans-Serif)

- **Family:** `Geist Sans`
- **Usage:** Headings, paragraphs, buttons, form labels, and general navigation.
- **Permitted Weights:**
  - `Regular (400)`: For standard body text.
  - `Medium (500)`: For buttons, labels, and interactive elements.
  - `SemiBold (600)`: For establishing hierarchy in headings (H1, H2, H3).

### 2. Data and Code (Monospace)

- **Family:** `Geist Mono`
- **Usage:** Code blocks, tokens, IP addresses, database IDs, metrics, and structured data tables.
- **Purpose:** Its tabular width ensures that numbers and data points align perfectly in columns without shifting.

---

## Color Palette (Tailwind Mapping)

Our interface uses a high-contrast, monochromatic base relying on Tailwind's `neutral` palette. This keeps the system free of warm/cool tint shifts and lets content and semantic states stand out cleanly.

_Note: All structural, base, and semantic colors are pre-configured in the `@varavel/ui` core theme._

### 1. Text Colors

- **Primary Text (`text-content`):** `neutral-950` (Light Mode) / `neutral-50` (Dark Mode)
- **Secondary Text (`text-content-muted`):** `neutral-500` (Light Mode) / `neutral-400` (Dark Mode) for metadata, helper text, and descriptions.

### 2. Base Layers

We utilize a tiered base system to define physical elevation, nesting logic, and structural borders.

- **`base-100` (Canvas):** The primary background of the entire application.
  - _Light Mode:_ `#FFFFFF` | _Dark Mode:_ `#000000`
- **`base-200` (Surface):** Used for primary structural containers.
  - _Usage:_ Sidebars, cards, panels, and modals.
  - _Light Mode:_ `neutral-100` | _Dark Mode:_ `neutral-900`
- **`base-300` (Muted/Interactive):** Used for smaller elements and interaction states.
  - _Usage:_ Input fields, hover states, and nested UI components.
  - _Light Mode:_ `neutral-200` | _Dark Mode:_ `neutral-800`
- **`base-400` (Structural):** The absolute border color used to define component limits and separate containers.
  - _Usage:_ Borders and dividers.
  - _Light Mode:_ `neutral-300` | _Dark Mode:_ `neutral-700`

### 3. Semantic Colors

Semantic colors should be used sparingly to indicate specific states or actions.

- **Information / Action Accent:** `blue-500` (For links, active states, and focus rings).
- **Error / Destructive:** `red-500` (For delete actions, critical alerts, and server errors).
- **Success:** `emerald-500` (For healthy statuses, online indicators, and success messages).
- **Warning:** `amber-500` (For warnings and degradation alerts).

---

## Geometry and Spacing

The `@varavel/ui` system is built on a standard **4px** grid (Tailwind's default spacing scale). Consistent spacing is crucial for a minimalist layout.

### Strict Border Radius

We enforce a strict 3-tier geometric scale to maintain a cohesive structure and limit nesting depth.

- **`rounded-lg` (16px):** Structural Elements (Cards, Modals, Panels). Derived from the exact radius of the pillars in the official Varavel logo.
- **`rounded-md` (8px):** Interactive Components (Buttons, Inputs, Dropdowns).
- **`rounded-sm` (4px):** Nested Elements (Badges, Tags, small internal components).
- **`rounded-none` / `rounded-full`:** Reserved for full-bleed elements, pills, or avatars.

### The Mathematics of Nesting (Concentricity)

To achieve perfect visual concentricity when placing a rounded element inside another rounded container, the spacing must obey the exact mathematical formula:

`Inner Radius = Outer Radius - Padding`

Do not guess the padding. Use the following strictly approved combinations to guarantee optical perfection:

- **Standard Card Nesting:** Outer `rounded-lg` (16px) - Padding `p-2` (8px) = Inner `rounded-md` (8px).
- **High-Density Card Nesting:** Outer `rounded-lg` (16px) - Padding `p-3` (12px) = Inner `rounded-sm` (4px).
- **Component Level Nesting:** Outer `rounded-md` (8px) - Padding `p-1` (4px) = Inner `rounded-sm` (4px).

### Borders and Separation

To maintain a modern aesthetic, we prefer subtle borders over heavy shadows.

- **`border-base-400`**: The default border color used to separate containers globally.
- Borders should be 1px wide (`border`) by default to maintain a sharp, technical look.

### Shadows and Elevation

Avoid heavy or blurred shadows.

- For floating elements like modals and dropdowns, use Tailwind's default `shadow-md` or `shadow-lg` with low opacity to maintain a clean appearance.

---

## Global UI Behaviors

Our CSS core automatically handles essential UX details. You do **not** need to manually program these into your components:

- **Accessible Focus Rings:** Every focusable element automatically receives a high-contrast focus ring (`ring-info` with `ring-offset-base-100`). Do not hardcode focus states unless building a complex headless override.
- **Text Selection:** Highlighted text automatically uses a high-contrast monochromatic inversion (Text becomes `base-100`, background becomes `content`).

---

## Responsive Design & Breakpoints

We employ a pragmatic "Single Breakpoint" architecture. We bypass standard Tailwind breakpoints in favor of a single threshold.

_Note: This behavior is already baked into the `@varavel/ui` core theme._

- **Constrained Base (< 1024px):** Everything below 1024px is treated as a mobile or portrait-tablet environment. Layouts stack vertically, and data density is optimized for touch interfaces.
- **Desktop (`desk:` >= 1024px):** The threshold where horizontal space is unlocked. Sidebars become fixed and data tables expand to full columns.

---

## Theme Integration (Tailwind v4)

To use `@varavel/ui` in your project, simply add the following to your main stylesheet:

```css
/* 1. Import the base Tailwind engine */
@import "tailwindcss";

/* 2. Import ALL Varavel configuration, plugins, fonts, and base colors */
@import "@varavel/ui/theme.css";

/* 3. Instruct Tailwind to scan and compile classes used by the UI components */
@source "../node_modules/@varavel/ui";
```

---

## Component Guidelines (Svelte & Tailwind)

When building or contributing components to `@varavel/ui`, please adhere to the following standards:

1. **Clean Classes:** Keep Tailwind classes organized and avoid bloated component structures.
2. **Trust the Global CSS:** Rely on the global `theme.css` for focus states and selections. Do not duplicate these efforts locally.
3. **Native Dark Mode:** All components must support both light and dark themes out-of-the-box via the semantic variables (e.g., `bg-base-200`, `text-content`). Avoid using Tailwind's explicit `dark:` modifier unless strictly necessary for a unique exception.
4. **Agile Responsiveness:** Build mobile-first and use the `desk:` prefix strictly for horizontal expansions starting at 1024px.

---

_For official corporate visual assets, including SVG logos, GitHub badges, and trademark policies, please visit the [Varavel Brand Repository](https://github.com/varavelio/brand)._

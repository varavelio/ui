# Agent Context for @varavel/ui

## Summary

The official Svelte 5 & Tailwind CSS 4 UI library for the Varavel ecosystem. This project provides a set of highly accessible, minimalist components and a shared theme designed with a high-contrast, monochromatic aesthetic.

## Maintaining this Document

After completing any task, review this file and update it if you made structural changes or discovered patterns worth documenting. Only add information that helps understand how to work with the project. Avoid implementation details, file listings, or trivial changes. This is a general guide, not a changelog.

When updating this document, do so with the context of the entire document in mind; do not simply add new sections at the end, but place them where they make the most sense within the context of the document.

## Tech Stack

- **Framework**: Svelte 5 (Runes mode)
- **Styling**: Tailwind CSS 4 (using `@tailwindcss/vite`)
- **Language**: TypeScript
- **Tooling**: Vite, Biome (Linting/Formatting), dprint (Formatting)
- **Component Primitives**: `bits-ui`
- **Date/Time Values**: `@internationalized/date` for all public date and time component state

## Operational Commands

- **Dev Mode**: `npm run dev` (Starts Vite dev server)
- **Build**: `npm run build` (Compiles both Vite assets and Svelte package)
- **Test**: (None currently defined in `package.json`)
- **Lint**: `npm run lint` (Runs TS check, dprint check, and Biome check)
- **Format**: `npm run format` (Runs dprint and Biome formatters)

## General Instructions

- **DESIGN.md First**: It is IMPERATIVE to read `DESIGN.md` at the start of every new task. This document standardizes the design system and implementation direction.
- **bits-ui Docs First**: It is IMPERATIVE to always read `https://bits-ui.com/llms.txt` at the start of every new task to understand Bits UI behavior. Also read any linked docs from that file that are relevant to the specific feature being implemented.
- **Verification**: Run `npm run format` and `npm run lint` before finishing tasks.
- **Context**: Always run `tree` to understand the latest component structure.
- **Svelte 5**: Use Svelte 5 runes (`$state`, `$derived`, `$props`, etc.). Avoid legacy Svelte syntax.
- **Tailwind 4**: Use the new Tailwind 4 syntax. The theme is defined in `src/lib/theme.css` using the `@theme` block.
- **Minimalism**: Adhere to the `DESIGN.md` philosophy. Focus on content and functionality with clean layouts.
- **Accessibility**: Every interactive element MUST have a clear focus state using `focus-visible`.
- **Theme Support**: Use `dark:` modifiers for native dark mode support. The project uses `.dark` or `[data-theme="dark"]` to trigger dark mode.
- **Responsive**: Use the custom `desk:` prefix (1024px) for desktop-specific styles.
- **Artifacts**: Do not edit generated output in `dist/`, `build/`, or `.svelte-kit/` directly. Make source changes under `src/` and regenerate artifacts via project scripts.

## Architecture & Organization

### Root Layout

- `package.json`: Project configuration, scripts, and dependencies.
- `svelte.config.js`: SvelteKit and Svelte-package configuration.
- `vite.config.ts`: Vite configuration with Tailwind 4 plugin.
- `biome.json` & `dprint.json`: Formatting and linting rules.
- `DESIGN.md`: The visual and architectural "Source of Truth" for the design system.
- `src/`: Main source code.
- `static/`: Static assets (favicons, etc.).
- `.svelte-kit/`, `build/`, `dist/`: Generated and build output directories.

### `src/lib/` (Core Library)

- **Role**: Contains the reusable UI components and theme logic.
- **Key Directories**:
  - `components/`: Atomic UI components (e.g., `Avatar/`). Each component typically has its own folder with a `.svelte` file, a colocated `Demo.svelte` showcase file, and an `index.ts` exporter.
  - `catalog.ts`: Typed catalog registry that auto-discovers each component's `meta.ts` via `import.meta.glob`, then builds the explorer dataset.
  - `helpers/`: Shared cross-library utilities such as `cn()` that are not specific to any one component family.
  - `blocks/`: Larger, pre-composed UI sections or patterns.
  - `layouts/`: Ready to use layout components to use in various scenarios.
  - `fonts/`: Self-hosted Geist font family.
  - `runtime/`: App-level browser helpers such as `theme`, `dialog`, `toast`, and `clipboard`. Prefer these runtime singletons over ad-hoc browser API access inside components.
  - `theme.css`: The central Tailwind 4 theme definition, including colors, typography, and base styles.

### `src/routes/` (Documentation / Showcase)

- **Role**: A SvelteKit application used to showcase and test the components during development.
- **Key Files**:
  - `+layout.ts`: Route-level options/configuration for the showcase app.
  - `+layout.svelte`: Global layout for the showcase app. It mounts `UiProvider` so runtime primitives (e.g., global dialogs) remain available throughout the explorer.
  - `[type]/+layout.svelte`: Shared explorer shell with the top section navbar (`components`, `blocks`, `layouts`, `runtime`) and a type-aware sidebar.
  - `[type]/[slug]/+page.svelte`: Detail renderer for explorer entries. It handles component docs from `src/lib/catalog.ts` and runtime API docs from `[type]/explorer.ts`.

## Svelte

You are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and SvelteKit documentation. Here's how to use the available tools effectively:

### Available Svelte MCP Tools:

#### 1. list-sections

Use this FIRST to discover all available documentation sections. Returns a structured list with titles, use_cases, and paths. When asked about Svelte or SvelteKit topics, ALWAYS use this tool at the start of the chat to find relevant sections.

#### 2. get-documentation

Retrieves full documentation content for specific sections. Accepts single or multiple sections. After calling the list-sections tool, you MUST analyze the returned documentation sections (especially the use_cases field) and then use the get-documentation tool to fetch ALL documentation sections that are relevant for the user's task.

#### 3. svelte-autofixer

Analyzes Svelte code and returns issues and suggestions. You MUST use this tool whenever writing Svelte code before sending it to the user. Keep calling it until no issues or suggestions are returned.

#### 4. playground-link

Generates a Svelte Playground link with the provided code. After completing the code, ask the user if they want a playground link. Only call this tool after user confirmation and NEVER if code was written to files in their project.

## Coding Conventions

- **Component Exporting**: Export components via `index.ts` in their respective folders, and then again in the main `src/lib/components/index.ts`.
- **Compound Components**: When a component family exposes namespaced parts (for example `Bento.Grid` and `Bento.Item`), keep the namespace export in the folder `index.ts` and make the parent layout own shared structure such as column count and gap while children own span and surface props.
- **Component Demos**: Keep showcase demos next to their components when possible, but wire explorer rendering through `meta.ts` via each entry's optional `demo` field.
- **Library Exports**: Keep package export entry points aligned with `package.json` (`.`, `./blocks`, `./theme.css`) when adding new public modules.
- **Props**: Use `$props()` for component properties. Prefer explicit types for props.
- **Form Controls**: Wrapper inputs should preserve practical Svelte ergonomics such as `bind:value` where appropriate.
- **Catalog Metadata**: Every public component folder should include a `meta.ts` file exporting a `componentMeta` array via the `components([...])` helper. Each entry should declare `name`, `category`, documented `props`, and can attach `demo` directly (typically from colocated `Demo.svelte`). Avoid hardcoding all metadata in one file.
- **Helpers**: Put generic utilities like class merging under `src/lib/helpers/`, not under `components/internal/`.
- **Styling**: Keep Tailwind classes organized. Use `theme.css` variables (e.g., `bg-base-100`, `text-content`) instead of hardcoding slate colors where possible.
- **Date/Time Wrappers**: Public date/time components should expose `@internationalized/date` values directly (`CalendarDate`, `Time`, `CalendarDateTime`, `ZonedDateTime`) rather than native `Date` or ISO strings. When a wrapper needs an initial date/time seed, prefer a `placeholderValue` prop so `placeholder` remains available for text-based fields elsewhere in the library.
- **Text Links**: Prefer the `Link` component for inline/navigation anchors so external-link safety defaults (`target`/`rel`) and disabled behavior stay consistent across the library. Avoid global `a { ... }` base styles that can leak into button-like anchors.
- **Rich Text Surfaces**: When introducing prose/markdown wrappers, rely on the Typography plugin via `prose` utilities and keep heading scale/weight/tracking aligned with the `Heading` component for visual consistency.
- **Conditional Classes**: ALWAYS use the `cn()` helper with an object for conditional variants or sizes (e.g., `cn("base", { "variant-a": cond }, className)`). Logic MUST stay local to the `class={cn(...)}` call; AVOID external constants for styles.
- **Inline Prop Types**: Prefer declaring simple literal unions directly inside the `Props` interface (for example `size?: "sm" | "md" | "lg"`) instead of introducing separate top-level aliases. Extract a named type only when it is genuinely reused, materially improves readability, or is otherwise necessary.
- **Class Order Priority**: Follow this strict order inside `cn()` to ensure correct CSS overrides: `1. Base Styles` -> `2. Logic/Conditional Objects` -> `3. User-defined classes` (e.g., `className`). Components MUST expose a `class` (`className` internally) prop to allow consumer overrides whenever possible.
- **Scroll Areas**: Always prefer the default browser scrollbars instead of the `bits-ui` ScrollArea component to maximize compatibility and reduce unwanted behavior.
- **Semantic Tones**: The theme does not expose a `primary` token; use semantic tones (`info`, `success`, `warning`, `error/danger`) for colored UI states.
- **Theme Components**: Any theme selector/toggle should consume `src/lib/runtime/theme/index.ts` (`theme.get()` / `theme.set()`) instead of duplicating localStorage, matchMedia, or DOM theme-application logic inside components.
- **Theme Reactivity**: For UI sync with OS changes and cross-tab updates, prefer `theme.subscribe()` (backed by the global `varavel-theme-change` event from `static/theme-init.js`) rather than ad-hoc listeners inside components.
- **Clipboard Interactions**: Prefer `src/lib/runtime/clipboard/index.ts` for copy behavior so browser support handling and toast feedback stay standardized. The `Copy` component should remain an opinionated icon-only wrapper around that runtime.

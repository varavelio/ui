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

## Operational Commands

- **Dev Mode**: `npm run dev` (Starts Vite dev server)
- **Build**: `npm run build` (Compiles both Vite assets and Svelte package)
- **Test**: (None currently defined in `package.json`)
- **Lint**: `npm run lint` (Runs TS check, dprint check, and Biome check)
- **Format**: `npm run format` (Runs dprint and Biome formatters)

## General Instructions

- **DESIGN.md First**: It is IMPERATIVE to read `DESIGN.md` at the start of every new task. This document standardizes the design system and implementation direction.
- **bits-ui Docs First**: It is IMPERATIVE to always read `https://bits-ui.com/llms.txt` at the start of every new task to understand Bits UI behavior. Also read any linked docs from that file that are relevant to the specific feature being implemented.
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
  - `components/`: Atomic UI components (e.g., `Avatar/`). Each component typically has its own folder with a `.svelte` file and an `index.ts` exporter.
  - `blocks/`: Larger, pre-composed UI sections or patterns.
  - `fonts/`: Self-hosted Geist font family.
  - `theme.css`: The central Tailwind 4 theme definition, including colors, typography, and base styles.

### `src/routes/` (Documentation / Showcase)

- **Role**: A SvelteKit application used to showcase and test the components during development.
- **Key Files**:
  - `+layout.ts`: Route-level options/configuration for the showcase app.
  - `+layout.svelte`: Global layout for the showcase app.
  - `+page.svelte`: Main landing page for component demonstration.

## Coding Conventions

- **Component Exporting**: Export components via `index.ts` in their respective folders, and then again in the main `src/lib/components/index.ts`.
- **Library Exports**: Keep package export entry points aligned with `package.json` (`.`, `./blocks`, `./theme.css`) when adding new public modules.
- **Props**: Use `$props()` for component properties. Prefer explicit types for props.
- **Styling**: Keep Tailwind classes organized. Use `theme.css` variables (e.g., `bg-base-100`, `text-content`) instead of hardcoding slate colors where possible.

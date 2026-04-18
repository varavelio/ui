# @varavel/ui

`@varavel/ui` is the official UI library for the Varavel ecosystem.

It is built for Svelte 5 and Tailwind CSS v4, and ships with reusable components plus a shared Tailwind CSS configuration.

## Install

```bash
npm install @varavel/ui
```

Required peer dependencies:

- `svelte` v5+
- `tailwindcss` v4+

## Quick Start

### 1) Configure your global stylesheet

In your main stylesheet (for example `src/app.css`):

```css
@import "tailwindcss";
@import "@varavel/ui/theme.css";
@source "../node_modules/@varavel/ui";
```

### 2) Mount `UiProvider` in your root layout

`UiProvider` should wrap your app once at the root so shared runtime behavior (dialogs, toasts, tooltip timing, etc.) works globally.

```svelte
<script>
import "../app.css";
  import { UiProvider } from "@varavel/ui";

  let { children } = $props();
</script>

<UiProvider>{@render children()}</UiProvider>
```

### 3) Use components

Import components directly from `@varavel/ui` in your Svelte files:

```svelte
<script lang="ts">
import { Button, Input } from "@varavel/ui";
</script>

<div class="flex flex-col gap-3">
  <Input placeholder="Project name" />
  <Button>Save changes</Button>
</div>
```

## License

This project is released under the MIT License. See the [LICENSE](https://github.com/varavelio/ui/blob/main/LICENSE).

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

### 2) Prevent FOUC with Theme Initialization

To ensure the theme is initialized correctly and prevent a Flash of Unstyled Content (FOUC), add the following script to your `app.html` (or main HTML file) inside the `<head>` tag, ideally before any other scripts:

```html
<script src="https://cdn.jsdelivr.net/gh/varavelio/ui@main/static/theme-init.min.js"></script>
```

You can also use the unminified version during development:
`https://cdn.jsdelivr.net/gh/varavelio/ui@main/static/theme-init.js`

### 3) Mount `UiProvider` in your root layout

`UiProvider` should wrap your app once at the root so shared runtime behavior (dialogs, toasts, tooltip timing, etc.) works globally.

```svelte
<script>
import "../app.css";
  import { UiProvider } from "@varavel/ui";

  let { children } = $props();
</script>

<UiProvider>{@render children()}</UiProvider>
```

### 4) Using Components, Blocks, and Layouts

Import from the library's specialized entry points. Layouts use Svelte 5 snippets to define structural regions like `header`, `sidebar`, and `main`:

```svelte
<script lang="ts">
import { Button, Input } from "@varavel/ui";
  import { Hero } from "@varavel/ui/blocks";
  import { AppLayout } from "@varavel/ui/layouts";
  import { toast } from "@varavel/ui/runtime";
</script>

<AppLayout>
  {#snippet header()}
    <div class="flex items-center justify-between w-full">
      <span>My Application</span>
      <Button size="sm" onclick={() => toast.info("Refreshing...")}>
        Refresh
      </Button>
    </div>
  {/snippet}

  {#snippet main()}
    <Hero.Split
      title="Modern UI"
      description="Svelte 5 & Tailwind 4 components."
    />

    <div class="p-6 max-w-sm">
      <Input placeholder="Search..." />
    </div>
  {/snippet}
</AppLayout>
```

## License

This project is released under the MIT License. See the [LICENSE](https://github.com/varavelio/ui/blob/main/LICENSE).

<script lang="ts">
  import {
    Bell,
    CircleAlert,
    Component,
    Info,
    Layers3,
    RectangleEllipsis,
    Search,
    Waypoints,
  } from "@lucide/svelte";
  import type { Component as SvelteComponent } from "svelte";
  import { page } from "$app/state";
  import Container from "$lib/components/Container/Container.svelte";
  import {
    Alert,
    Badge,
    Button,
    Input,
    ScrollArea,
    ThemePicker,
  } from "$lib/components/index.js";
  import {
    type ComponentCategory,
    componentCategories,
    componentEntries,
    explorerSections,
    getSectionHref,
    isExplorerType,
    type RuntimeCategory,
    runtimeCategories,
    runtimeEntries,
  } from "./explorer.ts";

  let { children } = $props();

  const componentCategoryIcons = {
    "Core Building Blocks": Layers3,
    "Form Controls": RectangleEllipsis,
    "Disclosure & Expansion": Waypoints,
    "Overlays & Floating UI": Component,
    "Status & Feedback": Component,
    "Utilities & Preferences": Layers3,
  } as const satisfies Record<ComponentCategory, SvelteComponent>;

  const runtimeCategoryIcons = {
    "Theme Management": Info,
    "Dialog Management": CircleAlert,
    "Toast Management": Bell,
  } as const satisfies Record<RuntimeCategory, SvelteComponent>;

  let query = $state("");

  let currentType = $derived(
    isExplorerType(page.params.type ?? "") ? page.params.type : "components",
  );

  let activeSlug = $derived(page.params.slug ?? "");

  let navItems = $derived.by(() =>
    explorerSections.map((section) => ({
      ...section,
      href: getSectionHref(section.type),
    })),
  );

  let normalizedQuery = $derived(query.trim().toLowerCase());

  let filteredComponentEntries = $derived.by(() =>
    componentEntries.filter((entry) => {
      if (!normalizedQuery) {
        return true;
      }

      const haystack = `${entry.name} ${entry.category}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    }),
  );

  let componentCategoryCounts = $derived.by(() => {
    const counts = Object.fromEntries(
      componentCategories.map((category) => [category, 0]),
    ) as Record<ComponentCategory, number>;

    for (const entry of filteredComponentEntries) {
      counts[entry.category] += 1;
    }

    return counts;
  });

  let filteredRuntimeEntries = $derived.by(() =>
    runtimeEntries.filter((entry) => {
      if (!normalizedQuery) {
        return true;
      }

      const haystack =
        `${entry.name} ${entry.category} ${entry.summary}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    }),
  );

  let runtimeCategoryCounts = $derived.by(() => {
    const counts = Object.fromEntries(
      runtimeCategories.map((category) => [category, 0]),
    ) as Record<RuntimeCategory, number>;

    for (const entry of filteredRuntimeEntries) {
      counts[entry.category] += 1;
    }

    return counts;
  });

  let sidebarTitle = $derived.by(() => {
    switch (currentType) {
      case "components":
        return "Component Library";
      case "runtime":
        return "Runtime APIs";
      case "blocks":
        return "Blocks";
      case "layouts":
        return "Layouts";
    }
  });

  let sidebarDescription = $derived.by(() => {
    switch (currentType) {
      case "components":
        return "Search and browse reusable UI primitives.";
      case "runtime":
        return "Explore app-level APIs for interacting with Varavel UI.";
      case "blocks":
        return "Production-ready sections are listed here.";
      case "layouts":
        return "Page scaffolds and structural templates are listed here.";
    }
  });

  let searchPlaceholder = $derived.by(() => {
    if (currentType === "runtime") {
      return "Search runtime API";
    }

    return "Search component or category";
  });

  let supportsSearch = $derived(
    currentType === "components" || currentType === "runtime",
  );
</script>

<div class="sticky top-0 z-10 border-b bg-base-100">
  <Container padded class="py-2" size="xl" align="center">
    <div class="space-y-3">
      <header class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <img
            src="https://cdn.jsdelivr.net/gh/varavelio/brand@1.0.0/dist/logo-white.svg"
            alt="Varavel UI"
            class="hidden size-6 dark:block"
          >
          <img
            src="https://cdn.jsdelivr.net/gh/varavelio/brand@1.0.0/dist/logo-black.svg"
            alt="Varavel UI"
            class="size-6 dark:hidden"
          >
          <h1 class="text-2xl font-semibold">Varavel UI</h1>

          <div class="pl-4">
            <nav aria-label="Explorer sections" class="overflow-x-auto">
              <div class="flex min-w-max items-center gap-2 pb-1">
                {#each navItems as item (item.type)}
                  <Button
                    href={item.href}
                    variant="ghost"
                    color={currentType === item.type ? "info" : "neutral"}
                    active={currentType === item.type}
                  >
                    <span>{item.label}</span>
                    {#if item.soon}
                      <Badge size="sm" variant="solid" color="neutral">
                        Soon
                      </Badge>
                    {/if}
                  </Button>
                {/each}
              </div>
            </nav>
          </div>
        </div>

        <ThemePicker class="shrink-0" />
      </header>
    </div>
  </Container>
</div>

<Container
  padded
  class="isolate z-0 flex min-h-screen justify-center gap-4 py-4"
  size="xl"
  align="center"
>
  <aside class="sticky top-22 h-[calc(100dvh-120px)] w-83 flex-none">
    <div class="flex h-full flex-col">
      <div class="space-y-2 border-b pb-4">
        <h2 class="text-2xl font-semibold tracking-tight">{sidebarTitle}</h2>
        <p class="text-sm text-content-muted">{sidebarDescription}</p>

        {#if supportsSearch}
          <label class="sr-only" for="explorer-search">Explorer search</label>

          <div class="relative">
            <Search
              class="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-content-muted"
            />
            <Input
              id="explorer-search"
              bind:value={query}
              class="pl-9"
              placeholder={searchPlaceholder}
            />
          </div>
        {/if}
      </div>

      <ScrollArea class="min-h-0 flex-1" viewportClass="pr-4 py-4">
        {#if currentType === "components"}
          <nav aria-label="Component catalog" class="space-y-6">
            {#each componentCategories as category (category)}
              {@const categoryEntries = filteredComponentEntries.filter(
                (entry) => entry.category === category,
              )}
              {@const Icon = componentCategoryIcons[category]}

              {#if categoryEntries.length}
                <section class="space-y-3">
                  <div class="px-2">
                    <div class="flex items-center justify-between gap-3">
                      <div class="flex items-center gap-2">
                        <Icon class="size-4 text-content-muted" />
                        <h3
                          class="text-xs font-medium tracking-[0.18em] text-content-muted uppercase"
                        >
                          {category}
                        </h3>
                      </div>
                      <span class="text-xs text-content-muted">
                        {componentCategoryCounts[category]}
                      </span>
                    </div>
                  </div>

                  <div class="space-y-1">
                    {#each categoryEntries as entry (entry.id)}
                      <Button
                        href="/components/{entry.slug}"
                        wide
                        alignContent="left"
                        active={activeSlug === entry.slug && currentType === "components"}
                        variant={activeSlug === entry.slug && currentType === "components"
                            ? "outline"
                            : "ghost"}
                        color={activeSlug === entry.slug && currentType === "components"
                            ? "info"
                            : "neutral"}
                      >
                        {entry.name}
                      </Button>
                    {/each}
                  </div>
                </section>
              {/if}
            {/each}

            {#if !filteredComponentEntries.length}
              <Alert
                title="No components match this filter"
                description="Try broader terms like form, dialog, or feedback."
                color="warning"
                closable={false}
              />
            {/if}
          </nav>
        {:else if currentType === "runtime"}
          <nav aria-label="Runtime catalog" class="space-y-6">
            {#each runtimeCategories as category (category)}
              {@const categoryEntries = filteredRuntimeEntries.filter(
                (entry) => entry.category === category,
              )}
              {@const Icon = runtimeCategoryIcons[category]}

              {#if categoryEntries.length}
                <section class="space-y-3">
                  <div class="px-2">
                    <div class="flex items-center justify-between gap-3">
                      <div class="flex items-center gap-2">
                        <Icon class="size-4 text-content-muted" />
                        <h3
                          class="text-xs font-medium tracking-[0.18em] text-content-muted uppercase"
                        >
                          {category}
                        </h3>
                      </div>
                      <span class="text-xs text-content-muted">
                        {runtimeCategoryCounts[category]}
                      </span>
                    </div>
                  </div>

                  <div class="space-y-1">
                    {#each categoryEntries as entry (entry.slug)}
                      <Button
                        href="/runtime/{entry.slug}"
                        wide
                        alignContent="left"
                        active={activeSlug === entry.slug && currentType === "runtime"}
                        variant={activeSlug === entry.slug && currentType === "runtime"
                            ? "outline"
                            : "ghost"}
                        color={activeSlug === entry.slug && currentType === "runtime"
                            ? "info"
                            : "neutral"}
                      >
                        {entry.name}
                      </Button>
                    {/each}
                  </div>
                </section>
              {/if}
            {/each}

            {#if !filteredRuntimeEntries.length}
              <Alert
                title="No runtime APIs match this filter"
                description="Try searching for theme or dialog."
                color="warning"
                closable={false}
              />
            {/if}
          </nav>
        {:else}
          <Alert title="Coming soon" color="info" closable={false} />
        {/if}
      </ScrollArea>
    </div>
  </aside>

  <main class="min-w-0 grow space-y-6">{@render children()}</main>
</Container>

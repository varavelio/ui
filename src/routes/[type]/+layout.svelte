<script lang="ts">
  import {
    Bell,
    CircleAlert,
    Clipboard,
    Component,
    Info,
    Layers,
    RectangleEllipsis,
    Search,
    Waypoints,
  } from "@lucide/svelte";
  import type { Component as SvelteComponent } from "svelte";
  import { page } from "$app/state";
  import { Logo } from "$lib/brand/index.js";
  import Container from "$lib/components/Container/Container.svelte";
  import {
    Alert,
    Badge,
    Button,
    Input,
    ThemePicker,
  } from "$lib/components/index.js";
  import {
    brandEntries,
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
    "Core Building Blocks": Layers,
    "Form Controls": RectangleEllipsis,
    "Disclosure & Expansion": Waypoints,
    "Overlays & Floating UI": Component,
    "Status & Feedback": Component,
    "Utilities & Preferences": Layers,
  } as const satisfies Record<ComponentCategory, SvelteComponent>;

  const runtimeCategoryIcons = {
    "Clipboard Management": Clipboard,
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

  let filteredBrandEntries = $derived.by(() =>
    brandEntries.filter((entry) => {
      if (!normalizedQuery) {
        return true;
      }

      const haystack = `${entry.name} ${entry.category}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    }),
  );

  function countEntriesByCategory(
    entries: { category: ComponentCategory }[],
  ): Record<ComponentCategory, number> {
    const counts = Object.fromEntries(
      componentCategories.map((category) => [category, 0]),
    ) as Record<ComponentCategory, number>;

    for (const entry of entries) {
      counts[entry.category] += 1;
    }

    return counts;
  }

  let componentCategoryCounts = $derived.by(() =>
    countEntriesByCategory(filteredComponentEntries),
  );

  let brandCategoryCounts = $derived.by(() =>
    countEntriesByCategory(filteredBrandEntries),
  );

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
      case "brand":
        return "Brand Library";
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
      case "brand":
        return "Explore Varavel-specific marks, loaders, and identity primitives.";
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

    if (currentType === "brand") {
      return "Search brand component or category";
    }

    return "Search component or category";
  });

  let supportsSearch = $derived(
    currentType === "components" ||
      currentType === "brand" ||
      currentType === "runtime",
  );
</script>

<div class="sticky top-0 z-10 border-b bg-base-100">
  <Container padded class="py-2" size="xl" align="center">
    <div class="space-y-3">
      <header class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <Logo class="size-6" href="/" />
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

      <div class="min-h-0 flex-1 py-4 overflow-y-auto">
        {#if currentType === "components" || currentType === "brand"}
          {@const catalogEntries = currentType === "brand"
            ? filteredBrandEntries
            : filteredComponentEntries}
          {@const categoryCounts = currentType === "brand"
            ? brandCategoryCounts
            : componentCategoryCounts}

          <nav
            aria-label={currentType === "brand" ? "Brand catalog" : "Component catalog"}
            class="space-y-6"
          >
            {#each componentCategories as category (category)}
              {@const categoryEntries = catalogEntries.filter(
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
                        {categoryCounts[category]}
                      </span>
                    </div>
                  </div>

                  <div class="space-y-1">
                    {#each categoryEntries as entry (entry.id)}
                      <Button
                        href="/{currentType}/{entry.slug}"
                        wide
                        alignContent="left"
                        active={activeSlug === entry.slug}
                        variant={activeSlug === entry.slug
                            ? "outline"
                            : "ghost"}
                        color={activeSlug === entry.slug
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

            {#if !catalogEntries.length}
              <Alert
                title={currentType === "brand"
                    ? "No brand components match this filter"
                    : "No components match this filter"}
                description={currentType === "brand"
                    ? "Try broader terms like logo or loader."
                    : "Try broader terms like form, dialog, or feedback."}
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
      </div>
    </div>
  </aside>

  <main class="min-w-0 grow space-y-6">{@render children()}</main>
</Container>

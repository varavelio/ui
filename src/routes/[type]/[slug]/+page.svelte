<script lang="ts">
  import {
    Component,
    Layers3,
    RectangleEllipsis,
    Search,
    Waypoints,
  } from "@lucide/svelte";
  import type { Component as SvelteComponent } from "svelte";
  import { page } from "$app/state";
  import {
    type ComponentCategory,
    catalog,
    componentCategories,
  } from "$lib/catalog.js";
  import Button from "$lib/components/Button/Button.svelte";
  import Container from "$lib/components/Container/Container.svelte";
  import {
    Alert,
    Badge,
    Card,
    Input,
    ScrollArea,
    ThemePicker,
  } from "$lib/components/index.js";

  type ExplorerEntry = (typeof catalog.components)[number] & {
    id: string;
    importCode: string;
  };

  const categoryIcons = {
    "Core Building Blocks": Layers3,
    "Form Controls": RectangleEllipsis,
    "Disclosure & Expansion": Waypoints,
    "Overlays & Floating UI": Component,
    "Status & Feedback": Component,
    "Utilities & Preferences": Layers3,
  } as const satisfies Record<ComponentCategory, SvelteComponent>;

  const entries: ExplorerEntry[] = catalog.components.map((entry) => ({
    ...entry,
    id: entry.name,
    importCode: `import { ${entry.name} } from "@varavel/ui";`,
  }));

  let query = $state("");

  let normalizedQuery = $derived(query.trim().toLowerCase());

  let filteredEntries = $derived.by(() =>
    entries.filter((entry) => {
      if (!normalizedQuery) {
        return true;
      }

      const haystack = `${entry.name} ${entry.category}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    }),
  );

  let activeId = $derived(
    entries.find((e) => e.slug === page.params.slug)?.id ??
      filteredEntries[0]?.id ??
      entries[0]?.id ??
      "",
  );

  let current = $derived(
    entries.find((entry) => entry.id === activeId) ?? null,
  );

  let categoryCounts = $derived.by(() => {
    const counts = Object.fromEntries(
      componentCategories.map((category) => [category, 0]),
    ) as Record<ComponentCategory, number>;

    for (const entry of filteredEntries) {
      counts[entry.category] += 1;
    }

    return counts;
  });
</script>

<svelte:head>
  {#if current?.name}
    <title>{current.name} | Varavel UI Explorer</title>
  {:else}
    <title>Varavel UI Explorer</title>
  {/if}
</svelte:head>

<div class="border-b sticky top-0 bg-base-100 z-10">
  <Container padded class="py-2" size="xl" align="center">
    <header class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <img
          src="https://cdn.jsdelivr.net/gh/varavelio/brand@1.0.0/dist/logo-white.svg"
          alt="Varavel UI"
          class="size-6 dark:block hidden"
        >
        <img
          src="https://cdn.jsdelivr.net/gh/varavelio/brand@1.0.0/dist/logo-black.svg"
          alt="Varavel UI"
          class="size-6 dark:hidden"
        >
        <h1 class="font-semibold text-2xl">Varavel UI</h1>
      </div>
      <ThemePicker class="shrink-0" />
    </header>
  </Container>
</div>

<Container
  padded
  class="py-4 isolate z-0 min-h-screen flex justify-center space-x-4"
  size="xl"
  align="center"
>
  <aside class="h-[calc(100dvh-90px)] flex-none w-83 sticky top-18.5">
    <div class="flex h-full flex-col">
      <div class="border-b pb-4">
        <h1 class="text-2xl font-semibold tracking-tight mb-2">
          Component Library
        </h1>

        <label class="sr-only" for="component-search">Search components</label>

        <div class="relative">
          <Search
            class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-content-muted"
          />
          <Input
            bind:value={query}
            class="pl-9"
            id="component-search"
            placeholder="Search component or category"
          />
        </div>
      </div>

      <ScrollArea class="min-h-0 flex-1" viewportClass="pr-4 py-4">
        <nav aria-label="Component catalog" class="space-y-6">
          {#each componentCategories as category (category)}
            {@const categoryEntries = filteredEntries.filter((entry) => entry.category === category)}
            {@const Icon = categoryIcons[category]}

            {#if categoryEntries.length}
              <section class="space-y-3">
                <div class="px-2">
                  <div class="flex items-center justify-between gap-3">
                    <div class="flex items-center gap-2">
                      <Icon class="size-4 text-content-muted"></Icon>
                      <h2
                        class="text-xs font-medium uppercase tracking-[0.18em] text-content-muted"
                      >
                        {category}
                      </h2>
                    </div>
                    <span class="text-xs text-content-muted">
                      {categoryCounts[category]}
                    </span>
                  </div>
                </div>

                <div class="space-y-1">
                  {#each categoryEntries as entry (entry.id)}
                    <Button
                      href="/{entry.type}/{entry.slug}"
                      wide
                      alignContent="left"
                      active={activeId === entry.id}
                      variant={activeId === entry.id ? "outline" : "ghost"}
                      color={activeId === entry.id ? "info" : "neutral"}
                    >
                      {entry.name}
                    </Button>
                  {/each}
                </div>
              </section>
            {/if}
          {/each}

          {#if !filteredEntries.length}
            <Alert
              description="Try a broader term such as form, dialog, or feedback."
              title="No components match this filter"
              color="warning"
            />
          {/if}
        </nav>
      </ScrollArea>
    </div>
  </aside>

  <div class="space-y-6 grow">
    <div class="space-y-5 overflow-hidden">
      <div class="flex flex-wrap items-start justify-between gap-5">
        <div class="max-w-3xl space-y-2">
          <h2 class="text-3xl font-semibold tracking-tight">
            {current?.name ?? "Component"}
          </h2>

          <div class="flex flex-wrap items-center gap-2">
            <Badge color="info">{current?.category ?? "Catalog"}</Badge>
          </div>
        </div>

        {#if current}
          <code
            class="mt-2 block overflow-x-auto rounded-md border bg-base-100 px-3 py-3 text-sm text-content"
          >
            {current.importCode}
          </code>
        {/if}
      </div>
    </div>

    <div>
      <div class="border-b py-2">
        <h3 class="font-2xl font-semibold tracking-tight">Example</h3>
      </div>

      <div class="py-4 bg-base-100">
        {#if current?.demo}
          <current.demo />
        {:else}
          <Alert
            description="A demo component was not found for this entry."
            title="Missing live example"
            color="warning"
          />
        {/if}
      </div>
    </div>

    <div>
      <div class="border-b py-2 mb-4">
        <h3 class="font-2xl font-semibold tracking-tight">Props</h3>
      </div>

      <Card padding="none">
        {#if current?.props?.length}
          <table class="w-full text-left text-sm">
            <thead class="bg-base-200 text-content-muted">
              <tr>
                <th class="px-5 py-3 font-medium">Name</th>
                <th class="px-5 py-3 font-medium">Type</th>
                <th class="px-5 py-3 font-medium">Default</th>
                <th class="px-5 py-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {#each current.props as prop (prop.name)}
                <tr class="border-t align-top">
                  <td class="px-5 py-3 font-medium text-content">
                    {prop.name}
                  </td>
                  <td class="px-5 py-3">
                    <code
                      class="rounded border bg-base-200 px-1.5 py-0.5 text-xs text-content"
                    >
                      {prop.type}
                    </code>
                  </td>
                  <td class="px-5 py-3 text-content-muted">
                    {prop.defaultValue ?? "—"}
                  </td>
                  <td class="px-5 py-3 text-content-muted">
                    {prop.description}
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        {:else}
          <div class="p-5">
            <Alert
              title="No props documented"
              description="This component currently has no prop documentation in its metadata."
              color="warning"
            />
          </div>
        {/if}
      </Card>
    </div>
  </div>
</Container>

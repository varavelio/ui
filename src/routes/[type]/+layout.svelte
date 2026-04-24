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
  import {
    Alert,
    Badge,
    Button,
    GithubButton,
    Heading,
    Input,
    Nav,
    ThemePicker,
  } from "$lib/components/index.js";
  import { AppLayout } from "$lib/layouts/index.js";
  import {
    blockEntries,
    brandEntries,
    type ComponentCategory,
    componentCategories,
    componentEntries,
    explorerSections,
    getSectionHref,
    isExplorerType,
    layoutEntries,
    type RuntimeCategory,
    runtimeCategories,
    runtimeEntries,
  } from "./explorer.ts";

  interface GroupedEntries<TEntry, TCategory extends string> {
    category: TCategory;
    count: number;
    entries: TEntry[];
    icon: SvelteComponent;
  }

  interface BlockNavGroup {
    family: string;
    count: number;
    entries: typeof blockEntries;
    icon: SvelteComponent;
  }

  let { children } = $props();

  const componentCategoryIcons = {
    "Core Building Blocks": Layers,
    "Form Controls": RectangleEllipsis,
    "Disclosure & Expansion": Waypoints,
    "Overlays & Floating UI": Component,
    "Status & Feedback": Component,
    "Utilities & Preferences": Layers,
    Blocks: Layers,
  } as const satisfies Record<ComponentCategory, SvelteComponent>;

  const runtimeCategoryIcons = {
    "Clipboard Management": Clipboard,
    "DOM Instrumentation": Waypoints,
    "Theme Management": Info,
    "Dialog Management": CircleAlert,
    "Toast Management": Bell,
  } as const satisfies Record<RuntimeCategory, SvelteComponent>;

  let query = $state("");

  function groupEntriesByCategory<
    TEntry extends { category: TCategory },
    TCategory extends string,
  >(
    categories: readonly TCategory[],
    entries: TEntry[],
    icons: Record<TCategory, SvelteComponent>,
  ): GroupedEntries<TEntry, TCategory>[] {
    return categories
      .map((category) => {
        const categoryEntries = entries.filter(
          (entry) => entry.category === category,
        );

        return {
          category,
          count: categoryEntries.length,
          entries: categoryEntries,
          icon: icons[category],
        };
      })
      .filter((group) => group.entries.length > 0);
  }

  let currentType = $derived(
    isExplorerType(page.params.type ?? "") ? page.params.type : "components",
  );

  let activeSlug = $derived(page.params.slug ?? "");
  let activeHash = $derived(page.url.hash.replace(/^#/, ""));

  let sectionNavItems = $derived.by(() =>
    explorerSections.map((section) => ({
      ...section,
      active: currentType === section.type,
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

  let filteredBlockEntries = $derived.by(() =>
    blockEntries.filter((entry) => {
      if (!normalizedQuery) {
        return true;
      }

      const haystack = `${entry.name} ${entry.category}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    }),
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

  let componentNavGroups = $derived.by(() =>
    groupEntriesByCategory(
      componentCategories,
      filteredComponentEntries,
      componentCategoryIcons,
    ),
  );

  let brandNavGroups = $derived.by(() =>
    groupEntriesByCategory(
      componentCategories,
      filteredBrandEntries,
      componentCategoryIcons,
    ),
  );

  let blockNavGroups = $derived.by(() =>
    Array.from(
      filteredBlockEntries.reduce((groups, entry) => {
        const group = groups.get(entry.family);

        if (group) {
          group.entries.push(entry);
          group.count += 1;
          return groups;
        }

        groups.set(entry.family, {
          family: entry.family,
          count: 1,
          entries: [entry],
          icon: Layers,
        });

        return groups;
      }, new Map<string, BlockNavGroup>()),
    )
      .map(([, group]) => ({
        ...group,
        entries: group.entries.sort((a, b) =>
          a.variant.localeCompare(b.variant),
        ),
      }))
      .sort((a, b) => a.family.localeCompare(b.family)),
  );

  let runtimeNavGroups = $derived.by(() =>
    groupEntriesByCategory(
      runtimeCategories,
      filteredRuntimeEntries,
      runtimeCategoryIcons,
    ),
  );

  let layoutNavItems = $derived.by(() =>
    layoutEntries.map((entry, index) => ({
      ...entry,
      active:
        currentType === "layouts" &&
        (activeHash ? activeHash === entry.slug : index === 0),
    })),
  );

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
        return "Block families and their opinionated variants are listed here.";
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

    if (currentType === "blocks") {
      return "Search block family or variant";
    }

    return "Search component or category";
  });

  let supportsSearch = $derived(
    currentType === "components" ||
      currentType === "brand" ||
      currentType === "blocks" ||
      currentType === "runtime",
  );
</script>

<AppLayout primaryRegion="header" maxWidth="xl" sidebarWidth="lg">
  {#snippet headerLeft()}
    <div class="min-w-0 shrink-0 flex items-center gap-2">
      <Logo class="size-6 shrink-0" href="/" />
      <Heading size="xl" level="1">Varavel UI</Heading>
    </div>

    <nav
      aria-label="Explorer sections"
      class="hidden min-w-max flex-1 overflow-x-auto desk:flex items-center gap-1"
    >
      {#each sectionNavItems as item (item.type)}
        <Button
          href={item.href}
          variant="ghost"
          color={item.active ? "info" : "neutral"}
          active={item.active}
        >
          <span>{item.label}</span>
          {#if item.soon}
            <Badge size="sm" variant="solid" color="neutral">Soon</Badge>
          {/if}
        </Button>
      {/each}
    </nav>
  {/snippet}

  {#snippet headerRight()}
    <div class="hidden desk:flex items-center gap-2">
      <GithubButton user="varavelio" repo="ui" />
      <ThemePicker />
    </div>
  {/snippet}

  {#snippet sidebarTop()}
    <div class="space-y-2 border-b pb-4">
      <h2 class="text-xl font-semibold tracking-tight desk:text-2xl">
        {sidebarTitle}
      </h2>
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
  {/snippet}

  {#snippet sidebarCenter()}
    <div class="space-y-4">
      <div class="space-y-3 border-b pb-4 desk:hidden">
        <p
          class="text-xs font-medium tracking-[0.18em] text-content-muted uppercase"
        >
          Sections
        </p>

        <Nav.Root aria-label="Explorer sections">
          {#each sectionNavItems as item (item.type)}
            <Nav.Item href={item.href} label={item.label} active={item.active}>
              {#if item.soon}
                <Badge size="sm" variant="solid" color="neutral">Soon</Badge>
              {/if}
            </Nav.Item>
          {/each}
        </Nav.Root>
      </div>

      {#if currentType === "components" || currentType === "brand"}
        {@const navGroups = currentType === "brand" ? brandNavGroups : componentNavGroups}

        <div class="space-y-3">
          <Nav.Root
            aria-label={currentType === "brand" ? "Brand catalog" : "Component catalog"}
          >
            {#each navGroups as group (group.category)}
              <Nav.Group
                label={`${group.category} (${group.count})`}
                icon={group.icon}
                open={true}
              >
                {#each group.entries as entry (entry.id)}
                  <Nav.Item
                    href={`/${currentType}/${entry.slug}/`}
                    label={entry.name}
                    active={activeSlug === entry.slug}
                  />
                {/each}
              </Nav.Group>
            {/each}
          </Nav.Root>

          {#if !navGroups.length}
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
        </div>
      {:else if currentType === "blocks"}
        <div class="space-y-3">
          <Nav.Root aria-label="Block catalog">
            {#each blockNavGroups as group (group.family)}
              <Nav.Group
                label={`${group.family} (${group.count})`}
                icon={group.icon}
                open={true}
              >
                {#each group.entries as entry (entry.id)}
                  <Nav.Item
                    href={`/${currentType}/${entry.slug}/`}
                    label={entry.variant}
                    active={activeSlug === entry.slug}
                  />
                {/each}
              </Nav.Group>
            {/each}
          </Nav.Root>

          {#if !blockNavGroups.length}
            <Alert
              title="No blocks match this filter"
              description="Try broader terms like hero, pricing, or footer."
              color="warning"
              closable={false}
            />
          {/if}
        </div>
      {:else if currentType === "runtime"}
        <div class="space-y-3">
          <Nav.Root aria-label="Runtime catalog">
            {#each runtimeNavGroups as group (group.category)}
              <Nav.Group
                label={`${group.category} (${group.count})`}
                icon={group.icon}
                open={true}
              >
                {#each group.entries as entry (entry.slug)}
                  <Nav.Item
                    href={`/runtime/${entry.slug}`}
                    label={entry.name}
                    active={activeSlug === entry.slug}
                  />
                {/each}
              </Nav.Group>
            {/each}
          </Nav.Root>

          {#if !runtimeNavGroups.length}
            <Alert
              title="No runtime APIs match this filter"
              description="Try searching for theme or dialog."
              color="warning"
              closable={false}
            />
          {/if}
        </div>
      {:else if currentType === "layouts"}
        <div class="space-y-3">
          <Nav.Root aria-label="Layout catalog">
            {#each layoutNavItems as entry (entry.id)}
              <Nav.Item
                href={`/layouts#${entry.slug}`}
                label={entry.name}
                active={entry.active}
              />
            {/each}
          </Nav.Root>

          {#if !layoutEntries.length}
            <Alert
              title="No layouts available"
              description="Add a layout entry to the explorer registry."
              color="warning"
              closable={false}
            />
          {/if}
        </div>
      {:else}
        <Alert title="Coming soon" color="info" closable={false} />
      {/if}
    </div>
  {/snippet}

  {#snippet sidebarBottom()}
    <div class="border-t pt-4 desk:hidden">
      <div class="flex flex-col gap-4">
        <ThemePicker wide alignContent="left" />
        <GithubButton user="varavelio" repo="ui" />
      </div>
    </div>
  {/snippet}

  {#snippet main()}
    <div class="mx-auto flex min-h-full w-full flex-col gap-4 p-4">
      {@render children()}
    </div>
  {/snippet}
</AppLayout>

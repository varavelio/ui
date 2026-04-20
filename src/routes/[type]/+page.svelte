<script lang="ts">
  import { page } from "$app/state";
  import { Alert, Button, Card } from "$lib/components/index.js";
  import {
    defaultBrandSlug,
    defaultComponentSlug,
    defaultRuntimeSlug,
    isExplorerType,
    layoutEntries,
  } from "./explorer.ts";

  let currentType = $derived(
    isExplorerType(page.params.type ?? "") ? page.params.type : "components",
  );

  let defaultEntryLabel = $derived.by(() => {
    if (currentType === "runtime") {
      return "runtime API";
    }

    if (currentType === "brand") {
      return "brand component";
    }

    return "component";
  });

  let defaultHref = $derived.by(() => {
    if (currentType === "components" && defaultComponentSlug) {
      return `/components/${defaultComponentSlug}`;
    }

    if (currentType === "brand" && defaultBrandSlug) {
      return `/brand/${defaultBrandSlug}`;
    }

    if (currentType === "runtime" && defaultRuntimeSlug) {
      return `/runtime/${defaultRuntimeSlug}`;
    }

    return null;
  });
</script>

{#if currentType === "layouts"}
  <div class="space-y-4">
    <Card class="space-y-2">
      <h2 class="text-3xl font-semibold tracking-tight">Layouts</h2>
      <p class="text-sm text-content-muted">
        Live previews are embedded below. Each preview uses `AppLayout` with a
        Nav-driven sidebar and can also open in a new tab.
      </p>
    </Card>

    {#each layoutEntries as entry (entry.id)}
      <Card id={entry.slug} class="space-y-4">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div class="max-w-2xl space-y-1">
            <h3 class="text-2xl font-semibold tracking-tight">{entry.name}</h3>
            <p class="text-sm text-content-muted">{entry.summary}</p>
          </div>

          <Button
            href={entry.previewHref}
            target="_blank"
            variant="outline"
            color="info"
            class="w-full desk:w-auto"
          >
            Open in new tab
          </Button>
        </div>

        <div class="overflow-hidden rounded-lg border bg-base-100">
          <iframe
            title={`${entry.name} preview`}
            src={entry.previewHref}
            loading="lazy"
            class="h-[60dvh] min-h-[22rem] w-full desk:h-[70dvh] desk:min-h-[34rem]"
          ></iframe>
        </div>
      </Card>
    {/each}

    {#if !layoutEntries.length}
      <Card>
        <Alert
          title="No layouts available"
          description="Add entries in explorer.ts to render more layout demos."
          color="warning"
          closable={false}
        />
      </Card>
    {/if}
  </div>
{:else}
  <Card class="space-y-4">
    <h2 class="text-3xl font-semibold tracking-tight capitalize">
      {currentType}
    </h2>

    {#if defaultHref}
      <Alert
        title="Select an entry"
        description="Pick any item from the sidebar, or jump straight into the first documented page."
        color="info"
        closable={false}
      />

      <Button href={defaultHref} color="info" variant="outline">
        Open first {defaultEntryLabel}
      </Button>
    {:else}
      <Alert title="Coming soon" color="info" closable={false} />
    {/if}
  </Card>
{/if}

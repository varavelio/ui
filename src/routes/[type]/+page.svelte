<script lang="ts">
  import { page } from "$app/state";
  import { Alert, Button, Card } from "$lib/components/index.js";
  import {
    defaultComponentSlug,
    defaultRuntimeSlug,
    isExplorerType,
  } from "./explorer.ts";

  let currentType = $derived(
    isExplorerType(page.params.type ?? "") ? page.params.type : "components",
  );

  let defaultHref = $derived.by(() => {
    if (currentType === "components" && defaultComponentSlug) {
      return `/components/${defaultComponentSlug}`;
    }

    if (currentType === "runtime" && defaultRuntimeSlug) {
      return `/runtime/${defaultRuntimeSlug}`;
    }

    return null;
  });
</script>

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
      Open first {currentType === "components" ? "component" : "runtime API"}
    </Button>
  {:else}
    <Alert title="Coming soon" color="info" closable={false} />
  {/if}
</Card>

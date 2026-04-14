<script lang="ts">
  import { onMount } from "svelte";
  import { Alert, Badge, Button, Card } from "$lib/components/index.js";
  import { theme } from "$lib/runtime/index.js";

  const themes = ["system", "light", "dark"] as const;

  let activeTheme = $derived(theme.current);
  let history = $state<string[]>([]);

  onMount(() => {
    history = [theme.get().theme];

    return theme.subscribe((nextState) => {
      history = [nextState.theme, ...history].slice(0, 6);
    });
  });

  function applyTheme(next: (typeof themes)[number]) {
    theme.set(next);
  }

  let statusDescription = $derived.by(() => {
    if (activeTheme === "system") {
      return "Using system preference. Change your OS theme to see this update automatically.";
    }

    return `Theme is forced to ${activeTheme}.`;
  });
</script>

<div class="space-y-4">
  <Card class="space-y-4">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h4 class="text-lg font-semibold tracking-tight">
          Live theme controls
        </h4>
        <p class="text-sm text-content-muted">
          Trigger `theme.set(...)` and inspect the reactive subscription stream.
        </p>
      </div>
      <Badge color="info" variant="solid">{activeTheme}</Badge>
    </div>

    <div class="grid gap-2 desk:grid-cols-3">
      {#each themes as nextTheme (nextTheme)}
        <Button
          color={activeTheme === nextTheme ? "info" : "neutral"}
          variant={activeTheme === nextTheme ? "outline" : "ghost"}
          onclick={() => applyTheme(nextTheme)}
        >
          Set {nextTheme}
        </Button>
      {/each}
    </div>

    <p class="text-sm text-content-muted">{statusDescription}</p>
  </Card>

  <Card color="muted" class="space-y-3">
    <h4
      class="text-sm font-semibold uppercase tracking-[0.14em] text-content-muted"
    >
      Latest updates from `theme.subscribe`
    </h4>

    {#if history.length}
      <div class="flex flex-wrap gap-2">
        {#each history as item, index (`${item}-${index}`)}
          <Badge color={index === 0 ? "success" : "neutral"} variant="solid">
            {item}
          </Badge>
        {/each}
      </div>
    {:else}
      <p class="text-sm text-content-muted">No updates received yet.</p>
    {/if}
  </Card>

  <Alert
    title="Cross-tab sync"
    description="Open this page in two tabs. Changing the theme in one tab updates the other through the runtime storage listener."
    color="info"
    closable={false}
  />
</div>

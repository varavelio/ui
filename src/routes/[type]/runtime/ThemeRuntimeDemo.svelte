<script lang="ts">
  import { onMount } from "svelte";
  import { Alert, Badge, Button, Card } from "$lib/components/index.js";
  import { theme } from "$lib/runtime/index.js";
  import type { ThemeState } from "$lib/runtime/theme/theme.svelte.js";

  const themes = ["system", "light", "dark"] as const;

  let activeTheme = $derived(theme.current);
  let resolvedTheme = $derived(theme.resolved);
  let history = $state<ThemeState[]>([]);

  onMount(() => {
    history = [theme.get()];

    return theme.subscribe((nextState) => {
      history = [nextState, ...history].slice(0, 6);
    });
  });

  function applyTheme(next: (typeof themes)[number]) {
    theme.set(next);
  }

  let statusDescription = $derived.by(() => {
    if (activeTheme === "system") {
      return `Using system preference. Currently resolved to ${resolvedTheme}. Change your OS theme to see this update automatically.`;
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
          Trigger <code>theme.set(...)</code> and inspect the reactive
          properties or the subscription stream.
        </p>
      </div>
      <div class="flex gap-2">
        <Badge color="info" variant="outline">Preference: {activeTheme}</Badge>
        <Badge color="success" variant="solid">Resolved: {resolvedTheme}</Badge>
      </div>
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

  <Card bg="300" class="space-y-6">
    <div class="space-y-1">
      <h4
        class="text-sm font-semibold uppercase tracking-[0.14em] text-content-muted"
      >
        API Documentation
      </h4>
      <p class="text-xs text-content-muted">
        The <code>theme</code> runtime is a reactive singleton providing deep
        integration with the browser's theme preferences.
      </p>
    </div>

    <div class="grid gap-4 text-sm desk:grid-cols-2">
      <div class="space-y-2">
        <p class="font-medium">Reactive Properties</p>
        <ul class="list-inside list-disc space-y-1 text-content-muted">
          <li>
            <code>theme.current</code>
            : The saved user preference (light, dark, system).
          </li>
          <li>
            <code>theme.resolved</code>
            : The actual theme being applied (light, dark).
          </li>
          <li><code>theme.state</code>: The combined state object.</li>
        </ul>
      </div>
      <div class="space-y-2">
        <p class="font-medium">Methods</p>
        <ul class="list-inside list-disc space-y-1 text-content-muted">
          <li>
            <code>theme.set(pref)</code>
            : Update the user's saved preference.
          </li>
          <li>
            <code>theme.get()</code>
            : Snapshots the current non-reactive state.
          </li>
          <li>
            <code>theme.subscribe(fn)</code>
            : Listen for theme changes (even from other tabs).
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t border-base-300 pt-4">
      <h5
        class="mb-3 text-[10px] font-bold uppercase tracking-wider text-content-muted"
      >
        Subscription stream history
      </h5>

      {#if history.length}
        <div class="flex flex-col gap-2">
          {#each history as item, index (`${item.theme}-${item.resolved}-${index}`)}
            <div class="flex items-center gap-2 text-xs">
              <Badge
                color={index === 0 ? "success" : "neutral"}
                variant={index === 0 ? "solid" : "outline"}
                class="w-20 justify-center"
              >
                {index === 0 ? "Latest" : `T-${index}`}
              </Badge>
              <code class="text-content-muted">{JSON.stringify(item)}</code>
            </div>
          {/each}
        </div>
      {:else}
        <p class="text-sm text-content-muted">No updates received yet.</p>
      {/if}
    </div>
  </Card>

  <Alert
    title="Cross-tab sync"
    description="Open this page in two tabs. Changing the theme in one tab updates the other through the runtime storage listener."
    color="info"
    closable={false}
  />
</div>

<Badge color="info" variant="solid">{activeTheme}</Badge>

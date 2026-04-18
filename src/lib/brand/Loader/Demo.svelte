<script lang="ts">
  import { Loader, Logo } from "$lib/brand/index.js";
  import { Card, Label } from "$lib/components/index.js";

  const sizes = ["sm", "md", "lg"] as const;
</script>

<div class="space-y-8">
  <div class="space-y-3">
    <Label>Sizes</Label>
    <Card class="flex flex-wrap items-center justify-center gap-8 p-8">
      {#each sizes as size (size)}
        <div class="flex flex-col items-center gap-3">
          <Loader {size} />
          <span class="font-mono text-[10px] uppercase text-content-muted">
            {size}
          </span>
        </div>
      {/each}
    </Card>
  </div>

  <div class="space-y-3">
    <Label>Composition</Label>
    <div class="grid grid-cols-1 gap-4 desk:grid-cols-2">
      <Card class="flex items-center gap-3 p-6">
        <Loader size="sm" />
        <div class="space-y-1">
          <p class="text-sm font-medium text-content">Preparing workspace</p>
          <p class="text-xs text-content-muted">
            The loader alternates between the V and A poses automatically.
          </p>
        </div>
      </Card>

      <Card class="flex items-center justify-center p-6">
        <Loader size="md" />
      </Card>
    </div>
  </div>
</div>

<script lang="ts">
  import { Card, Label, Loader } from "$lib/components/index.js";

  const sizes = ["sm", "md", "lg"] as const;
</script>

<div class="space-y-8">
  <div class="space-y-3">
    <Label>Sizes</Label>
    <p>
      Use the predefined size variants or tailwind css {'`size-{n}`'} classes
    </p>
    <Card class="flex flex-wrap items-center justify-center gap-8 p-8">
      {#each sizes as size (size)}
        <div class="flex flex-col items-center gap-3">
          <Loader {size} />
          <span
            class="font-mono text-[10px] font-medium uppercase text-content-muted"
          >
            {size}
          </span>
        </div>
      {/each}
    </Card>
  </div>

  <div class="space-y-3">
    <Label>Composition</Label>
    <div class="grid grid-cols-1 gap-4 desk:grid-cols-3">
      <Card class="flex items-center gap-3 p-6">
        <div class="space-y-1">
          <p class="text-sm font-medium text-content">
            Loading activity
            <Loader size="sm" class="text-content-muted inline" />
          </p>
          <p class="text-xs text-content-muted">Compact inline feedback.</p>
        </div>
      </Card>

      <Card class="flex items-center justify-center p-6">
        <Loader size="md" />
      </Card>

      <Card class="flex items-center gap-3 p-6">
        <Loader size="lg" class="text-info" />
        <div class="space-y-1">
          <p class="text-sm font-medium text-content">Syncing data</p>
          <p class="text-xs text-content-muted">
            Inherits color from utility classes.
          </p>
        </div>
      </Card>
    </div>
  </div>
</div>

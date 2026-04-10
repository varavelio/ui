<script lang="ts">
  import { Input, Popover } from "$lib/components/index.js";
  import Avatar from "../Avatar/Avatar.svelte";
  import Button from "../Button/Button.svelte";

  const sizes = ["sm", "md", "lg"] as const;
  const sides = ["top", "bottom", "left", "right"] as const;
</script>

<div class="flex flex-col gap-12 text-content">
  <!-- Basic Example -->
  <section class="space-y-4">
    <h3 class="text-sm font-medium text-content-muted uppercase tracking-wider">
      Basic Usage
    </h3>
    <Popover title="Popover Title">
      {#snippet trigger()}
        <Button variant="outline">Open Popover</Button>
      {/snippet}

      <div class="space-y-3">
        <div class="space-y-1">
          <h4 class="font-medium text-content text-sm text-balance">
            Dimensions
          </h4>
          <p class="text-xs text-content-muted">
            Set the width and height of the layer.
          </p>
        </div>
        <div class="grid gap-2">
          <Input placeholder="Width" value="100%" />
          <Input placeholder="Max. height" value="300px" />
        </div>
      </div>
    </Popover>
  </section>

  <!-- Sizes -->
  <section class="space-y-4">
    <h3 class="text-sm font-medium text-content-muted uppercase tracking-wider">
      Sizes
    </h3>
    <div class="flex flex-wrap gap-4">
      {#each sizes as size (size)}
        <Popover {size} title="Size: {size}">
          {#snippet trigger()}
            <Button variant="outline">Size: {size}</Button>
          {/snippet}
          <div class="text-sm text-content">
            This is a <span class="font-bold">{size}</span> popover. It adjusts
            its maximum width accordingly.
          </div>
        </Popover>
      {/each}
    </div>
  </section>

  <!-- Placements -->
  <section class="space-y-4">
    <h3 class="text-sm font-medium text-content-muted uppercase tracking-wider">
      Placements
    </h3>
    <div class="flex flex-wrap gap-4">
      {#each sides as side (side)}
        <Popover {side} title="Side: {side}">
          {#snippet trigger()}
            <Button variant="outline">Side: {side}</Button>
          {/snippet}
          <div class="text-sm text-content text-center">
            Floating on the
            <span class="font-bold uppercase">{side}</span>
            side.
          </div>
        </Popover>
      {/each}
    </div>
  </section>

  <!-- Content Variety -->
  <section class="space-y-4">
    <h3 class="text-sm font-medium text-content-muted uppercase tracking-wider">
      Rich Content (No Title)
    </h3>
    <Popover size="lg">
      {#snippet trigger()}
        <Button variant="outline">View Details</Button>
      {/snippet}
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <Avatar
            src="https://cdn.jsdelivr.net/gh/varavelio/brand@1.0.0/dist/avatar-dark.svg"
          />
          <div>
            <p class="text-sm font-medium">Varavel UI</p>
            <p class="text-xs text-content-muted">@varavel/ui</p>
          </div>
        </div>
        <p class="text-sm leading-relaxed">
          The official Svelte 5 & Tailwind CSS 4 UI library for the Varavel
          ecosystem. Designed with a high-contrast, monochromatic aesthetic.
        </p>
        <div class="flex gap-2">
          <Button size="sm" class="w-full">Follow</Button>
          <Button size="sm" variant="outline" class="w-full">Message</Button>
        </div>
      </div>
    </Popover>
  </section>
</div>

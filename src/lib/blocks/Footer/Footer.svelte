<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import Container from "../../components/Container/Container.svelte";
  import Separator from "../../components/Separator/Separator.svelte";
  import { cn } from "../../helpers/cn.js";

  interface Props extends HTMLAttributes<HTMLElement> {
    /**
     * Brand content (logo, name, etc).
     */
    brand?: Snippet;

    /**
     * Copyright text or snippet.
     */
    copyright?: string | Snippet;

    /**
     * Footer links/sections.
     */
    children?: Snippet;

    /**
     * Bottom bar actions/links.
     */
    bottomActions?: Snippet;
  }

  let {
    class: className,
    brand,
    copyright,
    children,
    bottomActions,
    ...restProps
  }: Props = $props();
</script>

<footer
  class={cn("py-12 desk:py-16 bg-base-100 border-t border-base-400", className)}
  {...restProps}
>
  <Container>
    <div class="flex flex-col gap-12">
      <div class="flex flex-col gap-12 desk:flex-row desk:justify-between">
        <div class="flex flex-col gap-6 max-w-xs">
          {#if brand}
            {@render brand()}
          {/if}
        </div>

        {#if children}
          <div class="grid grid-cols-2 gap-8 sm:grid-cols-3 desk:gap-16">
            {@render children()}
          </div>
        {/if}
      </div>

      <Separator />

      <div
        class="flex flex-col gap-6 desk:flex-row desk:items-center desk:justify-between"
      >
        <div class="text-sm text-content-muted">
          {#if typeof copyright === "string"}
            {copyright}
          {:else if copyright}
            {@render copyright()}
          {/if}
        </div>

        {#if bottomActions}
          <div class="flex flex-wrap gap-6 text-sm">
            {@render bottomActions()}
          </div>
        {/if}
      </div>
    </div>
  </Container>
</footer>

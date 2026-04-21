<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import Container from "../../components/Container/Container.svelte";
  import { cn } from "../../helpers/cn.ts";

  interface Props extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    /**
     * Title of the feature section.
     */
    title?: string | Snippet;

    /**
     * Subtitle or description.
     */
    description?: string | Snippet;

    /**
     * Grid items.
     */
    children?: Snippet;

    /**
     * Number of columns on desktop.
     * @default 3
     */
    columns?: 1 | 2 | 3 | 4;
  }

  let {
    class: className,
    title,
    description,
    children,
    columns = 3,
    ...restProps
  }: Props = $props();
</script>

<section class={cn("py-16 desk:py-24", className)} {...restProps}>
  <Container>
    <div class="mb-12 flex flex-col gap-4 text-center">
      {#if typeof title === "string"}
        <h2
          class="text-3xl font-semibold tracking-tight text-content desk:text-4xl"
        >
          {title}
        </h2>
      {:else if title}
        {@render title()}
      {/if}

      {#if typeof description === "string"}
        <p class="mx-auto max-w-2xl text-lg text-content-muted">
          {description}
        </p>
      {:else if description}
        {@render description()}
      {/if}
    </div>

    <div
      class={cn(
        "grid grid-cols-1 gap-8",
        {
          "desk:grid-cols-1": columns === 1,
          "desk:grid-cols-2": columns === 2,
          "desk:grid-cols-3": columns === 3,
          "desk:grid-cols-4": columns === 4,
        }
      )}
    >
      {@render children?.()}
    </div>
  </Container>
</section>

<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import Container from "../../components/Container/Container.svelte";
  import { cn } from "../../helpers/cn.js";

  interface Props extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    /**
     * Main title of the hero section.
     */
    title?: string | Snippet;

    /**
     * Description or subtitle text.
     */
    description?: string | Snippet;

    /**
     * Actions area (buttons, links, etc).
     */
    actions?: Snippet;

    /**
     * Visual content (image, video, etc).
     */
    visual?: Snippet;

    /**
     * Alignment of the content.
     * @default "center"
     */
    align?: "left" | "center";
  }

  let {
    class: className,
    title,
    description,
    actions,
    visual,
    align = "center",
    ...restProps
  }: Props = $props();
</script>

<section
  class={cn(
    "relative overflow-hidden py-16 desk:py-24",
    className
  )}
  {...restProps}
>
  <Container>
    <div
      class={cn(
        "flex flex-col gap-12",
        {
          "items-center text-center": align === "center",
          "desk:flex-row desk:items-center desk:text-left": align === "left" && visual,
        }
      )}
    >
      <div
        class={cn(
          "flex flex-col gap-6",
          {
            "max-w-3xl": align === "center",
            "desk:w-1/2": align === "left" && visual,
          }
        )}
      >
        <div class="flex flex-col gap-4">
          {#if typeof title === "string"}
            <h1
              class="text-4xl font-semibold tracking-tight text-content desk:text-6xl"
            >
              {title}
            </h1>
          {:else if title}
            {@render title()}
          {/if}

          {#if typeof description === "string"}
            <p class="text-lg text-content-muted desk:text-xl">{description}</p>
          {:else if description}
            {@render description()}
          {/if}
        </div>

        {#if actions}
          <div
            class={cn(
              "flex flex-wrap gap-3",
              {
                "justify-center": align === "center",
              }
            )}
          >
            {@render actions()}
          </div>
        {/if}
      </div>

      {#if visual}
        <div
          class={cn(
            "relative w-full",
            {
              "desk:w-1/2": align === "left",
            }
          )}
        >
          {@render visual()}
        </div>
      {/if}
    </div>
  </Container>
</section>

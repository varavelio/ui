<script lang="ts">
  import { onMount } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";

  interface Props {
    /**
     * Additional CSS classes to apply to the loader icon.
     */
    class?: ClassValue;

    /**
     * Visual size preset of the loader icon.
     * @default "md"
     */
    size?: "sm" | "md" | "lg";
  }

  let { class: className, size = "md" }: Props = $props();

  let state = $state<"v" | "a">("v");

  onMount(() => {
    const interval = window.setInterval(() => {
      state = state === "v" ? "a" : "v";
    }, 500);

    return () => {
      window.clearInterval(interval);
    };
  });
</script>

{#snippet brandMark(state: "v" | "a")}
  <svg
    aria-hidden="true"
    viewBox="0 0 800 800"
    class="size-full shrink-0 text-black transition-colors duration-150 dark:text-white"
  >
    <rect
      x="0"
      y={state === "a" ? 200 : 0}
      width="200"
      height="600"
      rx="16"
      fill="currentColor"
      style="transition: y 180ms cubic-bezier(0.4, 0, 0.2, 1);"
    />
    <rect
      x="300"
      y={state === "a" ? 0 : 200}
      width="200"
      height="600"
      rx="16"
      fill="currentColor"
      style="transition: y 180ms cubic-bezier(0.4, 0, 0.2, 1);"
    />
    <rect
      x="600"
      y={state === "a" ? 200 : 0}
      width="200"
      height="600"
      rx="16"
      fill="currentColor"
      style="transition: y 180ms cubic-bezier(0.4, 0, 0.2, 1);"
    />
  </svg>
{/snippet}

<span
  role="status"
  aria-label="Loading"
  class={cn(
    "inline-flex shrink-0 cursor-wait",
    {
      "size-4": size === "sm",
      "size-6": size === "md",
      "size-10": size === "lg",
    },
    className,
  )}
>
  {@render brandMark(state)}
</span>

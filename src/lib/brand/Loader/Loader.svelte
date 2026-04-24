<script lang="ts">
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
</script>

{#snippet brandMark()}
  <svg
    aria-hidden="true"
    viewBox="0 0 800 800"
    class="vdl-brand-loader size-full shrink-0 transition-colors duration-150 text-black dark:text-white"
  >
    <rect
      class="vdl-brand-loader-bar-outer"
      x="0"
      y="0"
      width="200"
      height="600"
      rx="16"
      fill="currentColor"
    />
    <rect
      class="vdl-brand-loader-bar-middle"
      x="300"
      y="0"
      width="200"
      height="600"
      rx="16"
      fill="currentColor"
    />
    <rect
      class="vdl-brand-loader-bar-outer"
      x="600"
      y="0"
      width="200"
      height="600"
      rx="16"
      fill="currentColor"
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
  {@render brandMark()}
</span>

<style>
  :global(.vdl-brand-loader-bar-outer) {
    animation: vdl-brand-loader-wave 450ms linear infinite alternate;
  }

  :global(.vdl-brand-loader-bar-middle) {
    animation: vdl-brand-loader-wave 450ms linear infinite alternate-reverse;
  }

  @keyframes vdl-brand-loader-wave {
    from {
      transform: translateY(0);
    }

    to {
      transform: translateY(200px);
    }
  }
</style>

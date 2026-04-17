<script lang="ts">
  import { LoaderCircle } from "@lucide/svelte";
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

<LoaderCircle
  aria-hidden="true"
  class={cn(
    "animate-spin shrink-0",
    {
      "size-4": size === "sm",
      "size-6": size === "md",
      "size-10": size === "lg",
    },
    className,
  )}
/>

<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue, HTMLAttributes } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";

  export interface Props extends HTMLAttributes<HTMLElement> {
    class?: ClassValue;
    children: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<nav {...restProps} class={cn("flex flex-col space-y-1", className)}>
  {@render children()}
</nav>

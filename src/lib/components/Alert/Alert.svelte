<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  import { cn } from "../../helpers/cn.js";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * The title of the alert.
     */
    title?: string;
    /**
     * The description text of the alert.
     */
    description?: string;
    /**
     * The semantic color of the alert.
     * @default "neutral"
     */
    color?: "neutral" | "info" | "success" | "warning" | "danger";
    /**
     * Custom content to render inside the alert.
     */
    children?: Snippet;
  }

  let {
    class: className,
    title,
    description,
    color = "neutral",
    children,
    ...restProps
  }: Props = $props();

  let role = $derived(
    color === "danger" || color === "warning" ? "alert" : "status",
  );
</script>

<div
  {...restProps}
  class={cn(
    "rounded-lg border p-4",
    {
      "border-base-400 bg-base-200 text-content": color === "neutral",
      "border-info/20 bg-info/10 text-info": color === "info",
      "border-success/20 bg-success/10 text-success": color === "success",
      "border-warning/20 bg-warning/10 text-warning": color === "warning",
      "border-error/20 bg-error/10 text-error": color === "danger",
    },
    className,
  )}
  {role}
>
  <div class="space-y-2">
    {#if title}
      <h3 class="font-medium">{title}</h3>
    {/if}
    {#if description}
      <p class="text-sm leading-relaxed opacity-90">{description}</p>
    {/if}
    {#if children}
      <div class="text-sm">{@render children()}</div>
    {/if}
  </div>
</div>

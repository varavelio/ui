<script lang="ts">
  import {
    AlertCircle,
    CheckCircle2,
    Info,
    TriangleAlert,
    X,
  } from "@lucide/svelte";
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
    color?: "neutral" | "info" | "success" | "warning" | "error";
    /**
     * Whether the alert can be closed.
     * @default true
     */
    closable?: boolean;
    /**
     * Callback fired when the alert is closed.
     */
    onClose?: () => void;
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
    closable = true,
    onClose,
    children,
    ...restProps
  }: Props = $props();

  let role = $derived(
    color === "error" || color === "warning" ? "alert" : "status",
  );

  let visible = $state(true);

  function handleClose() {
    visible = false;
    onClose?.();
  }
</script>

{#if visible}
  <div
    {...restProps}
    class={cn(
      "relative rounded-lg border p-4",
      {
        "border-base-400 bg-base-200/2 text-content": color === "neutral",
        "border-info/40 bg-info/2 text-info": color === "info",
        "border-success/40 bg-success/2 text-success": color === "success",
        "border-warning/40 bg-warning/2 text-warning": color === "warning",
        "border-error/40 bg-error/2 text-error": color === "error",
      },
      className,
    )}
    {role}
  >
    <div class="flex gap-3">
      {#if title}
        <div class="mt-0.5 shrink-0">
          {#if color === "neutral"}
            <Info class="size-5" />
          {:else if color === "info"}
            <Info class="size-5" />
          {:else if color === "success"}
            <CheckCircle2 class="size-5" />
          {:else if color === "warning"}
            <TriangleAlert class="size-5" />
          {:else if color === "error"}
            <AlertCircle class="size-5" />
          {/if}
        </div>
      {/if}
      <div class="flex-1">
        {#if title}
          <h3 class="font-medium pr-6">{title}</h3>
        {/if}
        {#if description}
          <p class="text-sm leading-relaxed opacity-90 pr-6">{description}</p>
        {/if}
        {#if children}
          <div class="text-sm pr-6">{@render children()}</div>
        {/if}
      </div>
    </div>
    {#if closable}
      <button
        type="button"
        class="absolute top-4 right-4 cursor-pointer rounded-md opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:outline-none focus-visible:ring-content"
        onclick={handleClose}
        aria-label="Close alert"
      >
        <X class="size-4.5" />
      </button>
    {/if}
  </div>
{/if}

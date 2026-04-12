<script lang="ts">
  import { X } from "@lucide/svelte";
  // biome-ignore lint/correctness/noUnusedImports: Used as a compound component namespace in Svelte markup.
  import { Dialog as BitsDialog } from "bits-ui";
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";
  import ScrollArea from "../ScrollArea/ScrollArea.svelte";

  interface Props {
    /**
     * Additional CSS classes to apply to the dialog content.
     */
    class?: ClassValue;
    /**
     * Controls the open state of the dialog.
     */
    open?: boolean;
    /**
     * The title of the dialog.
     */
    title?: string;
    /**
     * The description text of the dialog.
     */
    description?: string;
    /**
     * The maximum width of the dialog.
     * @default "md"
     */
    size?: "sm" | "md" | "lg";
    /**
     * Whether the dialog can be closed by clicking outside or pressing escape.
     * @default true
     */
    dismissible?: boolean;
    /**
     * If true, adds standard padding to the content area.
     * @default true
     */
    padded?: boolean;
    /**
     * The snippet for the trigger element.
     */
    trigger?: Snippet;
    /**
     * The snippet for the dialog footer.
     */
    footer?: Snippet;
    /**
     * The main content of the dialog.
     */
    children?: Snippet;
  }

  let {
    class: className,
    open = $bindable(false),
    title,
    description,
    size = "md",
    dismissible = true,
    padded = true,
    trigger,
    footer,
    children,
  }: Props = $props();
</script>

<BitsDialog.Root bind:open>
  {#if trigger}
    <BitsDialog.Trigger class="w-fit">{@render trigger()}</BitsDialog.Trigger>
  {/if}

  <BitsDialog.Portal>
    <BitsDialog.Overlay class="fixed inset-0 z-40 bg-black/60" />
    <BitsDialog.Content
      class={cn(
        "fixed left-1/2 top-1/2 z-50 flex flex-col overflow-hidden isolate",
        "rounded-lg border bg-base-100 border-base-400 shadow-sm",
        "max-h-[calc(100dvh-4rem)] w-[calc(100dvw-2rem)] -translate-x-1/2 -translate-y-1/2",
        {
          "max-w-md": size === "sm",
          "max-w-xl": size === "md",
          "max-w-2xl": size === "lg",
        },
        className,
      )}
      escapeKeydownBehavior={dismissible ? "close" : "ignore"}
      interactOutsideBehavior={dismissible ? "close" : "ignore"}
    >
      {#if dismissible}
        <BitsDialog.Close
          class={[
            "focus-visible:outline-2 focus-visible:outline-content",
            "absolute right-4 top-4 z-10 rounded-md p-1 text-content-muted",
            "transition-colors duration-75",
            "hover:bg-base-300 hover:text-content",
            "active:scale-[0.99] active:transition-none"
          ]}
        >
          <X aria-hidden="true" class="size-4" />
          <span class="sr-only">Close dialog</span>
        </BitsDialog.Close>
      {/if}

      {#if title || description}
        <div
          class={{
            "px-4 pt-4 space-y-2 shrink-0": true,
            "pb-4": !children
          }}
        >
          {#if title}
            <BitsDialog.Title class="text-lg font-semibold text-content">
              {title}
            </BitsDialog.Title>
          {/if}
          {#if description}
            <BitsDialog.Description class="text-sm text-content-muted">
              {description}
            </BitsDialog.Description>
          {/if}
        </div>
      {/if}

      {#if children}
        <ScrollArea
          class={[
            "min-h-0 h-0 flex-1",
            { "m-4": padded },
          ]}
          viewportClass="min-h-0"
          orientation="both"
        >
          {@render children()}
        </ScrollArea>
      {/if}

      {#if footer}
        <div class="px-4 pb-4 shrink-0">{@render footer()}</div>
      {/if}
    </BitsDialog.Content>
  </BitsDialog.Portal>
</BitsDialog.Root>

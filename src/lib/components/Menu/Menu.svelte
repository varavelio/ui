<script lang="ts">
  // biome-ignore lint/correctness/noUnusedImports: Used as a compound component namespace in Svelte markup.
  import {
    ContextMenu as BitsContextMenu,
    DropdownMenu as BitsDropdownMenu,
  } from "bits-ui";
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";

  type DropdownMenuItem = {
    type?: "item" | "label" | "separator" | string;
    label?: string | Snippet;
    icon?: Snippet;
    disabled?: boolean;
    destructive?: boolean;
    onSelect?: () => void;
  };

  interface Props {
    /**
     * Additional CSS classes to apply to the dropdown menu content.
     */
    class?: ClassValue;
    /**
     * Controls the open state of the dropdown menu.
     */
    open?: boolean;
    /**
     * The snippet for the trigger element.
     */
    trigger: Snippet;
    /**
     * The items to render in the dropdown menu.
     */
    items: DropdownMenuItem[];
    /**
     * The preferred side to render the menu.
     * @default "bottom"
     */
    side?: "top" | "bottom" | "left" | "right";

    /**
     * Whether the menu should open as a standard dropdown or a context menu.
     * @default "dropdown"
     */
    mode?: "dropdown" | "context";

    /**
     * Additional CSS classes to apply to the trigger element.
     */
    triggerClass?: ClassValue;
  }

  let {
    class: className,
    open = $bindable(false),
    trigger,
    items,
    side = "bottom",
    mode = "dropdown",
    triggerClass,
  }: Props = $props();
</script>

{#if mode === "context"}
  <BitsContextMenu.Root bind:open>
    <BitsContextMenu.Trigger class={triggerClass}>
      {@render trigger()}
    </BitsContextMenu.Trigger>

    <BitsContextMenu.Portal>
      <BitsContextMenu.Content
        {side}
        class={cn(
          "bg-base-100 z-50 min-w-56 max-h-[70dvh] max-w-[70dvw] overflow-auto rounded-lg border border-base-400 p-1 shadow-sm",
          className ?? "",
        )}
        sideOffset={8}
      >
        {#each items as item, index (`${item.type ?? "item"}-${index}`)}
          {#if item.type === "separator"}
            <BitsContextMenu.Separator class="my-1 h-px bg-base-400" />
          {:else if item.type === "label"}
            <div
              class="px-3 py-2 text-xs font-medium uppercase tracking-wide text-content-muted"
            >
              {#if typeof item.label === "string"}
                {item.label}
              {:else if item.label}
                {@render item.label()}
              {/if}
            </div>
          {:else}
            <BitsContextMenu.Item
              class={cn(
                "flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm outline-none data-highlighted:bg-base-300 data-disabled:opacity-50",
                item.destructive ? "text-error" : "text-content",
              )}
              disabled={item.disabled}
              onclick={() => !item.disabled && item.onSelect?.()}
              textValue={typeof item.label === "string" ? item.label : ""}
            >
              {#if item.icon}
                <div class="flex size-4 shrink-0 items-center justify-center">
                  {@render item.icon()}
                </div>
              {/if}
              {#if typeof item.label === "string"}
                <span class="flex-1">{item.label}</span>
              {:else if item.label}
                {@render item.label()}
              {/if}
            </BitsContextMenu.Item>
          {/if}
        {/each}
      </BitsContextMenu.Content>
    </BitsContextMenu.Portal>
  </BitsContextMenu.Root>
{:else}
  <BitsDropdownMenu.Root bind:open>
    <BitsDropdownMenu.Trigger class={triggerClass}>
      {@render trigger()}
    </BitsDropdownMenu.Trigger>

    <BitsDropdownMenu.Portal>
      <BitsDropdownMenu.Content
        {side}
        class={cn(
          "bg-base-100 z-50 min-w-56 max-h-[70dvh] max-w-[70dvw] overflow-auto rounded-lg border border-base-400 p-1 shadow-sm",
          className ?? "",
        )}
        sideOffset={8}
      >
        {#each items as item, index (`${item.type ?? "item"}-${index}`)}
          {#if item.type === "separator"}
            <BitsDropdownMenu.Separator class="my-1 h-px bg-base-400" />
          {:else if item.type === "label"}
            <div
              class="px-3 py-2 text-xs font-medium uppercase tracking-wide text-content-muted"
            >
              {#if typeof item.label === "string"}
                {item.label}
              {:else if item.label}
                {@render item.label()}
              {/if}
            </div>
          {:else}
            <BitsDropdownMenu.Item
              class={cn(
                "flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm outline-none data-highlighted:bg-base-300 data-disabled:opacity-50",
                item.destructive ? "text-error" : "text-content",
              )}
              disabled={item.disabled}
              onclick={() => !item.disabled && item.onSelect?.()}
              textValue={typeof item.label === "string" ? item.label : ""}
            >
              {#if item.icon}
                <div class="flex size-4 shrink-0 items-center justify-center">
                  {@render item.icon()}
                </div>
              {/if}
              {#if typeof item.label === "string"}
                <span class="flex-1">{item.label}</span>
              {:else if item.label}
                {@render item.label()}
              {/if}
            </BitsDropdownMenu.Item>
          {/if}
        {/each}
      </BitsDropdownMenu.Content>
    </BitsDropdownMenu.Portal>
  </BitsDropdownMenu.Root>
{/if}

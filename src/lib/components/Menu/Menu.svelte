<script lang="ts">
  // biome-ignore lint/correctness/noUnusedImports: Used as a compound component namespace in Svelte markup.
  import { DropdownMenu as BitsDropdownMenu } from "bits-ui";
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import { cn } from "../../helpers/cn.ts";

  type DropdownMenuItem = {
    type?: "item" | "label" | "separator" | string;
    label?: string;
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
  }

  let {
    class: className,
    open = $bindable(false),
    trigger,
    items,
    side = "bottom",
  }: Props = $props();
</script>

<BitsDropdownMenu.Root bind:open>
  <BitsDropdownMenu.Trigger class="w-fit">
    {@render trigger()}
  </BitsDropdownMenu.Trigger>

  <BitsDropdownMenu.Portal>
    <BitsDropdownMenu.Content
      {side}
      class={cn(
        "bg-base-100 z-50 min-w-56 max-h-[70dvh] max-w-[70dvw] overflow-auto rounded-lg border border-base-400 p-1 shadow-sm",
        className ?? ""
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
            {item.label}
          </div>
        {:else}
          <BitsDropdownMenu.Item
            class={cn(
              "flex select-none items-center gap-2 rounded-md px-3 py-2 text-sm outline-none data-highlighted:bg-base-300 data-disabled:opacity-50",
              item.destructive ? "text-error" : "text-content"
            )}
            disabled={item.disabled}
            onclick={() => !item.disabled && item.onSelect?.()}
            textValue={item.label ?? ""}
          >
            {#if item.icon}
              <div class="flex size-4 shrink-0 items-center justify-center">
                {@render item.icon()}
              </div>
            {/if}
            <span class="flex-1">{item.label}</span>
          </BitsDropdownMenu.Item>
        {/if}
      {/each}
    </BitsDropdownMenu.Content>
  </BitsDropdownMenu.Portal>
</BitsDropdownMenu.Root>

<script lang="ts">
  // biome-ignore lint/correctness/noUnusedImports: Used as a compound component namespace in Svelte markup.
  import {
    ContextMenu as BitsContextMenu,
    DropdownMenu as BitsDropdownMenu,
  } from "bits-ui";
  import type { ComponentProps, Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";
  import Button from "../Button/Button.svelte";

  type DropdownMenuItem = {
    type?: "item" | "label" | "separator" | string;
    label?: string | Snippet;
    icon?: Snippet;
    disabled?: boolean;
    destructive?: boolean;
    onSelect?: () => void;
  };

  type TriggerButtonProps = Omit<
    ComponentProps<typeof Button>,
    "children" | "class" | "href" | "target" | "rel"
  >;

  interface Props extends TriggerButtonProps {
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
    trigger?: Snippet;
    /**
     * The label for the generated button trigger.
     */
    label?: string | Snippet;
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
    label,
    items,
    side = "bottom",
    mode = "dropdown",
    triggerClass,
    disabled = false,
    icon,
    iconRight,
    ...buttonProps
  }: Props = $props();

  const isFunction = (
    value: unknown,
  ): value is (...args: unknown[]) => unknown => typeof value === "function";

  const hasButtonTrigger = $derived(Boolean(label || icon || iconRight));
  const triggerDisabled = $derived(Boolean(disabled));

  function _mergeTriggerProps(bitsProps: Record<string, unknown>) {
    const userProps = buttonProps as Record<string, unknown>;
    const mergedProps: Record<string, unknown> = { ...bitsProps, ...userProps };

    for (const key of Object.keys(bitsProps)) {
      const bitsValue = bitsProps[key];
      const userValue = userProps[key];

      if (key === "class") {
        mergedProps[key] = cn(bitsValue as ClassValue, triggerClass);
        continue;
      }

      if (key === "style") {
        mergedProps[key] = [bitsValue, userValue].filter(Boolean).join("; ");
        continue;
      }

      if (
        key.startsWith("on") &&
        isFunction(bitsValue) &&
        isFunction(userValue)
      ) {
        mergedProps[key] = (...args: unknown[]) => {
          bitsValue(...args);
          userValue(...args);
        };
      }
    }

    mergedProps.class = cn(bitsProps.class as ClassValue, triggerClass);

    return mergedProps as TriggerButtonProps & { class?: ClassValue };
  }
</script>

{#if mode === "context"}
  <BitsContextMenu.Root bind:open>
    {#if hasButtonTrigger}
      <BitsContextMenu.Trigger disabled={triggerDisabled}>
        {#snippet child({ props })}
          <Button {..._mergeTriggerProps(props)} {icon} {iconRight}>
            {#if typeof label === "string"}
              {label}
            {:else if label}
              {@render label()}
            {/if}
          </Button>
        {/snippet}
      </BitsContextMenu.Trigger>
    {:else}
      <BitsContextMenu.Trigger class={triggerClass} disabled={triggerDisabled}>
        {@render trigger?.()}
      </BitsContextMenu.Trigger>
    {/if}

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
              onSelect={() => !item.disabled && item.onSelect?.()}
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
    {#if hasButtonTrigger}
      <BitsDropdownMenu.Trigger disabled={triggerDisabled}>
        {#snippet child({ props })}
          <Button {..._mergeTriggerProps(props)} {icon} {iconRight}>
            {#if typeof label === "string"}
              {label}
            {:else if label}
              {@render label()}
            {/if}
          </Button>
        {/snippet}
      </BitsDropdownMenu.Trigger>
    {:else}
      <BitsDropdownMenu.Trigger class={triggerClass} disabled={triggerDisabled}>
        {@render trigger?.()}
      </BitsDropdownMenu.Trigger>
    {/if}

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
              onSelect={() => !item.disabled && item.onSelect?.()}
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

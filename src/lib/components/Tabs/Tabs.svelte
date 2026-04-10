<script lang="ts">
  // biome-ignore lint/correctness/noUnusedImports: Used as a compound component namespace in Svelte markup.
  import { Tabs as BitsTabs } from "bits-ui";
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";

  type TabItem = {
    value: string;
    label: string;
    content: Snippet;
    disabled?: boolean;
  };

  interface Props {
    /**
     * Additional CSS classes to apply to the root wrapper.
     */
    class?: ClassValue;
    /**
     * Array of tab items to render.
     */
    items: TabItem[];
    /**
     * The bound value of the currently selected tab.
     */
    value?: string;
    /**
     * The orientation of the tabs layout.
     * @default "horizontal"
     */
    orientation?: "horizontal" | "vertical";
    /**
     * How keyboard focus activates tabs.
     * @default "automatic"
     */
    activationMode?: "automatic" | "manual";
    /**
     * Visual size preset of the tabs.
     * @default "md"
     */
    size?: "sm" | "md" | "lg";
    /**
     * Semantic color of the active tab.
     * @default "neutral"
     */
    color?: "neutral" | "info" | "success" | "warning" | "error";
    /**
     * The background color preset for the tab list.
     * @default "300"
     */
    bg?: "100" | "200" | "300";
  }

  let {
    class: className,
    items,
    value = $bindable(""),
    orientation = "horizontal",
    activationMode = "automatic",
    size = "md",
    color = "neutral",
    bg = "300",
  }: Props = $props();

  $effect(() => {
    if (!value && items[0]) {
      value = items[0].value;
    }
  });
</script>

<BitsTabs.Root
  {orientation}
  {activationMode}
  bind:value
  class={cn("w-full", className)}
>
  <BitsTabs.List
    class={cn(
      "border-base-400 inline-flex gap-1 rounded-lg border",
      {
        "bg-base-100": bg === "100",
        "bg-base-200": bg === "200",
        "bg-base-300": bg === "300",
        "p-1": size === "sm" || size === "md",
        "p-1.5": size === "lg",
        "w-full flex-col": orientation === "vertical",
        "w-full flex-wrap": orientation === "horizontal",
      },
    )}
  >
    {#each items as item (item.value)}
      <BitsTabs.Trigger
        disabled={item.disabled}
        value={item.value}
        class={cn(
          "text-content-muted focus:outline-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-content rounded-md font-medium outline-hidden transition-all duration-75 active:scale-[0.99] active:transition-none disabled:opacity-50",
          {
            "h-7 px-2.5 text-xs": size === "sm",
            "h-9 px-4 text-sm": size === "md",
            "h-11 px-6 text-base": size === "lg",
            "data-[state=active]:bg-content data-[state=active]:text-base-100": color === "neutral",
            "data-[state=active]:bg-info data-[state=active]:text-white": color === "info",
            "data-[state=active]:bg-success data-[state=active]:text-white": color === "success",
            "data-[state=active]:bg-warning data-[state=active]:text-white": color === "warning",
            "data-[state=active]:bg-error data-[state=active]:text-white": color === "error",
          },
        )}
      >
        {item.label}
      </BitsTabs.Trigger>
    {/each}
  </BitsTabs.List>

  {#each items as item (item.value)}
    <BitsTabs.Content
      value={item.value}
      class={cn({
        "pt-4": size === "sm" || size === "md",
        "pt-5": size === "lg",
      })}
    >
      {@render item.content()}
    </BitsTabs.Content>
  {/each}
</BitsTabs.Root>

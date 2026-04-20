<script lang="ts">
  import { ChevronRight } from "@lucide/svelte";
  import type { Component, Snippet } from "svelte";
  import type { ClassValue, HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";
  import { Button } from "../Button/index.js";

  export interface Props extends HTMLButtonAttributes {
    /**
     * Label for the group.
     */
    label: string;

    /**
     * Optional icon component to display before the label.
     */
    icon?: Component;

    /**
     * Whether the group is expanded. Can be two-way bound.
     */
    open?: boolean;

    /**
     * Style of the nested children indicator line.
     */
    line?: "dashed" | "solid" | "none";

    /**
     * Width of the nested children indicator line.
     */
    borderWidth?: "1" | "2";

    /**
     * The nested children content.
     */
    children: Snippet;

    class?: ClassValue;
  }

  let {
    class: className,
    label,
    icon: IconComponent,
    open = $bindable(false),
    line = "dashed",
    borderWidth = "2",
    children,
    ...restProps
  }: Props = $props();

  function toggle() {
    open = !open;
  }
</script>

<div class={cn("flex flex-col space-y-1", className)}>
  <Button
    variant="ghost"
    color="neutral"
    wide={true}
    alignContent="left"
    icon={IconComponent}
    onclick={toggle}
    class="font-medium text-content/70 hover:text-content"
    aria-expanded={open}
    {...restProps as any}
  >
    <span class="flex-1 truncate text-left">{label}</span>

    <ChevronRight
      class={cn("size-4 flex-none transition-transform duration-200", {
        "rotate-90": open,
      })}
    />
  </Button>

  {#if open}
    <div
      class={cn(
        "ml-4 mt-1 flex flex-col space-y-1 pl-3 relative",
        // Direct children positioning and pseudo-elements for the horizontal line
        "[&>*]:relative [&>*::before]:absolute [&>*::before]:content-['']",
        // Position it right at the middle of the first line element (top-[18px] approx)
        "[&>*::before]:-left-3 [&>*::before]:top-[18px] [&>*::before]:w-2",
        {
          "border-base-400 border-dashed [&>*::before]:border-dashed [&>*::before]:border-base-400": line === "dashed",
          "border-base-400 border-solid [&>*::before]:border-solid [&>*::before]:border-base-400": line === "solid",
          "border-transparent [&>*::before]:border-transparent": line === "none",
          "border-l [&>*::before]:border-t": borderWidth === "1",
          "border-l-2 [&>*::before]:border-t-2": borderWidth === "2",
        }
      )}
    >
      {@render children()}
    </div>
  {/if}
</div>

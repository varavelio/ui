<script lang="ts">
  import type { Component, Snippet } from "svelte";
  import type {
    ClassValue,
    HTMLAnchorAttributes,
    HTMLButtonAttributes,
  } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";
  import { checkTruncation } from "../../runtime/index.js";
  import { Button } from "../Button/index.js";
  import { Tooltip } from "../Tooltip/index.js";

  export interface BaseProps {
    /**
     * Optional icon component to display before the label.
     */
    icon?: Component;

    /**
     * The label text of the link.
     */
    label: string;

    /**
     * Whether the link is currently active.
     */
    active?: boolean;

    /**
     * Inner content. Typically not needed since `label` and `icon` are provided,
     * but supported for advanced customization.
     */
    children?: Snippet;

    /**
     * Additional CSS classes.
     */
    class?: ClassValue;
  }

  export type AnchorProps = BaseProps & HTMLAnchorAttributes & { href: string };
  export type ButtonProps = BaseProps & HTMLButtonAttributes & { href?: never };

  export type Props = AnchorProps | ButtonProps;

  let {
    class: className,
    label,
    icon: IconComponent,
    active = false,
    children,
    ...restProps
  }: Props = $props();

  let isTruncated = $state(false);
</script>

<Tooltip content={label} disabled={!isTruncated} side="right">
  <Button
    variant="ghost"
    color={active ? "info" : "neutral"}
    {active}
    wide={true}
    alignContent="left"
    icon={IconComponent}
    class={cn(
      "font-medium px-2",
      {
        "text-content/70 hover:text-content": !active,
      },
      className,
    )}
    aria-current={active ? "page" : undefined}
    {...restProps as any}
  >
    <span
      class="flex-1 truncate text-left"
      {@attach checkTruncation((val) => (isTruncated = val))}
    >
      {label}
    </span>
    {@render children?.()}
  </Button>
</Tooltip>

<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue, HTMLAnchorAttributes } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";

  interface Props extends Omit<HTMLAnchorAttributes, "class" | "href" | "rel"> {
    /**
     * Link destination.
     */
    href?: string;

    /**
     * Additional CSS classes to apply to the anchor.
     */
    class?: ClassValue;

    /**
     * Child snippet rendered inside the link.
     */
    children?: Snippet;

    /**
     * Controls whether the link should be treated as external.
     * When omitted, external behavior is inferred from `href`.
     */
    external?: boolean;

    /**
     * Disables interaction and removes navigation behavior.
     * @default false
     */
    disabled?: boolean;

    /**
     * The relationship of the linked URL as space-separated link types.
     */
    rel?: HTMLAnchorAttributes["rel"];
  }

  let {
    href,
    class: className,
    children,
    external,
    disabled = false,
    target,
    tabindex,
    rel,
    ...restProps
  }: Props = $props();

  function mergeRelTokens(
    value: string | null | undefined,
    requiredTokens: string[],
  ): string | undefined {
    const mergedTokens = value?.split(/\s+/).filter(Boolean) ?? [];

    for (const token of requiredTokens) {
      if (!mergedTokens.includes(token)) {
        mergedTokens.push(token);
      }
    }

    const mergedValue = mergedTokens.join(" ");
    return mergedValue.length > 0 ? mergedValue : undefined;
  }

  const isHttpLink = $derived(
    typeof href === "string" && /^https?:\/\//i.test(href),
  );
  const disabledLink = $derived(disabled === true);
  const externalLink = $derived((external ?? isHttpLink) && !disabledLink);
  const resolvedHref = $derived(disabledLink ? undefined : href);
  const resolvedTarget = $derived(
    disabledLink
      ? undefined
      : (target ?? (externalLink ? "_blank" : undefined)),
  );
  const resolvedRel = $derived.by(() => {
    if (disabledLink) {
      return undefined;
    }

    if (resolvedTarget !== "_blank") {
      return rel;
    }

    return mergeRelTokens(rel, ["noopener", "noreferrer"]);
  });
  const resolvedTabIndex = $derived(disabledLink ? -1 : tabindex);
</script>

<a
  {...restProps}
  href={resolvedHref}
  target={resolvedTarget}
  rel={resolvedRel}
  tabindex={resolvedTabIndex}
  aria-disabled={disabledLink ? "true" : undefined}
  class={cn(
    "inline-flex items-center gap-1 rounded-sm font-medium text-current underline underline-offset-4 decoration-base-400 transition-colors duration-150",
    "hover:decoration-content focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-content",
    {
      "pointer-events-none cursor-not-allowed opacity-50 no-underline": disabledLink,
    },
    className,
  )}
>
  {@render children?.()}
</a>

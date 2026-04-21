<script lang="ts">
  import { Check, LaptopMinimal, MoonStar, SunMedium } from "@lucide/svelte";
  import type { ComponentProps } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import { theme } from "../../runtime/index.js";
  import type Button from "../Button/Button.svelte";
  import { Menu } from "../Menu/index.js";
  import { Tooltip } from "../Tooltip/index.js";

  const options = [
    { value: "system", label: "System", icon: LaptopMinimal },
    { value: "light", label: "Light", icon: SunMedium },
    { value: "dark", label: "Dark", icon: MoonStar },
  ] as const;

  type TriggerButtonProps = Omit<
    ComponentProps<typeof Button>,
    "children" | "class" | "href" | "target" | "rel" | "icon" | "iconRight"
  >;

  interface Props extends TriggerButtonProps {
    /**
     * Additional CSS classes to apply to the trigger.
     */
    class?: ClassValue;
    /**
     * Visible trigger label text.
     * @default "Theme"
     */
    label?: string;
    /**
     * Whether to show the visible Theme label.
     * @default true
     */
    showLabel?: boolean;
  }

  let {
    class: className,
    label = "Theme",
    showLabel = true,
    size = "md",
    radius = "md",
    variant = "outline",
    color = "neutral",
    square = false,
    wide = false,
    ...restProps
  }: Props = $props();

  let selectedTheme = $derived(theme.current);
  let effectiveShowLabel = $derived(showLabel && !square);
  let iconOnly = $derived(!effectiveShowLabel);

  let iconSnippets = $derived({
    light: sunIcon,
    dark: moonIcon,
    system: laptopIcon,
  });

  let labelSnippets = $derived({
    light: lightLabel,
    dark: darkLabel,
    system: systemLabel,
  });
</script>

{#snippet labelContent(optionLabel: string, isSelected: boolean)}
  <div class="flex flex-1 items-center justify-between gap-3">
    <span>{optionLabel}</span>
    {#if isSelected}
      <Check class="size-4 text-content-muted" />
    {/if}
  </div>
{/snippet}

{#snippet sunIcon()}
  <SunMedium class="size-4" />
{/snippet}

{#snippet moonIcon()}
  <MoonStar class="size-4" />
{/snippet}

{#snippet laptopIcon()}
  <LaptopMinimal class="size-4" />
{/snippet}

{#snippet lightLabel()}
  {@render labelContent("Light", selectedTheme === "light")}
{/snippet}

{#snippet darkLabel()}
  {@render labelContent("Dark", selectedTheme === "dark")}
{/snippet}

{#snippet systemLabel()}
  {@render labelContent("System", selectedTheme === "system")}
{/snippet}

{#snippet triggerLabelSnippet()}
  {#if selectedTheme === "light"}
    <SunMedium class="size-4 shrink-0" />
  {:else if selectedTheme === "dark"}
    <MoonStar class="size-4 shrink-0" />
  {:else}
    <LaptopMinimal class="size-4 shrink-0" />
  {/if}
  {#if effectiveShowLabel}
    <span>{label}</span>
  {/if}
{/snippet}

{#snippet triggerMenu()}
  <Menu
    triggerClass={className}
    {size}
    {radius}
    {variant}
    {color}
    {square}
    {wide}
    {...restProps}
    label={triggerLabelSnippet}
    aria-label={iconOnly ? label : undefined}
    items={options.map((option) => ({
      label: labelSnippets[option.value],
      onSelect: () => theme.set(option.value),
      icon: iconSnippets[option.value],
      type: "item",
    }))}
  />
{/snippet}

{#if iconOnly}
  <Tooltip content={label} delay={0} triggerClass={wide ? "w-full" : ""}>
    {@render triggerMenu()}
  </Tooltip>
{:else}
  {@render triggerMenu()}
{/if}

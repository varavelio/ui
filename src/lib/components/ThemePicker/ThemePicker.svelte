<script lang="ts">
  import { Check, LaptopMinimal, MoonStar, SunMedium } from "@lucide/svelte";
  import type { ClassValue } from "svelte/elements";
  import { theme } from "../../runtime/index.js";
  import { Menu } from "../Menu/index.js";
  import { Tooltip } from "../Tooltip/index.js";

  const options = [
    { value: "system", label: "System", icon: LaptopMinimal },
    { value: "light", label: "Light", icon: SunMedium },
    { value: "dark", label: "Dark", icon: MoonStar },
  ] as const;

  interface Props {
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

    /**
     * Button size preset.
     * @default "md"
     */
    size?: "sm" | "md" | "lg";

    /**
     * Button border radius preset.
     * @default "md"
     */
    radius?: "sm" | "md" | "lg" | "full";

    /**
     * Button appearance variant.
     * @default "outline"
     */
    variant?: "solid" | "outline" | "ghost";

    /**
     * Semantic color representing the button's intent.
     * @default "neutral"
     */
    color?: "neutral" | "info" | "success" | "warning" | "error";

    /**
     * Whether the button should have a square aspect ratio.
     * @default false
     */
    square?: boolean;

    /**
     * Whether the button should span the full width of its container.
     * @default false
     */
    wide?: boolean;
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
  }: Props = $props();

  let selectedTheme = $derived(theme.current);
  let selectedOption = $derived(
    options.find((option) => option.value === selectedTheme) ?? options[0],
  );
  let TriggerIcon = $derived(selectedOption.icon);
  let effectiveShowLabel = $derived(showLabel && !square);
  let iconOnly = $derived(!effectiveShowLabel);
  let triggerLabel = $derived(effectiveShowLabel ? label : undefined);

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

{#snippet triggerMenu()}
  <Menu
    triggerClass={className}
    {size}
    {radius}
    {variant}
    {color}
    {square}
    {wide}
    icon={TriggerIcon}
    label={triggerLabel}
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

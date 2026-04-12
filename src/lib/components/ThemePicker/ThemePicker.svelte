<script lang="ts">
  import {
    Check,
    LaptopMinimal,
    Loader,
    MoonStar,
    SunMedium,
  } from "@lucide/svelte";
  import { type Component, onMount } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import { type Theme, theme } from "../../utils/index.ts";
  import { Button } from "../Button/index.js";
  import { Menu } from "../Menu/index.js";
  import { Tooltip } from "../Tooltip/index.js";

  const options = [
    { value: "system", label: "System", icon: LaptopMinimal },
    { value: "light", label: "Light", icon: SunMedium },
    { value: "dark", label: "Dark", icon: MoonStar },
  ] as const satisfies readonly {
    value: Theme;
    label: string;
    icon: Component;
  }[];

  interface Props {
    /**
     * Additional CSS classes to apply to the trigger.
     */
    class?: ClassValue;
    /**
     * The bound theme value.
     * @default "system"
     */
    value?: Theme;
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
  }

  let {
    class: className,
    value = $bindable<Theme>("system"),
    label = "Theme",
    showLabel = true,
    size = "md",
    radius = "md",
    variant = "outline",
    color = "neutral",
    square = false,
  }: Props = $props();

  let isLoading = $state(true);

  function setThemeValue(next: Theme) {
    theme.set(next);
  }

  onMount(() => {
    value = theme.get();
    isLoading = false;

    return theme.subscribe((nextTheme) => {
      value = nextTheme;
    });
  });

  let selectedTheme = $derived(isLoading ? "system" : value);
  let selectedOption = $derived(
    options.find((option) => option.value === selectedTheme) ?? options[2],
  );
  let TriggerIcon = $derived(selectedOption.icon);
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

{#snippet icon(Icon: Component)}
  <Icon class="size-4" />
{/snippet}

{#snippet triggerContent()}
  {#if isLoading}
    <Loader class="size-4 animate-spin" />
  {:else}
    <TriggerIcon class="size-4" />
  {/if}

  {#if effectiveShowLabel}
    <span>{label}</span>
  {/if}
{/snippet}

{#snippet triggerButton()}
  <Button
    disabled={isLoading}
    {variant}
    {radius}
    {size}
    {color}
    {square}
    class={className}
  >
    {@render triggerContent()}
  </Button>
{/snippet}

{#snippet maybeTooltip()}
  {#if iconOnly}
    <Tooltip content={label} delay={0}>{@render triggerButton()}</Tooltip>
  {:else}
    {@render triggerButton()}
  {/if}
{/snippet}

{#snippet labelContent(optionLabel: string, isSelected: boolean)}
  <div class="flex flex-1 items-center justify-between gap-3">
    <span>{optionLabel}</span>
    {#if isSelected}
      <Check class="size-4 text-content-muted" />
    {/if}
  </div>
{/snippet}

{#snippet sunIcon()}
  {@render icon(SunMedium)}
{/snippet}

{#snippet moonIcon()}
  {@render icon(MoonStar)}
{/snippet}

{#snippet laptopIcon()}
  {@render icon(LaptopMinimal)}
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

<Menu
  items={options.map((option) => ({
    label: labelSnippets[option.value],
    onSelect: () => setThemeValue(option.value),
    icon: iconSnippets[option.value],
    type: "item",
  }))}
>
  {#snippet trigger()}
    {@render maybeTooltip()}
  {/snippet}
</Menu>

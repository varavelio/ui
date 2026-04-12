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
  import { cn } from "../../helpers/cn.ts";
  import { type Theme, theme } from "../../utils/index.ts";
  import { Button } from "../Button/index.js";
  import { Menu } from "../Menu/index.js";

  const options = [
    { value: "light", label: "Light", icon: SunMedium },
    { value: "dark", label: "Dark", icon: MoonStar },
    { value: "system", label: "System", icon: LaptopMinimal },
  ] as const;

  interface Props {
    /**
     * Additional CSS classes to apply to the theme toggle button.
     */
    class?: ClassValue;
    /**
     * The bound theme value ("light", "dark", or "system").
     * @default "system"
     */
    value?: Theme;
  }

  let { class: className, value = $bindable<Theme>("system") }: Props =
    $props();

  let isLoading = $state(true);
  let currentTheme = $state<Theme>("system");

  function handleValueChange(next: string) {
    if (next !== "light" && next !== "dark" && next !== "system") return;
    theme.set(next);
  }

  onMount(() => {
    const initialTheme = theme.get();

    value = initialTheme;
    currentTheme = initialTheme;
    isLoading = false;

    return theme.subscribe((nextTheme) => {
      currentTheme = nextTheme;
      value = nextTheme;
    });
  });

  let selectedTheme = $derived(isLoading ? "system" : currentTheme);
  let TriggerIcon = $derived(
    selectedTheme === "system"
      ? LaptopMinimal
      : selectedTheme === "dark"
        ? MoonStar
        : SunMedium,
  );

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

{#snippet labelContent(optionLabel: string, isSelected: boolean)}
  <div class="flex flex-1 items-center justify-between">
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
    onSelect: () => handleValueChange(option.value),
    icon: iconSnippets[option.value],
    type: "item",
  }))}
>
  {#snippet trigger()}
    <Button variant="outline" size="md" class={cn("w-fit", className)}>
      {#if isLoading}
        <Loader class="size-4 animate-spin" />
      {:else}
        <TriggerIcon class="size-4" />
      {/if}
      <span class="hidden desk:inline">Theme</span>
    </Button>
  {/snippet}
</Menu>

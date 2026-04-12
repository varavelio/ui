<script lang="ts">
  import {
    AlertCircle,
    ArrowRight,
    Check,
    Download,
    Loader,
    Mail,
    Plus,
    Send,
    Settings,
    Trash2,
  } from "@lucide/svelte";
  import { Button, Card, Kbd, Label, Switch } from "$lib/components/index.js";

  let active = $state(false);
  let loading = $state(false);
  let disabled = $state(false);

  const variants = ["solid", "outline", "ghost"] as const;
  const colors = ["neutral", "info", "success", "warning", "danger"] as const;
  const sizes = ["sm", "md", "lg"] as const;
  const radii = ["sm", "md", "lg", "full"] as const;
</script>

<!-- Header Section with Global Controls -->
<div class="grid grid-cols-1 gap-6 desk:grid-cols-2 mb-6">
  <div class="space-y-1">
    <h2 class="text-2xl font-bold tracking-tight">Button</h2>
    <p class="text-content-muted text-sm">
      Interactive element used for actions and navigation.
    </p>
  </div>

  <div class="space-y-2">
    <Label>Global States</Label>
    <Card class="flex flex-wrap justify-start items-center space-x-4">
      <Switch bind:checked={active} size="sm" label="Active" />
      <Switch bind:checked={loading} size="sm" label="Loading" />
      <Switch bind:checked={disabled} size="sm" label="Disabled" />
    </Card>
  </div>
</div>

<div class="grid grid-cols-1 gap-8 desk:grid-cols-2">
  <!-- Variants & Colors Grid -->
  <div class="space-y-2">
    <Label>Variants & Colors</Label>
    <Card class="overflow-hidden border-base-300">
      <div class="grid grid-cols-1 divide-y divide-base-300">
        {#each variants as variant}
          <div class="grid grid-cols-1 desk:grid-cols-[140px_1fr]">
            <div
              class="flex items-center bg-base-200/30 px-6 py-4 desk:border-r desk:border-base-300"
            >
              <span
                class="text-[10px] font-bold uppercase tracking-widest text-content-muted"
              >
                {variant}
              </span>
            </div>
            <div class="flex flex-wrap items-center gap-4 p-6">
              {#each colors as color}
                <Button
                  {active}
                  {loading}
                  {disabled}
                  {variant}
                  {color}
                  class="min-w-25"
                >
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </Button>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </Card>
  </div>

  <!-- Composition & Icons -->
  <div class="space-y-2">
    <Label>Composition Patterns</Label>
    <Card class="grid grid-cols-1 divide-y divide-base-300">
      <!-- Standard Icon Compositions -->
      <div class="flex flex-wrap items-center justify-center gap-6 p-8">
        <Button {active} {loading} {disabled} color="neutral">
          <Plus class="size-4" />
          <span>New Project</span>
        </Button>
        <Button {active} {loading} {disabled} variant="outline" color="info">
          <span>Send Message</span>
          <Send class="size-4" />
        </Button>
        <Button
          {active}
          {loading}
          {disabled}
          variant="ghost"
          color="danger"
          size="sm"
        >
          <Trash2 class="size-4" />
          <span>Delete Account</span>
        </Button>
        <Button {active} {loading} {disabled} color="success" radius="full">
          <span>Get Started</span>
          <ArrowRight class="size-4" />
        </Button>
      </div>

      <!-- Icon-Only & Utilities -->
      <div
        class="flex flex-wrap items-center justify-center gap-6 p-8 bg-base-100/50"
      >
        <Button
          {active}
          {loading}
          {disabled}
          variant="outline"
          class="size-10 p-0"
          aria-label="Settings"
        >
          <Settings class="size-4" />
        </Button>
        <Button
          {active}
          {loading}
          {disabled}
          variant="ghost"
          class="size-10 p-0"
          aria-label="Inbox"
        >
          <Mail class="size-4" />
        </Button>
        <Button
          {active}
          {loading}
          {disabled}
          color="neutral"
          class="size-10 p-0"
          radius="full"
          aria-label="Download"
        >
          <Download class="size-4" />
        </Button>
        <Button
          {active}
          {loading}
          {disabled}
          variant="outline"
          color="success"
          class="size-10 p-0"
          radius="sm"
          aria-label="Complete"
        >
          <Check class="size-4" />
        </Button>
      </div>
    </Card>
  </div>

  <!-- Sizes -->
  <div class="space-y-2">
    <Label>Sizes</Label>
    <Card class="flex items-center justify-center gap-8 p-10">
      {#each sizes as size}
        <div class="flex flex-col items-center gap-4">
          <Button {active} {loading} {disabled} {size} color="neutral">
            Button
          </Button>
          <span
            class="font-mono text-[10px] font-medium text-content-muted uppercase"
          >
            {size}
          </span>
        </div>
      {/each}
    </Card>
  </div>

  <!-- Radius -->
  <div class="space-y-2">
    <Label>Border Radius</Label>
    <Card class="flex flex-wrap items-center justify-center gap-6 p-10">
      {#each radii as radius}
        <div class="flex flex-col items-center gap-4">
          <Button {active} {loading} {disabled} {radius} variant="outline">
            Radius
          </Button>
          <span
            class="font-mono text-[10px] font-medium text-content-muted uppercase"
          >
            {radius}
          </span>
        </div>
      {/each}
    </Card>
  </div>

  <!-- Full Width & Alignment -->
  <div class="space-y-2">
    <Label> Full Width & Content Alignment </Label>
    <Card class="divide-y divide-base-300">
      <div class="p-6">
        <Button
          {active}
          {loading}
          {disabled}
          color="neutral"
          wide
          alignContent="left"
        >
          <Plus class="size-4" />
          <span>Left Aligned Action</span>
        </Button>
      </div>
      <div class="grid grid-cols-1 desk:grid-cols-2">
        <div class="p-6 desk:border-r desk:border-base-300">
          <Button
            {active}
            {loading}
            {disabled}
            variant="outline"
            color="info"
            wide
            alignContent="center"
          >
            Center Aligned (Default)
          </Button>
        </div>
        <div class="p-6">
          <Button
            {active}
            {loading}
            {disabled}
            variant="ghost"
            color="neutral"
            wide
            alignContent="right"
          >
            <span>Right Aligned Action</span>
            <ArrowRight class="size-4" />
          </Button>
        </div>
      </div>
      <div class="p-6">
        <Button
          {active}
          {loading}
          {disabled}
          color="neutral"
          wide
          alignContent="between"
        >
          <div class="flex items-center gap-2">
            <AlertCircle class="size-4 opacity-50" />
            <span>Complex Alignment Pattern</span>
          </div>
          <div class="flex items-center gap-2">
            <Kbd>CTRL</Kbd>
            <Kbd>K</Kbd>
          </div>
        </Button>
      </div>
    </Card>
  </div>
</div>

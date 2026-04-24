<script lang="ts">
  import {
    ArrowRight,
    Check,
    CircleAlert,
    Download,
    Mail,
    Plus,
    Send,
    Settings,
    Trash2,
  } from "@lucide/svelte";
  import { Button, Card, Kbd, Label, Switch } from "$lib/components/index.js";

  let active = $state(false);
  let loading = $state(false);
  let skeleton = $state(false);
  let disabled = $state(false);

  let isLink = $state(false);
  let href = $derived(isLink ? "#" : undefined);

  const variants = ["solid", "outline", "ghost"] as const;
  const colors = ["neutral", "info", "success", "warning", "error"] as const;
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
      <Switch bind:checked={skeleton} size="sm" label="Skeleton" />
      <Switch bind:checked={disabled} size="sm" label="Disabled" />
      <div class="h-6 w-px bg-base-300 mx-2"></div>
      <Switch bind:checked={isLink} size="sm" label="As Link (href)" />
    </Card>
  </div>
</div>

<div class="grid grid-cols-1 gap-8 desk:grid-cols-2">
  <!-- Variants & Colors Grid -->
  <div class="space-y-2">
    <Label>Variants & Colors</Label>
    <Card class="overflow-hidden border-base-400">
      <div class="grid grid-cols-1 divide-y divide-base-300">
        {#each variants as variant}
          <div class="grid grid-cols-1 desk:grid-cols-[140px_1fr]">
            <div
              class="flex items-center bg-base-200/30 px-6 py-4 desk:border-r desk:border-base-400"
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
                  {skeleton}
                  {disabled}
                  {variant}
                  {color}
                  {href}
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

  <div class="space-y-8">
    <!-- Sizes -->
    <div class="space-y-2">
      <Label>Sizes</Label>
      <Card class="flex items-center justify-center gap-8 p-10">
        {#each sizes as size}
          <div class="flex flex-col items-center gap-4">
            <Button
              {active}
              {loading}
              {skeleton}
              {disabled}
              {size}
              color="neutral"
              {href}
            >
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
            <Button
              {active}
              {loading}
              {skeleton}
              {disabled}
              {radius}
              variant="outline"
              {href}
            >
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
  </div>

  <!-- Full Width & Alignment -->
  <div class="space-y-2">
    <Label>Full Width & Content Alignment</Label>
    <Card class="divide-y divide-base-300">
      <div class="p-6">
        <Button
          {active}
          {loading}
          {skeleton}
          {disabled}
          color="neutral"
          wide
          alignContent="left"
          {href}
        >
          <Plus class="size-4" />
          <span>Left Aligned Action</span>
        </Button>
      </div>
      <div class="grid grid-cols-1 desk:grid-cols-2">
        <div class="p-6 desk:border-r desk:border-base-400">
          <Button
            {active}
            {loading}
            {skeleton}
            {disabled}
            variant="outline"
            color="info"
            wide
            alignContent="center"
            {href}
          >
            Center Aligned (Default)
          </Button>
        </div>
        <div class="p-6">
          <Button
            {active}
            {loading}
            {skeleton}
            {disabled}
            variant="ghost"
            color="neutral"
            wide
            alignContent="right"
            {href}
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
          {skeleton}
          {disabled}
          color="neutral"
          wide
          alignContent="between"
          {href}
        >
          <div class="flex items-center gap-2">
            <CircleAlert class="size-4 opacity-50" />
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

  <div class="space-y-8">
    <!-- Square Aspect Ratio -->
    <div class="space-y-2">
      <Label>Square Aspect Ratio</Label>
      <Card class="flex flex-col divide-y divide-base-300">
        <div class="flex flex-wrap items-center justify-center gap-8 p-10">
          {#each sizes as size}
            <div class="flex flex-col items-center gap-4">
              <div class="flex-none">
                <Button
                  {active}
                  {loading}
                  {skeleton}
                  {disabled}
                  {size}
                  square
                  color="neutral"
                  {href}
                  icon={Plus}
                />
              </div>
              <span
                class="font-mono text-[10px] font-medium text-content-muted uppercase"
              >
                {size}
              </span>
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
          <Button
            {active}
            {loading}
            {skeleton}
            {disabled}
            color="neutral"
            {href}
            icon={Plus}
          >
            New Project
          </Button>
          <Button
            {active}
            {loading}
            {skeleton}
            {disabled}
            variant="outline"
            color="info"
            {href}
            iconRight={Send}
          >
            Send Message
          </Button>
          <Button
            {active}
            {loading}
            {skeleton}
            {disabled}
            variant="ghost"
            color="error"
            size="sm"
            {href}
            icon={Trash2}
          >
            Delete Account
          </Button>
          <Button
            {active}
            {loading}
            {skeleton}
            {disabled}
            color="success"
            radius="full"
            {href}
            iconRight={ArrowRight}
          >
            Get Started
          </Button>
          <Button
            {active}
            {loading}
            {skeleton}
            {disabled}
            color="neutral"
            variant="outline"
            {href}
            icon={Download}
            iconRight={Check}
          >
            Dual Icons
          </Button>
          <Button
            {active}
            {loading}
            {skeleton}
            {disabled}
            square
            variant="outline"
            aria-label="Settings"
            {href}
            icon={Settings}
          />
          <Button
            {active}
            {loading}
            {skeleton}
            {disabled}
            square
            variant="ghost"
            aria-label="Inbox"
            {href}
            icon={Mail}
          />
          <Button
            {active}
            {loading}
            {skeleton}
            {disabled}
            square
            color="neutral"
            radius="full"
            aria-label="Download"
            {href}
            icon={Download}
          />
        </div>
      </Card>
    </div>
  </div>
</div>

<script lang="ts">
  import {
    CirclePercent,
    DollarSign,
    Gauge,
    Layers,
    MoveHorizontal,
    MoveVertical,
    Zap,
  } from "@lucide/svelte";
  import { Card, Label, Slider, Switch } from "$lib/components/index.js";

  let volume = $state(72);
  let priceRange = $state([25, 75]);
  let brightness = $state(45);
  let releaseSpeed = $state(2);

  let disabled = $state(false);
  let showValue = $state(true);

  const sizes = ["sm", "md", "lg"] as const;
</script>

<!-- Header Section with Global Controls -->
<div class="mb-6 grid grid-cols-1 gap-6 desk:grid-cols-2">
  <div class="space-y-1">
    <h2 class="text-2xl font-bold tracking-tight">Slider</h2>
    <p class="text-sm text-content-muted">
      Interactive control for selecting a single value or a range from a set of
      options.
    </p>
  </div>

  <div class="space-y-2">
    <Label>Global States</Label>
    <Card class="flex flex-wrap items-center justify-start space-x-4">
      <Switch bind:checked={disabled} label="Disabled" size="sm" />
      <div class="mx-2 h-6 w-px bg-base-300"></div>
      <Switch bind:checked={showValue} label="Show Value summary" size="sm" />
    </Card>
  </div>
</div>

<div class="grid grid-cols-1 gap-8 desk:grid-cols-2">
  <!-- Basic Modes -->
  <div class="space-y-8">
    <div class="space-y-2">
      <Label>Basic Usage</Label>
      <Card class="space-y-10 p-8">
        <Slider
          bind:value={volume}
          description="Ideal for volume, opacity, or any continuous value."
          formatValue={(value) => `${value}%`}
          label="System Volume"
          {disabled}
          {showValue}
        />

        <Slider
          bind:value={priceRange}
          description="Dual-thumb sliders are perfect for price filters and ranges."
          formatValue={(value) => `$${value}`}
          label="Price Filter"
          type="multiple"
          {disabled}
          {showValue}
        />
      </Card>
    </div>

    <div class="space-y-2">
      <Label>Discrete Steps</Label>
      <Card class="p-8">
        <Slider
          bind:value={releaseSpeed}
          description="Discrete values feel great for modes, speeds, and preset scales."
          label="Release speed"
          step={[0.5, 1, 2, 4, 8]}
          {disabled}
          {showValue}
        />
      </Card>
    </div>
  </div>

  <!-- Sizes & Orientation -->
  <div class="space-y-8">
    <div class="space-y-2">
      <Label>Sizes</Label>
      <Card class="space-y-8 p-8">
        {#each sizes as size}
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span
                class="font-mono text-[10px] font-bold uppercase tracking-widest text-content-muted"
              >
                {size}
              </span>
            </div>
            <Slider
              value={size === "sm" ? 30 : size === "md" ? 60 : 90}
              {size}
              {disabled}
              showValue={false}
            />
          </div>
        {/each}
      </Card>
    </div>

    <div class="space-y-2">
      <Label>Orientation</Label>
      <Card class="flex h-[320px] items-center justify-around p-8">
        <div class="flex flex-col items-center gap-4">
          <Slider
            orientation="vertical"
            value={65}
            {disabled}
            showValue={false}
            size="sm"
          />
          <span class="font-mono text-[10px] font-medium text-content-muted">
            SM
          </span>
        </div>
        <div class="flex flex-col items-center gap-4">
          <Slider
            orientation="vertical"
            value={45}
            {disabled}
            showValue={false}
            size="md"
          />
          <span class="font-mono text-[10px] font-medium text-content-muted">
            MD
          </span>
        </div>
        <div class="flex flex-col items-center gap-4">
          <Slider
            orientation="vertical"
            value={80}
            {disabled}
            showValue={false}
            size="lg"
          />
          <span class="font-mono text-[10px] font-medium text-content-muted">
            LG
          </span>
        </div>
        <div class="h-full w-px bg-base-300"></div>
        <div class="flex flex-col items-center justify-center gap-2">
          <MoveVertical class="size-5 text-content-muted" />
          <p class="max-w-[100px] text-center text-[10px] text-content-muted">
            Vertical orientation is useful for audio mixers and dashboards.
          </p>
        </div>
      </Card>
    </div>
  </div>
</div>

<!-- Visual Context Examples -->
<div class="mt-8 space-y-2">
  <Label>Contextual Examples</Label>
  <div class="grid grid-cols-1 gap-6 desk:grid-cols-3">
    <Card class="space-y-4 p-6">
      <div class="flex items-center gap-3">
        <div
          class="flex size-10 items-center justify-center rounded-md bg-base-200"
        >
          <Zap class="size-5 text-content" />
        </div>
        <div>
          <h4 class="text-sm font-medium">Performance Mode</h4>
          <p class="text-xs text-content-muted">CPU Power Limit</p>
        </div>
      </div>
      <Slider value={85} size="sm" {disabled} formatValue={(v) => `${v}W`} />
    </Card>

    <Card class="space-y-4 p-6">
      <div class="flex items-center gap-3">
        <div
          class="flex size-10 items-center justify-center rounded-md bg-base-200"
        >
          <Layers class="size-5 text-content" />
        </div>
        <div>
          <h4 class="text-sm font-medium">Layer Opacity</h4>
          <p class="text-xs text-content-muted">Selected: Background</p>
        </div>
      </div>
      <Slider
        bind:value={brightness}
        size="sm"
        {disabled}
        formatValue={(v) => `${v}%`}
      />
    </Card>

    <Card class="space-y-4 p-6">
      <div class="flex items-center gap-3">
        <div
          class="flex size-10 items-center justify-center rounded-md bg-base-200"
        >
          <Gauge class="size-5 text-content" />
        </div>
        <div>
          <h4 class="text-sm font-medium">Network Limit</h4>
          <p class="text-xs text-content-muted">Bandwidth Throttling</p>
        </div>
      </div>
      <Slider
        value={[20, 80]}
        type="multiple"
        size="sm"
        {disabled}
        formatValue={(v) => `${v} Mbps`}
      />
    </Card>
  </div>
</div>

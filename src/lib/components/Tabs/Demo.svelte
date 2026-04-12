<script lang="ts">
  import { Badge, Card, Tabs } from "$lib/components/index.js";

  const items = [
    { value: "overview", label: "Overview", content: overview },
    { value: "activity", label: "Activity", content: activity },
    { value: "settings", label: "Settings", content: settings },
    { value: "disabled", label: "Disabled", content: disabled, disabled: true },
  ];
</script>

{#snippet overview()}
  <Card class="space-y-2">
    <h3 class="font-medium">Overview</h3>
    <p class="text-sm text-content-muted">
      Monitor deploy velocity, recent incidents and environment health at a
      glance.
    </p>
  </Card>
{/snippet}

{#snippet activity()}
  <Card class="space-y-3">
    <div class="flex items-center justify-between">
      <span class="font-medium">Recent Activity</span>
      <Badge color="info">Live</Badge>
    </div>
    <p class="text-sm text-content-muted">
      Three deployments completed in the last 24 hours.
    </p>
  </Card>
{/snippet}

{#snippet settings()}
  <Card class="space-y-2">
    <h3 class="font-medium">Settings</h3>
    <p class="text-sm text-content-muted">
      Configure rollout rules, approvals and observability defaults.
    </p>
  </Card>
{/snippet}

{#snippet disabled()}
  <Card>
    <p class="text-sm text-content-muted">
      This content should not be visible.
    </p>
  </Card>
{/snippet}

<div class="flex flex-col gap-16">
  <!-- SECTION: SEMANTIC COLORS -->
  <div class="space-y-6">
    <div class="space-y-1">
      <h2 class="text-lg font-semibold tracking-tight">Semantic Colors</h2>
      <p class="text-sm text-content-muted">
        Choose from neutral or semantic tones to match the intent of your
        interface.
      </p>
    </div>
    <div class="grid grid-cols-1 gap-8 desk:grid-cols-2">
      <div class="space-y-3">
        <span
          class="text-xs font-medium uppercase tracking-wider text-content-muted"
        >
          Neutral (Default)
        </span>
        <Tabs {items} color="neutral" />
      </div>
      <div class="space-y-3">
        <span
          class="text-xs font-medium uppercase tracking-wider text-content-muted"
        >
          Info
        </span>
        <Tabs {items} color="info" />
      </div>
      <div class="space-y-3">
        <span
          class="text-xs font-medium uppercase tracking-wider text-content-muted"
        >
          Success
        </span>
        <Tabs {items} color="success" />
      </div>
      <div class="space-y-3">
        <span
          class="text-xs font-medium uppercase tracking-wider text-content-muted"
        >
          Warning
        </span>
        <Tabs {items} color="warning" />
      </div>
      <div class="space-y-3">
        <span
          class="text-xs font-medium uppercase tracking-wider text-content-muted"
        >
          Error
        </span>
        <Tabs {items} color="error" />
      </div>
    </div>
  </div>

  <!-- SECTION: BACKGROUND PRESETS -->
  <div class="space-y-6">
    <div class="space-y-1">
      <h2 class="text-lg font-semibold tracking-tight">Background Presets</h2>
      <p class="text-sm text-content-muted">
        Adjust the container background to match your surface elevation (100,
        200, 300).
      </p>
    </div>
    <div class="grid grid-cols-1 gap-8 desk:grid-cols-3">
      <div class="space-y-3">
        <span
          class="text-xs font-medium uppercase tracking-wider text-content-muted"
        >
          BG 100
        </span>
        <Tabs {items} bg="100" />
      </div>
      <div class="space-y-3">
        <span
          class="text-xs font-medium uppercase tracking-wider text-content-muted"
        >
          BG 200
        </span>
        <Tabs {items} bg="200" />
      </div>
      <div class="space-y-3">
        <span
          class="text-xs font-medium uppercase tracking-wider text-content-muted"
        >
          BG 300 (Default)
        </span>
        <Tabs {items} bg="300" />
      </div>
    </div>
  </div>

  <!-- SECTION: SIZES -->
  <div class="space-y-6">
    <div class="space-y-1">
      <h2 class="text-lg font-semibold tracking-tight">Sizes</h2>
      <p class="text-sm text-content-muted">
        Three size variants to control density and hierarchy.
      </p>
    </div>
    <div class="grid grid-cols-1 gap-8 desk:grid-cols-3">
      <div class="space-y-3">
        <span
          class="text-xs font-medium uppercase tracking-wider text-content-muted"
        >
          Small (sm)
        </span>
        <Tabs {items} size="sm" />
      </div>
      <div class="space-y-3">
        <span
          class="text-xs font-medium uppercase tracking-wider text-content-muted"
        >
          Medium (md)
        </span>
        <Tabs {items} size="md" />
      </div>
      <div class="space-y-3">
        <span
          class="text-xs font-medium uppercase tracking-wider text-content-muted"
        >
          Large (lg)
        </span>
        <Tabs {items} size="lg" />
      </div>
    </div>
  </div>

  <!-- SECTION: LAYOUT & ORIENTATION -->
  <div class="space-y-6">
    <div class="space-y-1">
      <h2 class="text-lg font-semibold tracking-tight">Layout & Orientation</h2>
      <p class="text-sm text-content-muted">
        Toggle between horizontal and vertical layouts for different use cases.
      </p>
    </div>
    <div class="grid grid-cols-1 gap-12 desk:grid-cols-2">
      <div class="space-y-3">
        <span
          class="text-xs font-medium uppercase tracking-wider text-content-muted"
        >
          Horizontal (Default)
        </span>
        <Tabs {items} orientation="horizontal" />
      </div>
      <div class="space-y-3">
        <span
          class="text-xs font-medium uppercase tracking-wider text-content-muted"
        >
          Vertical
        </span>
        <Tabs {items} orientation="vertical" />
      </div>
    </div>
  </div>
</div>

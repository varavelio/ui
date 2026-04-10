<script lang="ts">
  import { Progress } from "$lib/components/index.js";
</script>

<div class="grid gap-8">
  <div class="grid gap-6 desk:grid-cols-2">
    <div class="space-y-4">
      <h3
        class="text-sm font-medium text-content-muted uppercase tracking-wider"
      >
        Colors
      </h3>
      <Progress label="Neutral" color="neutral" value={45} />
      <Progress label="Info (Default)" color="info" value={60} />
      <Progress label="Success" color="success" value={85} />
      <Progress label="Warning" color="warning" value={30} />
      <Progress label="Danger" color="danger" value={15} />
    </div>

    <div class="space-y-4">
      <h3
        class="text-sm font-medium text-content-muted uppercase tracking-wider"
      >
        Sizes
      </h3>
      <Progress label="Small" size="sm" value={40} />
      <Progress label="Medium (Default)" size="md" value={60} />
      <Progress label="Large" size="lg" value={80} />
    </div>
  </div>

  <div class="grid gap-6 desk:grid-cols-2">
    <div class="space-y-4">
      <h3
        class="text-sm font-medium text-content-muted uppercase tracking-wider"
      >
        States
      </h3>
      <Progress label="With Percentage" showValue value={72} />
      <Progress label="Indeterminate" value={null} />
      <Progress label="Max Value (200)" max={200} value={150} showValue />
    </div>

    <div class="space-y-4">
      <h3
        class="text-sm font-medium text-content-muted uppercase tracking-wider"
      >
        Usage
      </h3>
      <div class="rounded-lg border border-base-300 p-4 space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium">System Update</span>
          <span class="text-xs text-content-muted italic">Downloading...</span>
        </div>
        <Progress value={65} color="info" size="sm" />
        <p class="text-xs text-content-muted">Approx. 2 minutes remaining</p>
      </div>
    </div>
  </div>
</div>

<script lang="ts">
  import { Button, Tooltip } from "$lib/components/index.js";
</script>

<div class="flex flex-col gap-12">
  <!-- Basic Tooltip -->
  <section class="flex flex-col gap-4">
    <h3 class="text-sm font-medium text-content-muted uppercase tracking-wider">
      Basic Usage
    </h3>
    <div class="flex flex-wrap gap-4">
      <Tooltip content="Create a new deployment from the current branch.">
        <Button variant="outline">Deploy</Button>
      </Tooltip>

      <Tooltip content="Pause all scheduled jobs until manual resume.">
        <Button variant="ghost">Pause jobs</Button>
      </Tooltip>
    </div>
  </section>

  <!-- Placements -->
  <section class="flex flex-col gap-4">
    <h3 class="text-sm font-medium text-content-muted uppercase tracking-wider">
      Placements
    </h3>
    <div class="flex flex-wrap gap-8">
      <Tooltip content="Top placement (default)" side="top">
        <Button variant="outline" size="sm">Top</Button>
      </Tooltip>
      <Tooltip content="Bottom placement" side="bottom">
        <Button variant="outline" size="sm">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left placement" side="left">
        <Button variant="outline" size="sm">Left</Button>
      </Tooltip>
      <Tooltip content="Right placement" side="right">
        <Button variant="outline" size="sm">Right</Button>
      </Tooltip>
    </div>
  </section>

  <!-- Custom Content (Snippet) -->
  <section class="flex flex-col gap-4">
    <h3 class="text-sm font-medium text-content-muted uppercase tracking-wider">
      Rich Content
    </h3>
    <div class="flex flex-wrap gap-4">
      <Tooltip side="right">
        {#snippet content()}
          <div class="flex flex-col gap-1">
            <span class="font-medium text-blue-500">Pro Feature</span>
            <p class="max-w-48 text-xs leading-relaxed text-content-muted">
              Advanced analytics are only available on the Professional plan and
              higher.
            </p>
          </div>
        {/snippet}
        <Button variant="outline" color="info">Analytics</Button>
      </Tooltip>
    </div>
  </section>

  <!-- Delays & States -->
  <section class="flex flex-col gap-4">
    <h3 class="text-sm font-medium text-content-muted uppercase tracking-wider">
      Delays & States
    </h3>
    <div class="flex flex-wrap gap-4">
      <Tooltip content="Instant tooltip (default 0ms delay)">
        <Button variant="outline">Default (Instant)</Button>
      </Tooltip>
      <Tooltip content="Delayed tooltip (500ms delay)" delayDuration={500}>
        <Button variant="outline">Delayed (500ms)</Button>
      </Tooltip>
      <Tooltip content="This should not be visible" disabled>
        <Button variant="outline" color="danger">Disabled Tooltip</Button>
      </Tooltip>
    </div>
  </section>
</div>

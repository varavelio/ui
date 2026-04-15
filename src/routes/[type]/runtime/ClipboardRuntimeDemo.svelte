<script lang="ts">
  import { onMount } from "svelte";
  import {
    Alert,
    Badge,
    Button,
    Card,
    Copy,
    Input,
  } from "$lib/components/index.js";
  import { clipboard } from "$lib/runtime/index.js";

  const deploymentId = "dep_01JSQ53JVH2G6B87QR4P4X2F1N";
  const webhookSecret = "whsec_5X2E9N1Q4M7R8T3A6C2Z1B0L";

  let latestResult = $state("No clipboard action triggered yet.");
  let supported = $state<boolean | null>(null);

  onMount(() => {
    supported = clipboard.isSupported();
  });

  async function copyDeploymentId() {
    const didCopy = await clipboard.copy(deploymentId, {
      successMessage: "Deployment id copied.",
    });

    latestResult = didCopy
      ? "Copied deployment id through the runtime."
      : "Clipboard copy failed.";
  }

  async function copyQuietly() {
    const didCopy = await clipboard.copy(webhookSecret, {
      quiet: true,
    });

    latestResult = didCopy
      ? "Copied webhook secret without global toasts."
      : "Clipboard copy failed.";
  }
</script>

<div class="space-y-4">
  <Card class="space-y-4">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h4 class="text-lg font-semibold tracking-tight">Clipboard runtime</h4>
        <p class="text-sm text-content-muted">
          Standardize copy behavior once, then reuse it from direct runtime
          calls or through the <code>Copy</code> component.
        </p>
      </div>

      <Badge
        color={supported === null ? "neutral" : supported ? "success" : "error"}
        variant="solid"
      >
        {#if supported === null}
          checking support
        {:else if supported}
          clipboard available
        {:else}
          clipboard unavailable
        {/if}
      </Badge>
    </div>

    <div class="grid gap-4 desk:grid-cols-2">
      <div class="space-y-2 rounded-md border border-base-400 bg-base-100 p-3">
        <p
          class="text-[11px] font-medium uppercase tracking-[0.14em] text-content-muted"
        >
          Direct runtime call
        </p>
        <code class="block font-mono text-xs text-content">{deploymentId}</code>
        <Button variant="outline" onclick={copyDeploymentId}>
          Copy deployment id
        </Button>
      </div>

      <div class="space-y-2 rounded-md border border-base-400 bg-base-100 p-3">
        <p
          class="text-[11px] font-medium uppercase tracking-[0.14em] text-content-muted"
        >
          Quiet runtime call
        </p>
        <code class="block font-mono text-xs text-content">
          {webhookSecret}
        </code>
        <Button variant="ghost" onclick={copyQuietly}>Quiet copy</Button>
      </div>
    </div>
  </Card>

  <Card color="muted" class="space-y-4">
    <div>
      <h4
        class="text-sm font-semibold uppercase tracking-[0.14em] text-content-muted"
      >
        Component integration
      </h4>
      <p class="text-sm text-content-muted">
        <code>Copy</code> delegates to the same runtime while adding local icon
        and tooltip feedback.
      </p>
    </div>

    <div class="flex items-center gap-2">
      <Input value={deploymentId} readonly />
      <Copy text={deploymentId} successMessage="Deployment id copied." />
    </div>
  </Card>

  <Card color="muted" class="space-y-3">
    <div>
      <h4
        class="text-sm font-semibold uppercase tracking-[0.14em] text-content-muted"
      >
        Live status
      </h4>
      <p class="text-sm text-content-muted">
        The latest clipboard action is reflected here.
      </p>
    </div>

    <div class="rounded-md border border-base-400 bg-base-100 p-3 text-sm">
      <p class="font-medium text-content">{latestResult}</p>
    </div>
  </Card>

  <Alert
    title="Provider requirement"
    description="Clipboard copies use the toast runtime by default. Keep UiProvider mounted at the app root so copy feedback can render globally when needed."
    color="info"
    closable={false}
  />
</div>

<script lang="ts">
  import { Alert, Badge, Button, Card } from "$lib/components/index.js";
  import { dialog } from "$lib/runtime/dialog/index.js";

  type DialogColor = "neutral" | "info" | "success" | "warning" | "error";
  type DialogSize = "sm" | "md" | "lg";
  type ConfirmRuntimeOptions = {
    title?: string;
    text?: string;
    color?: DialogColor;
    size?: DialogSize;
    hideIcon?: boolean;
    cancelText?: string;
    actionText?: string;
  };
  type AlertRuntimeOptions = {
    title?: string;
    text?: string;
    color?: DialogColor;
    size?: DialogSize;
    hideIcon?: boolean;
    closeText?: string;
  };
  type RuntimeDialogApi = {
    confirm: (options: ConfirmRuntimeOptions | string) => Promise<boolean>;
    alert: (options: AlertRuntimeOptions | string) => Promise<void>;
  };

  const colors: DialogColor[] = [
    "neutral",
    "info",
    "success",
    "warning",
    "error",
  ];
  const sizes: DialogSize[] = ["sm", "md", "lg"];
  const runtimeDialog = dialog as RuntimeDialogApi;

  let confirmHideIcon = $state(false);
  let alertHideIcon = $state(false);
  let lastConfirmResult = $state("No confirmation yet.");
  let lastAlertResult = $state("No alert opened yet.");
  let confirmCount = $state(0);
  let alertCount = $state(0);

  async function openConfirmWithColor(color: DialogColor) {
    const accepted = await runtimeDialog.confirm({
      title: "Proceed with this operation?",
      text: `Semantic color: ${color}`,
      color,
      hideIcon: confirmHideIcon,
      cancelText: "Cancel",
      actionText: "Continue",
    });

    confirmCount += 1;
    lastConfirmResult = accepted ? "User confirmed." : "User canceled.";
  }

  async function openConfirmWithSize(size: DialogSize) {
    const accepted = await runtimeDialog.confirm({
      title: "Review spacing and scale",
      text: `This uses the ${size} dialog size preset.`,
      size,
      color: "info",
      hideIcon: confirmHideIcon,
      cancelText: "Back",
      actionText: "Looks good",
    });

    confirmCount += 1;
    lastConfirmResult = accepted
      ? `Confirmed on ${size} size.`
      : `Canceled on ${size} size.`;
  }

  async function openStringConfirm() {
    const accepted = await runtimeDialog.confirm("Archive this workspace?");

    confirmCount += 1;
    lastConfirmResult = accepted
      ? "String shorthand confirmed."
      : "String shorthand canceled.";
  }

  async function openCustomConfirm() {
    const accepted = await runtimeDialog.confirm({
      title: "Replace existing deployment?",
      text: "This will stop the old deployment before promotion.",
      color: "warning",
      size: "md",
      hideIcon: confirmHideIcon,
      cancelText: "Keep current",
      actionText: "Replace now",
    });

    confirmCount += 1;
    lastConfirmResult = accepted
      ? "Custom labels confirmed."
      : "Custom labels canceled.";
  }

  async function openAlertWithColor(color: DialogColor) {
    await runtimeDialog.alert({
      title: "Runtime alert",
      text: `Semantic color: ${color}`,
      color,
      hideIcon: alertHideIcon,
      closeText: "Got it",
    });

    alertCount += 1;
    lastAlertResult = `Closed ${color} alert.`;
  }

  async function openAlertWithSize(size: DialogSize) {
    await runtimeDialog.alert({
      title: "Sizing preview",
      text: `This uses the ${size} dialog size preset.`,
      size,
      color: "info",
      hideIcon: alertHideIcon,
      closeText: "Close",
    });

    alertCount += 1;
    lastAlertResult = `Closed ${size} size alert.`;
  }

  async function openStringAlert() {
    await runtimeDialog.alert("Changes saved successfully.");

    alertCount += 1;
    lastAlertResult = "Closed string shorthand alert.";
  }
</script>

<div class="space-y-4">
  <Card class="space-y-4">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h4 class="text-lg font-semibold tracking-tight">Confirm playground</h4>
        <p class="text-sm text-content-muted">
          Test every `dialog.confirm` option with Promise-based responses.
        </p>
      </div>
      <Badge color="info" variant="solid">{confirmCount} opens</Badge>
    </div>

    <div class="space-y-2">
      <p
        class="text-xs font-medium uppercase tracking-[0.14em] text-content-muted"
      >
        Color
      </p>
      <div class="flex flex-wrap gap-2">
        {#each colors as color (color)}
          <Button
            variant="ghost"
            {color}
            onclick={() => openConfirmWithColor(color)}
          >
            {color}
          </Button>
        {/each}
      </div>
    </div>

    <div class="space-y-2">
      <p
        class="text-xs font-medium uppercase tracking-[0.14em] text-content-muted"
      >
        Size
      </p>
      <div class="flex flex-wrap gap-2">
        {#each sizes as size (size)}
          <Button variant="outline" onclick={() => openConfirmWithSize(size)}>
            {size}
          </Button>
        {/each}
      </div>
    </div>

    <div class="flex flex-wrap gap-2">
      <Button
        variant={confirmHideIcon ? "outline" : "ghost"}
        color={confirmHideIcon ? "warning" : "neutral"}
        onclick={() => {
          confirmHideIcon = !confirmHideIcon;
        }}
      >
        {confirmHideIcon ? "Icon hidden" : "Icon visible"}
      </Button>
      <Button variant="outline" color="success" onclick={openCustomConfirm}>
        Custom labels
      </Button>
      <Button variant="outline" color="info" onclick={openStringConfirm}>
        String shorthand
      </Button>
    </div>

    <p class="text-sm text-content-muted">{lastConfirmResult}</p>
  </Card>

  <Card class="space-y-4">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h4 class="text-lg font-semibold tracking-tight">Alert playground</h4>
        <p class="text-sm text-content-muted">
          Explore all `dialog.alert` options and close flows.
        </p>
      </div>
      <Badge color="success" variant="solid">{alertCount} opens</Badge>
    </div>

    <div class="space-y-2">
      <p
        class="text-xs font-medium uppercase tracking-[0.14em] text-content-muted"
      >
        Color
      </p>
      <div class="flex flex-wrap gap-2">
        {#each colors as color (color)}
          <Button
            variant="ghost"
            {color}
            onclick={() => openAlertWithColor(color)}
          >
            {color}
          </Button>
        {/each}
      </div>
    </div>

    <div class="space-y-2">
      <p
        class="text-xs font-medium uppercase tracking-[0.14em] text-content-muted"
      >
        Size
      </p>
      <div class="flex flex-wrap gap-2">
        {#each sizes as size (size)}
          <Button variant="outline" onclick={() => openAlertWithSize(size)}>
            {size}
          </Button>
        {/each}
      </div>
    </div>

    <div class="flex flex-wrap gap-2">
      <Button
        variant={alertHideIcon ? "outline" : "ghost"}
        color={alertHideIcon ? "warning" : "neutral"}
        onclick={() => {
          alertHideIcon = !alertHideIcon;
        }}
      >
        {alertHideIcon ? "Icon hidden" : "Icon visible"}
      </Button>
      <Button variant="outline" color="info" onclick={openStringAlert}>
        String shorthand
      </Button>
    </div>

    <p class="text-sm text-content-muted">{lastAlertResult}</p>
  </Card>

  <Alert
    title="Provider requirement"
    description="Runtime dialogs render through UiProvider. Keep it mounted once at app root so dialog APIs work everywhere."
    color="info"
    closable={false}
  />
</div>

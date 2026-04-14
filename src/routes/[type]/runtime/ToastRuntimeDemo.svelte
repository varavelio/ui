<script lang="ts">
  import { Alert, Badge, Button, Card } from "$lib/components/index.js";
  import { toast } from "$lib/runtime/index.js";

  const variants = ["success", "info", "warning", "error"] as const;
  type ToastId = string | number;
  type RuntimeToastOptions = {
    id?: ToastId;
    title?: string;
    text?: string;
    closeButton?: boolean;
  };
  type RuntimeToastMethod = (
    input?: RuntimeToastOptions | string,
    options?: RuntimeToastOptions,
  ) => ToastId | undefined;
  type RuntimeToastApi = {
    success: RuntimeToastMethod;
    info: RuntimeToastMethod;
    warning: RuntimeToastMethod;
    error: RuntimeToastMethod;
    loading: RuntimeToastMethod;
    promise: <T>(
      promise: Promise<T> | (() => Promise<T>),
      options?: RuntimeToastOptions & {
        loadingText?: string | (() => string);
        successText?: string | ((data: T) => string);
        errorText?: string | ((error: unknown) => string);
        finally?: () => void | Promise<void>;
      },
    ) => ToastId | undefined;
    dismiss: (id?: ToastId) => ToastId | undefined;
  };
  const runtimeToast = toast as unknown as RuntimeToastApi & RuntimeToastMethod;

  let latestAction = $state("No toast triggered yet.");
  let lastToastId = $state<ToastId | null>(null);

  function rememberAction(action: string, id?: ToastId) {
    latestAction = action;
    lastToastId = id ?? null;
  }

  function showDefaultToast() {
    const id = runtimeToast("Saved with string shorthand.");
    rememberAction("Opened default toast.", id);
  }

  function showVariantToast(variant: (typeof variants)[number]) {
    const id = runtimeToast[variant]({
      title: `${variant[0]?.toUpperCase()}${variant.slice(1)} toast`,
      text: "Runtime feedback stays intentionally small and clear.",
      closeButton: true,
    });

    rememberAction(`Opened ${variant} toast.`, id);
  }

  function showLoadingToast() {
    const id = runtimeToast.loading({
      title: "Sync in progress",
      text: "Updating the same toast after a short delay.",
      closeButton: true,
    });

    rememberAction("Opened loading toast.", id);

    if (!id) {
      return;
    }

    setTimeout(() => {
      runtimeToast.success({
        id,
        title: "Sync complete",
        text: "The loading toast was updated using the returned id.",
        closeButton: true,
      });

      rememberAction("Updated loading toast to success.", id);
    }, 1400);
  }

  function fakeRequest() {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve("Profile synced");
      }, 1600);
    });
  }

  function showPromiseToast() {
    const id = runtimeToast.promise(fakeRequest, {
      title: "Promise toast",
      text: "Tracking a fake async request.",
      loadingText: "Saving changes...",
      successText: (message: string) => `${message}.`,
      errorText: () => "Could not save changes.",
      finally: () => {
        latestAction = "Promise toast settled.";
      },
    });

    rememberAction("Started promise toast.", id);
  }

  function dismissLastToast() {
    if (!lastToastId) {
      return;
    }

    runtimeToast.dismiss(lastToastId);
    latestAction = `Dismissed toast ${lastToastId}.`;
    lastToastId = null;
  }

  function dismissAllToasts() {
    runtimeToast.dismiss();
    latestAction = "Dismissed all toasts.";
    lastToastId = null;
  }
</script>

<div class="space-y-4">
  <Card class="space-y-4">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h4 class="text-lg font-semibold tracking-tight">Toast playground</h4>
        <p class="text-sm text-content-muted">
          Try the small runtime API for messages, variants, loading updates, and
          promise feedback.
        </p>
      </div>
      <Badge color={lastToastId ? "info" : "neutral"} variant="solid">
        {lastToastId ?? "no active id"}
      </Badge>
    </div>

    <div class="grid gap-2 sm:grid-cols-2">
      <Button variant="outline" onclick={showDefaultToast}>
        Default toast
      </Button>
      <Button variant="outline" color="warning" onclick={showLoadingToast}>
        Loading toast update
      </Button>
      <Button variant="outline" color="info" onclick={showPromiseToast}>
        Promise toast
      </Button>
    </div>

    <div class="space-y-2">
      <p
        class="text-xs font-medium uppercase tracking-[0.14em] text-content-muted"
      >
        Variant helpers
      </p>
      <div class="grid gap-2 sm:grid-cols-2 desk:grid-cols-4">
        {#each variants as variant (variant)}
          <Button
            variant="ghost"
            color={variant}
            onclick={() => showVariantToast(variant)}
          >
            {variant}
          </Button>
        {/each}
      </div>
    </div>
  </Card>

  <Card color="muted" class="space-y-4">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h4
          class="text-sm font-semibold uppercase tracking-[0.14em] text-content-muted"
        >
          Live status
        </h4>
        <p class="text-sm text-content-muted">
          The latest action and returned toast id update here.
        </p>
      </div>
      <Badge color={lastToastId ? "success" : "neutral"} variant="soft">
        {lastToastId ? "id ready" : "nothing to dismiss"}
      </Badge>
    </div>

    <div class="rounded-md border border-base-400 bg-base-100 p-3 text-sm">
      <p class="font-medium text-content">{latestAction}</p>
      <p class="mt-1 font-mono text-xs text-content-muted">
        Last toast id: {lastToastId ?? "—"}
      </p>
    </div>

    <div class="grid gap-2 sm:grid-cols-2">
      <Button
        variant="outline"
        color="error"
        disabled={!lastToastId}
        onclick={dismissLastToast}
      >
        Dismiss last toast by id
      </Button>
      <Button variant="ghost" color="neutral" onclick={dismissAllToasts}>
        Dismiss all toasts
      </Button>
    </div>
  </Card>

  <Alert
    title="Provider requirement"
    description="Runtime toasts render through UiProvider. Keep it mounted at the app root so toast calls work from anywhere in the explorer."
    color="info"
    closable={false}
  />
</div>

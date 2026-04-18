<script lang="ts">
  import {
    CircleAlert,
    CircleCheck,
    CircleX,
    Info,
    LoaderCircle,
    X,
  } from "@lucide/svelte";
  import { Toaster } from "svelte-sonner";
  import { theme } from "../theme/index.js";
</script>

<!-- https://github.com/wobsoriano/svelte-sonner (MIT license) -->
<Toaster
  position="bottom-right"
  expand={true}
  theme={theme.resolved}
  richColors
  toastOptions={{
    classes: {
      toast: "sonner-toast group",
      success: "sonner-success",
      info: "sonner-info",
      warning: "sonner-warning",
      title: "sonner-title",
      description: "sonner-description",
      closeButton: "sonner-close-button",
      actionButton: "sonner-action-button",
      error: "sonner-error",
      icon: "sonner-icon",
    },
  }}
>
  {#snippet successIcon()}
    <CircleCheck class="size-5" />
  {/snippet}
  {#snippet errorIcon()}
    <CircleX class="size-5" />
  {/snippet}
  {#snippet warningIcon()}
    <CircleAlert class="size-5" />
  {/snippet}
  {#snippet infoIcon()}
    <Info class="size-5" />
  {/snippet}
  {#snippet loadingIcon()}
    <LoaderCircle class="size-5 animate-spin" />
  {/snippet}
  {#snippet closeIcon()}
    <X class="size-5" />
  {/snippet}
</Toaster>

<style lang="postcss">
  /* biome-ignore-all lint/complexity/noImportantStyles: svelte-sonner has its own styling and we need to override it */

  @reference "$lib/../app.css";

  :global {
    .sonner-toast {
      @apply font-sans! bg-base-100! text-content! border-2! border-base-400! rounded-md! shadow-lg! p-4! items-start!;
      --sonner-button-bg: var(--color-content);
      --sonner-button-fg: var(--color-base-100);
    }

    .sonner-success {
      @apply border-success! bg-success! text-white!;
      --sonner-button-bg: #ffffff;
      --sonner-button-fg: var(--color-success);
    }

    .sonner-info {
      @apply border-info! bg-info! text-white!;
      --sonner-button-bg: #ffffff;
      --sonner-button-fg: var(--color-info);
    }

    .sonner-warning {
      @apply border-warning! bg-warning! text-white!;
      --sonner-button-bg: #ffffff;
      --sonner-button-fg: var(--color-warning);
    }

    .sonner-error {
      @apply border-error! bg-error! text-white!;
      --sonner-button-bg: #ffffff;
      --sonner-button-fg: var(--color-error);
    }

    .sonner-title {
      @apply font-semibold! text-sm! text-current! leading-tight!;
    }

    .sonner-description {
      @apply text-current/90! text-sm! leading-snug!;
    }

    .sonner-close-button {
      @apply transition-colors! opacity-0! size-5! top-4! left-auto! right-0! border-0!;
      @apply group-hover:opacity-100!;
      @apply active:translate-y-px!;
      background-color: var(--sonner-button-bg) !important;
      color: var(--sonner-button-fg) !important;
    }

    .sonner-action-button {
      @apply rounded-md! p-2! text-xs! font-medium! border-0!;
      @apply active:translate-y-px!;
      background-color: var(--sonner-button-bg) !important;
      color: var(--sonner-button-fg) !important;
    }

    .sonner-icon {
      @apply text-current!;
    }

    /* This class is set by svelte-sonner itself */
    .sonner-loading-bar {
      @apply bg-content!;
    }
  }
</style>

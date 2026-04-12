<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";
  import Button from "../Button/Button.svelte";
  import Dialog from "../Dialog/Dialog.svelte";

  interface Props {
    /**
     * Additional CSS classes to apply to the confirm dialog content.
     */
    class?: ClassValue;
    /**
     * Controls the open state of the confirm dialog.
     */
    open?: boolean;
    /**
     * The title of the confirm dialog.
     */
    title?: string;
    /**
     * The description text of the confirm dialog.
     */
    description?: string;
    /**
     * The snippet for the trigger element.
     */
    trigger?: Snippet;
    /**
     * Additional content to render inside the confirm dialog.
     */
    children?: Snippet;
    /**
     * Text for the cancel button.
     * @default "Cancel"
     */
    cancelText?: string;
    /**
     * Text for the action button.
     * @default "Continue"
     */
    actionText?: string;
    /**
     * The semantic color of the action button.
     * @default "error"
     */
    actionColor?: "neutral" | "info" | "success" | "warning" | "error";
    /**
     * Called before the dialog closes on cancel.
     */
    onCancel?: () => void;
    /**
     * Called before the dialog closes on confirm.
     */
    onConfirm?: () => void;
  }

  let {
    class: className,
    open = $bindable(false),
    title,
    description,
    trigger,
    children,
    cancelText = "Cancel",
    actionText = "Continue",
    actionColor = "error",
    onCancel,
    onConfirm,
  }: Props = $props();

  function handleCancel() {
    onCancel?.();
    open = false;
  }

  function handleAction() {
    onConfirm?.();
    open = false;
  }
</script>

<Dialog
  {title}
  {description}
  {trigger}
  bind:open
  class={className}
  size="sm"
  dismissible={false}
>
  {@render children?.()}

  {#snippet footer()}
    <div class="flex justify-end gap-3">
      <Button variant="outline" onclick={handleCancel}>{cancelText}</Button>
      <Button color={actionColor} onclick={handleAction}>{actionText}</Button>
    </div>
  {/snippet}
</Dialog>

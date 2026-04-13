<script lang="ts" module>
  export interface ConfirmProps {
    /**
     * The title of the confirm dialog.
     */
    title?: string;

    /**
     * The text of the confirm dialog.
     */
    text?: string;

    /**
     * The semantic color of the confirm dialog.
     * @default "warning"
     */
    color?: "neutral" | "info" | "success" | "warning" | "error";

    /**
     * The size of the confirm dialog.
     * @default "sm"
     */
    size?: "sm" | "md" | "lg";

    /**
     * Hides the icon in the confirm dialog.
     * @default false
     */
    hideIcon?: boolean;

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
     * Called before the dialog closes on cancel.
     */
    onCancel?: () => void;

    /**
     * Called before the dialog closes on confirm.
     */
    onConfirm?: () => void;
  }
</script>

<script lang="ts">
  import { CircleAlert, CircleCheck, CircleX, Info } from "@lucide/svelte";
  import Button from "$lib/components/Button/Button.svelte";
  import Dialog from "$lib/components/Dialog/Dialog.svelte";
  import Heading from "$lib/components/Heading/Heading.svelte";
  import { cn } from "$lib/helpers/cn.js";

  let {
    title,
    text,
    color = "warning",
    size = "sm",
    hideIcon = false,
    cancelText = "Cancel",
    actionText = "Continue",
    onCancel = () => {},
    onConfirm = () => {},
  }: ConfirmProps = $props();

  let Icon = $derived.by(() => {
    switch (color) {
      case "neutral":
        return Info;
      case "info":
        return Info;
      case "success":
        return CircleCheck;
      case "warning":
        return CircleAlert;
      case "error":
        return CircleX;
      default:
        return Info;
    }
  });
</script>

<Dialog {size} dismissible={false} open={true}>
  <div class="flex flex-col items-center gap-4 text-center">
    {#if !hideIcon}
      <Icon
        class={cn("size-16 desk:size-20 flex-none", {
          "text-neutral": color === "neutral",
          "text-info": color === "info",
          "text-success": color === "success",
          "text-warning": color === "warning",
          "text-error": color === "error",
        })}
      />
    {/if}
    <div class="flex flex-col items-center gap-2 text-center">
      {#if title}
        <Heading level={2} size="lg" class="leading-tight">{title}</Heading>
      {/if}
      {#if text}
        <p
          class="max-w-[40ch] text-balance text-md leading-relaxed text-content-muted"
        >
          {text}
        </p>
      {/if}
    </div>
  </div>

  {#snippet footer()}
    <div class="flex w-full justify-center gap-4 sm:justify-end">
      <Button autofocus variant="outline" onclick={onCancel} class="min-w-24">
        {cancelText}
      </Button>
      <Button {color} onclick={onConfirm} class="min-w-24">{actionText}</Button>
    </div>
  {/snippet}
</Dialog>

<script lang="ts">
  import { Download } from "@lucide/svelte";
  import type { ClassValue, HTMLAttributes } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";
  import { toast } from "../../runtime/toast/index.js";
  import { Button } from "../Button/index.js";
  import { Copy } from "../Copy/index.js";
  import { Tooltip } from "../Tooltip/index.js";

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class"> {
    /**
     * The raw source code string for copying and downloading.
     */
    rawCode: string;

    /**
     * The pre-highlighted HTML string (e.g., from Shiki, Prism).
     * If not provided, rawCode will be rendered as plain text.
     */
    highlightedHtml?: string;

    /**
     * Optional title or language to display in the header.
     * @default "Code"
     */
    title?: string;

    /**
     * Optional filename for the download action.
     */
    fileName?: string;

    /**
     * Whether to show a border around the block.
     * @default true
     */
    bordered?: boolean;

    /**
     * Whether to allow horizontal scrolling for long lines.
     * @default true
     */
    scrollX?: boolean;

    /**
     * Whether to allow vertical scrolling for tall blocks.
     * @default true
     */
    scrollY?: boolean;

    /**
     * Whether to show the copy button.
     * @default true
     */
    showCopy?: boolean;

    /**
     * Whether to show the download button.
     * @default true
     */
    showDownload?: boolean;

    /**
     * Whether to show the line count (LOC) in the header.
     * Uses `rawCode.trim()` before counting lines.
     * @default true
     */
    showLoc?: boolean;

    /**
     * Additional CSS classes for the outer wrapper.
     */
    wrapperClass?: ClassValue;

    /**
     * Additional CSS classes for the header wrapper.
     */
    headerWrapperClass?: ClassValue;

    /**
     * Additional CSS classes for the code wrapper.
     */
    codeWrapperClass?: ClassValue;
  }

  let {
    rawCode,
    highlightedHtml,
    title = "Code",
    fileName,
    bordered = true,
    scrollX = true,
    scrollY = true,
    showCopy = true,
    showDownload = true,
    showLoc = true,
    wrapperClass,
    headerWrapperClass,
    codeWrapperClass,
    ...restProps
  }: Props = $props();

  const hasHighlightedHtml = $derived(Boolean(highlightedHtml?.trim()));
  const trimmedRawCode = $derived(rawCode.trim());
  const loc = $derived(trimmedRawCode.split(/\r?\n/g).length);

  function handleDownload() {
    try {
      const blob = new Blob([rawCode], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");

      const name = fileName || `code.txt`;

      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("Code downloaded");
    } catch (error) {
      console.error("Failed to download code: ", error);
      toast.error("Failed to download code");
    }
  }
</script>

<div
  class={cn(
    "vdl-code-block-wrapper flex flex-col overflow-hidden rounded-lg",
    {
      "border-base-400 border": bordered,
    },
    wrapperClass,
  )}
  {...restProps}
>
  <div
    class={cn(
      "vdl-code-block-header-wrapper bg-base-200 flex items-center justify-between px-4 py-2 rounded-t-lg",
      {
        "border-base-400 border-b": bordered,
      },
      headerWrapperClass,
    )}
  >
    <div
      class="text-content-muted text-xs font-medium uppercase tracking-wider h-7 flex items-center gap-2"
    >
      <span>
        {title}
        {#if showLoc}
          -{loc} LOC
        {/if}
      </span>
    </div>

    <div class="flex items-center gap-1">
      {#if showDownload}
        <Tooltip content="Download code" delay={0} side="top">
          <Button
            variant="ghost"
            size="sm"
            class="size-7"
            onclick={handleDownload}
            aria-label="Download code"
            icon={Download}
          />
        </Tooltip>
      {/if}

      {#if showCopy}
        <Copy
          text={rawCode}
          size="sm"
          class="size-7"
          label="Copy code"
          copiedLabel="Copied code"
        />
      {/if}
    </div>
  </div>

  <div
    class={cn(
      "vdl-code-block-code-wrapper flex min-h-0 flex-1 flex-col rounded-b-lg font-mono text-sm",
      codeWrapperClass,
    )}
  >
    <div
      class={cn("min-h-0 flex-1 rounded-b-lg [&>*]:p-4", {
        "overflow-x-auto": scrollX,
        "overflow-y-auto": scrollY,
      })}
    >
      {#if hasHighlightedHtml}
        {@html highlightedHtml}
      {:else}
        <pre class="bg-base-100 text-content"><code>{rawCode}</code></pre>
      {/if}
    </div>
  </div>
</div>

<style lang="postcss">
  .vdl-code-block-code-wrapper :global(pre) {
    margin: 0;
    width: max-content;
    min-width: 100%;
    box-sizing: border-box;
    background: transparent;
  }

  .vdl-code-block-code-wrapper :global(code) {
    font-size: 0.875rem;
    line-height: 1.5;
  }

  .vdl-code-block-code-wrapper :global(pre:focus-visible) {
    outline: 2px solid var(--color-primary, currentColor);
    outline-offset: -2px;
  }
</style>

<script lang="ts">
  import { Download } from "@lucide/svelte";
  import type { ClassValue, HTMLAttributes } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";
  import { toast } from "../../runtime/toast/index.js";
  import { Button } from "../Button/index.js";
  import { Copy } from "../Copy/index.js";

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
     * Additional CSS classes to apply to the container.
     */
    class?: ClassValue;
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
    class: className,
    ...restProps
  }: Props = $props();

  const hasHighlightedHtml = $derived(Boolean(highlightedHtml?.trim()));
  const plainLines = $derived(rawCode.split(/\r?\n/g));

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
    "bg-base-200 flex flex-col overflow-hidden rounded-lg",
    className,
  )}
  {...restProps}
>
  <div
    class={cn(
      "flex items-center justify-between px-4 py-2 rounded-t-lg",
      {
        "border-base-300 border": bordered,
      },
    )}
  >
    <div
      class="text-content-muted text-xs font-medium uppercase tracking-wider"
    >
      {title}
    </div>

    <div class="flex items-center gap-1">
      {#if showDownload}
        <Button
          variant="ghost"
          size="sm"
          class="size-7"
          onclick={handleDownload}
          title="Download code"
          aria-label="Download code"
          icon={Download}
        />
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
      "code-container flex-1 p-4 text-sm rounded-b-lg",
      {
        "bg-neutral-950 text-neutral-50": hasHighlightedHtml,
        "bg-base-100 text-content": !hasHighlightedHtml,
        "overflow-x-auto": scrollX,
        "overflow-y-auto": scrollY,
        "plain-code": !hasHighlightedHtml,
        "border-base-300 border-x border-b": bordered && !hasHighlightedHtml,
      },
    )}
  >
    {#if hasHighlightedHtml}
      {@html highlightedHtml}
    {:else}
      <!-- biome-ignore format: pre tag should not be formatted -->
      <pre><code>{#each plainLines as line, index (index)}<span class="line">{line || "\u00A0"}</span>{/each}</code></pre>
    {/if}
  </div>
</div>

<style lang="postcss">
  /* biome-ignore-all lint/complexity/noImportantStyles: need important for code-container */

  /* Base styles for the injected HTML */
  .code-container :global(pre) {
    margin: 0;
    background: transparent !important;
  }

  .code-container :global(code) {
    font-family:
      ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
      "Courier New", monospace;
    font-size: 0.875rem;
    line-height: 1.5;
  }

  .code-container :global(pre:focus-visible) {
    outline: 2px solid var(--color-primary, currentColor);
    outline-offset: -2px;
  }

  .plain-code :global(code) {
    counter-reset: step;
    counter-increment: step 0;
  }

  .plain-code :global(code .line::before) {
    content: counter(step);
    counter-increment: step;
    width: 1rem;
    margin-right: 1.5rem;
    display: inline-block;
    text-align: right;
    color: var(--color-content-muted);
  }

  .plain-code :global(code .line) {
    display: block;
    min-height: 1.5em;
  }
</style>

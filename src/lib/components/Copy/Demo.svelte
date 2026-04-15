<script lang="ts">
  import { Copy, Input } from "$lib/components/index.js";

  const apiKey = "vrvl_live_8N9S2Q1Z7X4K5M3P";
  const transactionId = "txn_01JSQ3M6WQ5A2Z0T9H8Y7F6E5D";
</script>

<div class="space-y-4">
  <section class="grid gap-4 desk:grid-cols-2">
    <article class="rounded-lg border border-base-400 bg-base-100 p-4">
      <div class="space-y-3">
        <div>
          <h4 class="text-sm font-medium text-content">Inline with fields</h4>
          <p class="text-xs leading-5 text-content-muted">
            The default shape is a small icon-only accessory designed for
            inputs, tokens, and other dense interface surfaces.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <Input value={apiKey} readonly />
          <Copy text={apiKey} size="md" />
        </div>
      </div>
    </article>

    <article class="rounded-lg border border-base-400 bg-base-100 p-4">
      <div class="space-y-3">
        <div>
          <h4 class="text-sm font-medium text-content">Dense metadata rows</h4>
          <p class="text-xs leading-5 text-content-muted">
            Keep the content readable and place copy affordances right where the
            user needs them.
          </p>
        </div>

        <div class="rounded-md border border-base-400 bg-base-200/40 p-3">
          <div class="flex items-center justify-between gap-3">
            <div class="min-w-0 space-y-1">
              <p
                class="text-[11px] font-medium uppercase tracking-[0.14em] text-content-muted"
              >
                Transaction id
              </p>
              <code class="block truncate font-mono text-xs text-content">
                {transactionId}
              </code>
            </div>

            <Copy text={transactionId} />
          </div>
        </div>
      </div>
    </article>
  </section>
</div>

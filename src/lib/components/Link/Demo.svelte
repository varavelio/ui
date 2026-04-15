<script lang="ts">
  import {
    ArrowUpRight,
    Download,
    FileText,
    LockKeyhole,
    ShieldCheck,
  } from "@lucide/svelte";
  import { Card, Label, Link } from "$lib/components/index.js";

  const docsUrl = "https://svelte.dev/docs/svelte/overview";
  const releaseUrl = "https://example.com/changelog/latest";
</script>

<div class="grid grid-cols-1 gap-4 desk:grid-cols-2">
  <Card class="space-y-3">
    <Label>Default Behavior</Label>

    <div class="space-y-2 text-sm text-content-muted">
      <p>
        Internal destinations keep regular navigation behavior:
        <Link href="/components/button" class="ml-1 text-content">
          Button component
        </Link>
      </p>
      <p>
        Absolute HTTP(S) destinations are treated as external and open in a new
        tab:
        <Link
          href={docsUrl}
          class="ml-1 inline-flex items-center gap-1 text-content"
        >
          Svelte documentation
          <ArrowUpRight class="size-3.5" />
        </Link>
      </p>
    </div>
  </Card>

  <Card class="space-y-3">
    <Label>External Override</Label>

    <div class="space-y-3 text-sm text-content-muted">
      <p>
        Force external behavior on a relative path:
        <Link href="/security/audit" external class="ml-1 text-content">
          Open audit report in new tab
        </Link>
      </p>

      <p>
        Disable external behavior for an absolute URL:
        <Link href={releaseUrl} external={false} class="ml-1 text-content">
          Stay in current tab
        </Link>
      </p>
    </div>
  </Card>

  <Card class="space-y-3">
    <Label>Target and Rel Safety</Label>

    <div class="space-y-3 text-sm text-content-muted">
      <p>
        When <code class="rounded-sm bg-base-200 px-1.5 py-0.5 text-xs">
          target="_blank"
        </code>
        is used, secure rel tokens are automatically enforced:
      </p>

      <Link
        href="https://owasp.org/www-community/attacks/Reverse_Tabnabbing"
        target="_blank"
        rel="author"
        class="inline-flex items-center gap-1 text-content"
      >
        Reverse tabnabbing reference
        <ShieldCheck class="size-3.5" />
      </Link>
    </div>
  </Card>

  <Card class="space-y-3">
    <Label>Disabled State</Label>

    <div class="space-y-3 text-sm text-content-muted">
      <p>
        Disabled links remove navigation, become non-focusable, and expose
        <code class="rounded-sm bg-base-200 px-1.5 py-0.5 text-xs">
          aria-disabled
        </code>
        :
      </p>

      <Link href="https://example.com/billing/export" disabled>
        <span class="inline-flex items-center gap-1">
          <LockKeyhole class="size-3.5" />
          Billing export unavailable
        </span>
      </Link>
    </div>
  </Card>

  <Card class="space-y-3 desk:col-span-2">
    <Label>Composition and Custom Class</Label>

    <div class="grid grid-cols-1 gap-4 desk:grid-cols-2">
      <div class="space-y-2 rounded-md border border-base-400 bg-base-200 p-4">
        <p class="text-sm text-content-muted">
          Link inherits <code
            class="rounded-sm bg-base-100 px-1.5 py-0.5 text-xs"
          >
            text-current
          </code>
          , so it adapts to parent color contexts.
        </p>

        <p class="text-sm text-content">
          Read the latest design notes in
          <Link
            href="/components/prose"
            class="font-semibold decoration-content"
          >
            the Prose documentation
          </Link>
          to understand rich text defaults.
        </p>
      </div>

      <div class="space-y-3 rounded-md border border-base-400 bg-base-200 p-4">
        <p class="text-sm text-content-muted">
          Examples with common anchor attributes:
        </p>

        <div class="flex flex-wrap items-center gap-4 text-sm text-content">
          <Link href="/assets/ui-spec.pdf" download="ui-spec-v1.pdf">
            <span class="inline-flex items-center gap-1">
              <Download class="size-3.5" />
              Download spec
            </span>
          </Link>

          <Link href="mailto:design@varavel.io">
            <span class="inline-flex items-center gap-1">
              <FileText class="size-3.5" />
              Contact design
            </span>
          </Link>
        </div>
      </div>
    </div>
  </Card>
</div>

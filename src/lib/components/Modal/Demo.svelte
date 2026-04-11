<script lang="ts">
  import { Button, Input, Label, Modal } from "$lib/components/index.js";

  let nonDismissable = $state(false);
  let controlledOpen = $state(false);
</script>

<div class="space-y-12">
  <div class="space-y-4">
    <h2 class="text-lg font-semibold tracking-tight">Full Example</h2>
    <p class="text-sm text-content-muted">
      A complete modal with title, description, body content, and a custom
      footer. The trigger is an unstyled snippet — wrap it in any element.
    </p>

    <Modal
      description="Create and manage scoped credentials for your services."
      title="New API Key"
    >
      {#snippet trigger()}
        <Button color="info">Create API key</Button>
      {/snippet}

      <div class="space-y-4">
        <div class="space-y-2">
          <Label for="m-name">Name</Label>
          <Input id="m-name" placeholder="Production deploy token" />
        </div>
        <div class="space-y-2">
          <Label for="m-scope">Scope</Label>
          <Input id="m-scope" placeholder="deploy:write" />
        </div>
      </div>

      {#snippet footer()}
        <div class="flex justify-end gap-3">
          <Button variant="ghost">Cancel</Button>
          <Button color="info">Save</Button>
        </div>
      {/snippet}
    </Modal>
  </div>

  <div class="space-y-4">
    <h2 class="text-lg font-semibold tracking-tight">Sizes</h2>
    <p class="text-sm text-content-muted">
      Three width presets:
      <code class="rounded border bg-base-200 px-1.5 py-0.5 text-xs">sm</code>,
      <code class="rounded border bg-base-200 px-1.5 py-0.5 text-xs">md</code>
      (default), and
      <code class="rounded border bg-base-200 px-1.5 py-0.5 text-xs">lg</code>.
    </p>

    <div class="flex flex-wrap items-center gap-3">
      <Modal size="sm" title="Small Modal">
        {#snippet trigger()}
          <Button variant="outline" size="sm">sm</Button>
        {/snippet}
        <p class="text-sm text-content-muted">
          Compact — good for simple prompts.
        </p>
      </Modal>

      <Modal size="md" title="Medium Modal">
        {#snippet trigger()}
          <Button variant="outline" size="sm">md</Button>
        {/snippet}
        <p class="text-sm text-content-muted">Default — fits most content.</p>
      </Modal>

      <Modal size="lg" title="Large Modal">
        {#snippet trigger()}
          <Button variant="outline" size="sm">lg</Button>
        {/snippet}
        <p class="text-sm text-content-muted">
          Spacious — for tables or long forms.
        </p>
      </Modal>
    </div>
  </div>

  <div class="space-y-4">
    <h2 class="text-lg font-semibold tracking-tight">Padded</h2>
    <p class="text-sm text-content-muted">
      When
      <code class="rounded border bg-base-200 px-1.5 py-0.5 text-xs">
        padded={false}
      </code>
      the default padding is removed — useful for full-bleed content like images
      or custom layouts.
    </p>

    <div class="flex flex-wrap items-center gap-3">
      <Modal description="Standard padding applied." title="Padded (default)">
        {#snippet trigger()}
          <Button variant="outline" size="sm">Padded</Button>
        {/snippet}
      </Modal>

      <Modal
        description="No padding — you control all spacing."
        padded={false}
        title="Unpadded"
      >
        {#snippet trigger()}
          <Button variant="outline" size="sm">Unpadded</Button>
        {/snippet}
        <p class="text-sm text-content-muted">
          Content sits flush against the edges. Add your own padding inside.
        </p>
      </Modal>
    </div>
  </div>

  <div class="space-y-4">
    <h2 class="text-lg font-semibold tracking-tight">Dismissible</h2>
    <p class="text-sm text-content-muted">
      When
      <code class="rounded border bg-base-200 px-1.5 py-0.5 text-xs">
        dismissible={false}
      </code>
      the X button, Escape key, and outside click are all disabled — users must
      use an explicit action to close.
    </p>

    <div class="flex flex-wrap items-center gap-3">
      <Modal
        description="Close with X, Escape, or outside click."
        title="Dismissible"
      >
        {#snippet trigger()}
          <Button variant="outline" size="sm">Dismissible</Button>
        {/snippet}
      </Modal>

      <Modal
        description="No close button. Escape and outside click are disabled."
        dismissible={false}
        bind:open={nonDismissable}
        title="Non-dismissible"
      >
        {#snippet trigger()}
          <Button variant="outline" size="sm">Non-dismissible</Button>
        {/snippet}
        {#snippet footer()}
          <div class="flex justify-end">
            <Button color="info" onclick={() => (nonDismissable = false)}>
              Understood
            </Button>
          </div>
        {/snippet}
      </Modal>
    </div>
  </div>

  <div class="space-y-4">
    <h2 class="text-lg font-semibold tracking-tight">Content Variations</h2>
    <p class="text-sm text-content-muted">
      Title and description are both optional. Use what you need.
    </p>

    <div class="flex flex-wrap items-center gap-3">
      <Modal title="Just a title">
        {#snippet trigger()}
          <Button variant="outline" size="sm">Title only</Button>
        {/snippet}
      </Modal>

      <Modal>
        {#snippet trigger()}
          <Button variant="outline" size="sm">Bare</Button>
        {/snippet}
        <p class="text-sm text-content-muted">
          No header at all — only children content.
        </p>
      </Modal>
    </div>
  </div>

  <div class="space-y-4">
    <h2 class="text-lg font-semibold tracking-tight">Controlled State</h2>
    <p class="text-sm text-content-muted">
      Bind
      <code class="rounded border bg-base-200 px-1.5 py-0.5 text-xs">open</code>
      to control the modal programmatically, with or without a trigger.
    </p>

    <div class="flex items-center gap-4">
      <Button onclick={() => (controlledOpen = true)}>
        Open Programmatically
      </Button>
      <span class="text-sm text-content-muted font-mono">
        open = {controlledOpen ? "true" : "false"}
      </span>
    </div>

    <Modal
      bind:open={controlledOpen}
      description="This modal is driven by an external state variable."
      title="Controlled Modal"
    >
      <div class="flex justify-end gap-3 pt-1">
        <Button variant="ghost" onclick={() => (controlledOpen = false)}>
          Cancel
        </Button>
        <Button color="info" onclick={() => (controlledOpen = false)}>
          Confirm
        </Button>
      </div>
    </Modal>
  </div>

  <div class="space-y-4">
    <h2 class="text-lg font-semibold tracking-tight">Overflow</h2>
    <p class="text-sm text-content-muted">
      Testing modal behavior when content exceeds the viewport or modal size.
    </p>

    <Modal
      title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      size="sm"
    >
      {#snippet trigger()}
        <Button variant="outline" size="sm">Open Overflow Demo</Button>
      {/snippet}

      <div class="flex h-dvh w-dvw items-center justify-center bg-base-200">
        <p class="font-medium text-content-muted">
          Large Content (100dvw x 100dvh)
        </p>
      </div>

      {#snippet footer()}
        <div class="flex justify-end gap-3">
          <Button variant="ghost">Cancel</Button>
          <Button color="info">Save</Button>
        </div>
      {/snippet}
    </Modal>
  </div>
</div>

<script lang="ts">
  import {
    Button,
    Dialog,
    Input,
    Label,
    Textarea,
  } from "$lib/components/index.js";
  import { Table } from "../Table/index.ts";
  import Sheet from "./Sheet.svelte";

  let restrictedOpen = $state(false);
  let selectedInvoice = $state("INV-2048");

  const activity = [
    { id: "INV-2048", customer: "Northwind", total: "$12,480", status: "Paid" },
    {
      id: "INV-2049",
      customer: "Acme Inc.",
      total: "$4,320",
      status: "Pending",
    },
    { id: "INV-2050", customer: "Orbital", total: "$9,110", status: "Review" },
  ];
</script>

<div class="space-y-12">
  <div class="space-y-4">
    <h2 class="text-lg font-semibold tracking-tight">Default</h2>
    <p class="text-sm text-content-muted">
      The default sheet now anchors to the left, with a scrollable body and
      fixed actions.
    </p>

    <Sheet
      description="Review the request before sharing access with the team."
      title="Invite collaborator"
    >
      {#snippet trigger()}
        <Button color="info">Open sheet</Button>
      {/snippet}

      <div class="space-y-4">
        <div class="space-y-2">
          <Label for="invite-name">Name</Label>
          <Input id="invite-name" placeholder="Alex Morgan" />
        </div>

        <div class="space-y-2">
          <Label for="invite-email">Email</Label>
          <Input
            id="invite-email"
            placeholder="alex@company.com"
            type="email"
          />
        </div>

        <div class="space-y-2">
          <Label for="invite-note">Note</Label>
          <Textarea
            id="invite-note"
            placeholder="Add context for the handoff or the reason for access."
            rows={5}
          />
        </div>
      </div>

      {#snippet footer()}
        <div class="flex justify-end gap-3">
          <Button variant="ghost">Cancel</Button>
          <Button color="info">Send invite</Button>
        </div>
      {/snippet}
    </Sheet>
  </div>

  <div class="space-y-4">
    <h2 class="text-lg font-semibold tracking-tight">Sides and Sizes</h2>
    <p class="text-sm text-content-muted">
      Side sheets use responsive widths, while bottom sheets use responsive
      heights.
    </p>

    <div class="flex flex-wrap gap-3">
      <Sheet size="sm" title="Filters">
        {#snippet trigger()}
          <Button size="sm" variant="outline">Left / sm</Button>
        {/snippet}

        <div class="space-y-3 text-sm text-content-muted">
          <p>Refine a report without leaving the current page context.</p>
          <p>Use compact sheets for short workflows or secondary navigation.</p>
        </div>
      </Sheet>

      <Sheet side="right" size="lg" title="Invoice details">
        {#snippet trigger()}
          <Button size="sm" variant="outline">Right / lg</Button>
        {/snippet}

        <Table.Root size="sm">
          <Table.Body>
            {#each activity as item (item.id)}
              <Table.Row>
                <Table.Cell class="font-medium">{item.id}</Table.Cell>
                <Table.Cell>{item.customer}</Table.Cell>
                <Table.Cell numeric>{item.total}</Table.Cell>
                <Table.Cell align="right">{item.status}</Table.Cell>
              </Table.Row>
            {/each}
          </Table.Body>
        </Table.Root>
      </Sheet>

      <Sheet
        description="Use a bottom sheet when the workflow benefits from a broad surface and shorter travel distance."
        side="bottom"
        size="md"
        title="Quick actions"
      >
        {#snippet trigger()}
          <Button size="sm" variant="outline">Bottom / md</Button>
        {/snippet}

        <div class="grid gap-3 desk:grid-cols-2">
          <Button class="justify-start" variant="outline">
            Create project
          </Button>
          <Button class="justify-start" variant="outline">Invite team</Button>
          <Button class="justify-start" variant="outline">Export report</Button>
          <Button class="justify-start" variant="outline">
            View audit log
          </Button>
        </div>
      </Sheet>
    </div>
  </div>

  <div class="space-y-4">
    <h2 class="text-lg font-semibold tracking-tight">Long Form</h2>
    <p class="text-sm text-content-muted">
      The header and footer stay usable while the body scrolls independently.
    </p>

    <Sheet
      description="A realistic long form should keep actions visible throughout the flow."
      size="lg"
      title="Vendor onboarding"
    >
      {#snippet trigger()}
        <Button size="sm" variant="outline">Open long form</Button>
      {/snippet}

      <div class="space-y-5">
        {#each Array.from({ length: 8 }, (_, index) => index + 1) as step (step)}
          <div class="space-y-2">
            <Label for={`field-${step}`}>Field {step}</Label>
            <Input id={`field-${step}`} placeholder={`Enter value ${step}`} />
          </div>
        {/each}

        <div class="space-y-2">
          <Label for="vendor-notes">Implementation notes</Label>
          <Textarea id="vendor-notes" rows={8} />
        </div>
      </div>

      {#snippet footer()}
        <div class="flex justify-end gap-3">
          <Button variant="ghost">Save draft</Button>
          <Button color="info">Continue</Button>
        </div>
      {/snippet}
    </Sheet>
  </div>

  <div class="space-y-4">
    <h2 class="text-lg font-semibold tracking-tight">Nested Layers</h2>
    <p class="text-sm text-content-muted">
      Sheets and dialogs can open each other without breaking focus management
      or backdrop stacking.
    </p>

    <div class="flex flex-wrap gap-3">
      <Sheet
        description="Launch nested overlays from inside this sheet."
        title="Parent sheet"
      >
        {#snippet trigger()}
          <Button size="sm" variant="outline">Sheet parent</Button>
        {/snippet}

        <div class="space-y-3">
          <Dialog
            description="This dialog is opened from a sheet body."
            size="sm"
            title="Dialog from sheet"
          >
            {#snippet trigger()}
              <Button size="sm" variant="outline">Open dialog</Button>
            {/snippet}

            <p class="text-sm text-content-muted">
              Use this flow for confirmations or short approvals inside a
              broader side workflow.
            </p>
          </Dialog>

          <Sheet
            description="Nested sheets keep the same API and close behavior."
            side="right"
            size="sm"
            title="Sheet from sheet"
          >
            {#snippet trigger()}
              <Button size="sm" variant="outline">Open nested sheet</Button>
            {/snippet}

            <p class="text-sm text-content-muted">
              The child sheet renders above the parent layer and can close
              independently.
            </p>
          </Sheet>
        </div>
      </Sheet>

      <Dialog
        description="Use nested actions without leaving the current dialog context."
        title="Parent dialog"
      >
        {#snippet trigger()}
          <Button size="sm" variant="outline">Dialog parent</Button>
        {/snippet}

        <div class="space-y-3">
          <Dialog
            description="A nested confirmation dialog opened from another dialog."
            size="sm"
            title="Dialog from dialog"
          >
            {#snippet trigger()}
              <Button size="sm" variant="outline">Open nested dialog</Button>
            {/snippet}

            <p class="text-sm text-content-muted">
              This pattern is useful when a secondary confirmation needs extra
              context.
            </p>
          </Dialog>

          <Sheet
            description="A sheet can also be launched from dialog content."
            side="right"
            size="sm"
            title="Sheet from dialog"
          >
            {#snippet trigger()}
              <Button color="info" size="sm">Open sheet</Button>
            {/snippet}

            <p class="text-sm text-content-muted">
              The sheet receives its own focus trap and closes without affecting
              the parent dialog.
            </p>
          </Sheet>
        </div>
      </Dialog>
    </div>
  </div>

  <div class="space-y-4">
    <h2 class="text-lg font-semibold tracking-tight">Close Behavior</h2>
    <p class="text-sm text-content-muted">
      Set <code class="font-mono text-xs text-content">
        dismissible=&#123;false&#125;
      </code>
      to require explicit actions before closing.
    </p>

    <div class="flex items-center gap-3">
      <Button onclick={() => (restrictedOpen = true)}>Review invoice</Button>
      <span class="font-mono text-sm text-content-muted">
        selected = {selectedInvoice}
      </span>
    </div>

    <Sheet
      bind:open={restrictedOpen}
      description="Complete the review or acknowledge the issue before leaving this panel."
      dismissible={false}
      title="Approval required"
    >
      <div class="space-y-3 text-sm text-content-muted">
        <p>
          Invoice <span class="font-mono text-content">{selectedInvoice}</span>
          is waiting for a final approval note.
        </p>
        <p>
          Dismiss behavior is disabled, so Escape, outside interaction, and the
          close button are all unavailable until an explicit footer action runs.
        </p>
      </div>

      {#snippet footer()}
        <div class="flex justify-end gap-3">
          <Button
            variant="ghost"
            onclick={() => (selectedInvoice = "INV-2050")}
          >
            Escalate
          </Button>
          <Button color="info" onclick={() => (restrictedOpen = false)}>
            Approve
          </Button>
        </div>
      {/snippet}
    </Sheet>
  </div>
</div>

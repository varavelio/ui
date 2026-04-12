<script lang="ts">
  import { Alert, Badge, Button, Confirm } from "$lib/components/index.js";
</script>

<div class="space-y-12">
  <div class="space-y-4">
    <h2 class="text-lg font-semibold tracking-tight">Full Example</h2>
    <p class="text-sm text-content-muted">
      A confirm dialog with title, description, built-in Cancel / Action
      buttons, and callbacks. The trigger is an unstyled snippet.
    </p>

    <Confirm
      actionText="Delete"
      description="This permanently removes the project, environments and audit history."
      title="Are you absolutely sure?"
      onCancel={() => console.log("Cancelled")}
      onConfirm={() => console.log("Confirmed")}
    >
      {#snippet trigger()}
        <Button color="error">Delete project</Button>
      {/snippet}
    </Confirm>
  </div>

  <div class="space-y-4">
    <h2 class="text-lg font-semibold tracking-tight">Action Colors</h2>
    <p class="text-sm text-content-muted">
      Five semantic tones to match the intent of the action.
    </p>

    <div class="flex flex-wrap items-center gap-3">
      <Confirm
        actionColor="neutral"
        actionText="Continue"
        description="Proceed with the default action."
        title="Neutral action?"
      >
        {#snippet trigger()}
          <Button variant="outline" size="sm">Neutral</Button>
        {/snippet}
      </Confirm>

      <Confirm
        actionColor="info"
        actionText="Publish"
        description="Changes will be visible to all users."
        title="Publish changes?"
      >
        {#snippet trigger()}
          <Button color="info" variant="outline" size="sm">Info</Button>
        {/snippet}
      </Confirm>

      <Confirm
        actionColor="success"
        actionText="Approve"
        description="Mark this request as approved."
        title="Approve request?"
      >
        {#snippet trigger()}
          <Button color="success" variant="outline" size="sm">Success</Button>
        {/snippet}
      </Confirm>

      <Confirm
        actionColor="warning"
        actionText="Override"
        description="Override the current configuration."
        title="Override settings?"
      >
        {#snippet trigger()}
          <Button color="warning" variant="outline" size="sm">Warning</Button>
        {/snippet}
      </Confirm>

      <Confirm
        actionColor="error"
        actionText="Delete"
        description="This action cannot be undone."
        title="Delete account?"
      >
        {#snippet trigger()}
          <Button color="error" variant="outline" size="sm">Error</Button>
        {/snippet}
      </Confirm>
    </div>
  </div>

  <div class="space-y-4">
    <h2 class="text-lg font-semibold tracking-tight">Custom Button Labels</h2>
    <p class="text-sm text-content-muted">
      Override
      <code class="rounded border bg-base-200 px-1.5 py-0.5 text-xs">
        cancelText
      </code>
      and
      <code class="rounded border bg-base-200 px-1.5 py-0.5 text-xs">
        actionText
      </code>
      to match your context.
    </p>

    <div class="flex flex-wrap items-center gap-3">
      <Confirm
        actionColor="error"
        actionText="Yes, remove"
        cancelText="Go back"
        description="All team members will lose access immediately."
        title="Remove team?"
      >
        {#snippet trigger()}
          <Button variant="outline" size="sm">Custom labels</Button>
        {/snippet}
      </Confirm>

      <Confirm
        actionColor="info"
        actionText="Accept"
        cancelText="Decline"
        description="You can change this preference later."
        title="Accept invitation?"
      >
        {#snippet trigger()}
          <Button variant="outline" size="sm">Accept / Decline</Button>
        {/snippet}
      </Confirm>
    </div>
  </div>

  <div class="space-y-4">
    <h2 class="text-lg font-semibold tracking-tight">With Extra Content</h2>
    <p class="text-sm text-content-muted">
      Pass children to add custom content between the description and the action
      buttons.
    </p>

    <Confirm
      actionColor="error"
      actionText="Discard"
      cancelText="Keep editing"
      description="Your unsaved changes will be lost."
      title="Discard draft?"
    >
      {#snippet trigger()}
        <Button color="error" variant="outline" size="sm">Discard draft</Button>
      {/snippet}

      <Alert
        closable={false}
        color="warning"
        title="Warning"
        description="3 unsaved sections will be lost."
      />
    </Confirm>
  </div>
</div>

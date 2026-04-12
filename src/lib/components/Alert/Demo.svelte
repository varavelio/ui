<script lang="ts">
  import { Alert } from "$lib/components/index.js";

  function handleClose() {
    alert("This alert has been closed via the onClose callback!");
  }
</script>

<div class="space-y-4">
  <Alert
    title="Dismissible Notice"
    description="This alert can be closed by clicking the X icon. Try it out!"
    color="info"
    onClose={handleClose}
  />
  <Alert
    title="Non-Closable Notice"
    description="This alert cannot be closed because closable is set to false."
    closable={false}
  />
  <Alert
    title="Neutral Notice"
    description="Every component demo is discoverable from the explorer and documented with import, props and accessibility notes."
  />
  <Alert
    title="Success State"
    description="Deployment completed successfully across every active region."
    color="success"
  />
  <Alert
    title="Warning State"
    description="You are approaching your monthly API usage limits. Please consider upgrading."
    color="warning"
  />
  <Alert
    title="Danger State"
    description="This action permanently removes the project and all environment variables."
    color="danger"
  />
  <Alert title="Custom Content" color="neutral">
    <div class="text-sm opacity-90">
      <p>This alert demonstrates passing custom child elements via snippet.</p>
      <ul class="list-inside list-disc mt-1">
        <li>Bullet point 1</li>
        <li>Bullet point 2</li>
      </ul>
    </div>
  </Alert>
</div>

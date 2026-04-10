<script lang="ts">
  import { Alert } from "$lib/components/index.js";
</script>

<div class="space-y-4">
  <Alert
    title="Neutral Notice"
    description="Every component demo is discoverable from the explorer and documented with import, props and accessibility notes."
  />
  <Alert
    title="Info State"
    description="A new software update is available for your device. Please install it soon."
    color="info"
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
    <div class="mt-2 text-sm opacity-90">
      <p>This alert demonstrates passing custom child elements via snippet.</p>
      <ul class="list-inside list-disc mt-2">
        <li>Bullet point 1</li>
        <li>Bullet point 2</li>
      </ul>
    </div>
  </Alert>
</div>

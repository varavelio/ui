<script lang="ts">
  import { Card, Input, Label } from "$lib/components/index.js";
</script>

<div class="space-y-8">
  <div class="space-y-3">
    <Label>Basic Label</Label>
    <Card class="max-w-sm space-y-4 p-6">
      <div class="space-y-2">
        <Label for="project-name">Project Name</Label>
        <Input id="project-name" placeholder="Varavel Cloud" />
      </div>
    </Card>
  </div>

  <div class="space-y-3">
    <Label>Required State</Label>
    <Card class="max-w-sm space-y-4 p-6">
      <div class="space-y-2">
        <Label for="api-key" required>API Key</Label>
        <Input id="api-key" type="password" placeholder="vk_live_..." />
        <p class="text-xs text-content-muted">
          Asterisk indicates a required field.
        </p>
      </div>
    </Card>
  </div>

  <div class="space-y-3">
    <Label>Colors & Emphasis</Label>
    <Card class="flex flex-wrap gap-6 p-6">
      <div class="space-y-1">
        <Label color="default">Default Color</Label>
        <p class="text-xs text-content-muted">Standard form label.</p>
      </div>
      <div class="space-y-1">
        <Label color="muted">Muted Color</Label>
        <p class="text-xs text-content-muted">
          Used for supporting metadata or groups.
        </p>
      </div>
    </Card>
  </div>

  <div class="space-y-3">
    <Label>Sizes</Label>
    <Card class="flex flex-wrap items-end gap-6 p-6">
      <div class="space-y-1"><Label size="sm">Small Label</Label></div>
      <div class="space-y-1">
        <Label size="md">Medium Label (Default)</Label>
      </div>
      <div class="space-y-1"><Label size="lg">Large Label</Label></div>
    </Card>
  </div>
</div>

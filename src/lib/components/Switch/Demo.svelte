<script lang="ts">
  import { Card, Label, Switch } from "$lib/components/index.js";

  let checked1 = $state(false);
  let checked2 = $state(true);
  let checked3 = $state(true);
</script>

<div class="space-y-8">
  <div class="space-y-3">
    <Label>Basic Usage</Label>
    <Card class="max-w-md space-y-6 p-6">
      <Switch bind:checked={checked1} label="Airplane Mode" />
      <Switch
        bind:checked={checked2}
        label="Autopilot deployments"
        description="Automatically roll small patches during low-traffic windows."
      />
    </Card>
  </div>

  <div class="space-y-3">
    <Label>Colors</Label>
    <Card class="flex flex-wrap gap-6 p-6">
      <Switch bind:checked={checked3} color="neutral" label="Neutral" />
      <Switch bind:checked={checked3} color="info" label="Info" />
      <Switch bind:checked={checked3} color="success" label="Success" />
      <Switch bind:checked={checked3} color="warning" label="Warning" />
      <Switch bind:checked={checked3} color="error" label="Error" />
    </Card>
  </div>

  <div class="space-y-3">
    <Label>Sizes</Label>
    <Card class="space-y-6 p-6">
      <Switch
        size="sm"
        label="Small Switch"
        description="Compact interface elements."
        checked
      />
      <Switch
        size="md"
        label="Medium Switch"
        description="Default size."
        checked
      />
      <Switch
        size="lg"
        label="Large Switch"
        description="Spacious layouts."
        checked
      />
    </Card>
  </div>

  <div class="space-y-3">
    <Label>States</Label>
    <Card class="flex flex-wrap gap-6 p-6">
      <Switch checked disabled label="Disabled (On)" />
      <Switch disabled label="Disabled (Off)" />
    </Card>
  </div>
</div>

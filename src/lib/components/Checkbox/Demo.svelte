<script lang="ts">
  import { Card, Checkbox, Label } from "$lib/components/index.js";

  let checked1 = $state(false);
  let checked2 = $state(true);
  let checked3 = $state(false);
  let partial = $state(true);
</script>

<div class="space-y-8">
  <div class="space-y-3">
    <Label>Basic Usage</Label>
    <Card class="max-w-sm space-y-4 p-6">
      <Checkbox bind:checked={checked1} label="Accept terms and conditions" />
      <Checkbox
        bind:checked={checked2}
        label="Enable notifications"
        description="Receive daily activity summaries to your inbox."
      />
    </Card>
  </div>

  <div class="space-y-3">
    <Label>Colors</Label>
    <Card class="flex flex-wrap gap-6 p-6">
      <Checkbox bind:checked={checked3} color="neutral" label="Neutral" />
      <Checkbox bind:checked={checked3} color="info" label="Info" />
      <Checkbox bind:checked={checked3} color="success" label="Success" />
      <Checkbox bind:checked={checked3} color="danger" label="Danger" />
    </Card>
  </div>

  <div class="space-y-3">
    <Label>States</Label>
    <Card class="flex flex-wrap gap-6 p-6">
      <Checkbox
        bind:indeterminate={partial}
        label="Indeterminate"
        description="Used for mixed parent selections."
      />
      <Checkbox
        checked={true}
        disabled
        label="Disabled"
        description="User interaction prevented."
      />
    </Card>
  </div>

  <div class="space-y-3">
    <Label>Sizes</Label>
    <Card class="space-y-4 p-6">
      <Checkbox
        size="sm"
        label="Small Checkbox"
        description="Compact forms."
        checked
      />
      <Checkbox
        size="md"
        label="Medium Checkbox"
        description="Default size."
        checked
      />
      <Checkbox
        size="lg"
        label="Large Checkbox"
        description="Spacious forms."
        checked
      />
    </Card>
  </div>
</div>

<script lang="ts">
  import { Card, Label, Select } from "$lib/components/index.js";

  const items = [
    { value: "us-east", label: "US East" },
    { value: "eu-west", label: "EU West" },
    { value: "ap-south", label: "AP South" },
  ];
</script>

<div class="space-y-8">
  <div class="space-y-3">
    <Label>Variants & States</Label>
    <div class="grid grid-cols-1 desk:grid-cols-2 gap-4">
      <Card class="p-6 flex flex-col gap-4">
        <Label class="text-content-muted">Default Variant</Label>
        <Select {items} placeholder="Normal state..." />
        <Select {items} error placeholder="Error state..." />
        <Select {items} disabled placeholder="Disabled state..." />
      </Card>
      <Card class="p-6 flex flex-col gap-4">
        <Label class="text-content-muted">Ghost Variant</Label>
        <Select {items} variant="ghost" placeholder="Normal state..." />
        <Select {items} variant="ghost" error placeholder="Error state..." />
        <Select
          {items}
          variant="ghost"
          disabled
          placeholder="Disabled state..."
        />
      </Card>
    </div>
  </div>

  <div class="space-y-3">
    <Label>Sizes</Label>
    <Card class="p-6">
      <div class="grid desk:grid-cols-3 gap-6 items-end">
        <div class="space-y-2">
          <Label>Small</Label>
          <Select {items} size="sm" placeholder="size='sm'" />
        </div>
        <div class="space-y-2">
          <Label>Medium</Label>
          <Select {items} size="md" placeholder="size='md'" />
        </div>
        <div class="space-y-2">
          <Label>Large</Label>
          <Select {items} size="lg" placeholder="size='lg'" />
        </div>
      </div>
    </Card>
  </div>

  <div class="space-y-3">
    <Label>Radius</Label>
    <Card class="p-6">
      <div class="grid desk:grid-cols-3 gap-4">
        <div class="space-y-2">
          <Label>none</Label>
          <Select {items} radius="none" placeholder="none" />
        </div>
        <div class="space-y-2">
          <Label>sm</Label>
          <Select {items} radius="sm" placeholder="sm" />
        </div>
        <div class="space-y-2">
          <Label>md</Label>
          <Select {items} radius="md" placeholder="md" />
        </div>
        <div class="space-y-2">
          <Label>lg</Label>
          <Select {items} radius="lg" placeholder="lg" />
        </div>
        <div class="space-y-2">
          <Label>full</Label>
          <Select {items} radius="full" placeholder="full" />
        </div>
      </div>
    </Card>
  </div>
</div>

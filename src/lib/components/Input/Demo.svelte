<script lang="ts">
  import { Lock, Mail, Search } from "@lucide/svelte";
  import { Card, Input, Label } from "$lib/components/index.js";
</script>

<div class="space-y-8">
  <div class="space-y-3">
    <Label>Icons</Label>
    <Card class="p-6">
      <div class="grid desk:grid-cols-2 gap-4">
        <div class="space-y-2">
          <Label>Left Icon</Label>
          <Input icon={Search} placeholder="Search..." />
        </div>
        <div class="space-y-2">
          <Label>Right Icon</Label>
          <Input iconRight={Mail} placeholder="Email address..." />
        </div>
        <div class="space-y-2 desk:col-span-2">
          <Label>Both Icons</Label>
          <Input
            icon={Lock}
            iconRight={Search}
            type="password"
            placeholder="Password..."
          />
        </div>
      </div>
    </Card>
  </div>

  <div class="space-y-3">
    <Label>Variants & States</Label>
    <div class="grid grid-cols-1 desk:grid-cols-2 gap-4">
      <Card class="p-6 flex flex-col gap-4">
        <Label class="text-content-muted">Default Variant</Label>
        <Input placeholder="Normal state..." />
        <Input error placeholder="Error state..." value="Invalid input" />
        <Input disabled placeholder="Disabled state..." />
      </Card>
      <Card class="p-6 flex flex-col gap-4">
        <Label class="text-content-muted">Ghost Variant</Label>
        <Input variant="ghost" placeholder="Normal state..." />
        <Input
          variant="ghost"
          error
          placeholder="Error state..."
          value="Invalid input"
        />
        <Input variant="ghost" disabled placeholder="Disabled state..." />
      </Card>
    </div>
  </div>

  <div class="space-y-3">
    <Label>Sizes</Label>
    <Card class="p-6">
      <div class="grid desk:grid-cols-3 gap-6 items-end">
        <div class="space-y-2">
          <Label>Small</Label>
          <Input size="sm" placeholder="size='sm'" />
        </div>
        <div class="space-y-2">
          <Label>Medium</Label>
          <Input size="md" placeholder="size='md'" />
        </div>
        <div class="space-y-2">
          <Label>Large</Label>
          <Input size="lg" placeholder="size='lg'" />
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
          <Input radius="none" placeholder="none" />
        </div>
        <div class="space-y-2">
          <Label>sm</Label>
          <Input radius="sm" placeholder="sm" />
        </div>
        <div class="space-y-2">
          <Label>md</Label>
          <Input radius="md" placeholder="md" />
        </div>
        <div class="space-y-2">
          <Label>lg</Label>
          <Input radius="lg" placeholder="lg" />
        </div>
        <div class="space-y-2">
          <Label>full</Label>
          <Input radius="full" placeholder="full" />
        </div>
      </div>
    </Card>
  </div>
</div>

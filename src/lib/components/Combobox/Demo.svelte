<script lang="ts">
  import { Globe, MapPin, Navigation } from "@lucide/svelte";
  import { Card, Combobox, Label } from "$lib/components/index.js";

  const items = [
    {
      value: "us-east",
      label: "US East",
      description: "Low-latency East Coast region.",
    },
    {
      value: "eu-west",
      label: "EU West",
      description: "Balanced option for European workloads.",
    },
    {
      value: "ap-south",
      label: "AP South",
      description: "Optimized for South Asia traffic.",
    },
    {
      value: "sa-east",
      label: "SA East",
    },
    {
      value: "edge-preview",
      label: "Edge Preview",
      description: "Experimental edge runtime footprint.",
      disabled: true,
    },
  ];

  let value = $state("eu-west");
  let customValue = $state("edge-local");
</script>

<div class="space-y-8">
  <div class="space-y-3">
    <Label>Icons</Label>
    <Card class="p-6">
      <div class="grid desk:grid-cols-2 gap-4">
        <div class="space-y-2">
          <Label>Left Icon</Label>
          <Combobox {items} icon={MapPin} placeholder="Select region..." />
        </div>
        <div class="space-y-2">
          <Label>Right Icon (Overrides Chevron)</Label>
          <Combobox
            {items}
            iconRight={Navigation}
            placeholder="Select region..."
          />
        </div>
        <div class="space-y-2 desk:col-span-2">
          <Label>Both Icons</Label>
          <Combobox
            {items}
            icon={Globe}
            iconRight={Navigation}
            placeholder="Select region..."
          />
        </div>
      </div>
    </Card>
  </div>

  <div class="space-y-3">
    <Label>Validation & Custom Values</Label>
    <div class="grid grid-cols-1 gap-4 desk:grid-cols-2">
      <Card class="grid grid-cols-1 gap-6 p-6">
        <Combobox
          bind:value
          {items}
          description="Type an exact match from the dataset. Leaving with an unknown value turns the field red."
          label="Dataset-only region"
          placeholder="Search regions..."
        />

        <div class="rounded-md border border-base-400 bg-base-100 p-4">
          <p
            class="text-[10px] font-medium uppercase tracking-widest text-content-muted"
          >
            Selected value
          </p>
          <p class="mt-2 font-mono text-sm text-content">{value ?? "None"}</p>
        </div>
      </Card>

      <Card class="grid grid-cols-1 gap-6 p-6">
        <Combobox
          bind:value={customValue}
          allowCustomValue
          {items}
          description="Unmatched input is accepted as a custom value and can also be selected from the menu."
          label="Custom region"
          placeholder="Type or create a region..."
        />

        <div class="rounded-md border border-base-400 bg-base-100 p-4">
          <p
            class="text-[10px] font-medium uppercase tracking-widest text-content-muted"
          >
            Selected value
          </p>
          <p class="mt-2 font-mono text-sm text-content">
            {customValue ?? "None"}
          </p>
        </div>
      </Card>
    </div>
  </div>

  <div class="space-y-3">
    <Label>Variants & States</Label>
    <div class="grid grid-cols-1 gap-4 desk:grid-cols-2">
      <Card class="flex flex-col gap-4 p-6">
        <Label class="text-content-muted">Default Variant</Label>
        <Combobox {items} placeholder="Normal state..." />
        <Combobox {items} error placeholder="Error state..." />
        <Combobox {items} disabled placeholder="Disabled state..." />
      </Card>

      <Card class="flex flex-col gap-4 p-6">
        <Label class="text-content-muted">Ghost Variant</Label>
        <Combobox {items} placeholder="Normal state..." variant="ghost" />
        <Combobox {items} error placeholder="Error state..." variant="ghost" />
        <Combobox
          {items}
          disabled
          placeholder="Disabled state..."
          variant="ghost"
        />
      </Card>
    </div>
  </div>

  <div class="space-y-3">
    <Label>Sizes</Label>
    <Card class="p-6">
      <div class="grid items-end gap-6 desk:grid-cols-3">
        <div class="space-y-2">
          <Label>Small</Label>
          <Combobox {items} placeholder="size='sm'" size="sm" />
        </div>

        <div class="space-y-2">
          <Label>Medium</Label>
          <Combobox {items} placeholder="size='md'" size="md" />
        </div>

        <div class="space-y-2">
          <Label>Large</Label>
          <Combobox {items} placeholder="size='lg'" size="lg" />
        </div>
      </div>
    </Card>
  </div>

  <div class="space-y-3">
    <Label>Radius</Label>
    <Card class="p-6">
      <div class="grid grid-cols-1 gap-4 desk:grid-cols-3">
        <div class="space-y-2">
          <Label>none</Label>
          <Combobox {items} placeholder="none" radius="none" />
        </div>

        <div class="space-y-2">
          <Label>sm</Label>
          <Combobox {items} placeholder="sm" radius="sm" />
        </div>

        <div class="space-y-2">
          <Label>md</Label>
          <Combobox {items} placeholder="md" radius="md" />
        </div>

        <div class="space-y-2">
          <Label>lg</Label>
          <Combobox {items} placeholder="lg" radius="lg" />
        </div>

        <div class="space-y-2">
          <Label>full</Label>
          <Combobox {items} placeholder="full" radius="full" />
        </div>
      </div>
    </Card>
  </div>
</div>

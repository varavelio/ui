<script lang="ts">
  import { Accordion, Label } from "$lib/components/index.js";

  const baseItems = [
    { value: "foundations", label: "Foundations", content: foundations },
    { value: "composition", label: "Composition", content: composition },
    { value: "accessibility", label: "Accessibility", content: accessibility },
  ];

  const multipleItems = [
    { value: "item-1", label: "Mountain Range", content: foundations },
    { value: "item-2", label: "Ocean Views", content: composition },
    { value: "item-3", label: "Forest Retreats", content: accessibility },
  ];

  const withDisabled = [
    { value: "foundations", label: "Foundations", content: foundations },
    {
      value: "composition",
      label: "Composition",
      content: composition,
      disabled: true,
    },
    { value: "accessibility", label: "Accessibility", content: accessibility },
  ];
</script>

{#snippet foundations()}
  <p>
    Build from a constrained monochrome palette, a strict 4px grid and
    accessible focus behavior.
  </p>
{/snippet}

{#snippet composition()}
  <p>
    Prefer simple exports first. Use compound APIs only when composition would
    otherwise become awkward.
  </p>
{/snippet}

{#snippet accessibility()}
  <p>
    Every interactive primitive must support keyboard navigation, semantic
    states and strong contrast.
  </p>
{/snippet}

<div class="space-y-6">
  <div class="space-y-2">
    <Label>Default (Left Icon, MD, Base-200)</Label>
    <Accordion items={baseItems} type="single" value="foundations" />
  </div>

  <div class="space-y-2">
    <Label>Base-100 Background</Label>
    <Accordion items={baseItems} type="single" bg="100" />
  </div>

  <div class="space-y-2">
    <Label>Base-300 Background</Label>
    <Accordion items={baseItems} type="single" bg="300" />
  </div>

  <div class="space-y-2">
    <Label>Right Icon Position</Label>
    <Accordion items={baseItems} type="single" iconPosition="right" />
  </div>

  <div class="space-y-2">
    <Label>Multiple Selection (SM)</Label>
    <Accordion
      items={multipleItems}
      type="multiple"
      size="sm"
      value={["item-1", "item-2"]}
    />
  </div>

  <div class="space-y-2">
    <Label>Disabled Item (LG)</Label>
    <Accordion items={withDisabled} type="single" size="lg" />
  </div>

  <div class="space-y-2">
    <Label>Without Icon</Label>
    <Accordion items={baseItems} type="single" showIcon={false} />
  </div>
</div>

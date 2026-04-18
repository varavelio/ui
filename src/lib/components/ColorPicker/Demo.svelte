<script lang="ts">
  import { Card, ColorPicker, Label } from "$lib/components/index.js";

  let brand = $state("#111111");
  let accent = $state("#2563EB");
</script>

<div class="space-y-8">
  <div class="space-y-3">
    <Label>Default</Label>
    <Card
      class="grid grid-cols-1 gap-6 p-6 desk:grid-cols-[minmax(0,1fr)_8rem]"
    >
      <ColorPicker
        bind:value={brand}
        description="A native color input presented with the same field language as the rest of the library."
        label="Brand color"
      />

      <div class="rounded-md border border-base-400 bg-base-100 p-4">
        <p
          class="text-[10px] font-medium uppercase tracking-widest text-content-muted"
        >
          Selected value
        </p>
        <p class="mt-2 font-mono text-sm text-content">{brand.toUpperCase()}</p>
      </div>
    </Card>
  </div>

  <div class="space-y-3">
    <Label>Variants & Sizes</Label>
    <Card class="grid grid-cols-1 gap-4 p-6 desk:grid-cols-2">
      <div class="space-y-4">
        <ColorPicker bind:value={accent} label="Default" />
        <ColorPicker error label="Error" value="#DC2626" />
        <ColorPicker disabled label="Disabled" value="#737373" />
      </div>

      <div class="space-y-4">
        <ColorPicker label="Ghost" variant="ghost" />
        <ColorPicker label="Small" size="sm" value="#16A34A" />
        <ColorPicker label="Large" size="lg" value="#F59E0B" />
      </div>
    </Card>
  </div>
</div>

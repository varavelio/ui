<script lang="ts">
  import { Card, Label, RadioGroup } from "$lib/components/index.js";

  let selectedEnvironment = $state("staging");
  let selectedDensity = $state("comfortable");
  let selectedColor = $state<
    "info" | "neutral" | "success" | "warning" | "error"
  >("info");

  const environmentItems = [
    {
      value: "development",
      label: "Development",
      description: "Fast iteration with relaxed safeguards.",
    },
    {
      value: "staging",
      label: "Staging",
      description: "Pre-production verification environment.",
    },
    {
      value: "production",
      label: "Production",
      description: "Customer-facing environment with protections.",
    },
  ];

  const densityItems = [
    { value: "compact", label: "Compact" },
    { value: "comfortable", label: "Comfortable" },
    { value: "spacious", label: "Spacious" },
  ];

  const colorItems = [
    { value: "neutral", label: "Neutral" },
    { value: "info", label: "Info" },
    { value: "success", label: "Success" },
    { value: "warning", label: "Warning" },
    { value: "error", label: "Error" },
  ];
</script>

<div class="space-y-8">
  <div class="space-y-3">
    <Label>Vertical List (Default)</Label>
    <Card class="max-w-md p-6">
      <RadioGroup
        bind:value={selectedEnvironment}
        label="Environment"
        description="Pick the default target for deploy actions."
        items={environmentItems}
      />
    </Card>
  </div>

  <div class="space-y-3">
    <Label>Horizontal Orientation</Label>
    <Card class="p-6">
      <RadioGroup
        bind:value={selectedDensity}
        label="Density"
        orientation="horizontal"
        items={densityItems}
      />
    </Card>
  </div>

  <div class="space-y-3">
    <Label>Colors</Label>
    <Card class="p-6">
      <RadioGroup
        bind:value={selectedColor}
        label="Semantic Colors"
        orientation="horizontal"
        items={colorItems}
        color={selectedColor}
      />
    </Card>
  </div>
</div>

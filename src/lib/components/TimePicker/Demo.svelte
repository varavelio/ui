<script lang="ts">
  import { parseTime, Time } from "@internationalized/date";
  import { Card, Label, TimePicker } from "$lib/components/index.js";

  let value = $state(parseTime("14:30:00"));
  const officeOpen = new Time(9, 0);
  const officeClose = new Time(18, 0);
</script>

<div class="space-y-8">
  <div class="space-y-3">
    <Label>Selection</Label>
    <Card
      class="grid grid-cols-1 gap-6 p-6 desk:grid-cols-[minmax(0,1fr)_14rem]"
    >
      <TimePicker
        bind:value
        description="Segmented time input with locale-aware formatting and strong keyboard support."
        label="Meeting time"
      />

      <div class="rounded-md border border-base-400 bg-base-100 p-4">
        <p
          class="text-[10px] font-medium uppercase tracking-widest text-content-muted"
        >
          Selected value
        </p>
        <p class="mt-2 font-mono text-sm text-content">
          {value?.toString() ?? "None"}
        </p>
      </div>
    </Card>
  </div>

  <div class="space-y-3">
    <Label>Variants & States</Label>
    <div class="grid grid-cols-1 gap-4 desk:grid-cols-2">
      <Card class="flex flex-col gap-4 p-6">
        <Label class="text-content-muted">Default Variant</Label>
        <TimePicker label="Default" />
        <TimePicker error label="Error" />
        <TimePicker disabled label="Disabled" />
      </Card>

      <Card class="flex flex-col gap-4 p-6">
        <Label class="text-content-muted">Ghost Variant</Label>
        <TimePicker label="Ghost" variant="ghost" />
        <TimePicker error label="Ghost Error" variant="ghost" />
        <TimePicker disabled label="Ghost Disabled" variant="ghost" />
      </Card>
    </div>
  </div>

  <div class="space-y-3">
    <Label>Granularity & Constraints</Label>
    <div class="grid grid-cols-1 gap-4 desk:grid-cols-2">
      <Card class="flex flex-col gap-4 p-6">
        <TimePicker
          description="12-hour formatting with seconds for precise scheduling."
          granularity="second"
          hourCycle={12}
          label="Precise time"
          value={parseTime("09:45:30")}
        />
      </Card>

      <Card class="flex flex-col gap-4 p-6">
        <TimePicker
          description="Restricts selection to office hours."
          label="Office hours"
          minValue={officeOpen}
          maxValue={officeClose}
          value={parseTime("08:30:00")}
        />
      </Card>
    </div>
  </div>
</div>

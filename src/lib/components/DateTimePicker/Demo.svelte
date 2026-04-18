<script lang="ts">
  import {
    getLocalTimeZone,
    now,
    parseDateTime,
  } from "@internationalized/date";
  import { Card, DateTimePicker, Label } from "$lib/components/index.js";

  let value = $state(parseDateTime("2026-04-18T14:30:00"));
  let zonedValue = $state(now(getLocalTimeZone()));
</script>

<div class="space-y-8">
  <div class="space-y-3">
    <Label>Selection</Label>
    <Card
      class="grid grid-cols-1 gap-6 p-6 desk:grid-cols-[minmax(0,1fr)_16rem]"
    >
      <DateTimePicker
        bind:value
        description="Calendar selection and time editing stay in sync inside one field."
        label="Deployment window"
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
        <DateTimePicker label="Default" />
        <DateTimePicker error label="Error" />
        <DateTimePicker disabled label="Disabled" />
      </Card>

      <Card class="flex flex-col gap-4 p-6">
        <Label class="text-content-muted">Ghost Variant</Label>
        <DateTimePicker label="Ghost" variant="ghost" />
        <DateTimePicker error label="Ghost Error" variant="ghost" />
        <DateTimePicker disabled label="Ghost Disabled" variant="ghost" />
      </Card>
    </div>
  </div>

  <div class="space-y-3">
    <Label>Date & Time Modes</Label>
    <div class="grid grid-cols-1 gap-4 desk:grid-cols-2">
      <Card class="p-6">
        <DateTimePicker
          description="Keeps the popover open after selecting a date so the time can be tuned immediately."
          label="Precise scheduling"
          numberOfMonths={2}
          pagedNavigation
          value={parseDateTime("2026-04-18T09:45:30")}
          granularity="second"
        />
      </Card>

      <Card class="grid grid-cols-1 gap-6 p-6">
        <DateTimePicker
          bind:value={zonedValue}
          description="Works with zoned values and can display the time-zone segment when needed."
          hideTimeZone={false}
          label="Zoned appointment"
        />

        <div class="rounded-md border border-base-400 bg-base-100 p-4">
          <p
            class="text-[10px] font-medium uppercase tracking-widest text-content-muted"
          >
            Selected value
          </p>
          <p class="mt-2 font-mono text-sm text-content">
            {zonedValue?.toString() ?? "None"}
          </p>
        </div>
      </Card>
    </div>
  </div>
</div>

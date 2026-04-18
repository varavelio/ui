<script lang="ts">
  import {
    CalendarDate,
    getLocalTimeZone,
    today,
  } from "@internationalized/date";
  import { Card, DatePicker, Label } from "$lib/components/index.js";

  let value = $state(new CalendarDate(2026, 4, 18));
  const todayValue = today(getLocalTimeZone());
</script>

<div class="space-y-8">
  <div class="space-y-3">
    <Label>Selection</Label>
    <Card
      class="grid grid-cols-1 gap-6 p-6 desk:grid-cols-[minmax(0,1fr)_14rem]"
    >
      <DatePicker
        bind:value
        description="Segmented input with a calendar popover, plus Today and Clear shortcuts."
        label="Publish date"
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
        <DatePicker label="Default" />
        <DatePicker error label="Error" />
        <DatePicker disabled label="Disabled" />
      </Card>

      <Card class="flex flex-col gap-4 p-6">
        <Label class="text-content-muted">Ghost Variant</Label>
        <DatePicker label="Ghost" variant="ghost" />
        <DatePicker error label="Ghost Error" variant="ghost" />
        <DatePicker disabled label="Ghost Disabled" variant="ghost" />
      </Card>
    </div>
  </div>

  <div class="space-y-3">
    <Label>Calendar Options</Label>
    <div class="grid grid-cols-1 gap-4 desk:grid-cols-2">
      <Card class="p-6">
        <DatePicker
          description="Useful for booking flows where adjacent months matter."
          fixedWeeks
          label="Two-month view"
          numberOfMonths={2}
          pagedNavigation
        />
      </Card>

      <Card class="p-6">
        <DatePicker
          description="Restricts selection to today or later while keeping the calendar visible."
          label="Future dates only"
          minValue={todayValue}
        />
      </Card>
    </div>
  </div>
</div>

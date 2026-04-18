import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "DateTimePicker",
    demo: Demo,
    category: "Form Controls",
    props: [
      prop(
        "class",
        "ClassValue",
        "Additional CSS classes to apply to the root wrapper.",
      ),
      prop(
        "id",
        "string",
        "Optional ID for the date-time field input container.",
      ),
      prop("label", "string", "Label text for the date-time picker field."),
      prop("description", "string", "Secondary helper text."),
      prop("name", "string", "HTML input name attribute."),
      prop(
        "value",
        "CalendarDateTime | ZonedDateTime",
        "Bindable selected date-time value.",
      ),
      prop(
        "placeholderValue",
        "CalendarDateTime | ZonedDateTime",
        "Placeholder date-time used to seed the field and calendar when empty.",
      ),
      prop(
        "minValue",
        "CalendarDateTime | ZonedDateTime",
        "Minimum selectable date-time.",
      ),
      prop(
        "maxValue",
        "CalendarDateTime | ZonedDateTime",
        "Maximum selectable date-time.",
      ),
      prop(
        "open",
        "boolean",
        "Bindable open state of the calendar popover.",
        "false",
      ),
      prop(
        "disabled",
        "boolean",
        "Prevents user interaction and dims the field.",
        "false",
      ),
      prop(
        "readonly",
        "boolean",
        "Prevents editing the field and selecting dates.",
        "false",
      ),
      prop(
        "required",
        "boolean",
        "Marks the date-time picker as a required field.",
        "false",
      ),
      prop(
        "error",
        "boolean",
        "Marks the field as error and styles it accordingly.",
        "false",
      ),
      prop(
        "size",
        '"sm" | "md" | "lg"',
        "Control height and typography size preset.",
        '"md"',
      ),
      prop(
        "radius",
        '"none" | "sm" | "md" | "lg" | "full"',
        "Corner radius preset.",
        '"md"',
      ),
      prop(
        "variant",
        '"default" | "ghost"',
        "Surface style variant.",
        '"default"',
      ),
      prop(
        "locale",
        "string",
        "Locale used to format dates and times.",
        '"en-GB"',
      ),
      prop(
        "granularity",
        '"hour" | "minute" | "second"',
        "Granularity rendered in the field and time section.",
        '"minute"',
      ),
      prop("hourCycle", "12 | 24", "Hour cycle used to format time."),
      prop(
        "hideTimeZone",
        "boolean",
        "Hides the time zone segment for zoned values.",
        "false",
      ),
      prop(
        "closeOnDateSelect",
        "boolean",
        "Whether the popover should close immediately after selecting a date.",
        "false",
      ),
      prop(
        "numberOfMonths",
        "number",
        "Number of months displayed in the calendar popover.",
        "1",
      ),
      prop(
        "pagedNavigation",
        "boolean",
        "Advances month navigation by all visible months at once.",
        "false",
      ),
      prop(
        "fixedWeeks",
        "boolean",
        "Always renders six weeks in the calendar.",
        "false",
      ),
    ],
  },
]);

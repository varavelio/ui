import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "DatePicker",
    demo: Demo,
    category: "Form Controls",
    props: [
      prop(
        "class",
        "ClassValue",
        "Additional CSS classes to apply to the root wrapper.",
      ),
      prop("id", "string", "Optional ID for the date field input container."),
      prop("label", "string", "Label text for the date picker field."),
      prop("description", "string", "Secondary helper text."),
      prop("name", "string", "HTML input name attribute."),
      prop("value", "CalendarDate", "Bindable selected date value."),
      prop(
        "placeholderValue",
        "CalendarDate",
        "Placeholder date used to seed the field and calendar when empty.",
      ),
      prop("minValue", "CalendarDate", "Minimum selectable date."),
      prop("maxValue", "CalendarDate", "Maximum selectable date."),
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
        "Marks the date picker as a required field.",
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
        "Locale used to format dates and weekdays.",
        '"en-GB"',
      ),
      prop(
        "closeOnDateSelect",
        "boolean",
        "Whether the popover should close immediately after selecting a date.",
        "true",
      ),
      prop(
        "preventDeselect",
        "boolean",
        "Prevents clearing the current date without choosing another one.",
        "false",
      ),
      prop(
        "weekStartsOn",
        "0 | 1 | 2 | 3 | 4 | 5 | 6",
        "First day of the week, where 0 is Sunday and 6 is Saturday.",
      ),
      prop(
        "weekdayFormat",
        '"narrow" | "short" | "long"',
        "Format used for weekday labels in the calendar.",
        '"short"',
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
      prop(
        "initialFocus",
        "boolean",
        "Focuses an appropriate day when the popover opens.",
        "false",
      ),
      prop(
        "calendarLabel",
        "string",
        "Accessible label announced when the calendar opens.",
      ),
    ],
  },
]);

import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "TimePicker",
    demo: Demo,
    category: "Form Controls",
    props: [
      prop(
        "class",
        "ClassValue",
        "Additional CSS classes to apply to the root wrapper.",
      ),
      prop("id", "string", "Optional ID for the time field input container."),
      prop("label", "string", "Label text for the time picker field."),
      prop("description", "string", "Secondary helper text."),
      prop("name", "string", "HTML input name attribute."),
      prop("value", "Time", "Bindable selected time value."),
      prop(
        "placeholderValue",
        "Time",
        "Placeholder time used to seed the field when empty.",
      ),
      prop("minValue", "Time", "Minimum selectable time."),
      prop("maxValue", "Time", "Maximum selectable time."),
      prop(
        "disabled",
        "boolean",
        "Prevents user interaction and dims the field.",
        "false",
      ),
      prop("readonly", "boolean", "Prevents editing the field.", "false"),
      prop(
        "required",
        "boolean",
        "Marks the time picker as a required field.",
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
        "Locale used to format time segments.",
        '"en-GB"',
      ),
      prop(
        "granularity",
        '"hour" | "minute" | "second"',
        "Granularity rendered in the time field.",
        '"minute"',
      ),
      prop("hourCycle", "12 | 24", "Hour cycle used to format time."),
    ],
  },
]);

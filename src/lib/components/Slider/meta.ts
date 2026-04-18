import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Slider",
    demo: Demo,
    category: "Form Controls",
    props: [
      prop(
        "class",
        "ClassValue",
        "Additional CSS classes to apply to the slider wrapper.",
      ),
      prop("label", "string", "Label text for the slider field."),
      prop("description", "string", "Secondary helper text."),
      prop("type", '"single" | "multiple"', "Slider mode.", '"single"'),
      prop("value", "number | number[]", "Bindable selected value or values."),
      prop("size", '"sm" | "md" | "lg"', "Control size preset.", '"md"'),
      prop("min", "number", "Minimum slider value.", "0"),
      prop("max", "number", "Maximum slider value.", "100"),
      prop(
        "step",
        "number | number[]",
        "Step size or discrete values available on the slider.",
        "1",
      ),
      prop("disabled", "boolean", "Disables the slider.", "false"),
      prop(
        "orientation",
        '"horizontal" | "vertical"',
        "Slider orientation.",
        '"horizontal"',
      ),
      prop(
        "showValue",
        "boolean",
        "Shows a summary of the current value next to the label.",
        "true",
      ),
      prop(
        "formatValue",
        "(value: number, index: number) => string",
        "Formats visible values in the summary.",
      ),
    ],
  },
]);

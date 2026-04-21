import { components, prop } from "../../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Newsletter.Centered",
    category: "Blocks",
    demo: Demo,
    props: [
      prop(
        "eyebrow",
        "string",
        "Short label shown above the centered newsletter heading.",
      ),
      prop(
        "title",
        "string",
        "Section heading for the centered newsletter block.",
      ),
      prop(
        "description",
        "string",
        "Supporting copy for the centered newsletter block.",
      ),
      prop(
        "buttonLabel",
        "string",
        "Submit button label for the newsletter form.",
      ),
      prop("placeholder", "string", "Email input placeholder text."),
      prop("helperText", "string", "Short helper text shown below the form."),
      prop(
        "disclaimer",
        "string",
        "Muted privacy or frequency note shown below the form.",
      ),
      prop("formAction", "string", "Optional form action URL."),
      prop(
        "formMethod",
        '"get" | "post"',
        "HTTP method for the form submission.",
        '"post"',
      ),
      prop("name", "string", "Input name used in the form payload.", '"email"'),
      prop(
        "label",
        "string",
        "Accessible label for the email input.",
        '"Email address"',
      ),
    ],
  },
]);

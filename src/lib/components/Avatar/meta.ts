import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Avatar",
    demo: Demo,
    category: "Core Building Blocks",
    props: [
      prop("class", "ClassValue", "Additional CSS classes to apply."),
      prop("id", "string", "Optional ID for the avatar element."),
      prop("src", "string", "Optional image source URL."),
      prop("alt", "string", "Accessible alternative text for the avatar."),
      prop(
        "fallback",
        "string",
        "Fallback initials or text displayed if the image fails or is missing.",
      ),
      prop(
        "delayMs",
        "number",
        "Delay in milliseconds before rendering the fallback when an image is loading.",
        "0",
      ),
      prop("size", '"sm" | "md" | "lg" | "xl"', "Visual size preset.", '"md"'),
      prop(
        "tone",
        '"neutral" | "contrast"',
        "Surface and text tone.",
        '"neutral"',
      ),
      prop(
        "bordered",
        "boolean",
        "Whether to show a border around the avatar.",
        "true",
      ),
    ],
  },
]);

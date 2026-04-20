import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "GithubButton",
    demo: Demo,
    category: "Utilities & Preferences",
    props: [
      prop(
        "class",
        "ClassValue",
        "Additional CSS classes to apply to the button.",
      ),
      prop("user", "string", "GitHub repository owner."),
      prop("repo", "string", "GitHub repository name."),
      prop("href", "string", "Optional custom destination URL."),
      prop("label", "string", "Accessible label override for the button."),
      prop("size", '"sm" | "md" | "lg"', "Button size preset.", '"md"'),
      prop(
        "radius",
        '"sm" | "md" | "lg" | "full"',
        "Button border radius preset.",
        '"md"',
      ),
      prop(
        "variant",
        '"solid" | "outline" | "ghost"',
        "Button appearance variant.",
        '"outline"',
      ),
      prop(
        "color",
        '"neutral" | "info" | "success" | "warning" | "error"',
        "Semantic color representing the button's intent.",
        '"neutral"',
      ),
      prop(
        "format",
        '"compact" | "full"',
        "Number formatting style.",
        '"compact"',
      ),
      prop("showStars", "boolean", "Shows the stars badge.", "true"),
      prop("showForks", "boolean", "Shows the forks badge.", "true"),
      prop("showTag", "boolean", "Shows the latest tag badge.", "true"),
      prop(
        "target",
        "HTMLAnchorAttributes['target']",
        "The target of the generated link.",
        '"_blank"',
      ),
      prop(
        "rel",
        "HTMLAnchorAttributes['rel']",
        "The relationship attribute of the generated link.",
      ),
      prop(
        "wide",
        "boolean",
        "Whether the button should span the full width of its container.",
        "false",
      ),
    ],
  },
]);

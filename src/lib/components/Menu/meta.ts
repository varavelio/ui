import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Menu",
    demo: Demo,
    category: "Overlays & Floating UI",
    props: [
      prop(
        "label",
        "string | Snippet",
        "Generates a safe built-in button trigger for dropdown and context modes.",
      ),
      prop(
        "trigger",
        "Snippet",
        "Optional custom trigger content. Use this for avatars, icons, or arbitrary surfaces.",
      ),
      prop("items", "Array", "Menu items, labels and separators."),
      prop("open", "boolean", "Controlled open state."),
      prop("side", "string", "The preferred side to render the menu."),
      prop(
        "mode",
        '"dropdown" | "context"',
        "Whether the menu opens as a standard dropdown or a context menu (right click).",
        '"dropdown"',
      ),
      prop(
        "triggerClass",
        "string",
        "Additional CSS classes for the trigger surface or generated button.",
      ),
      prop(
        "icon",
        "Component",
        "Leading icon for the generated button trigger.",
      ),
      prop(
        "iconRight",
        "Component",
        "Trailing icon for the generated button trigger.",
      ),
      prop(
        "variant",
        '"solid" | "outline" | "ghost"',
        "Generated button appearance.",
      ),
      prop("size", '"sm" | "md" | "lg"', "Generated button size."),
      prop(
        "disabled",
        "boolean",
        "Disables the trigger in both snippet and generated-button modes.",
      ),
      prop("class", "string", "Additional CSS classes for the content."),
    ],
  },
]);

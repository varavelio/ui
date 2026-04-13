import type { Component as SvelteComponent } from "svelte";
import {
  type ComponentCategory,
  catalog,
  componentCategories,
} from "$lib/catalog.js";
import DialogRuntimeDemo from "./runtime/DialogRuntimeDemo.svelte";
import ThemeRuntimeDemo from "./runtime/ThemeRuntimeDemo.svelte";

export const explorerTypes = [
  "components",
  "blocks",
  "layouts",
  "runtime",
] as const;

export type ExplorerType = (typeof explorerTypes)[number];

export function isExplorerType(value: string): value is ExplorerType {
  return explorerTypes.includes(value as ExplorerType);
}

export type ComponentExplorerEntry = (typeof catalog.components)[number] & {
  id: string;
  importCode: string;
};

export const componentEntries: ComponentExplorerEntry[] =
  catalog.components.map((entry) => ({
    ...entry,
    id: entry.name,
    importCode: `import { ${entry.name} } from "@varavel/ui";`,
  }));

export const defaultComponentSlug =
  componentEntries.find((entry) => entry.slug === "avatar")?.slug ??
  componentEntries[0]?.slug ??
  "";

export type { ComponentCategory };
export { componentCategories };

export const runtimeCategories = [
  "Theme Management",
  "Dialog Management",
] as const;

export type RuntimeCategory = (typeof runtimeCategories)[number];

export type RuntimeOption = {
  name: string;
  type: string;
  defaultValue?: string;
  required?: boolean;
  description: string;
};

export type RuntimeMethod = {
  name: string;
  signature: string;
  returns: string;
  description: string;
  options?: RuntimeOption[];
};

export type RuntimeSnippet = {
  title: string;
  description: string;
  language: "ts" | "svelte";
  code: string;
};

export type RuntimeEntry = {
  name: string;
  slug: string;
  category: RuntimeCategory;
  summary: string;
  importCode: string;
  methods: RuntimeMethod[];
  snippets: RuntimeSnippet[];
  notes: string[];
  demo: SvelteComponent;
};

export const runtimeEntries: RuntimeEntry[] = [
  {
    name: "theme",
    slug: "theme",
    category: "Theme Management",
    summary:
      "Read, write, and react to the user theme preference (light, dark, or system) using a single runtime API.",
    importCode: 'import { theme } from "@varavel/ui/runtime";',
    methods: [
      {
        name: "theme.get",
        signature: "theme.get(): Theme",
        returns: '"light" | "dark" | "system"',
        description:
          'Returns the saved preference. During SSR or if the bootstrapper is unavailable, it safely falls back to "system".',
      },
      {
        name: "theme.set",
        signature: "theme.set(theme: Theme): void",
        returns: "void",
        description:
          "Persists the preference, applies it to the document immediately, and emits the global theme change event.",
        options: [
          {
            name: "theme",
            type: '"light" | "dark" | "system"',
            required: true,
            description: "Target preference to apply.",
          },
        ],
      },
      {
        name: "theme.subscribe",
        signature:
          "theme.subscribe(callback: (theme: Theme) => void): () => void",
        returns: "() => void",
        description:
          "Subscribes to runtime updates and returns an unsubscribe function. Works for in-tab changes, system theme changes, and cross-tab storage sync.",
        options: [
          {
            name: "callback",
            type: "(theme: Theme) => void",
            required: true,
            description:
              "Invoked every time the preference changes. Receives the literal preference value.",
          },
        ],
      },
    ],
    snippets: [
      {
        title: "Read and set the theme",
        description: "Use this in buttons, menus, or custom settings panels.",
        language: "ts",
        code: [
          'import { theme } from "@varavel/ui/runtime";',
          "",
          'const current = theme.get(); // "light" | "dark" | "system"',
          "",
          'theme.set("dark");',
          'theme.set("system");',
        ].join("\n"),
      },
      {
        title: "React to changes",
        description:
          "Ideal for synchronizing custom UI state with the runtime.",
        language: "ts",
        code: [
          'import { theme } from "@varavel/ui/runtime";',
          "",
          "const unsubscribe = theme.subscribe((nextTheme) => {",
          "  console.log('Theme changed to', nextTheme);",
          "});",
          "",
          "// Later, when cleaning up",
          "unsubscribe();",
        ].join("\n"),
      },
    ],
    notes: [
      'Theme values are preferences, not always the final resolved palette. "system" means the UI follows OS preference.',
      "`theme.subscribe` is the recommended integration point for reactive theme-aware UI.",
      "The runtime emits `varavel-theme-change` behind the scenes and handles cross-tab sync for you.",
    ],
    demo: ThemeRuntimeDemo,
  },
  {
    name: "dialog",
    slug: "dialog",
    category: "Dialog Management",
    summary:
      "Open Promise-based alert and confirm modals from anywhere in your app, with typed options and semantic states.",
    importCode: 'import { dialog } from "@varavel/ui/runtime";',
    methods: [
      {
        name: "dialog.confirm",
        signature:
          "dialog.confirm(options: ConfirmOptions | string): Promise<boolean>",
        returns: "Promise<boolean>",
        description:
          "Opens a confirmation dialog. Resolves to `true` when confirmed and `false` when canceled.",
        options: [
          {
            name: "title",
            type: "string",
            description: "Main heading shown in the dialog.",
          },
          {
            name: "text",
            type: "string",
            description: "Supporting description text.",
          },
          {
            name: "color",
            type: '"neutral" | "info" | "success" | "warning" | "error"',
            defaultValue: '"warning"',
            description: "Semantic tone for icon and primary action button.",
          },
          {
            name: "size",
            type: '"sm" | "md" | "lg"',
            defaultValue: '"sm"',
            description: "Dialog width preset.",
          },
          {
            name: "hideIcon",
            type: "boolean",
            defaultValue: "false",
            description: "When true, hides the semantic icon.",
          },
          {
            name: "cancelText",
            type: "string",
            defaultValue: '"Cancel"',
            description: "Text label for the cancel button.",
          },
          {
            name: "actionText",
            type: "string",
            defaultValue: '"Continue"',
            description: "Text label for the confirm button.",
          },
        ],
      },
      {
        name: "dialog.alert",
        signature:
          "dialog.alert(options: AlertOptions | string): Promise<void>",
        returns: "Promise<void>",
        description:
          "Opens an alert dialog and resolves when the user closes it.",
        options: [
          {
            name: "title",
            type: "string",
            description: "Main heading shown in the dialog.",
          },
          {
            name: "text",
            type: "string",
            description: "Supporting description text.",
          },
          {
            name: "color",
            type: '"neutral" | "info" | "success" | "warning" | "error"',
            defaultValue: '"info"',
            description: "Semantic tone for icon and action button.",
          },
          {
            name: "size",
            type: '"sm" | "md" | "lg"',
            defaultValue: '"sm"',
            description: "Dialog width preset.",
          },
          {
            name: "hideIcon",
            type: "boolean",
            defaultValue: "false",
            description: "When true, hides the semantic icon.",
          },
          {
            name: "closeText",
            type: "string",
            defaultValue: '"OK"',
            description: "Text label for the close action.",
          },
        ],
      },
    ],
    snippets: [
      {
        title: "String shorthand",
        description:
          "Pass a string when you only need a title and default labels.",
        language: "ts",
        code: [
          'import { dialog } from "@varavel/ui/runtime";',
          "",
          'const confirmed = await dialog.confirm("Archive this item?");',
          'await dialog.alert("Your changes were saved.");',
        ].join("\n"),
      },
      {
        title: "Full confirm options",
        description:
          "Use the object form when you need explicit semantics and custom labels.",
        language: "ts",
        code: [
          'import { dialog } from "@varavel/ui/runtime";',
          "",
          "const accepted = await dialog.confirm({",
          '  title: "Delete workspace?",',
          '  text: "This cannot be undone.",',
          '  color: "error",',
          '  size: "md",',
          "  hideIcon: false,",
          '  cancelText: "Keep workspace",',
          '  actionText: "Delete forever",',
          "});",
          "",
          "if (accepted) {",
          "  // continue",
          "}",
        ].join("\n"),
      },
      {
        title: "Full alert options",
        description: "Great for post-action confirmation and status messaging.",
        language: "ts",
        code: [
          'import { dialog } from "@varavel/ui/runtime";',
          "",
          "await dialog.alert({",
          '  title: "Deployment completed",',
          '  text: "All services are healthy.",',
          '  color: "success",',
          '  size: "lg",',
          "  hideIcon: false,",
          '  closeText: "Great"',
          "});",
        ].join("\n"),
      },
    ],
    notes: [
      "`dialog.confirm` resolves to a boolean; no manual event wiring is required.",
      "`dialog.alert` resolves after close, so it fits naturally in async workflows.",
      "Both methods support a concise string shorthand and a fully typed options object.",
    ],
    demo: DialogRuntimeDemo,
  },
];

export const defaultRuntimeSlug = runtimeEntries[0]?.slug ?? "";

export const runtimeSlugSet = new Set(
  runtimeEntries.map((entry) => entry.slug),
);
export const componentSlugSet = new Set(
  componentEntries.map((entry) => entry.slug),
);

export const explorerSections: {
  type: ExplorerType;
  label: string;
  description: string;
  soon?: boolean;
}[] = [
  {
    type: "components",
    label: "Components",
    description: "Atomic UI primitives with typed props and live demos.",
  },
  {
    type: "blocks",
    label: "Blocks",
    description: "Prebuilt compositions for common interface sections.",
    soon: true,
  },
  {
    type: "layouts",
    label: "Layouts",
    description: "Complete scaffolds to accelerate page architecture.",
    soon: true,
  },
  {
    type: "runtime",
    label: "Runtime",
    description: "Framework-agnostic APIs for app-level behavior.",
  },
];

export function getSectionHref(type: ExplorerType): string {
  switch (type) {
    case "components":
      return defaultComponentSlug
        ? `/components/${defaultComponentSlug}`
        : "/components";
    case "runtime":
      return defaultRuntimeSlug ? `/runtime/${defaultRuntimeSlug}` : "/runtime";
    case "blocks":
      return "/blocks";
    case "layouts":
      return "/layouts";
  }
}

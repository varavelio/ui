import type { Component as SvelteComponent } from "svelte";
import {
  type ComponentCategory,
  catalog,
  componentCategories,
} from "$lib/catalog.js";
import ClipboardRuntimeDemo from "./runtime/ClipboardRuntimeDemo.svelte";
import DialogRuntimeDemo from "./runtime/DialogRuntimeDemo.svelte";
import ThemeRuntimeDemo from "./runtime/ThemeRuntimeDemo.svelte";
import ToastRuntimeDemo from "./runtime/ToastRuntimeDemo.svelte";

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
  "Clipboard Management",
  "Theme Management",
  "Dialog Management",
  "Toast Management",
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
    name: "clipboard",
    slug: "clipboard",
    category: "Clipboard Management",
    summary:
      "Copy plain text through one runtime API that handles browser support, success/error outcomes, and optional toast feedback.",
    importCode: 'import { clipboard } from "@varavel/ui/runtime";',
    methods: [
      {
        name: "clipboard.isSupported",
        signature: "clipboard.isSupported(): boolean",
        returns: "boolean",
        description:
          "Returns whether the current browser exposes `navigator.clipboard.writeText(...)`.",
      },
      {
        name: "clipboard.copy",
        signature:
          "clipboard.copy(text: string, options?: ClipboardCopyOptions): Promise<boolean>",
        returns: "Promise<boolean>",
        description:
          "Copies plain text to the browser clipboard. Resolves to `true` on success and `false` when the browser rejects the request or the Clipboard API is unavailable.",
        options: [
          {
            name: "text",
            type: "string",
            required: true,
            description: "Plain text written to the clipboard.",
          },
          {
            name: "quiet",
            type: "boolean",
            defaultValue: "false",
            description:
              "Suppresses toast feedback and keeps the call silent beyond the returned boolean.",
          },
          {
            name: "successMessage",
            type: "string",
            description:
              "Custom success toast message used when the copy succeeds.",
          },
          {
            name: "errorMessage",
            type: "string",
            description:
              "Custom error toast message used when the browser rejects the copy.",
          },
        ],
      },
    ],
    snippets: [
      {
        title: "1. Copy plain text",
        description:
          "The smallest direct call for IDs, tokens, or any other machine value.",
        language: "ts",
        code: [
          'import { clipboard } from "@varavel/ui/runtime";',
          "",
          'const ok = await clipboard.copy("dep_01JSQ53JVH2G6B87QR4P4X2F1N");',
          "",
          "if (!ok) {",
          '  console.error("Copy failed");',
          "}",
        ].join("\n"),
      },
      {
        title: "2. Quiet copy",
        description:
          "Use this when local UI feedback is enough and a global toast would be redundant.",
        language: "ts",
        code: [
          'import { clipboard } from "@varavel/ui/runtime";',
          "",
          'await clipboard.copy("whsec_5X2E9N1Q4M7R8T3A6C2Z1B0L", {',
          "  quiet: true,",
          "});",
        ].join("\n"),
      },
      {
        title: "3. Compose with Copy",
        description:
          "The `Copy` component builds on the same runtime and adds opinionated local feedback.",
        language: "svelte",
        code: [
          '<script lang="ts">',
          '  import { Copy, Input } from "@varavel/ui";',
          "",
          '  const apiKey = "vrvl_live_8N9S2Q1Z7X4K5M3P";',
          "</script>",
          "",
          '<div class="flex items-center gap-2">',
          "  <Input value={apiKey} readonly />",
          '  <Copy text={apiKey} successMessage="API key copied." />',
          "</div>",
        ].join("\n"),
      },
    ],
    notes: [
      "The clipboard runtime is intentionally narrow: it standardizes browser copy behavior and feedback without turning clipboard access into a large abstraction.",
      "`clipboard.copy(...)` returns a boolean instead of throwing so UI components can handle success and failure without noisy try/catch blocks.",
      "By default, copy operations reuse the global toast runtime. Pass `quiet: true` when local UI feedback is already enough.",
    ],
    demo: ClipboardRuntimeDemo,
  },
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
  {
    name: "toast",
    slug: "toast",
    category: "Toast Management",
    summary:
      "Trigger clean, system-consistent notifications from anywhere with a small opinionated API focused on content, async state, and dismissal.",
    importCode: 'import { toast } from "@varavel/ui/runtime";',
    methods: [
      {
        name: "toast",
        signature:
          "toast(options: ToastOptions | string): string | number | undefined",
        returns: "string | number | undefined",
        description:
          "Use this for standard notifications. Pass a string for the shortest possible call, or pass a `ToastOptions` object when you want a title, supporting text, actions, timing, or update-by-id behavior.",
        options: [
          {
            name: "title",
            type: "string",
            description:
              "Primary message shown as the toast title. Optional when using string shorthand because the string itself becomes the title.",
          },
          {
            name: "text",
            type: "string",
            description:
              "Optional supporting text rendered below the title. Ideal for context, recovery hints, or a short explanation.",
          },
          {
            name: "id",
            type: "string | number",
            description:
              "Existing toast id used to update a previous toast in place instead of creating a new one.",
          },
          {
            name: "action",
            type: "{ label: string; onClick: (event) => void }",
            description:
              "Optional single action button. Best used for one obvious follow-up such as Undo, Retry, or View.",
          },
          {
            name: "duration",
            type: "number",
            defaultValue: "4000",
            description:
              "Toast lifetime in milliseconds. Use `Number.POSITIVE_INFINITY` for a persistent toast.",
          },
          {
            name: "dismissible",
            type: "boolean",
            defaultValue: "true",
            description:
              "Controls whether users can manually dismiss the toast by gesture or built-in close behavior.",
          },
          {
            name: "closeButton",
            type: "boolean",
            defaultValue: "false",
            description:
              "Shows a close button. Useful for longer-lived or more important messages.",
          },
          {
            name: "onDismiss",
            type: "(toast) => void",
            description: "Runs when the user dismisses the toast manually.",
          },
          {
            name: "onAutoClose",
            type: "(toast) => void",
            description:
              "Runs when the toast closes itself after its duration elapses.",
          },
        ],
      },
      {
        name: "toast.success / toast.info / toast.warning / toast.error / toast.loading",
        signature:
          "toast.success(options: ToastOptions | string): string | number | undefined",
        returns: "string | number | undefined",
        description:
          "These helpers behave exactly like `toast(...)`, but choose the semantic variant for you. Use them when the meaning of the message matters: success for completion, error for failures, warning for caution, info for neutral guidance, and loading for in-progress work.",
      },
      {
        name: "toast.promise",
        signature:
          "toast.promise<T>(promise: Promise<T> | (() => Promise<T>), options?: ToastPromiseOptions<T>): string | number | undefined",
        returns: "string | number | undefined",
        description:
          "Use this when one toast should follow an async operation from pending to resolved or failed. The same toast id is preserved, so the message transitions cleanly instead of stacking multiple notifications.",
        options: [
          {
            name: "title",
            type: "string",
            description:
              "Optional static title shared across the promise lifecycle.",
          },
          {
            name: "text",
            type: "string",
            description:
              "Optional supporting text shown under the promise toast.",
          },
          {
            name: "loadingText",
            type: "string | (() => string)",
            description: "Message shown while the promise is pending.",
          },
          {
            name: "successText",
            type: "string | ((data: T) => string)",
            description:
              "Message shown when the promise resolves. Can be a function that receives the resolved value.",
          },
          {
            name: "errorText",
            type: "string | ((error: unknown) => string)",
            description:
              "Message shown when the promise rejects. Can be a function that receives the thrown error.",
          },
          {
            name: "finally",
            type: "() => void | Promise<void>",
            description: "Runs after success or error handling completes.",
          },
        ],
      },
      {
        name: "toast.dismiss",
        signature:
          "toast.dismiss(id?: string | number): string | number | undefined",
        returns: "string | number | undefined",
        description:
          "Dismisses one toast when an id is provided. Call it without arguments to clear every visible toast at once.",
      },
    ],
    snippets: [
      {
        title: "1. Quick message",
        description:
          "The fastest path. Use this when the title alone is enough.",
        language: "ts",
        code: [
          'import { toast } from "@varavel/ui/runtime";',
          "",
          'toast("Changes saved.");',
          'toast.success("Deployment completed.");',
        ].join("\n"),
      },
      {
        title: "2. Structured message",
        description:
          "Use `title` and `text` when the notification needs clearer structure or an action.",
        language: "ts",
        code: [
          'import { toast } from "@varavel/ui/runtime";',
          "",
          "const id = toast.warning({",
          '  title: "Storage almost full",',
          '  text: "Archive old logs before tonight\'s backup.",',
          "  closeButton: true,",
          "  action: {",
          '    label: "Review",',
          '    onClick: () => console.log("Open storage report")',
          "  }",
          "});",
          "",
          'toast.success("Storage cleaned", { id, text: "The existing toast was updated." });',
        ].join("\n"),
      },
      {
        title: "3. Update an existing toast",
        description:
          "Reuse the returned id when the same notification should evolve instead of stacking.",
        language: "ts",
        code: [
          'import { toast } from "@varavel/ui/runtime";',
          "",
          "const id = toast.loading({",
          '  title: "Uploading assets",',
          '  text: "Large files can take a few seconds."',
          "});",
          "",
          "toast.success({",
          "  id,",
          '  title: "Upload complete",',
          '  text: "All files are now available."',
          "});",
        ].join("\n"),
      },
      {
        title: "4. Promise lifecycle",
        description:
          "Let a single toast follow an async action from loading to success or failure.",
        language: "ts",
        code: [
          'import { toast } from "@varavel/ui/runtime";',
          "",
          "toast.promise(saveProfile(), {",
          '  title: "Profile update",',
          '  text: "Saving your latest changes.",',
          '  loadingText: "Saving...",',
          '  successText: () => "Profile saved successfully.",',
          '  errorText: () => "Could not save the profile.",',
          "});",
        ].join("\n"),
      },
      {
        title: "5. Dismiss one or all",
        description:
          "Use targeted dismissal for one toast, or clear the full stack when the screen state changes.",
        language: "ts",
        code: [
          'import { toast } from "@varavel/ui/runtime";',
          "",
          'const id = toast("Background sync started.");',
          "",
          "toast.dismiss(id);",
          "toast.dismiss();",
        ].join("\n"),
      },
    ],
    notes: [
      "This runtime is intentionally opinionated: consumers control message content and behavior, not styling classes or ad-hoc visual overrides.",
      "String shorthand is best for brief confirmations. The object form is better when you need `text`, `action`, timing control, or update-by-id behavior.",
      "Every toast method returns the original toast id. Preserve that id if the same toast needs to be updated, replaced, or dismissed later.",
      "`toast.promise(...)` is the cleanest option for async flows because it keeps loading, success, and error feedback in one place.",
    ],
    demo: ToastRuntimeDemo,
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

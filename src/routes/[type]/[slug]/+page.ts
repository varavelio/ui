import { catalog } from "$lib/catalog.js";
import type { EntryGenerator } from "./$types.js";

export const prerender = true;

const runtimeSlugs = [
  "clipboard",
  "theme",
  "dialog",
  "toast",
  "measure",
] as const;

export const entries: EntryGenerator = () => [
  ...catalog.components.map((entry) => ({
    type: "components",
    slug: entry.slug,
  })),
  ...catalog.brand.map((entry) => ({
    type: "brand",
    slug: entry.slug,
  })),
  ...catalog.blocks.map((entry) => ({
    type: "blocks",
    slug: entry.slug,
  })),
  ...runtimeSlugs.map((slug) => ({
    type: "runtime",
    slug,
  })),
];

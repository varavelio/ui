import type { EntryGenerator } from "./$types.js";

export const prerender = true;

const explorerTypes = [
  "components",
  "brand",
  "blocks",
  "layouts",
  "runtime",
] as const;

export const entries: EntryGenerator = () =>
  explorerTypes.map((type) => ({
    type,
  }));

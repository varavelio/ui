/** Component Catalog */

import type { Component as SvelteComponent } from "svelte";

/**
 * Defines the available categories for components in the catalog.
 */
export const componentCategories = [
  "Core Building Blocks",
  "Form Controls",
  "Disclosure & Expansion",
  "Overlays & Floating UI",
  "Status & Feedback",
  "Utilities & Preferences",
] as const;

/**
 * Defines the category of a component, which can be one of the following
 */
export type ComponentCategory = (typeof componentCategories)[number];

/**
 * Defines the structure of a component property, including its name, type,
 * description, and an optional default value.
 */
export type ComponentProp = {
  name: string;
  type: string;
  description: string;
  defaultValue?: string;
};

/**
 * Defines the structure of component metadata used by the explorer catalog.
 */
export type ComponentMeta = {
  name: string;
  slug: string;
  type: "components" | "brand" | "blocks" | "layouts";
  category: ComponentCategory;
  props: ComponentProp[];
  demo?: SvelteComponent;
};

/**
 * Helper function to define component metadata with proper typing.
 *
 * @param entries - One or more component metadata entries.
 * @returns The same entries with catalog typing.
 */
export function components(
  entries: Omit<ComponentMeta, "slug" | "type">[],
): Omit<ComponentMeta, "slug" | "type">[] {
  return entries;
}

/**
 * Helper function to define a component property with proper typing.
 *
 * @param name - The name of the property.
 * @param type - The TypeScript type of the property as a string.
 * @param description - A description of the property for documentation purposes.
 * @param defaultValue - An optional default value for the property, represented as a string.
 * @returns The defined component property metadata.
 */
export function prop(
  name: string,
  type: string,
  description: string,
  defaultValue?: string,
): ComponentProp {
  return { name, type, description, defaultValue };
}

type MetaModuleShape = {
  componentMeta: Omit<ComponentMeta, "slug" | "type">[];
};

function createCatalogEntries(
  type: ComponentMeta["type"],
  metaModules: Record<string, MetaModuleShape>,
) {
  return Object.entries(metaModules)
    .flatMap(([, module]) => module.componentMeta)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((meta) => ({
      ...meta,
      type,
      slug: meta.name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
    }));
}

const componentMetaModules = import.meta.glob<MetaModuleShape>(
  "./components/*/meta.ts",
  { eager: true },
);

const brandMetaModules = import.meta.glob<MetaModuleShape>(
  "./brand/*/meta.ts",
  {
    eager: true,
  },
);

/** Catalog */

export const catalog = {
  components: createCatalogEntries("components", componentMetaModules),
  brand: createCatalogEntries("brand", brandMetaModules),
};

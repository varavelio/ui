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
export function components(entries: ComponentMeta[]): ComponentMeta[] {
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

function createComponentCatalog() {
  // Find all meta.ts modules in the components directory
  type MetaModuleShape = { componentMeta: ComponentMeta[] };

  const metaModules = import.meta.glob<MetaModuleShape>(
    "./components/*/meta.ts",
    { eager: true },
  );

  // Create the catalog
  const componentCatalog: ComponentMeta[] = Object.entries(metaModules)
    .flatMap(([, module]) => module.componentMeta)
    // Sort the components alphabetically by name
    .sort((a, b) => a.name.localeCompare(b.name));

  return componentCatalog;
}

/** Catalog */

export const catalog = {
  components: createComponentCatalog(),
};

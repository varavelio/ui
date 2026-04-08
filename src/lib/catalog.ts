/** Component Catalog */

/**
 * Defines the category of a component, which can be one of the following:
 */
export type ComponentCategory =
  | "Foundations"
  | "Forms"
  | "Disclosure"
  | "Overlay"
  | "Feedback"
  | "Utilities";

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
 * Defines the structure of component metadata, which includes an optional
 * name, a required category, and an array of properties.
 */
export type ComponentMeta = {
  name?: string;
  category: ComponentCategory;
  props: ComponentProp[];
};

/**
 * Helper function to define component metadata with proper typing.
 *
 * @param meta - The metadata object for a component, including its category and props.
 * @returns The defined component metadata.
 */
export function component(meta: ComponentMeta): ComponentMeta {
  return meta;
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
  type MetaModuleShape = { componentMeta: ComponentMeta };
  const metaModules = import.meta.glob<MetaModuleShape>(
    "./components/*/meta.ts",
    { eager: true },
  );

  // Create the catalog
  const componentCatalog: ComponentMeta[] = Object
    // Create an array of meta modules
    .entries(metaModules)
    // Extract component name from the file path
    .map(([path, module]) => {
      const nameMatch = path.match(/\.\/components\/([^/]+)\/meta\.ts$/);
      if (!nameMatch) return null;
      return { ...module.componentMeta, name: nameMatch[1] };
    })
    // Filter out any entries that couldn't be processed and sort by component name
    .filter((entry) => entry !== null)
    // Sort the components alphabetically by name
    .sort((a, b) => a.name.localeCompare(b.name));

  return componentCatalog;
}

/** Catalog */

export const catalog = {
  components: createComponentCatalog(),
};

const LAYOUT_APP_STORAGE_PREFIX = "varavel-ui-layout-app";
const SIDEBAR_WIDTH_STORAGE_KEY_PREFIX = `${LAYOUT_APP_STORAGE_PREFIX}:sidebar-width:`;
const SIDEBAR_WIDTH_CSS_VARIABLE_PREFIX = `--${LAYOUT_APP_STORAGE_PREFIX}-sidebar-width-`;

/**
 * Converts a consumer-provided sidebar id into a stable CSS custom property
 * suffix. Storage keeps the original id; CSS variables need a safer subset.
 */
function normalizeSidebarResizableId(id: string): string {
  return (
    id
      .trim()
      .replace(/[^a-zA-Z0-9_-]+/g, "-")
      .replace(/^-+|-+$/g, "") || "default"
  );
}

/** Returns the localStorage key for a persisted AppLayout sidebar width. */
export function getSidebarWidthStorageKey(id: string): string {
  return `${SIDEBAR_WIDTH_STORAGE_KEY_PREFIX}${id}`;
}

/** Returns the root CSS variable used to pre-apply a persisted sidebar width. */
export function getSidebarWidthCssVariable(id: string): string {
  return `${SIDEBAR_WIDTH_CSS_VARIABLE_PREFIX}${normalizeSidebarResizableId(id)}`;
}

/** Parses a stored sidebar width. Invalid values are treated as missing. */
export function parseStoredSidebarWidth(value: string | null): number | null {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

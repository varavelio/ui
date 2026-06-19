/**
 * @fileoverview Varavel UI AppLayout bootstrapper.
 *
 * Applies persisted resizable AppLayout sidebar widths before the first paint.
 * This prevents a visible layout shift when `sidebarResizableId` is used and a
 * custom width was saved in a previous session.
 */

(() => {
  const STORAGE_KEY_PREFIX = "varavel-ui-layout-app:sidebar-width:";
  const CSS_VARIABLE_PREFIX = "--varavel-ui-layout-app-sidebar-width-";

  /**
   * Converts a sidebar id into a safe CSS custom property suffix.
   *
   * @param {string} id - Consumer-provided sidebar id.
   * @returns {string} CSS-variable-safe id suffix.
   */
  const normalizeId = (id) =>
    id
      .trim()
      .replace(/[^a-zA-Z0-9_-]+/g, "-")
      .replace(/^-+|-+$/g, "") || "default";

  /**
   * Parses a stored CSS pixel width.
   *
   * @param {string | null} value - Raw localStorage value.
   * @returns {number | null} Parsed width, or `null` when invalid.
   */
  const parseWidth = (value) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  };

  try {
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (!key?.startsWith(STORAGE_KEY_PREFIX)) continue;

      const width = parseWidth(localStorage.getItem(key));
      if (width === null) continue;

      const id = key.slice(STORAGE_KEY_PREFIX.length);
      document.documentElement.style.setProperty(
        `${CSS_VARIABLE_PREFIX}${normalizeId(id)}`,
        `${width}px`,
      );
    }
  } catch (_) {
    // Storage can be unavailable in private, embedded, or restricted contexts.
  }
})();

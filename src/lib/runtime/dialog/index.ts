import {
  type AlertOptions,
  type ConfirmOptions,
  dialogStore,
} from "./store.svelte.ts";

/**
 * Public API for runtime dialog operations.
 * Provides easy-to-use Promise-based utilities.
 */
export const dialog = {
  /**
   * Triggers a confirmation dialog.
   *
   * @example
   * ```ts
   * const confirmed = await dialog.confirm({
   *   title: "Confirm Deletion",
   *   text: "This action cannot be undone."
   * });
   * ```
   *
   * @param options Configuration for the confirm dialog or a simple string to use as the confirm title.
   * @returns A promise that resolves to `true` on confirmation and `false` on cancellation.
   */
  confirm(options: ConfirmOptions | string): Promise<boolean> {
    if (typeof options === "string") {
      options = {
        title: options,
        cancelText: "Cancel",
        actionText: "Confirm",
      };
    }
    return dialogStore.openConfirm(options);
  },

  /**
   * Triggers an alert dialog.
   *
   * @example
   * ```ts
   * await dialog.alert({
   *   title: "Success",
   *   text: "Profile updated successfully.",
   *   color: "success"
   * });
   * ```
   *
   * @param options Configuration for the alert dialog or a simple string to use as the alert title.
   * @returns A promise that resolves when the user closes the alert.
   */
  alert(options: AlertOptions | string): Promise<void> {
    if (typeof options === "string") {
      options = {
        title: options,
        closeText: "OK",
      };
    }
    return dialogStore.openAlert(options);
  },
};

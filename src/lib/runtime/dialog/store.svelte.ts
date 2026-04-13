import type { ConfirmProps } from "./Confirm.svelte";
import type { AlertProps } from "./Alert.svelte";

/**
 * Options for the `dialog.confirm` function.
 */
export type ConfirmOptions = Omit<ConfirmProps, "onCancel" | "onConfirm">;

/**
 * Options for the `dialog.alert` function.
 */
export type AlertOptions = Omit<AlertProps, "onClose">;

/**
 * Internal state representation for an active confirm dialog.
 */
export interface ActiveConfirm extends ConfirmProps {
  id: string;
}

/**
 * Internal state representation for an active alert dialog.
 */
export interface ActiveAlert extends AlertProps {
  id: string;
}

/**
 * Manages the state and lifecycle of runtime dialogs.
 */
class DialogStore {
  /** @private Internal counter for unique dialog IDs. */
  private currentId = 0;

  /**
   * Reactive list of currently active confirm dialogs.
   * @readonly
   */
  public confirms: ActiveConfirm[] = $state([]);

  /**
   * Reactive list of currently active alert dialogs.
   * @readonly
   */
  public alerts: ActiveAlert[] = $state([]);

  /**
   * Generates a unique string ID for a new dialog.
   * @private
   */
  private getNextId(): string {
    return (this.currentId++).toString();
  }

  /**
   * Removes a confirm dialog from the store by its ID.
   * @private
   */
  private closeConfirm(id: string): void {
    this.confirms = this.confirms.filter((confirm) => confirm.id !== id);
  }

  /**
   * Removes an alert dialog from the store by its ID.
   * @private
   */
  private closeAlert(id: string): void {
    this.alerts = this.alerts.filter((alert) => alert.id !== id);
  }

  /**
   * Opens a new confirm dialog and returns a promise that resolves to the user's choice.
   */
  public openConfirm(options: ConfirmOptions): Promise<boolean> {
    return new Promise((resolve) => {
      const id = this.getNextId();

      const newConfirm: ActiveConfirm = {
        ...options,
        id,
        onCancel: () => {
          this.closeConfirm(id);
          resolve(false);
        },
        onConfirm: () => {
          this.closeConfirm(id);
          resolve(true);
        },
      };

      this.confirms = [...this.confirms, newConfirm];
    });
  }

  /**
   * Opens a new alert dialog and returns a promise that resolves when closed.
   */
  public openAlert(options: AlertOptions): Promise<void> {
    return new Promise((resolve) => {
      const id = this.getNextId();

      const newAlert: ActiveAlert = {
        ...options,
        id,
        onClose: () => {
          this.closeAlert(id);
          resolve();
        },
      };

      this.alerts = [...this.alerts, newAlert];
    });
  }
}

/**
 * Global singleton instance of the DialogStore.
 */
export const dialogStore = new DialogStore();

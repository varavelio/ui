import type { MouseEventHandler } from "svelte/elements";
import { toast as sonnerToast, type ToastT } from "svelte-sonner";

/**
 * Internal toast identifier returned by Sonner.
 */
type ToastId = string | number;

/**
 * Public input accepted by the shorthand toast methods.
 */
type ToastInput = ToastOptions | string;

/**
 * Promise or lazy promise factory accepted by `toast.promise(...)`.
 */
type ToastPromise<T> = Promise<T> | (() => Promise<T>);

/**
 * Default toast lifetime used across the runtime.
 */
const DEFAULT_TOAST_DURATION = 4000;

/**
 * Opinionated options for Varavel toasts.
 *
 * This runtime intentionally exposes content and behavior only.
 * Visual customization is handled by the shared provider so every toast stays
 * consistent with the design system.
 */
export interface ToastOptions {
  /**
   * Existing toast id used to update a previously created toast.
   *
   * Leave it undefined to create a new toast.
   * Pass a previous id to replace that toast in place.
   */
  id?: ToastId;

  /**
   * Main toast message.
   *
   * This becomes the visible toast title.
   */
  title?: string;

  /**
   * Supporting text shown below the title.
   *
   * Use this for context, next steps, or a short explanation.
   */
  text?: string;

  /**
   * Optional action button.
   *
   * Use this for a single clear follow-up action such as Undo, Retry, or View.
   */
  action?: {
    /**
     * Button label shown inside the toast action.
     */
    label: string;

    /**
     * Click handler fired when the action button is pressed.
     */
    onClick: MouseEventHandler<HTMLButtonElement>;
  };

  /**
   * Toast lifetime in milliseconds.
   *
   * @default 4000
   *
   * Use `Number.POSITIVE_INFINITY` to keep the toast open until it is
   * dismissed manually or replaced with the same id.
   */
  duration?: number;

  /**
   * Whether the toast can be dismissed by the user.
   *
   * @default true
   */
  dismissible?: boolean;

  /**
   * Whether to show the close button.
   *
   * @default false
   */
  closeButton?: boolean;

  /**
   * Called when the toast is manually dismissed.
   *
   * This runs when the user closes the toast intentionally.
   */
  onDismiss?: (toast: ToastT) => void;

  /**
   * Called when the toast closes automatically.
   *
   * This runs after the toast times out naturally.
   */
  onAutoClose?: (toast: ToastT) => void;
}

/**
 * Promise-specific toast options.
 *
 * This extends `ToastOptions`, so you can still use `title`, `text`, `id`,
 * `duration`, `action`, and dismiss-related callbacks while also defining the
 * loading/success/error messages.
 */
export interface ToastPromiseOptions<T> extends ToastOptions {
  /**
   * Message shown while the promise is pending.
   *
   * If omitted, Sonner uses its default loading behavior.
   */
  loadingText?: string | (() => string);

  /**
   * Message shown when the promise resolves.
   *
   * Receives the resolved promise value.
   */
  successText?: string | ((data: T) => string);

  /**
   * Message shown when the promise rejects.
   *
   * Receives the thrown error or rejection value.
   */
  errorText?: string | ((error: unknown) => string);

  /**
   * Called after the promise settles.
   *
   * Runs after success or error handling finishes.
   */
  finally?: () => void | Promise<void>;
}

/**
 * Shared signature used by `toast(...)` and the variant helpers.
 */
type ToastMethod = (
  input?: ToastInput,
  options?: ToastOptions,
) => ToastId | undefined;

/**
 * Public runtime toast API.
 */
interface ToastApi extends ToastMethod {
  /**
   * Shows a success toast.
   */
  success: ToastMethod;

  /**
   * Shows an error toast.
   */
  error: ToastMethod;

  /**
   * Shows an informational toast.
   */
  info: ToastMethod;

  /**
   * Shows a warning toast.
   */
  warning: ToastMethod;

  /**
   * Shows a loading toast.
   */
  loading: ToastMethod;

  /**
   * Binds a toast lifecycle to a promise.
   */
  promise: <T>(
    promise: ToastPromise<T>,
    options?: ToastPromiseOptions<T>,
  ) => ToastId | undefined;

  /**
   * Dismisses one toast by id or every toast when no id is provided.
   */
  dismiss: (id?: ToastId) => ToastId | undefined;
}

function resolveInput(input?: ToastInput, options?: ToastOptions) {
  if (typeof input === "string") {
    return {
      title: input,
      options: options ?? {},
    };
  }

  return {
    title: input?.title ?? options?.title ?? "",
    options: input ?? options ?? {},
  };
}

/**
 * Maps the opinionated runtime options to the smaller Sonner payload we allow.
 */
function toSonnerOptions(options: ToastOptions = {}) {
  const {
    title: _title,
    text,
    action,
    duration = DEFAULT_TOAST_DURATION,
    ...rest
  } = options;

  return {
    ...rest,
    description: text,
    duration,
    action: action
      ? {
          label: action.label,
          onClick: action.onClick,
        }
      : undefined,
  };
}

/**
 * Calls a Sonner toast method using either string shorthand or the object API.
 */
function show(
  method: (
    message: string,
    options?: ReturnType<typeof toSonnerOptions>,
  ) => ToastId,
  input?: ToastInput,
  options?: ToastOptions,
) {
  const resolved = resolveInput(input, options);
  return method(resolved.title, toSonnerOptions(resolved.options));
}

/**
 * Opens runtime toasts with a small, opinionated API built on top of `svelte-sonner`.
 *
 * Supported combinations:
 * - `const id = toast("Saved")`
 * - `toast({ title: "Saved", text: "Changes are now live." })`
 * - `toast.success("Done")`
 * - `toast.error({ title: "Failed", text: "Please retry." })`
 * - `toast.loading({ title: "Uploading..." })`
 * - `toast.success("Upload complete", { id })` to update an existing toast
 * - `toast.promise(fetchData(), { loadingText, successText, errorText })`
 * - `toast.dismiss(id)` to dismiss one toast
 * - `toast.dismiss()` to dismiss all visible toasts
 */
export const toast = Object.assign(
  (input?: ToastInput, options?: ToastOptions) =>
    show(sonnerToast, input, options),
  {
    success: (input?: ToastInput, options?: ToastOptions) =>
      show(sonnerToast.success, input, options),

    error: (input?: ToastInput, options?: ToastOptions) =>
      show(sonnerToast.error, input, options),

    info: (input?: ToastInput, options?: ToastOptions) =>
      show(sonnerToast.info, input, options),

    warning: (input?: ToastInput, options?: ToastOptions) =>
      show(sonnerToast.warning, input, options),

    loading: (input?: ToastInput, options?: ToastOptions) =>
      show(sonnerToast.loading, input, options),

    promise: <T>(
      promise: ToastPromise<T>,
      options?: ToastPromiseOptions<T>,
    ) => {
      const { loadingText, successText, errorText, text, ...rest } =
        options ?? {};

      return sonnerToast.promise(promise, {
        ...toSonnerOptions({ ...rest, text }),
        loading: loadingText,
        success: successText,
        error: errorText,
        finally: options?.finally,
      });
    },

    dismiss: (id?: ToastId) => sonnerToast.dismiss(id),
  },
) as ToastApi;

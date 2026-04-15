import { toast } from "../toast/index.ts";

const DEFAULT_SUCCESS_MESSAGE = "Copied to clipboard.";
const DEFAULT_ERROR_MESSAGE = "Could not copy to clipboard.";

/**
 * Options for clipboard copy operations.
 */
export interface ClipboardCopyOptions {
  /**
   * Whether to suppress the default toast feedback.
   *
   * Useful when implementing custom feedback or non-interactive copy actions.
   *
   * @default false
   */
  quiet?: boolean;

  /**
   * The message displayed in the success toast.
   */
  successMessage?: string;

  /**
   * The message displayed in the error toast.
   */
  errorMessage?: string;
}

/**
 * Checks if the modern Navigator Clipboard API is available and usable.
 */
function canUseClipboardApi(): boolean {
  return typeof navigator !== "undefined" && !!navigator.clipboard?.writeText;
}

/**
 * Checks if the document.execCommand fallback is available.
 */
function canUseExecCommand(): boolean {
  return (
    typeof document !== "undefined" &&
    typeof document.execCommand === "function"
  );
}

/**
 * Attempts to copy text using the modern asynchronous Clipboard API.
 *
 * This is the preferred method for modern browsers as it provides a
 * cleaner and more reliable interaction.
 */
async function copyWithClipboardApi(text: string): Promise<boolean> {
  if (!canUseClipboardApi()) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * Attempts to copy text using the execCommand fallback.
 *
 * This method involves creating a temporary hidden textarea, focusing it,
 * and triggering the 'copy' command. It ensures compatibility with browsers
 * that lack modern Clipboard API support.
 */
function copyWithExecCommand(text: string): boolean {
  if (!canUseExecCommand() || typeof document.body === "undefined") {
    return false;
  }

  const textarea = document.createElement("textarea");
  const selection = document.getSelection();
  const activeElement = document.activeElement as HTMLElement | null;
  const previousRange = selection?.rangeCount ? selection.getRangeAt(0) : null;

  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.setAttribute("aria-hidden", "true");
  textarea.style.position = "fixed";
  textarea.style.top = "0";
  textarea.style.left = "0";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";

  document.body.append(textarea);
  textarea.focus();
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);

  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    textarea.remove();

    if (selection) {
      selection.removeAllRanges();
      if (previousRange) {
        selection.addRange(previousRange);
      }
    }

    activeElement?.focus?.();
  }
}

/**
 * Runtime clipboard helper providing a standardized, multi-tiered copy strategy
 * with integrated toast feedback.
 */
export const clipboard = {
  /**
   * Whether any known clipboard writing method is supported in the current environment.
   */
  isSupported(): boolean {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return false;
    }
    return canUseClipboardApi() || canUseExecCommand();
  },

  /**
   * Copies text to the clipboard using the best available method.
   *
   * Automatically provides toast feedback unless `quiet` is enabled.
   *
   * @param text The plain text to copy.
   * @param options Configuration for feedback and behavior.
   * @returns A promise that resolves to `true` if the text was successfully copied.
   */
  async copy(
    text: string,
    options: ClipboardCopyOptions = {},
  ): Promise<boolean> {
    const {
      quiet = false,
      successMessage = DEFAULT_SUCCESS_MESSAGE,
      errorMessage = DEFAULT_ERROR_MESSAGE,
    } = options;

    const didCopy =
      (await copyWithClipboardApi(text)) || copyWithExecCommand(text);

    if (!quiet) {
      if (didCopy) {
        toast.success(successMessage);
      } else {
        toast.error(errorMessage);
      }
    }

    return didCopy;
  },
};

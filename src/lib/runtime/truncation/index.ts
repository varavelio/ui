import type { Attachment } from "svelte/attachments";

/**
 * Checks if the element's text is truncated (scrollWidth > clientWidth).
 * It runs initially and on 'mouseenter'.
 */
export function checkTruncation(
  callback: (isTruncated: boolean) => void,
): Attachment {
  return (node: Element) => {
    const el = node as HTMLElement;

    function check() {
      callback(el.scrollWidth > el.clientWidth);
    }

    el.addEventListener("mouseenter", check);
    check();

    return () => {
      el.removeEventListener("mouseenter", check);
    };
  };
}

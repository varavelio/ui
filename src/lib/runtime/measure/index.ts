/**
 * @fileoverview Svelte attachment for typed DOM measurement with opt-in layout,
 * scroll, offset, and computed-style tracking.
 */

import type { Attachment } from "svelte/attachments";

/**
 * Internal event targets that can trigger a fresh measurement pass.
 *
 * This includes the measured element itself, scrollable ancestors, and the
 * global window object when viewport-relative offsets are enabled.
 */
type ScrollHost = HTMLElement | (Window & typeof globalThis);

/**
 * Fallback zero-offset object used when the measured node has no parent element.
 */
const EMPTY_OFFSETS = {
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
} satisfies MeasureOffsets;

/**
 * Positional offsets measured from a parent element or the viewport edges.
 */
export interface MeasureOffsets {
  /** Distance from the top edge. */
  top: number;
  /** Distance from the left edge. */
  left: number;
  /** Distance from the bottom edge. */
  bottom: number;
  /** Distance from the right edge. */
  right: number;
}

/**
 * Fast box metrics available without computed styles.
 */
export interface MeasureSize {
  /** Inner width including padding but excluding borders, margins, and scrollbars. */
  clientWidth: number;
  /** Inner height including padding but excluding borders, margins, and scrollbars. */
  clientHeight: number;
  /** Border-box width reported by layout. */
  offsetWidth: number;
  /** Border-box height reported by layout. */
  offsetHeight: number;
}

/**
 * Current element scroll state.
 */
export interface MeasureScroll {
  /** Horizontal scroll position in CSS pixels. */
  left: number;
  /** Vertical scroll position in CSS pixels. */
  top: number;
  /** Whether the element is currently scrolled away from the top edge. */
  isTopScrolled: boolean;
  /** Whether the element is currently scrolled away from the left edge. */
  isLeftScrolled: boolean;
}

/**
 * Parsed numeric CSS box metrics.
 */
export interface MeasureStyle {
  /** Computed CSS width parsed as a number. */
  width: number;
  /** Computed CSS height parsed as a number. */
  height: number;
  /** Computed CSS margin-top parsed as a number. */
  marginTop: number;
  /** Computed CSS margin-right parsed as a number. */
  marginRight: number;
  /** Computed CSS margin-bottom parsed as a number. */
  marginBottom: number;
  /** Computed CSS margin-left parsed as a number. */
  marginLeft: number;
  /** Computed CSS padding-top parsed as a number. */
  paddingTop: number;
  /** Computed CSS padding-right parsed as a number. */
  paddingRight: number;
  /** Computed CSS padding-bottom parsed as a number. */
  paddingBottom: number;
  /** Computed CSS padding-left parsed as a number. */
  paddingLeft: number;
  /** Computed CSS border-top-width parsed as a number. */
  borderTop: number;
  /** Computed CSS border-right-width parsed as a number. */
  borderRight: number;
  /** Computed CSS border-bottom-width parsed as a number. */
  borderBottom: number;
  /** Computed CSS border-left-width parsed as a number. */
  borderLeft: number;
}

/**
 * The measurement payload reported by the attachment.
 */
export interface MeasureDetail {
  /** The exact element currently being measured. */
  element: HTMLElement;
  /** Fast box metrics that are always collected. */
  size: MeasureSize;
  /** Scroll metrics collected from the measured element. */
  scroll: MeasureScroll;
  /** Parent-relative offsets, available only when `trackOffsets` is enabled. */
  parentOffset?: MeasureOffsets;
  /** Viewport-relative offsets, available only when `trackOffsets` is enabled. */
  viewportOffset?: MeasureOffsets;
  /** Parsed computed styles, available only when `trackStyles` is enabled. */
  style?: MeasureStyle;
}

/**
 * Options for the {@link measure} attachment factory.
 */
export interface MeasureOptions {
  /**
   * Callback invoked after each coalesced measurement cycle.
   *
   * This callback is required because the runtime reports data through a typed
   * attachment callback instead of dispatching DOM custom events.
   */
  onMeasure: (detail: MeasureDetail) => void;

  /**
   * Re-measures when the element itself scrolls.
   *
   * Enable this for surfaces whose own scroll position is part of the UI logic,
   * such as sticky headers, scroll shadows, or virtualized panels.
   *
   * @default false
   */
  trackScroll?: boolean;

  /**
   * Includes parent and viewport offsets and listens to ancestor scroll hosts.
   *
   * Enable this when placement logic needs parent-relative or viewport-relative
   * geometry, such as floating panels, pinned toolbars, or split-pane math.
   *
   * @default false
   */
  trackOffsets?: boolean;

  /**
   * Includes parsed computed-style box metrics.
   *
   * Enable this only when numeric margin, padding, border, width, or height
   * values are truly needed, because it requires a computed-style read.
   *
   * @default false
   */
  trackStyles?: boolean;
}

/**
 * Parses a CSS pixel-like string into a finite number.
 *
 * Non-finite results fall back to `0` so the measurement payload stays stable
 * even when the browser returns unexpected computed-style values.
 *
 * @param value The raw CSS value returned by computed styles.
 * @returns The parsed numeric value, or `0` when parsing fails.
 */
function parsePixelValue(value: string): number {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

/**
 * Schedules work for the next animation frame when possible.
 *
 * A `setTimeout(..., 0)` fallback keeps the helper safe in environments where
 * `requestAnimationFrame` is unavailable.
 *
 * @param callback The work to run in the next scheduled frame.
 * @returns A cancellation function that clears the pending frame or timeout.
 */
function scheduleFrame(callback: () => void): () => void {
  if (typeof globalThis.requestAnimationFrame === "function") {
    const frame = globalThis.requestAnimationFrame(callback);
    return () => {
      globalThis.cancelAnimationFrame?.(frame);
    };
  }

  const timeout = globalThis.setTimeout(callback, 0);
  return () => {
    globalThis.clearTimeout(timeout);
  };
}

/**
 * Returns whether an element can produce scroll-driven layout changes.
 *
 * @param element The ancestor candidate to inspect.
 * @returns `true` when the element can scroll horizontally or vertically.
 */
function isScrollable(element: HTMLElement): boolean {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

/**
 * Collects the event targets that should trigger a fresh measurement pass.
 *
 * The measured node is included when `trackScroll` is enabled. Scrollable
 * ancestors and the global window are included when `trackOffsets` is enabled.
 * This keeps the attachment opt-in and avoids unnecessary listeners by default.
 *
 * @param node The measured element.
 * @param options The measurement options that control which signals matter.
 * @returns A de-duplicated list of scroll hosts to observe.
 */
function getScrollHosts(
  node: HTMLElement,
  options: Pick<MeasureOptions, "trackOffsets" | "trackScroll">,
): ScrollHost[] {
  const hosts = new Set<ScrollHost>();

  if (options.trackScroll) {
    hosts.add(node);
  }

  if (options.trackOffsets) {
    let parent = node.parentElement;
    while (parent) {
      if (isScrollable(parent)) {
        hosts.add(parent);
      }
      parent = parent.parentElement;
    }

    hosts.add(globalThis as Window & typeof globalThis);
  }

  return [...hosts];
}

/**
 * Reads parent-relative and viewport-relative offsets for the measured node.
 *
 * @param node The measured element.
 * @returns The parent and viewport offsets derived from layout geometry.
 */
function getOffsets(node: HTMLElement) {
  const nodeRect = node.getBoundingClientRect();
  const parentRect = node.parentElement?.getBoundingClientRect();

  const parentOffset = parentRect
    ? {
        top: nodeRect.top - parentRect.top,
        left: nodeRect.left - parentRect.left,
        bottom: parentRect.bottom - nodeRect.bottom,
        right: parentRect.right - nodeRect.right,
      }
    : { ...EMPTY_OFFSETS };

  return {
    parentOffset,
    viewportOffset: {
      top: nodeRect.top,
      left: nodeRect.left,
      bottom: globalThis.innerHeight - nodeRect.bottom,
      right: globalThis.innerWidth - nodeRect.right,
    },
  } satisfies Pick<MeasureDetail, "parentOffset" | "viewportOffset">;
}

/**
 * Reads and normalizes computed box styles for the measured node.
 *
 * @param node The measured element.
 * @returns Parsed numeric style metrics, or `undefined` when computed styles are unavailable.
 */
function getStyle(node: HTMLElement): MeasureStyle | undefined {
  if (typeof globalThis.getComputedStyle !== "function") {
    return undefined;
  }

  const style = globalThis.getComputedStyle(node);

  return {
    width: parsePixelValue(style.width),
    height: parsePixelValue(style.height),
    marginTop: parsePixelValue(style.marginTop),
    marginRight: parsePixelValue(style.marginRight),
    marginBottom: parsePixelValue(style.marginBottom),
    marginLeft: parsePixelValue(style.marginLeft),
    paddingTop: parsePixelValue(style.paddingTop),
    paddingRight: parsePixelValue(style.paddingRight),
    paddingBottom: parsePixelValue(style.paddingBottom),
    paddingLeft: parsePixelValue(style.paddingLeft),
    borderTop: parsePixelValue(style.borderTopWidth),
    borderRight: parsePixelValue(style.borderRightWidth),
    borderBottom: parsePixelValue(style.borderBottomWidth),
    borderLeft: parsePixelValue(style.borderLeftWidth),
  };
}

/**
 * Reads the current measurement payload for the target element.
 *
 * Fast size and scroll metrics are always included. Offset and style reads are
 * only performed when the corresponding opt-in flags are enabled.
 *
 * @param node The measured element.
 * @param options The measurement options that control optional reads.
 * @returns A complete measurement payload for the current frame.
 */
function readMeasure(
  node: HTMLElement,
  options: Pick<MeasureOptions, "trackOffsets" | "trackStyles">,
): MeasureDetail {
  const detail: MeasureDetail = {
    element: node,
    size: {
      clientWidth: node.clientWidth,
      clientHeight: node.clientHeight,
      offsetWidth: node.offsetWidth,
      offsetHeight: node.offsetHeight,
    },
    scroll: {
      left: node.scrollLeft,
      top: node.scrollTop,
      isTopScrolled: node.scrollTop > 0,
      isLeftScrolled: node.scrollLeft > 0,
    },
  };

  if (options.trackOffsets) {
    Object.assign(detail, getOffsets(node));
  }

  if (options.trackStyles) {
    detail.style = getStyle(node);
  }

  return detail;
}

/**
 * Creates a Svelte attachment that reports DOM measurements through a typed callback.
 *
 * The attachment always reports fast element box and scroll metrics. More
 * expensive reads such as viewport offsets, parent offsets, and computed styles
 * stay opt-in so simple measurement use cases remain lightweight.
 *
 * Multiple DOM signals are coalesced into a single callback per animation frame.
 * This keeps resize, scroll, and viewport-driven reflows from flooding UI state
 * updates when several changes happen in quick succession.
 *
 * @param options Configuration that controls the callback and optional reads.
 * @returns A Svelte attachment ready to use with `{@attach measure(...)}`.
 * @throws {TypeError} Thrown when `onMeasure` is missing or not a function.
 *
 * @example
 * ```svelte
 * <script lang="ts">
 *   import { measure, type MeasureDetail } from "@varavel/ui/runtime";
 *
 *   let width = $state(0);
 *
 *   function handleMeasure(detail: MeasureDetail) {
 *     width = detail.size.clientWidth;
 *   }
 * </script>
 *
 * <div {@attach measure({ onMeasure: handleMeasure })}>
 *   Width: {width}px
 * </div>
 * ```
 */
export function measure(options: MeasureOptions): Attachment<HTMLElement> {
  if (typeof options?.onMeasure !== "function") {
    throw new TypeError("measure(...) requires an onMeasure callback.");
  }

  return (node) => {
    let destroyed = false;
    let scheduled = false;
    let cancelScheduledFrame = () => {};

    const notify = () => {
      if (destroyed) {
        scheduled = false;
        cancelScheduledFrame = () => {};
        return;
      }

      scheduled = false;
      cancelScheduledFrame = () => {};
      options.onMeasure(readMeasure(node, options));
    };

    const scheduleMeasure = () => {
      if (destroyed || scheduled) {
        return;
      }

      scheduled = true;
      cancelScheduledFrame = scheduleFrame(notify);
    };

    const observer =
      typeof globalThis.ResizeObserver === "function"
        ? new globalThis.ResizeObserver(() => {
            scheduleMeasure();
          })
        : null;

    const scrollHosts = getScrollHosts(node, options);

    observer?.observe(node);
    globalThis.addEventListener("resize", scheduleMeasure);

    for (const host of scrollHosts) {
      host.addEventListener("scroll", scheduleMeasure);
    }

    scheduleMeasure();

    return () => {
      destroyed = true;
      cancelScheduledFrame();
      observer?.disconnect();
      globalThis.removeEventListener("resize", scheduleMeasure);

      for (const host of scrollHosts) {
        host.removeEventListener("scroll", scheduleMeasure);
      }
    };
  };
}

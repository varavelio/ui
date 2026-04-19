<script lang="ts">
  import { Alert, Badge, Button, Card } from "$lib/components/index.js";
  import type { MeasureDetail } from "$lib/runtime/index.js";
  import { measure } from "$lib/runtime/index.js";

  const sampleRows = [
    "Resize the panel from its bottom-right corner to trigger the ResizeObserver path.",
    "Scroll updates are opt-in so deeply nested surfaces can stay lightweight by default.",
    "Offset reads include both the parent box and the viewport edges when enabled.",
    "Style reads parse numeric margin, padding, border, width, and height values.",
    "All DOM signals are coalesced into a single measurement per animation frame.",
  ];

  let trackScroll = $state(true);
  let trackOffsets = $state(true);
  let trackStyles = $state(false);
  let measureCount = $state(0);
  let latestMeasure = $state<MeasureDetail | null>(null);

  function _handleMeasure(detail: MeasureDetail) {
    latestMeasure = detail;
    measureCount += 1;
  }

  function toggleFlag(flag: "trackScroll" | "trackOffsets" | "trackStyles") {
    if (flag === "trackScroll") {
      trackScroll = !trackScroll;
      return;
    }

    if (flag === "trackOffsets") {
      trackOffsets = !trackOffsets;
      return;
    }

    trackStyles = !trackStyles;
  }

  function scrollToTop() {
    latestMeasure?.element.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  function scrollDeeper() {
    latestMeasure?.element.scrollTo({
      top: Math.max(
        (latestMeasure.element.scrollHeight -
          latestMeasure.element.clientHeight) *
          0.6,
        0,
      ),
      behavior: "smooth",
    });
  }

  function formatNumber(value: number | undefined) {
    if (typeof value !== "number" || Number.isNaN(value)) {
      return "—";
    }

    return value.toFixed(value % 1 === 0 ? 0 : 1);
  }

  let enabledFlags = $derived(
    Number(trackScroll) + Number(trackOffsets) + Number(trackStyles),
  );
</script>

<div class="space-y-4">
  <Card class="space-y-4">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h4 class="text-lg font-semibold tracking-tight">Measure runtime</h4>
        <p class="text-sm text-content-muted">
          Attach <code>measure(...)</code> directly to a node to stream live
          box, scroll, offset, and style data. The more expensive reads stay
          opt-in.
        </p>
      </div>

      <div class="flex flex-wrap gap-2">
        <Badge color="info" variant="outline">
          <code>&#123;@attach measure(...)&#125;</code>
        </Badge>
        <Badge color="neutral" variant="solid">{enabledFlags}/3 flags</Badge>
      </div>
    </div>

    <div class="flex flex-wrap gap-2">
      <Button
        variant={trackScroll ? "outline" : "ghost"}
        color={trackScroll ? "info" : "neutral"}
        onclick={() => toggleFlag("trackScroll")}
      >
        {trackScroll ? "trackScroll on" : "trackScroll off"}
      </Button>
      <Button
        variant={trackOffsets ? "outline" : "ghost"}
        color={trackOffsets ? "info" : "neutral"}
        onclick={() => toggleFlag("trackOffsets")}
      >
        {trackOffsets ? "trackOffsets on" : "trackOffsets off"}
      </Button>
      <Button
        variant={trackStyles ? "outline" : "ghost"}
        color={trackStyles ? "info" : "neutral"}
        onclick={() => toggleFlag("trackStyles")}
      >
        {trackStyles ? "trackStyles on" : "trackStyles off"}
      </Button>
    </div>
  </Card>

  <Card bg="300" class="space-y-4">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h4
          class="text-sm font-semibold uppercase tracking-[0.14em] text-content-muted"
        >
          Live status
        </h4>
        <p class="text-sm text-content-muted">
          Resize or scroll the measured node to see the payload change in place.
        </p>
      </div>

      <div class="flex flex-wrap gap-2">
        <Badge color="success" variant="solid">{measureCount} reads</Badge>
        <Badge
          color={latestMeasure?.scroll.isTopScrolled ? "warning" : "neutral"}
          variant="soft"
        >
          {latestMeasure?.scroll.isTopScrolled ? "scrolled" : "at top"}
        </Badge>
      </div>
    </div>

    <div
      class="grid gap-4 desk:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]"
    >
      <div class="space-y-3">
        <div class="rounded-lg border border-base-400 bg-base-100 p-3">
          <div
            class="m-1 h-56 resize overflow-auto rounded-md border border-base-400 bg-base-200 p-4"
            {@attach measure({
              onMeasure: _handleMeasure,
              trackScroll,
              trackOffsets,
              trackStyles,
            })}
          >
            <div class="space-y-4">
              <div class="space-y-1">
                <p
                  class="text-[11px] font-medium uppercase tracking-[0.14em] text-content-muted"
                >
                  Measured element
                </p>
                <p class="text-sm text-content">
                  This node is scrollable, resizable, padded, bordered, and
                  slightly offset inside its parent so every flag has something
                  real to report.
                </p>
              </div>

              {#each sampleRows as row (row)}
                <div
                  class="rounded-sm border border-base-400 bg-base-100 p-3 text-sm text-content-muted"
                >
                  {row}
                </div>
              {/each}
            </div>
          </div>
        </div>

        <div class="flex flex-wrap gap-2">
          <Button variant="outline" onclick={scrollDeeper}>
            Scroll deeper
          </Button>
          <Button variant="ghost" onclick={scrollToTop}>Reset scroll</Button>
        </div>
      </div>

      <div
        class="space-y-3 rounded-lg border border-base-400 bg-base-100 p-3 text-sm"
      >
        <div class="grid gap-2 sm:grid-cols-2">
          <div class="rounded-md border border-base-400 bg-base-200 p-3">
            <p
              class="text-[11px] font-medium uppercase tracking-[0.14em] text-content-muted"
            >
              Size
            </p>
            <p class="mt-2 font-mono text-xs text-content">
              client: {formatNumber(latestMeasure?.size.clientWidth)} ×
              {formatNumber(latestMeasure?.size.clientHeight)}
            </p>
            <p class="mt-1 font-mono text-xs text-content-muted">
              offset: {formatNumber(latestMeasure?.size.offsetWidth)} ×
              {formatNumber(latestMeasure?.size.offsetHeight)}
            </p>
          </div>

          <div class="rounded-md border border-base-400 bg-base-200 p-3">
            <p
              class="text-[11px] font-medium uppercase tracking-[0.14em] text-content-muted"
            >
              Scroll
            </p>
            <p class="mt-2 font-mono text-xs text-content">
              x: {formatNumber(latestMeasure?.scroll.left)} / y:
              {formatNumber(latestMeasure?.scroll.top)}
            </p>
            <p class="mt-1 text-xs text-content-muted">
              {trackScroll ? "Live scroll tracking enabled." : "Scroll tracking disabled."}
            </p>
          </div>

          <div class="rounded-md border border-base-400 bg-base-200 p-3">
            <p
              class="text-[11px] font-medium uppercase tracking-[0.14em] text-content-muted"
            >
              Parent offset
            </p>
            <p class="mt-2 font-mono text-xs text-content">
              t {formatNumber(latestMeasure?.parentOffset?.top)} · l
              {formatNumber(latestMeasure?.parentOffset?.left)}
            </p>
            <p class="mt-1 font-mono text-xs text-content-muted">
              b {formatNumber(latestMeasure?.parentOffset?.bottom)} · r
              {formatNumber(latestMeasure?.parentOffset?.right)}
            </p>
          </div>

          <div class="rounded-md border border-base-400 bg-base-200 p-3">
            <p
              class="text-[11px] font-medium uppercase tracking-[0.14em] text-content-muted"
            >
              Viewport offset
            </p>
            <p class="mt-2 font-mono text-xs text-content">
              t {formatNumber(latestMeasure?.viewportOffset?.top)} · l
              {formatNumber(latestMeasure?.viewportOffset?.left)}
            </p>
            <p class="mt-1 font-mono text-xs text-content-muted">
              b {formatNumber(latestMeasure?.viewportOffset?.bottom)} · r
              {formatNumber(latestMeasure?.viewportOffset?.right)}
            </p>
          </div>
        </div>

        <div class="rounded-md border border-base-400 bg-base-200 p-3">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <p
              class="text-[11px] font-medium uppercase tracking-[0.14em] text-content-muted"
            >
              Style metrics
            </p>
            <Badge color={trackStyles ? "info" : "neutral"} variant="outline">
              {trackStyles ? "enabled" : "disabled"}
            </Badge>
          </div>

          <div
            class="mt-2 grid gap-1 font-mono text-xs text-content-muted sm:grid-cols-2"
          >
            <p>width {formatNumber(latestMeasure?.style?.width)}</p>
            <p>height {formatNumber(latestMeasure?.style?.height)}</p>
            <p>margin {formatNumber(latestMeasure?.style?.marginTop)}</p>
            <p>padding {formatNumber(latestMeasure?.style?.paddingTop)}</p>
            <p>border {formatNumber(latestMeasure?.style?.borderTop)}</p>
          </div>
        </div>
      </div>
    </div>
  </Card>

  <Alert
    title="Opt-in cost model"
    description="Enable only the signals you need. Scroll listeners, offset reads, and computed-style parsing stay disabled until the corresponding flag is turned on."
    color="info"
    closable={false}
  />
</div>

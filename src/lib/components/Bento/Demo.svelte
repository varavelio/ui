<script lang="ts">
  import { Heading } from "$lib/components/index.js";
  import Card from "../Card/Card.svelte";
  import { Bento } from "./index.js";

  const overviewCards = [
    {
      title: "Revenue snapshot",
      body: "Primary summary module spanning wider desktop columns while remaining stacked on mobile.",
      cols: "1",
      rows: "1",
      deskCols: "7",
      deskRows: "2",
      tone: "bg-base-200",
      stat: "$128.4K",
    },
    {
      title: "Availability",
      body: "Compact status card that nests beside the hero panel on larger screens.",
      cols: "1",
      rows: "1",
      deskCols: "5",
      deskRows: "1",
      tone: "bg-base-100",
      stat: "99.98%",
    },
    {
      title: "Deployments",
      body: "Smaller module demonstrating dense placement with automatic row packing.",
      cols: "1",
      rows: "1",
      deskCols: "3",
      deskRows: "1",
      tone: "bg-base-100",
      stat: "14 this week",
    },
    {
      title: "Incident queue",
      body: "Mid-width panel for operational worklists and triage summaries.",
      cols: "1",
      rows: "1",
      deskCols: "4",
      deskRows: "1",
      tone: "bg-base-200",
      stat: "2 active",
    },
    {
      title: "Latency",
      body: "A narrow metric block with more vertical room to show trend context.",
      cols: "1",
      rows: "1",
      deskCols: "2",
      deskRows: "2",
      tone: "bg-base-100",
      stat: "184ms p95",
    },
    {
      title: "Runbook",
      body: "Another larger content surface to make the mobile-to-desktop shift obvious.",
      cols: "1" as const,
      rows: "1" as const,
      deskCols: "6" as const,
      deskRows: "2" as const,
      tone: "bg-base-200",
      stat: "5 steps",
    },
  ] as const;
</script>

<div class="flex flex-col gap-10">
  <section class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <Heading level="3" size="md">Dense dashboard grid</Heading>
      <p class="max-w-2xl text-sm text-content-muted">
        Mobile keeps the content in a single readable column. Desktop expands to
        a twelve-column canvas with varied spans and dense placement.
      </p>
    </div>

    <Bento.Grid>
      {#each overviewCards as card (card.title)}
        <Bento.Item
          cols={card.cols}
          rows={card.rows}
          deskCols={card.deskCols}
          deskRows={card.deskRows}
        >
          <Card
            class={[
              "flex h-full flex-col justify-between gap-6",
              card.tone
            ]}
          >
            <div class="flex flex-col gap-3">
              <div class="flex items-center justify-between gap-3">
                <p class="text-sm font-medium text-content">{card.title}</p>
                <code
                  class="rounded-sm bg-base-100 px-2 py-1 font-mono text-[11px] text-content-muted"
                >
                  {card.deskCols}
                  ×{card.deskRows}
                </code>
              </div>

              <p class="text-sm leading-6 text-content-muted">{card.body}</p>
            </div>

            <div
              class="flex items-end justify-between gap-4 border-t border-base-400 pt-4"
            >
              <span class="font-mono text-lg text-content">{card.stat}</span>
              <span
                class="text-xs uppercase tracking-[0.2em] text-content-muted"
              >
                desktop span
              </span>
            </div>
          </Card>
        </Bento.Item>
      {/each}
    </Bento.Grid>
  </section>

  <section class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <Heading level="3" size="md">Two-up mobile support</Heading>
      <p class="max-w-2xl text-sm text-content-muted">
        If you need compact mobile cards, the grid can opt into multiple columns
        without changing the item API.
      </p>
    </div>

    <Bento.Grid cols="2" gap="4">
      <Bento.Item deskCols="3">
        <Card class="h-full" bg="200">
          <div class="space-y-2">
            <p class="text-xs uppercase tracking-[0.2em] text-content-muted">
              Mobile pair
            </p>
            <p class="font-mono text-lg text-content">BTC</p>
            <p class="text-sm text-content-muted">$68,420</p>
          </div>
        </Card>
      </Bento.Item>

      <Bento.Item deskCols="3">
        <Card class="h-full" bg="200">
          <div class="space-y-2">
            <p class="text-xs uppercase tracking-[0.2em] text-content-muted">
              Mobile pair
            </p>
            <p class="font-mono text-lg text-content">ETH</p>
            <p class="text-sm text-content-muted">$3,540</p>
          </div>
        </Card>
      </Bento.Item>

      <Bento.Item cols="2" deskCols="6" deskRows="2">
        <Card class="flex h-full flex-col justify-between gap-4" bg="300">
          <div class="space-y-2">
            <p class="text-xs uppercase tracking-[0.2em] text-content-muted">
              Full-width mobile panel
            </p>
            <p class="text-xl font-semibold tracking-tight text-content">
              `cols="2"` lets an item reclaim the whole mobile row when the grid
              is split.
            </p>
          </div>

          <p class="text-sm leading-6 text-content-muted">
            This is the case where mobile spans become genuinely useful instead
            of being decorative API.
          </p>
        </Card>
      </Bento.Item>

      <Bento.Item deskCols="6">
        <Card class="h-full" bg="200">
          <div class="space-y-3">
            <p class="text-xs uppercase tracking-[0.2em] text-content-muted">
              Notes
            </p>
            <p class="text-sm leading-6 text-content-muted">
              Keep `cols="1"` as the default so stacked mobile remains the
              normal path, but allow denser layouts when the content is truly
              compact.
            </p>
          </div>
        </Card>
      </Bento.Item>
    </Bento.Grid>
  </section>

  <section class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <Heading level="3" size="md">Editorial layout mix</Heading>
      <p class="max-w-2xl text-sm text-content-muted">
        The same primitives can shape feature callouts, side notes, and compact
        metadata blocks without changing the visual language.
      </p>
    </div>

    <Bento.Grid gap="6">
      <Bento.Item deskCols="8" deskRows="2">
        <Card class="flex h-full flex-col gap-6" bg="300">
          <div class="space-y-2">
            <p class="text-xs uppercase tracking-[0.2em] text-content-muted">
              Feature story
            </p>
            <h4 class="text-2xl font-semibold tracking-tight text-content">
              One family for dashboards, landing modules, and documentation
              callouts.
            </h4>
          </div>

          <p class="max-w-2xl text-sm leading-6 text-content-muted">
            Grid owns placement. Card owns the surface. That keeps the layout
            API small while still making asymmetrical compositions feel
            intentional.
          </p>

          <div
            class="grid gap-3 border-t border-base-400 pt-4 text-sm text-content-muted desk:grid-cols-3"
          >
            <div>
              <p class="font-medium text-content">12-column desktop</p>
              <p>Consistent span math for explorer demos and real screens.</p>
            </div>
            <div>
              <p class="font-medium text-content">Single-column mobile</p>
              <p>Readable stacking without custom wrappers.</p>
            </div>
            <div>
              <p class="font-medium text-content">Shared surface styling</p>
              <p>Use `Card` when you want a bordered, padded surface.</p>
            </div>
          </div>
        </Card>
      </Bento.Item>

      <Bento.Item deskCols="4" deskRows="1">
        <Card class="h-full" bg="200">
          <div class="space-y-3">
            <p class="text-xs uppercase tracking-[0.2em] text-content-muted">
              Side note
            </p>
            <p class="text-sm leading-6 text-content-muted">
              Use narrower spans for metadata, actions, or supporting context.
            </p>
          </div>
        </Card>
      </Bento.Item>

      <Bento.Item deskCols="4" deskRows="1">
        <Card class="h-full" bg="200">
          <div class="space-y-3">
            <p class="text-xs uppercase tracking-[0.2em] text-content-muted">
              Compact block
            </p>
            <p class="font-mono text-xl text-content">cols=4 rows=1</p>
          </div>
        </Card>
      </Bento.Item>

      <Bento.Item deskCols="8" deskRows="1">
        <Card class="h-full" bg="300">
          <div class="space-y-3">
            <p class="text-xs uppercase tracking-[0.2em] text-content-muted">
              Supporting band
            </p>
            <p class="text-sm leading-6 text-content-muted">
              Wider rows are useful for timelines, summaries, or content blocks
              that should sit underneath a hero area.
            </p>
          </div>
        </Card>
      </Bento.Item>
    </Bento.Grid>
  </section>
</div>

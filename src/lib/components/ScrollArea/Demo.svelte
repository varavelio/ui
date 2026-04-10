<script lang="ts">
  import { Card, ScrollArea } from "$lib/components/index.js";

  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`,
  );
</script>

<div class="grid gap-8">
  <div class="grid gap-4 desk:grid-cols-2">
    <div class="space-y-4">
      <h3
        class="text-sm font-medium text-content-muted uppercase tracking-wider"
      >
        Vertical (Default)
      </h3>
      <Card class="p-0 overflow-hidden">
        <ScrollArea class="h-72" viewportClass="p-4">
          <div class="pr-4">
            <h4 class="mb-4 text-sm font-medium leading-none">Tags</h4>
            {#each tags as tag}
              <div class="text-sm">
                {tag}
                <hr class="my-2 border-base-300">
              </div>
            {/each}
          </div>
        </ScrollArea>
      </Card>
    </div>

    <div class="space-y-4">
      <h3
        class="text-sm font-medium text-content-muted uppercase tracking-wider"
      >
        Horizontal
      </h3>
      <Card class="p-0 overflow-hidden">
        <ScrollArea orientation="horizontal" class="w-full" viewportClass="p-4">
          <div class="flex w-max gap-4 pb-4">
            {#each Array.from({ length: 10 }) as _, i}
              <div class="shrink-0 space-y-3">
                <div class="overflow-hidden rounded-md border border-base-300">
                  <div
                    class="h-37.5 w-50 bg-base-300 flex items-center justify-center text-content-muted"
                  >
                    Photo {i + 1}
                  </div>
                </div>
                <div class="text-xs text-content-muted">
                  Photo by
                  <span class="font-semibold text-content">Artist {i + 1}</span>
                </div>
              </div>
            {/each}
          </div>
        </ScrollArea>
      </Card>
    </div>
  </div>

  <div class="grid gap-4 desk:grid-cols-2">
    <div class="space-y-4">
      <h3
        class="text-sm font-medium text-content-muted uppercase tracking-wider"
      >
        Visibility: Always
      </h3>
      <Card class="p-0 overflow-hidden bg-base-200">
        <ScrollArea class="h-40" type="always" viewportClass="p-4">
          <div class="text-sm text-content-muted leading-relaxed">
            The scrollbar is always visible, regardless of whether the user is
            hovering or scrolling. This is useful for content where you want to
            indicate that more content exists without requiring interaction.
            <br>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a
            diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac
            quam viverra nec consectetur ante hendrerit. Donec et mollis dolor.
            Praesent et diam eget libero egestas mattis sit amet vitae augue.
            <br>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a
            diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac
            quam viverra nec consectetur ante hendrerit. Donec et mollis dolor.
            Praesent et diam eget libero egestas mattis sit amet vitae augue.
          </div>
        </ScrollArea>
      </Card>
    </div>

    <div class="space-y-4">
      <h3
        class="text-sm font-medium text-content-muted uppercase tracking-wider"
      >
        Both Orientations
      </h3>
      <Card class="p-0 overflow-hidden">
        <ScrollArea orientation="both" class="h-40 w-full" viewportClass="p-4">
          <div
            class="w-dvw h-dvh bg-[radial-gradient(circle,var(--color-base-400)_1px,transparent_1px)] bg-size-[20px_20px] flex items-center justify-center border border-dashed border-base-400 rounded-lg"
          >
            <span
              class="text-xs font-mono text-content-muted uppercase bg-base-100 px-2 py-1 rounded"
            >
              Large Canvas Area
            </span>
          </div>
        </ScrollArea>
      </Card>
    </div>
  </div>
</div>

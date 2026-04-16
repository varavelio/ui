<script lang="ts">
  import { Card } from "../Card/index.js";
  import { Heading } from "../Heading/index.js";
  import { Masonry } from "./index.js";

  const images = [
    { height: "h-32", color: "bg-base-200" },
    { height: "h-64", color: "bg-base-300" },
    { height: "h-48", color: "bg-base-200" },
    { height: "h-80", color: "bg-base-300" },
    { height: "h-40", color: "bg-base-200" },
    { height: "h-56", color: "bg-base-300" },
    { height: "h-36", color: "bg-base-200" },
    { height: "h-72", color: "bg-base-300" },
    { height: "h-44", color: "bg-base-200" },
  ];
</script>

<div class="flex flex-col gap-12">
  <section class="flex flex-col gap-4">
    <Heading level="3" size="md">
      Default (3 Columns Desktop, 1 Column Mobile, Gap 4)
    </Heading>
    <Masonry>
      {#each images as item}
        <Card class={item.color}>
          <div class="flex {item.height} items-center justify-center">
            <span class="text-content-muted font-mono">{item.height}</span>
          </div>
        </Card>
      {/each}
    </Masonry>
  </section>

  <section class="flex flex-col gap-4">
    <Heading level="3" size="md">High Density (6 Columns, Gap 2)</Heading>
    <Masonry cols="2" deskCols="6" gap="2">
      {#each images as item}
        <Card class={item.color}>
          <div class="flex {item.height} items-center justify-center">
            <span class="text-content-muted font-mono">{item.height}</span>
          </div>
        </Card>
      {/each}
    </Masonry>
  </section>

  <section class="flex flex-col gap-4">
    <Heading level="3" size="md">Wide Spacing (2 Columns, Gap 8)</Heading>
    <Masonry cols="1" deskCols="2" gap="8">
      {#each images as item}
        <Card class={item.color}>
          <div class="flex {item.height} items-center justify-center">
            <span
              class="text-content-muted font-mono text-xl uppercase font-bold tracking-widest"
            >
              {item.height}
            </span>
          </div>
        </Card>
      {/each}
    </Masonry>
  </section>
</div>

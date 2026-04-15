<script lang="ts">
  import { Card } from "../Card/index.ts";
  import { Heading } from "../Heading/index.ts";
  import Skeleton from "./Skeleton.svelte";
</script>

<div class="space-y-12">
  <section class="space-y-4">
    <Heading level={3}>Shapes</Heading>
    <p>
      By default, skeletons does not have size or shape defined. You can
      customize them using Tailwind CSS classes.
    </p>
    <div class="flex flex-wrap items-end gap-6">
      <div class="space-y-2">
        <p class="text-content-muted text-sm">Default shape</p>
        <Skeleton class="size-12" />
      </div>
      <div class="space-y-2">
        <p class="text-content-muted text-sm">Circle (Avatar)</p>
        <Skeleton class="size-12 rounded-full" />
      </div>
      <div class="space-y-2">
        <p class="text-content-muted text-sm">Heading</p>
        <Skeleton class="h-8 w-48 rounded-md" />
      </div>
      <div class="space-y-2">
        <p class="text-content-muted text-sm">Text block</p>
        <Skeleton class="h-4 w-64 rounded-sm" />
      </div>
      <div class="space-y-2">
        <p class="text-content-muted text-sm">Button</p>
        <Skeleton class="h-10 w-24 rounded-md" />
      </div>
    </div>
  </section>

  <section class="space-y-4">
    <Heading level={3}>Composition</Heading>
    <p>Mix and match skeletons to create complex loading states.</p>
    <Card class="max-w-sm p-4">
      <div class="flex items-center gap-4">
        <Skeleton class="size-12 shrink-0 rounded-full" />
        <div class="w-full space-y-2">
          <Skeleton class="h-5 w-1/2" />
          <Skeleton class="h-4 w-3/4" />
        </div>
      </div>
      <div class="mt-6 space-y-3">
        <Skeleton class="h-4 w-full" />
        <Skeleton class="h-4 w-full" />
        <Skeleton class="h-4 w-2/3" />
      </div>
      <div class="mt-6 flex justify-end gap-2">
        <Skeleton class="h-9 w-20 rounded-md" />
        <Skeleton class="h-9 w-24 rounded-md" />
      </div>
    </Card>
  </section>
</div>

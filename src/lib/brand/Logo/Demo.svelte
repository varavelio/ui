<script lang="ts">
  import { Logo } from "$lib/brand/index.js";
  import { Card, Label } from "$lib/components/index.js";

  const sizes = [
    { label: "sm", class: "size-8" },
    { label: "md", class: "size-12" },
    { label: "lg", class: "size-16" },
  ] as const;
</script>

<div class="space-y-8">
  <div class="space-y-3">
    <Label>States</Label>
    <Card class="flex flex-wrap items-center gap-6 p-6">
      <div class="flex flex-col items-center gap-3">
        <Logo />
        <span class="font-mono text-[10px] uppercase text-content-muted">
          default
        </span>
      </div>

      <div class="flex flex-col items-center gap-3">
        <Logo href="https://github.com/varavelio/ui" target="_blank" />
        <span class="font-mono text-[10px] uppercase text-content-muted">
          link
        </span>
      </div>

      <div class="flex flex-col items-center gap-3">
        <Logo animate={false} />
        <span class="font-mono text-[10px] uppercase text-content-muted">
          static
        </span>
      </div>

      <div class="flex flex-col items-center gap-3">
        <Logo contextMenu={false} />
        <span class="font-mono text-[10px] uppercase text-content-muted">
          no menu
        </span>
      </div>
    </Card>
  </div>

  <div class="space-y-3">
    <Label>Sizes</Label>
    <Card class="flex flex-wrap items-end gap-8 p-6">
      {#each sizes as size (size.label)}
        <div class="flex flex-col items-center gap-3">
          <Logo class={size.class} />
          <span class="font-mono text-[10px] uppercase text-content-muted">
            {size.label}
          </span>
        </div>
      {/each}
    </Card>
  </div>

  <div class="space-y-3">
    <Label>Context Menu</Label>
    <Card class="flex flex-wrap items-center gap-4 p-6">
      <Logo class="size-12" />
      <p class="max-w-xl text-sm text-content-muted">
        Right-click the logo to open quick brand actions, or hover to morph the
        mark from the V pose into the A pose.
      </p>
    </Card>
  </div>
</div>

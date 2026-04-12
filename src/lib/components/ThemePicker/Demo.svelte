<script lang="ts">
  import { ThemePicker } from "$lib/components/index.js";
  import type { Theme } from "$lib/utils/index.js";

  type Combination = {
    id: string;
    showLabel: boolean;
    variant: "solid" | "outline" | "ghost";
    radius: "sm" | "md" | "lg" | "full";
  };

  const showLabels = [true, false] as const;
  const variants = ["outline", "ghost", "solid"] as const;
  const radius = ["md", "full"] as const;

  const combinations = showLabels.flatMap((showLabel) =>
    variants.flatMap((variant) =>
      radius.map(
        (radius) =>
          ({
            id: `${showLabel}-${variant}-${radius}`,
            showLabel,
            variant,
            radius,
          }) satisfies Combination,
      ),
    ),
  );

  const initialValues = Object.fromEntries(
    combinations.map(({ id }) => [id, "system"]),
  ) as Record<string, Theme>;

  let values = $state(initialValues);

  function boolLabel(value: boolean) {
    return value ? "true" : "false";
  }
</script>

<div class="space-y-4">
  <section class="grid gap-4 desk:grid-cols-3">
    <article class="rounded-lg border border-base-400 bg-base-100 p-4">
      <div class="space-y-3">
        <h4 class="text-sm font-medium text-content">Custom trigger labels</h4>
        <p class="text-xs leading-5 text-content-muted">
          Use the
          <code
            class="rounded-sm bg-base-200 px-1.5 py-0.5 font-mono text-[11px] text-content"
          >
            label
          </code>
          prop to rename the visible trigger text or icon-only tooltip content.
        </p>
        <div class="flex flex-wrap gap-3">
          <ThemePicker label="Appearance" />
          <ThemePicker label="Color mode" variant="ghost" />
        </div>
      </div>
    </article>

    <article
      class="rounded-lg border border-base-400 bg-base-100 p-4 desk:col-span-2"
    >
      <div class="space-y-3">
        <h4 class="text-sm font-medium text-content">
          Icon-only tooltip behavior
        </h4>
        <p class="text-xs leading-5 text-content-muted">
          When the trigger has no visible text, ThemePicker adds an immediate
          tooltip while keeping the existing accessible label on the button.
        </p>
        <div class="flex flex-wrap gap-3">
          <ThemePicker showLabel={false} square label="Appearance" />
          <ThemePicker
            showLabel={false}
            square
            label="Color mode"
            variant="ghost"
          />
          <ThemePicker square radius="full" label="Appearance" />
        </div>
      </div>
    </article>
  </section>

  <section class="grid gap-4 sm:grid-cols-2 desk:grid-cols-4">
    {#each combinations as combo (combo.id)}
      <article class="rounded-lg border border-base-400 bg-base-100 p-4">
        <div class="space-y-4">
          <div class="space-y-2">
            <h4 class="text-sm font-medium text-content">Menu trigger</h4>

            <dl
              class="grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-content-muted"
            >
              <div>
                <dt class="font-medium text-content">showLabel</dt>
                <dd>{boolLabel(combo.showLabel)}</dd>
              </div>
              <div>
                <dt class="font-medium text-content">variant</dt>
                <dd>{combo.variant}</dd>
              </div>
              <div>
                <dt class="font-medium text-content">radius</dt>
                <dd>{combo.radius}</dd>
              </div>
            </dl>
          </div>

          <div
            class="flex min-h-16 items-center justify-center rounded-md border border-dashed border-base-400 bg-base-200/40 p-3"
          >
            <ThemePicker
              showLabel={combo.showLabel}
              variant={combo.variant}
              radius={combo.radius}
              square={!combo.showLabel}
              bind:value={values[combo.id]}
            />
          </div>

          <p class="text-xs text-content-muted">
            Current value:
            <span class="font-mono text-content">{values[combo.id]}</span>
          </p>
        </div>
      </article>
    {/each}
  </section>
</div>

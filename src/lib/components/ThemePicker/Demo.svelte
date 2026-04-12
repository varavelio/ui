<script lang="ts">
  import { ThemePicker } from "$lib/components/index.js";
  import type { Theme } from "$lib/utils/index.js";

  type Combination = {
    id: string;
    showLabel: boolean;
    ghost: boolean;
    circular: boolean;
  };

  const flags = [false, true] as const;

  const combinations = flags.flatMap((showLabel) =>
    flags.flatMap((ghost) =>
      flags.map(
        (circular) =>
          ({
            id: `${showLabel}-${ghost}-${circular}`,
            showLabel,
            ghost,
            circular,
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
          <ThemePicker label="Color mode" ghost={true} />
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
          <ThemePicker showLabel={false} label="Appearance" />
          <ThemePicker showLabel={false} label="Color mode" ghost={true} />
          <ThemePicker circular={true} label="Appearance" />
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
                <dt class="font-medium text-content">ghost</dt>
                <dd>{boolLabel(combo.ghost)}</dd>
              </div>
              <div>
                <dt class="font-medium text-content">circular</dt>
                <dd>{boolLabel(combo.circular)}</dd>
              </div>
            </dl>
          </div>

          <div
            class="flex min-h-16 items-center justify-center rounded-md border border-dashed border-base-400 bg-base-200/40 p-3"
          >
            <ThemePicker
              showLabel={combo.showLabel}
              ghost={combo.ghost}
              circular={combo.circular}
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

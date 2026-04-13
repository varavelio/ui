<script lang="ts">
  import { page } from "$app/state";
  import { Alert, Badge, Card } from "$lib/components/index.js";
  import {
    componentEntries,
    isExplorerType,
    runtimeEntries,
  } from "../explorer.ts";

  let currentType = $derived(
    isExplorerType(page.params.type ?? "") ? page.params.type : "components",
  );

  let currentComponent = $derived(
    currentType === "components"
      ? (componentEntries.find((entry) => entry.slug === page.params.slug) ??
          null)
      : null,
  );

  let currentRuntime = $derived(
    currentType === "runtime"
      ? (runtimeEntries.find((entry) => entry.slug === page.params.slug) ??
          null)
      : null,
  );

  let documentTitle = $derived.by(() => {
    if (currentType === "components" && currentComponent) {
      return `${currentComponent.name} | Varavel UI Explorer`;
    }

    if (currentType === "runtime" && currentRuntime) {
      return `${currentRuntime.name} runtime | Varavel UI Explorer`;
    }

    return "Varavel UI Explorer";
  });
</script>

<svelte:head>
  <title>{documentTitle}</title>
</svelte:head>

{#if currentType === "components"}
  {#if currentComponent}
    <div class="space-y-5 overflow-hidden">
      <div class="flex flex-wrap items-start justify-between gap-5">
        <div class="max-w-3xl space-y-2">
          <h2 class="text-3xl font-semibold tracking-tight">
            {currentComponent.name}
          </h2>

          <div class="flex flex-wrap items-center gap-2">
            <Badge color="info">{currentComponent.category}</Badge>
          </div>
        </div>

        <code
          class="mt-2 block overflow-x-auto rounded-md border bg-base-100 px-3 py-3 text-sm text-content"
        >
          {currentComponent.importCode}
        </code>
      </div>
    </div>

    <section>
      <div class="border-b py-2">
        <h3 class="text-2xl font-semibold tracking-tight">Example</h3>
      </div>

      <div class="bg-base-100 py-4">
        {#if currentComponent.demo}
          <currentComponent.demo />
        {:else}
          <Alert
            title="Missing live example"
            description="A demo component was not found for this entry."
            color="warning"
            closable={false}
          />
        {/if}
      </div>
    </section>

    <section>
      <div class="mb-4 border-b py-2">
        <h3 class="text-2xl font-semibold tracking-tight">Props</h3>
      </div>

      <Card padding="none">
        {#if currentComponent.props.length}
          <table class="w-full text-left text-sm">
            <thead class="bg-base-200 text-content-muted">
              <tr>
                <th class="px-5 py-3 font-medium">Name</th>
                <th class="px-5 py-3 font-medium">Type</th>
                <th class="px-5 py-3 font-medium">Default</th>
                <th class="px-5 py-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {#each currentComponent.props as prop (prop.name)}
                <tr class="border-t align-top">
                  <td class="px-5 py-3 font-medium text-content">
                    {prop.name}
                  </td>
                  <td class="px-5 py-3">
                    <code
                      class="rounded border bg-base-200 px-1.5 py-0.5 text-xs text-content"
                    >
                      {prop.type}
                    </code>
                  </td>
                  <td class="px-5 py-3 text-content-muted">
                    {prop.defaultValue ?? "-"}
                  </td>
                  <td class="px-5 py-3 text-content-muted">
                    {prop.description}
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        {:else}
          <div class="p-5">
            <Alert
              title="No props documented"
              description="This component currently has no prop documentation in its metadata."
              color="warning"
              closable={false}
            />
          </div>
        {/if}
      </Card>
    </section>
  {:else}
    <Alert
      title="Component not found"
      description="Pick another component from the sidebar."
      color="warning"
      closable={false}
    />
  {/if}
{:else if currentType === "runtime"}
  {#if currentRuntime}
    <div class="space-y-5 overflow-hidden">
      <div class="flex flex-wrap items-start justify-between gap-5">
        <div class="max-w-3xl space-y-2">
          <h2 class="text-3xl font-semibold tracking-tight">
            {currentRuntime.name}
          </h2>
          <p class="text-content-muted">{currentRuntime.summary}</p>

          <div class="flex flex-wrap items-center gap-2">
            <Badge color="info">{currentRuntime.category}</Badge>
            <Badge color="neutral" variant="solid">
              {currentRuntime.methods.length} methods
            </Badge>
          </div>
        </div>

        <code
          class="mt-2 block overflow-x-auto rounded-md border bg-base-100 px-3 py-3 text-sm text-content"
        >
          {currentRuntime.importCode}
        </code>
      </div>
    </div>

    <section>
      <div class="border-b py-2">
        <h3 class="text-2xl font-semibold tracking-tight">
          Interactive Playground
        </h3>
      </div>

      <div class="bg-base-100 py-4"><currentRuntime.demo /></div>
    </section>

    <section>
      <div class="mb-4 border-b py-2">
        <h3 class="text-2xl font-semibold tracking-tight">Methods</h3>
      </div>

      <Card padding="none">
        <table class="w-full text-left text-sm">
          <thead class="bg-base-200 text-content-muted">
            <tr>
              <th class="px-5 py-3 font-medium">Method</th>
              <th class="px-5 py-3 font-medium">Signature</th>
              <th class="px-5 py-3 font-medium">Returns</th>
              <th class="px-5 py-3 font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {#each currentRuntime.methods as method (method.name)}
              <tr class="border-t align-top">
                <td class="px-5 py-3 font-medium text-content">
                  {method.name}
                </td>
                <td class="px-5 py-3">
                  <code
                    class="rounded border bg-base-200 px-1.5 py-0.5 text-xs text-content"
                  >
                    {method.signature}
                  </code>
                </td>
                <td class="px-5 py-3 text-content-muted">{method.returns}</td>
                <td class="px-5 py-3 text-content-muted">
                  {method.description}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </Card>
    </section>

    {#each currentRuntime.methods as method (method.name)}
      {#if method.options?.length}
        <section>
          <div class="mb-4 border-b py-2">
            <h3 class="text-2xl font-semibold tracking-tight">
              {method.name} options
            </h3>
          </div>

          <Card padding="none">
            <table class="w-full text-left text-sm">
              <thead class="bg-base-200 text-content-muted">
                <tr>
                  <th class="px-5 py-3 font-medium">Option</th>
                  <th class="px-5 py-3 font-medium">Type</th>
                  <th class="px-5 py-3 font-medium">Required</th>
                  <th class="px-5 py-3 font-medium">Default</th>
                  <th class="px-5 py-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {#each method.options as option (`${method.name}-${option.name}`)}
                  <tr class="border-t align-top">
                    <td class="px-5 py-3 font-medium text-content">
                      {option.name}
                    </td>
                    <td class="px-5 py-3">
                      <code
                        class="rounded border bg-base-200 px-1.5 py-0.5 text-xs text-content"
                      >
                        {option.type}
                      </code>
                    </td>
                    <td class="px-5 py-3 text-content-muted">
                      {option.required ? "Yes" : "No"}
                    </td>
                    <td class="px-5 py-3 text-content-muted">
                      {option.defaultValue ?? "-"}
                    </td>
                    <td class="px-5 py-3 text-content-muted">
                      {option.description}
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </Card>
        </section>
      {/if}
    {/each}

    <section>
      <div class="mb-4 border-b py-2">
        <h3 class="text-2xl font-semibold tracking-tight">Code Recipes</h3>
      </div>

      <div class="space-y-4">
        {#each currentRuntime.snippets as snippet (snippet.title)}
          <Card class="space-y-3">
            <div class="space-y-1">
              <h4 class="text-lg font-semibold tracking-tight">
                {snippet.title}
              </h4>
              <p class="text-sm text-content-muted">{snippet.description}</p>
            </div>

            <pre
              class="overflow-x-auto rounded-md border bg-base-100 p-4 text-sm text-content"
            ><code>{snippet.code}</code></pre>
          </Card>
        {/each}
      </div>
    </section>

    <section>
      <div class="mb-4 border-b py-2">
        <h3 class="text-2xl font-semibold tracking-tight">Integration Notes</h3>
      </div>

      <Card>
        <ul class="space-y-2 text-sm text-content-muted">
          {#each currentRuntime.notes as note (note)}
            <li>{note}</li>
          {/each}
        </ul>
      </Card>
    </section>
  {:else}
    <Alert
      title="Runtime API not found"
      description="Pick another API from the runtime sidebar."
      color="warning"
      closable={false}
    />
  {/if}
{:else}
  <Alert
    title="No entry in this section"
    description="Blocks and layouts are wired in navigation but do not have slug pages yet."
    color="info"
    closable={false}
  />
{/if}

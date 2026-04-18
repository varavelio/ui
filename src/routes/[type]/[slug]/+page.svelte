<script lang="ts">
  import { page } from "$app/state";
  import Copy from "$lib/components/Copy/Copy.svelte";
  import { Alert, Badge, Card, Table } from "$lib/components/index.js";
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

        <div class="mt-2 flex justify-end items-center space-x-2">
          <code
            class="block overflow-x-auto rounded-md border bg-base-100 px-4 py-2 text-sm text-content"
          >
            {currentComponent.importCode}
          </code>
          <Copy text={currentComponent.importCode} />
        </div>
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

      <Card padding="none" class="overflow-hidden">
        {#if currentComponent.props.length}
          <Table.Root variant="ghost">
            <Table.Header>
              <Table.Row>
                <Table.Head>Name</Table.Head>
                <Table.Head>Type</Table.Head>
                <Table.Head>Default</Table.Head>
                <Table.Head>Description</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {#each currentComponent.props as prop (prop.name)}
                <Table.Row class="align-top">
                  <Table.Cell class="font-medium text-content">
                    {prop.name}
                  </Table.Cell>
                  <Table.Cell>
                    <code
                      class="rounded border bg-base-200 px-1.5 py-0.5 text-xs text-content"
                    >
                      {prop.type}
                    </code>
                  </Table.Cell>
                  <Table.Cell class="text-content-muted">
                    {prop.defaultValue ?? "-"}
                  </Table.Cell>
                  <Table.Cell class="text-content-muted">
                    {prop.description}
                  </Table.Cell>
                </Table.Row>
              {/each}
            </Table.Body>
          </Table.Root>
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

        <div class="mt-2 flex justify-end items-center space-x-2">
          <code
            class="block overflow-x-auto rounded-md border bg-base-100 px-4 py-2 text-sm text-content"
          >
            {currentRuntime.importCode}
          </code>
          <Copy text={currentRuntime.importCode} />
        </div>
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

      <Card padding="none" class="overflow-hidden">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.Head>Method</Table.Head>
              <Table.Head>Signature</Table.Head>
              <Table.Head>Returns</Table.Head>
              <Table.Head>Description</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {#each currentRuntime.methods as method (method.name)}
              <Table.Row class="align-top">
                <Table.Cell class="font-medium text-content">
                  {method.name}
                </Table.Cell>
                <Table.Cell>
                  <code
                    class="rounded border bg-base-200 px-1.5 py-0.5 text-xs text-content"
                  >
                    {method.signature}
                  </code>
                </Table.Cell>
                <Table.Cell class="text-content-muted">
                  {method.returns}
                </Table.Cell>
                <Table.Cell class="text-content-muted">
                  {method.description}
                </Table.Cell>
              </Table.Row>
            {/each}
          </Table.Body>
        </Table.Root>
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

          <Card padding="none" class="overflow-hidden">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.Head>Option</Table.Head>
                  <Table.Head>Type</Table.Head>
                  <Table.Head>Required</Table.Head>
                  <Table.Head>Default</Table.Head>
                  <Table.Head>Description</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {#each method.options as option (`${method.name}-${option.name}`)}
                  <Table.Row class="align-top">
                    <Table.Cell class="font-medium text-content">
                      {option.name}
                    </Table.Cell>
                    <Table.Cell>
                      <code
                        class="rounded border bg-base-200 px-1.5 py-0.5 text-xs text-content"
                      >
                        {option.type}
                      </code>
                    </Table.Cell>
                    <Table.Cell class="text-content-muted">
                      {option.required ? "Yes" : "No"}
                    </Table.Cell>
                    <Table.Cell class="text-content-muted">
                      {option.defaultValue ?? "-"}
                    </Table.Cell>
                    <Table.Cell class="text-content-muted">
                      {option.description}
                    </Table.Cell>
                  </Table.Row>
                {/each}
              </Table.Body>
            </Table.Root>
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

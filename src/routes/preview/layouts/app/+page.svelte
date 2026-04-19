<script lang="ts">
  import { House } from "@lucide/svelte";
  import Heading from "$lib/components/Heading/Heading.svelte";
  import { Breadcrumbs, ThemePicker } from "$lib/components/index.js";
  import { AppLayout } from "$lib/layouts/index.js";
</script>

<AppLayout primaryRegion="sidebar" maxWidth="lg">
  {#snippet header()}
    <div class="w-full flex justify-between items-center">
      <Heading size="md" level="2">Header</Heading>
      <ThemePicker class="-mr-2" /> 
    </div>
  {/snippet}

  {#snippet sidebar()}
    <nav class="sticky top-4 desk:top-0">
      <Heading size="md" level="2">Sidebar</Heading>
    </nav>
    <div class="h-[200dvh]"></div>
  {/snippet}

  {#snippet main()}
    <div class="sticky top-0 p-4 bg-base-100">
      <Breadcrumbs
        items={[
          { icon: House, label: "Home", href: "#" },
          { label: "Demo", href: "#" },
        ]}
      />
    </div>
    <div class="p-4 pt-0">
      <Heading size="2xl">Main content</Heading>
      <div class="h-[200dvh]"></div>
    </div>
  {/snippet}
</AppLayout>

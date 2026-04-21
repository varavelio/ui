<script lang="ts">
  import { House, LayoutDashboard, Settings } from "@lucide/svelte";
  import Heading from "$lib/components/Heading/Heading.svelte";
  import {
    Breadcrumbs,
    Button,
    Input,
    Nav,
    ThemePicker,
  } from "$lib/components/index.js";
  import { AppLayout } from "$lib/layouts/index.js";
</script>

<AppLayout primaryRegion="sidebar" maxWidth="lg">
  {#snippet headerLeft()}
    <Heading size="md" level="2">Header</Heading>
  {/snippet}

  {#snippet headerCenter()}
    <Input placeholder="Search..." class="hidden desk:block" />
  {/snippet}

  {#snippet headerRight()}
    <ThemePicker class="-mr-2 hidden desk:block" />
  {/snippet}

  {#snippet sidebarTop()}
    <nav class="sticky top-4 desk:top-0">
      <Heading size="md" level="2">Sidebar</Heading>
    </nav>
  {/snippet}

  {#snippet sidebarCenter()}
    <Nav.Root>
      <Nav.Group label="General" icon={LayoutDashboard} open>
        <Nav.Item href="#" icon={House} label="Home" active />
        <Nav.Item href="#" icon={Settings} label="Settings" />
      </Nav.Group>
    </Nav.Root>
    <div class="h-[200dvh]"></div>
  {/snippet}

  {#snippet sidebarBottom()}
    <Button>Click me</Button>
  {/snippet}

  {#snippet main()}
    <div class="sticky top-0 p-4 bg-base-100">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "#", icon: LayoutDashboard },
          { label: "Home", href: "#" },
        ]}
      />
    </div>
    <div class="p-4 pt-0">
      <Heading size="2xl">Main content</Heading>
      <div class="h-[200dvh]"></div>
    </div>
  {/snippet}
</AppLayout>

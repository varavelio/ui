<script lang="ts">
  import { Container } from "$lib/components/index.js";
  import { AppLayout } from "$lib/layouts/index.js";
</script>

<Container size="xl" class="mx-auto overflow-hidden">
  <AppLayout.Root>
    <AppLayout.Header>Header</AppLayout.Header>
    <div class="flex h-full">
      <AppLayout.Sidebar>Sidebar</AppLayout.Sidebar>
      <AppLayout.Main>Main Content</AppLayout.Main>
    </div>
  </AppLayout.Root>
</Container>

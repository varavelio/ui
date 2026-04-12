<script lang="ts">
  import Container from "../Container/Container.svelte";
  import Heading from "./Heading.svelte";
</script>

<Container class="flex flex-col gap-12 p-12">
  <div class="flex flex-col gap-4">
    <Heading
      level={2}
      size="xs"
      class="text-content-muted uppercase tracking-widest"
    >
      Scale Visual Hierarchy
    </Heading>
    <div class="flex flex-col gap-6">
      <Heading level={1} size="3xl">
        The future of design is minimal. (3xl)
      </Heading>
      <Heading level={2} size="2xl">
        Experience precision in every detail. (2xl)
      </Heading>
      <Heading level={3} size="xl">
        Built for performance and clarity. (xl)
      </Heading>
      <Heading level={4} size="lg">Accessible by default, always. (lg)</Heading>
      <Heading level={5} size="md">
        A technical look for modern apps. (md)
      </Heading>
      <Heading level={6} size="sm">Focus on what matters most. (sm)</Heading>
      <Heading level={6} size="xs">The Varavel Design System. (xs)</Heading>
    </div>
  </div>

  <div class="flex flex-col gap-4">
    <Heading
      level={2}
      size="xs"
      class="text-content-muted uppercase tracking-widest"
    >
      Semantic Control
    </Heading>
    <div class="flex flex-col gap-4">
      <Heading level={1} size="xl">I am an H1 Tag visually XL</Heading>
      <Heading level={3} size="xl">I am an H3 Tag visually XL</Heading>
    </div>
  </div>

  <div class="flex flex-col gap-4">
    <Heading level={2} size="xs" muted class="uppercase tracking-widest">
      Muted State
    </Heading>
    <div class="flex flex-col gap-4">
      <Heading level={2} size="2xl" muted>This is a muted heading</Heading>
      <Heading level={3} size="lg" muted>
        Smaller muted heading for secondary hierarchy
      </Heading>
    </div>
  </div>
</Container>

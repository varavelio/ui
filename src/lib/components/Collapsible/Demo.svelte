<script lang="ts">
  import { Collapsible } from "$lib/components/index.js";
</script>

<div class="space-y-8">
  <section class="space-y-4">
    <h2 class="text-lg font-semibold">Background Presets</h2>
    <div class="grid grid-cols-1 gap-4 desk:grid-cols-3">
      <div>
        <Collapsible bg="100" title="Background 100">
          This uses the bg-base-100 preset, which is the lightest background.
        </Collapsible>
      </div>
      <div>
        <Collapsible bg="200" title="Background 200 (Default)">
          This uses the bg-base-200 preset, providing a subtle contrast.
        </Collapsible>
      </div>
      <div>
        <Collapsible bg="300" title="Background 300">
          This uses the bg-base-300 preset, the darkest of the three presets.
        </Collapsible>
      </div>
    </div>
  </section>

  <section class="space-y-4">
    <h2 class="text-lg font-semibold">Sizes</h2>
    <div class="space-y-4">
      <div>
        <Collapsible size="sm" title="Small size (sm)">
          Smaller padding and text size, suitable for compact interfaces.
        </Collapsible>
      </div>
      <div>
        <Collapsible size="md" title="Medium size (md - Default)">
          Standard padding and text size for general use.
        </Collapsible>
      </div>
      <div>
        <Collapsible size="lg" title="Large size (lg)">
          Increased padding and larger heading text for prominence.
        </Collapsible>
      </div>
    </div>
  </section>

  <section class="space-y-4">
    <h2 class="text-lg font-semibold">Icon Configuration</h2>
    <div class="grid grid-cols-1 gap-4 desk:grid-cols-2">
      <div>
        <Collapsible iconPosition="left" title="Icon Position: Left (Default)">
          The chevron is placed on the left side, mirroring the Accordion style.
        </Collapsible>
      </div>
      <div>
        <Collapsible iconPosition="right" title="Icon Position: Right">
          The chevron is placed on the right side.
        </Collapsible>
      </div>
      <div>
        <Collapsible
          showIcon={false}
          title="No Icon"
          description="The icon can be hidden"
        >
          The icon can be completely hidden using the showIcon prop.
        </Collapsible>
      </div>
      <div>
        <Collapsible
          description="The icon stays aligned with the top of the heading."
          title="Top Aligned Icon"
        >
          When the header has a description or long title, the icon remains at
          the top rather than centering, which prevents an awkward floating
          appearance.
        </Collapsible>
      </div>
    </div>
  </section>
</div>

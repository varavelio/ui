<script lang="ts">
  import { ArrowRight } from "@lucide/svelte";
  import { CTA } from "../index.js";
</script>

<CTA.Banner
  actions={[
    { label: "Start building", href: "#", iconRight: ArrowRight },
    { label: "Read docs", href: "#", variant: "outline" as const },
  ]}
  caption="Keep the CTA focused: strong headline, brief rationale, and one or two obvious actions."
  description="The banner variant is built for the last persuasive section before the footer."
  title="Ready to stop hand-crafting every section?"
/>

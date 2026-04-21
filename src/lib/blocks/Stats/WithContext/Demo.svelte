<script lang="ts">
  import { ArrowRight } from "@lucide/svelte";
  import { Stats } from "../index.js";

  const items = [
    { value: "14k", label: "active builders" },
    { value: "92%", label: "faster page assembly" },
    { value: "21", label: "block variants" },
    { value: "0", label: "layout guesswork" },
  ];
</script>

<Stats.WithContext
  actions={[
    { label: "See all metrics", href: "#", iconRight: ArrowRight },
    { label: "Read methodology", href: "#", variant: "outline" as const },
  ]}
  caption="Use the contextual variant when the section needs an intro narrative beside the numbers."
  description="Pair narrative context with the metrics instead of scattering explanatory copy above and below the grid."
  {items}
  title="Stats with context"
/>

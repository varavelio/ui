<script lang="ts">
  import { Stats } from "../index.js";

  const items = [
    { value: "14k", label: "active builders" },
    { value: "92%", label: "faster page assembly" },
    { value: "21", label: "block variants" },
    { value: "0", label: "layout guesswork" },
  ];
</script>

<Stats.Grid
  description="Compact metrics work well when the numbers themselves are the proof."
  {items}
  title="Simple stats grid"
/>

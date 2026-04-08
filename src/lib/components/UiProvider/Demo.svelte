<script lang="ts">
  import { Card, Label } from "$lib/components/index.js";
</script>

<Card>
  <Label>UiProvider</Label>
  <p class="text-sm text-content-muted">
    UiProvider is the app-level provider for shared interactive behavior,
    including consistent tooltip timing defaults across your interface. <br>
    Place it near your root layout or app shell so all nested UI primitives
    inherit the same interaction baseline.
  </p>
</Card>

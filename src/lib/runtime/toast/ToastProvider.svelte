<script lang="ts">
  import { Toaster } from "svelte-sonner";
  import { theme } from "../theme/index.js";
</script>

<!-- https://github.com/wobsoriano/svelte-sonner (MIT license) -->
<Toaster
  position="bottom-right"
  expand={true}
  theme={theme.resolved}
  richColors
/>

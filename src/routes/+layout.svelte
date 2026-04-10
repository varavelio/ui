<script>
  import "../app.css";

  import { UiProvider } from "$lib/components/index.js";

  let { children } = $props();
</script>

<UiProvider>{@render children()}</UiProvider>

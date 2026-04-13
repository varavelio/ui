<script lang="ts">
  import Alert from "./Alert.svelte";
  import Confirm from "./Confirm.svelte";
  import { dialogStore } from "./store.svelte.ts";
</script>

<!-- Render every confirm dialog currently open -->
{#each dialogStore.confirms as confirm (confirm.id)}
  <Confirm {...confirm} />
{/each}

<!-- Render every alert dialog currently open -->
{#each dialogStore.alerts as alert (alert.id)}
  <Alert {...alert} />
{/each}

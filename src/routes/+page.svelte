<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";

  if (browser) {
    goto("/components/avatar", { replaceState: true });
  }
</script>

<svelte:head>
  <meta http-equiv="refresh" content="0;url=/components/avatar">
</svelte:head>

<script lang="ts">
  import { Avatar } from "bits-ui";

  interface Props {
    src?: string;
    alt?: string;
    fallback?: string;
    delayMs?: number;
  }
  let { alt, src, fallback, delayMs }: Props = $props();
</script>

<Avatar.Root
  {delayMs}
  class="data-[status=loaded]:border-foreground bg-muted text-muted-foreground h-12 w-12 rounded-full border text-[17px] font-medium uppercase data-[status=loading]:border-transparent"
>
  <div
    class="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-transparent"
  >
    {#if src}
      <Avatar.Image {src} {alt} />
    {/if}
    {#if fallback}
      <Avatar.Fallback class="border-muted border">{fallback}</Avatar.Fallback>
    {/if}
  </div>
</Avatar.Root>

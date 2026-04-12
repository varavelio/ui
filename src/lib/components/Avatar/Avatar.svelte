<script lang="ts">
  // biome-ignore lint/correctness/noUnusedImports: Used as a compound component namespace in Svelte markup.
  import { Avatar as BitsAvatar } from "bits-ui";
  import type { ClassValue } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";

  const avatarSizes = {
    sm: "size-8 text-xs",
    md: "size-10 text-sm",
    lg: "size-12 text-base",
    xl: "size-16 text-lg",
  } as const;

  const avatarTones = {
    neutral: "border-base-400 bg-base-300 text-content-muted",
    contrast: "border-content bg-content text-base-100",
  } as const;

  /**
   * Visual size presets for the avatar.
   */
  type AvatarSize = keyof typeof avatarSizes;

  /**
   * Surface and text tone presets.
   */
  type AvatarTone = keyof typeof avatarTones;

  interface Props {
    /**
     * Additional CSS classes to apply to the avatar root element.
     */
    class?: ClassValue;

    /**
     * Optional ID for the avatar element.
     */
    id?: string;

    /**
     * Optional image source URL. If provided and successfully loaded,
     * the image will be displayed instead of the fallback.
     */
    src?: string;

    /**
     * Accessible alternative text for the avatar image.
     * Falls back to an empty string if not provided.
     */
    alt?: string;

    /**
     * Fallback text (usually initials) displayed if the image fails to load or is missing.
     */
    fallback?: string;

    /**
     * Delay in milliseconds before rendering the fallback when an image is loading.
     * Useful to prevent flashing of the fallback on fast connections.
     *
     * @default 0
     */
    delayMs?: number;

    /**
     * Visual size preset of the avatar.
     *
     * @default "md"
     */
    size?: AvatarSize;

    /**
     * Surface and text tone of the avatar.
     *
     * @default "neutral"
     */
    tone?: AvatarTone;

    /**
     * Whether to show a border around the avatar.
     *
     * @default true
     */
    bordered?: boolean;
  }

  let {
    class: className,
    id,
    src,
    alt = "",
    fallback = "",
    delayMs = 0,
    size = "md",
    tone = "neutral",
    bordered = true,
  }: Props = $props();

  /**
   * Computes up to two initials from the fallback text or alt text.
   * E.g., "Varavel Labs" -> "VL", "John" -> "J"
   */
  let initials = $derived.by(() => {
    const source = fallback.trim() || alt.trim();

    if (!source) {
      return "?";
    }

    return source
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("")
      .slice(0, 2);
  });
</script>

<BitsAvatar.Root
  aria-label={alt || fallback || initials}
  class={cn(
    "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border font-medium uppercase",
    avatarSizes[size],
    avatarTones[tone],
    bordered ? "" : "border-transparent",
    className,
  )}
  {delayMs}
  {id}
>
  {#if src}
    <BitsAvatar.Image {alt} class="size-full object-cover" {src} />
  {/if}
  <BitsAvatar.Fallback
    class="inline-flex size-full items-center justify-center"
  >
    <span aria-hidden="true">{initials}</span>
  </BitsAvatar.Fallback>
</BitsAvatar.Root>

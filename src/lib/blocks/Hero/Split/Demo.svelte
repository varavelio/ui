<script lang="ts">
  import { Hero } from "../index.js";

  const actions = [
    {
      label: "Browse blocks",
      href: "#",
    },
    {
      label: "Open GitHub",
      href: "#",
      variant: "ghost" as const,
    },
  ];
</script>

<Hero.Split
  {actions}
  description="Give the block structured content and let it handle hierarchy, rhythm, and the product framing that usually gets rebuilt page after page."
  eyebrow="Built for shipping"
  highlights={[
    "Works cleanly from JSON and headless CMS entries",
    "Preserves a high-contrast editorial feel in light and dark mode",
    "Responsive from mobile up to the desk breakpoint",
    "Keeps customization limited to deliberate escape hatches",
  ]}
  stats={[
    { value: "3x", label: "faster assembly" },
    { value: "1", label: "consistent visual language" },
    { value: "100%", label: "data-first setup" },
  ]}
  title="A split hero for product shots, dashboards, and launch pages"
  visual={{
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    alt: "Abstract dashboard interface on a laptop display",
    eyebrow: "Live preview",
    title: "Drop in a screenshot and keep moving",
    description:
      "The visual pane is intentionally framed like a product surface so screenshots, UI previews, and editorial images all sit naturally.",
    caption: "Use the optional custom visual snippet only when the default frame is not enough.",
    stats: [
      { value: "4.9/5", label: "design confidence" },
      { value: "72rem", label: "layout width" },
    ],
  }}
/>

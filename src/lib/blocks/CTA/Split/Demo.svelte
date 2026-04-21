<script lang="ts">
  import { CTA } from "../index.js";
</script>

<CTA.Split
  actions={[
    { label: "Explore blocks", href: "#" },
    { label: "Talk to us", href: "#", variant: "ghost" as const },
  ]}
  description="The split CTA gives you room for a product image, mockup, or editorial visual while keeping the messaging compact."
  highlights={[
    "Designed for launch pages and upgrade prompts",
    "Works with plain object data and optional custom visuals",
    "Keeps hierarchy balanced across mobile and desk",
  ]}
  image={{
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    alt: "Developer workstation with code on screen",
    caption: "Swap the default media card for a custom snippet only when the visual needs more structure.",
  }}
  title="Use the split CTA when the visual needs to sell the story too"
/>

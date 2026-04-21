<script lang="ts">
  import { Faq } from "../index.js";

  const items = [
    {
      question: "Are these blocks ready for CMS content?",
      answer:
        "Yes. The block APIs prefer strings, arrays, icons, and simple objects so content can come straight from a CMS, JSON document, or API payload.",
    },
    {
      question: "Can I still override the markup when I really need to?",
      answer:
        "Selective escape hatches exist on the variants that benefit from them, but the default experience is intentionally constrained to preserve layout quality.",
    },
    {
      question: "Do they adapt cleanly on mobile and desk?",
      answer:
        "Every block is built mobile-first and expands at the custom desk breakpoint so the same data model stays useful across marketing pages and product surfaces.",
    },
  ];
</script>

<Faq.Accordion
  description="A centered FAQ block for landing pages that need a compact, search-friendly support section."
  {items}
  title="Frequently asked questions"
/>

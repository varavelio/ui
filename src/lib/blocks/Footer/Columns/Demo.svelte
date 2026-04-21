<script lang="ts">
  import { Footer } from "../index.js";

  const brand = {
    name: "Varavel UI",
    href: "#",
    tagline:
      "A high-contrast Svelte 5 UI library built to help teams ship polished interfaces from structured content.",
  };

  const columns = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Documentation", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Careers", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Guides", href: "#" },
        { label: "Changelog", href: "#" },
        { label: "Status", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { label: "GitHub", href: "#" },
    { label: "X", href: "#" },
    { label: "Discord", href: "#" },
  ];

  const legalLinks = [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Cookies", href: "#" },
  ];
</script>

<Footer.Columns
  {brand}
  {columns}
  copyright={`© ${new Date().getFullYear()} Varavel. All rights reserved.`}
  {legalLinks}
  {socialLinks}
/>

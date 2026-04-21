<script lang="ts">
  import { Team } from "../index.js";

  const members = [
    {
      name: "Maya Chen",
      role: "Design Systems Lead",
      bio: "Shapes the visual rules that keep the library precise, calm, and scalable.",
      location: "Singapore",
      links: [
        { label: "LinkedIn", href: "#" },
        { label: "X", href: "#" },
      ],
    },
    {
      name: "Jon Alvarez",
      role: "Founding Engineer",
      bio: "Focuses on packaging, ergonomics, and keeping the API surface clean under pressure.",
      location: "Madrid",
      links: [{ label: "GitHub", href: "#" }],
    },
    {
      name: "Aisha Rahman",
      role: "Accessibility Specialist",
      bio: "Ensures every opinionated layout stays keyboard-friendly and readable in real products.",
      location: "Toronto",
      links: [{ label: "Website", href: "#" }],
    },
  ];
</script>

<Team.Grid
  description="A compact team grid for about pages, agencies, startups, and product teams that want a polished people section by default."
  {members}
  title="Meet the team"
/>

<script lang="ts">
  import { BlogList } from "../index.js";

  const posts = [
    {
      title: "Designing blocks that survive real CMS content",
      description:
        "Why opinionated layout decisions matter more when your content is authored by many hands over time.",
      href: "#",
      category: "Design systems",
      date: "Apr 2026",
      author: "Maya Chen",
      readTime: "6 min read",
      imageSrc:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "When to expose snippets and when to say no",
      description:
        "A practical rule for keeping component APIs extensible without turning blocks back into mini layout kits.",
      href: "#",
      category: "Architecture",
      date: "Apr 2026",
      author: "Jon Alvarez",
    },
    {
      title: "The case for a single desk breakpoint",
      description:
        "How one deliberate breakpoint keeps responsive decisions tighter across components and composed blocks.",
      href: "#",
      category: "UX",
      date: "Mar 2026",
      author: "Aisha Rahman",
    },
  ];
</script>

<BlogList.Grid
  description="A classic blog card grid that treats image, metadata, title, and summary as a fixed editorial pattern."
  {posts}
  title="Latest articles"
/>

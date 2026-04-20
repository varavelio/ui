<script lang="ts">
  import Heading from "../../components/Heading/Heading.svelte";
  import Link from "../../components/Link/Link.svelte";
  import Footer from "./Footer.svelte";
</script>

<Footer
  copyright={`© ${new Date().getFullYear()} Varavel. All rights reserved.`}
>
  {#snippet brand()}
    <div class="flex flex-col gap-4">
      <Heading level="4">Varavel UI</Heading>
      <p class="text-sm text-content-muted">
        Building the future of web interfaces with Svelte 5 and Tailwind CSS 4.
      </p>
    </div>
  {/snippet}

  <div class="flex flex-col gap-4">
    <h4 class="text-sm font-semibold text-content">Product</h4>
    <nav class="flex flex-col gap-2">
      <Link href="#" class="text-sm text-content-muted hover:text-content">
        Features
      </Link>
      <Link href="#" class="text-sm text-content-muted hover:text-content">
        Pricing
      </Link>
      <Link href="#" class="text-sm text-content-muted hover:text-content">
        Documentation
      </Link>
    </nav>
  </div>

  <div class="flex flex-col gap-4">
    <h4 class="text-sm font-semibold text-content">Company</h4>
    <nav class="flex flex-col gap-2">
      <Link href="#" class="text-sm text-content-muted hover:text-content">
        About
      </Link>
      <Link href="#" class="text-sm text-content-muted hover:text-content">
        Blog
      </Link>
      <Link href="#" class="text-sm text-content-muted hover:text-content">
        Careers
      </Link>
    </nav>
  </div>

  <div class="flex flex-col gap-4">
    <h4 class="text-sm font-semibold text-content">Legal</h4>
    <nav class="flex flex-col gap-2">
      <Link href="#" class="text-sm text-content-muted hover:text-content">
        Privacy
      </Link>
      <Link href="#" class="text-sm text-content-muted hover:text-content">
        Terms
      </Link>
      <Link href="#" class="text-sm text-content-muted hover:text-content">
        Cookie Policy
      </Link>
    </nav>
  </div>

  {#snippet bottomActions()}
    <Link href="#" class="text-content-muted hover:text-content">Twitter</Link>
    <Link href="#" class="text-content-muted hover:text-content">GitHub</Link>
    <Link href="#" class="text-content-muted hover:text-content">Discord</Link>
  {/snippet}
</Footer>

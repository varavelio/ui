<script lang="ts">
  import { Label } from "$lib/components/index.js";
  import Prose from "./Prose.svelte";

  const combinations: {
    label: string;
    size: "sm" | "md" | "lg";
    fluid: boolean;
  }[] = [
    { label: "Size SM · Constrained", size: "sm", fluid: false },
    { label: "Size SM · Fluid", size: "sm", fluid: true },
    { label: "Size MD · Constrained", size: "md", fluid: false },
    { label: "Size MD · Fluid", size: "md", fluid: true },
    { label: "Size LG · Constrained", size: "lg", fluid: false },
    { label: "Size LG · Fluid", size: "lg", fluid: true },
  ];
</script>

{#snippet proseContent(label: string)}
  <h1>{label}</h1>
  <p>
    This reusable snippet demonstrates prose defaults with semantic HTML, stable
    spacing, and consistent visual rhythm for long-form content.
  </p>

  <h2>Context</h2>
  <p>
    Rich text from markdown, CMS pipelines, or docs pages benefits from sane
    defaults that avoid per-page styling drift.
  </p>

  <h3>Unordered list</h3>
  <ul>
    <li>Readable paragraph and list rhythm</li>
    <li>Semantic link and quote treatment</li>
    <li>Useful defaults for code and tables</li>
  </ul>

  <h4>Ordered list</h4>
  <ol>
    <li>Write semantic HTML.</li>
    <li>Wrap it with <code>&lt;Prose&gt;</code>.</li>
    <li>Tune density with <code>size</code> and <code>fluid</code>.</li>
  </ol>

  <h5>Quote and link</h5>
  <blockquote>
    Good defaults reduce decisions, and fewer decisions improve consistency.
  </blockquote>
  <p>
    See the
    <a
      href="https://tailwindcss.com/docs/typography-plugin"
      target="_blank"
      rel="noreferrer"
    >
      Tailwind Typography documentation
    </a>
    for the generated utility surface.
  </p>

  <h6>Inline and block code</h6>
  <p>
    Inline references like <code>npm run ci</code> stay readable next to normal
    body text.
  </p>
  <pre>
    <code>
      import Prose from "$lib/components/Prose/Prose.svelte";

      &lt;Prose size="md" fluid&gt;
        &lt;h1&gt;Documentation&lt;/h1&gt;
        &lt;p&gt;This content keeps a consistent system style.&lt;/p&gt;
      &lt;/Prose&gt;
    </code>
  </pre>

  <table>
    <thead>
      <tr>
        <th>Prop</th>
        <th>Value</th>
        <th>Purpose</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>size</code></td>
        <td><code>sm | md | lg</code></td>
        <td>Controls typography scale</td>
      </tr>
      <tr>
        <td><code>fluid</code></td>
        <td><code>true | false</code></td>
        <td>Toggles max width constraint</td>
      </tr>
    </tbody>
  </table>

  <div class="not-prose rounded-md border border-base-400 bg-base-200 p-4">
    <p class="m-0 text-sm text-content">
      This <code class="text-content">not-prose</code> area is intentionally
      untouched by typography defaults.
    </p>
  </div>
{/snippet}

<div class="space-y-8">
  {#each combinations as combo (combo.label)}
    <div class="space-y-3">
      <Label>{combo.label}</Label>
      <Prose
        size={combo.size}
        fluid={combo.fluid}
        class="rounded-lg border border-base-400 p-6"
      >
        {@render proseContent(combo.label)}
      </Prose>
    </div>
  {/each}
</div>

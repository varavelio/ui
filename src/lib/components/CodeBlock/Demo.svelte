<script lang="ts">
  import { Card, Label, Switch } from "$lib/components/index.js";
  import { CodeBlock } from "./index.js";

  let bordered = $state(true);
  let showCopy = $state(true);
  let showDownload = $state(true);
  let showLineNumbers = $state(true);
  let useHighlighting = $state(true);

  const rawCode = `function calculateTotal(items) {
  return items.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
}`;

  // This is a simulated output from Shiki or a similar highlighter
  const highlightedHtml = `<pre class="shiki" tabindex="0"><code><span class="line"><span style="color: #F97583">function</span><span style="color: #B392F0"> calculateTotal</span><span style="color: #E1E4E8">(</span><span style="color: #FFAB70">items</span><span style="color: #E1E4E8">) {</span></span>
<span class="line"><span style="color: #F97583">  return</span><span style="color: #E1E4E8"> items.</span><span style="color: #B392F0">reduce</span><span style="color: #E1E4E8">((</span><span style="color: #FFAB70">sum</span><span style="color: #E1E4E8">, </span><span style="color: #FFAB70">item</span><span style="color: #E1E4E8">) </span><span style="color: #F97583">=&gt;</span><span style="color: #E1E4E8"> {</span></span>
<span class="line"><span style="color: #F97583">    return</span><span style="color: #E1E4E8"> sum </span><span style="color: #F97583">+</span><span style="color: #E1E4E8"> (item.price </span><span style="color: #F97583">*</span><span style="color: #E1E4E8"> item.quantity);</span></span>
<span class="line"><span style="color: #E1E4E8">  }, </span><span style="color: #79B8FF">0</span><span style="color: #E1E4E8">);</span></span>
<span class="line"><span style="color: #E1E4E8">}</span></span></code></pre>`;
</script>

<div class="grid grid-cols-1 gap-6 desk:grid-cols-2 mb-6">
  <div class="space-y-1">
    <h2 class="text-2xl font-bold tracking-tight">CodeBlock</h2>
    <p class="text-content-muted text-sm">
      Container for rendering pre-highlighted syntax, keeping your UI library
      lightweight.
    </p>
  </div>

  <div class="space-y-2">
    <Label>Global States</Label>
    <Card class="flex flex-wrap justify-start items-center space-x-4">
      <Switch bind:checked={bordered} size="sm" label="Border" />
      <Switch bind:checked={showCopy} size="sm" label="Copy Button" />
      <Switch bind:checked={showDownload} size="sm" label="Download Button" />
      <Switch bind:checked={showLineNumbers} size="sm" label="Line Numbers" />
      <Switch
        bind:checked={useHighlighting}
        size="sm"
        label="Use Highlighting"
      />
    </Card>
  </div>
</div>

<div class="grid grid-cols-1 gap-8">
  <div class="space-y-2">
    <Label>Preview</Label>

    <CodeBlock
      {rawCode}
      highlightedHtml={useHighlighting ? highlightedHtml : undefined}
      title="javascript"
      fileName="total.js"
      {bordered}
      {showCopy}
      {showDownload}
      {showLineNumbers}
      class="max-w-2xl mx-auto"
    />
  </div>
</div>

<script lang="ts">
  import { Card, Kbd, Label } from "$lib/components/index.js";
</script>

<div class="space-y-8">
  <div class="space-y-3">
    <Label>Basic Keys</Label>
    <Card class="flex flex-wrap items-center gap-4 p-6">
      <Kbd>Enter</Kbd>
      <Kbd>Shift</Kbd>
      <Kbd>Esc</Kbd>
      <Kbd>Space</Kbd>
    </Card>
  </div>

  <div class="space-y-3">
    <Label>Combinations</Label>
    <Card class="flex flex-wrap items-center gap-4 p-6">
      <div class="flex items-center gap-1.5">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </div>
      <div class="flex items-center gap-1.5">
        <Kbd>Ctrl</Kbd>
        <Kbd>Shift</Kbd>
        <Kbd>P</Kbd>
      </div>
    </Card>
  </div>

  <div class="space-y-3">
    <Label>Sizes</Label>
    <Card class="flex flex-wrap items-center gap-6 p-6">
      <div class="flex flex-col items-center gap-2">
        <Kbd size="sm">⌘</Kbd>
        <span class="text-xs text-content-muted">sm</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Kbd size="md">⌘</Kbd>
        <span class="text-xs text-content-muted">md</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Kbd size="lg">⌘</Kbd>
        <span class="text-xs text-content-muted">lg</span>
      </div>
    </Card>
  </div>
</div>

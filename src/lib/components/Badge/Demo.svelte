<script lang="ts">
  import { Badge, Card, Label } from "$lib/components/index.js";
</script>

<div class="space-y-8">
  <div class="space-y-3">
    <Label>Variants & Colors</Label>
    <Card class="space-y-6 p-6">
      <div class="space-y-3">
        <span
          class="text-xs font-medium uppercase tracking-wider text-content-muted"
        >
          Solid
        </span>
        <div class="flex flex-wrap items-center gap-3">
          <Badge variant="solid" color="neutral">Neutral</Badge>
          <Badge variant="solid" color="info">Info</Badge>
          <Badge variant="solid" color="success">Success</Badge>
          <Badge variant="solid" color="warning">Warning</Badge>
          <Badge variant="solid" color="danger">Danger</Badge>
        </div>
      </div>
      <div class="space-y-3">
        <span
          class="text-xs font-medium uppercase tracking-wider text-content-muted"
        >
          Soft (Default)
        </span>
        <div class="flex flex-wrap items-center gap-3">
          <Badge variant="soft" color="neutral">Neutral</Badge>
          <Badge variant="soft" color="info">Info</Badge>
          <Badge variant="soft" color="success">Success</Badge>
          <Badge variant="soft" color="warning">Warning</Badge>
          <Badge variant="soft" color="danger">Danger</Badge>
        </div>
      </div>
      <div class="space-y-3">
        <span
          class="text-xs font-medium uppercase tracking-wider text-content-muted"
        >
          Outline
        </span>
        <div class="flex flex-wrap items-center gap-3">
          <Badge variant="outline" color="neutral">Neutral</Badge>
          <Badge variant="outline" color="info">Info</Badge>
          <Badge variant="outline" color="success">Success</Badge>
          <Badge variant="outline" color="warning">Warning</Badge>
          <Badge variant="outline" color="danger">Danger</Badge>
        </div>
      </div>
    </Card>
  </div>

  <div class="space-y-3">
    <Label>Sizes</Label>
    <Card class="flex flex-wrap items-center gap-6 p-6">
      <div class="flex flex-col items-center gap-2">
        <Badge size="sm">Small</Badge>
        <span class="text-xs text-content-muted">sm</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Badge size="md">Medium</Badge>
        <span class="text-xs text-content-muted">md</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Badge size="lg">Large</Badge>
        <span class="text-xs text-content-muted">lg</span>
      </div>
    </Card>
  </div>
</div>

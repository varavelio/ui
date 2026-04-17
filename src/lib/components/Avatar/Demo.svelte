<script lang="ts">
  import { Avatar, Card, Label } from "$lib/components/index.js";
</script>

<div class="space-y-8">
  <div class="space-y-3">
    <Label>Sizes</Label>
    <Card class="flex flex-wrap items-center gap-6 p-6">
      <div class="flex flex-col items-center gap-2">
        <Avatar alt="Varavel Labs" fallback="VL" size="sm" />
        <span class="text-xs text-content-muted">sm</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Avatar alt="Varavel Labs" fallback="VL" size="md" />
        <span class="text-xs text-content-muted">md</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Avatar alt="Varavel Labs" fallback="VL" size="lg" />
        <span class="text-xs text-content-muted">lg</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Avatar alt="Varavel Labs" fallback="VL" size="xl" />
        <span class="text-xs text-content-muted">xl</span>
      </div>
    </Card>
  </div>

  <div class="space-y-3">
    <Label>Tones & Borders</Label>
    <Card class="grid gap-6 p-6 sm:grid-cols-2">
      <div class="space-y-4">
        <span class="text-sm font-medium text-content-muted">Neutral</span>
        <div class="flex items-center gap-4">
          <Avatar alt="Neutral" fallback="NE" tone="neutral" />
          <Avatar
            alt="Neutral Unbordered"
            fallback="NE"
            tone="neutral"
            bordered={false}
          />
        </div>
      </div>
      <div class="space-y-4">
        <span class="text-sm font-medium text-content-muted">Contrast</span>
        <div class="flex items-center gap-4">
          <Avatar alt="Contrast" fallback="CT" tone="contrast" />
          <Avatar
            alt="Contrast Unbordered"
            fallback="CT"
            tone="contrast"
            bordered={false}
          />
        </div>
      </div>
    </Card>
  </div>

  <div class="space-y-3">
    <Label>Interactivity</Label>
    <Card class="flex flex-wrap items-center gap-6 p-6">
      <div class="flex flex-col items-center gap-2">
        <Avatar
          alt="Interactive Avatar"
          fallback="IA"
          interactive
          size="lg"
          tone="contrast"
        />
        <span class="text-xs text-content-muted">Interactive</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Avatar alt="Non-interactive" fallback="NI" size="lg" />
        <span class="text-xs text-content-muted">Static (Default)</span>
      </div>
    </Card>
  </div>

  <div class="space-y-3">
    <Label>Images & Fallbacks</Label>
    <Card class="flex flex-wrap items-center gap-6 p-6">
      <div class="flex flex-col items-center gap-2">
        <Avatar
          alt="Varavel"
          src="https://cdn.jsdelivr.net/gh/varavelio/brand@1.0.0/dist/avatar-dark.svg"
          size="lg"
        />
        <span class="text-xs text-content-muted">Image</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Avatar
          alt="Fallback example"
          fallback="FB"
          tone="contrast"
          size="lg"
        />
        <span class="text-xs text-content-muted">Fallback Text</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Avatar alt="No source provided" size="lg" />
        <span class="text-xs text-content-muted">Empty (Default)</span>
      </div>
    </Card>
  </div>
</div>

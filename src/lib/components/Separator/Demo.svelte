<script lang="ts">
  import { Card, Label, Separator } from "$lib/components/index.js";
</script>

<div class="space-y-8">
  <div class="space-y-3">
    <Label>Horizontal Orientation</Label>
    <Card class="space-y-4 p-6">
      <div class="space-y-1">
        <h3 class="font-medium">User Profile</h3>
        <p class="text-sm text-content-muted">
          Manage your personal information and preferences.
        </p>
      </div>
      <Separator />
      <div class="flex items-center gap-4 text-sm font-medium">
        <span>Account</span>
        <span>Security</span>
        <span>Billing</span>
      </div>
    </Card>
  </div>

  <div class="space-y-3">
    <Label>Vertical Orientation</Label>
    <Card class="flex h-16 items-center justify-center gap-6 p-6">
      <div class="text-sm font-medium">Dashboard</div>
      <Separator orientation="vertical" />
      <div class="text-sm font-medium">Analytics</div>
      <Separator orientation="vertical" />
      <div class="text-sm font-medium">Settings</div>
    </Card>
  </div>

  <div class="space-y-3">
    <Label>Insets</Label>
    <Card class="space-y-4 p-6">
      <div class="space-y-4">
        <div
          class="text-xs font-medium uppercase tracking-wider text-content-muted italic"
        >
          No Inset (Default)
        </div>
        <Separator />
      </div>
      <div class="space-y-4">
        <div
          class="text-xs font-medium uppercase tracking-wider text-content-muted italic"
        >
          Small Inset
        </div>
        <Separator inset="sm" />
      </div>
      <div class="space-y-4">
        <div
          class="text-xs font-medium uppercase tracking-wider text-content-muted italic"
        >
          Medium Inset
        </div>
        <Separator inset="md" />
      </div>
      <div class="space-y-4">
        <div
          class="text-xs font-medium uppercase tracking-wider text-content-muted italic"
        >
          Large Inset
        </div>
        <Separator inset="lg" />
      </div>
    </Card>
  </div>
</div>

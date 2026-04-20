<script lang="ts">
  import {
    Archive,
    ChevronDown,
    LayoutDashboard,
    Link,
    LogOut,
    Settings,
    Trash,
    User,
  } from "@lucide/svelte";
  import { Card, Menu } from "$lib/components/index.js";
  import Avatar from "../Avatar/Avatar.svelte";

  let lastAction = $state("No action yet");

  const simpleItems = [
    {
      label: "View profile",
      icon: UserIcon,
      onSelect: () => (lastAction = "View profile"),
    },
    {
      label: "Settings",
      icon: SettingsIcon,
      onSelect: () => (lastAction = "Settings"),
    },
    { type: "separator" },
    {
      label: "Logout",
      destructive: true,
      icon: LogOutIcon,
      onSelect: () => (lastAction = "Logout"),
    },
  ];

  const itemsWithIcons = [
    { type: "label", label: "Project" },
    {
      label: "Open dashboard",
      icon: DashboardIcon,
      onSelect: () => (lastAction = "Opened dashboard"),
    },
    {
      label: "Copy link",
      icon: LinkIcon,
      onSelect: () => (lastAction = "Copied link"),
    },
    { type: "separator" },
    {
      label: "Delete project",
      destructive: true,
      icon: TrashIcon,
      onSelect: () => (lastAction = "Deleted project"),
    },
  ];

  const complexItems = [
    { type: "label", label: "Navigation" },
    {
      label: "Dashboard",
      icon: DashboardIcon,
      onSelect: () => (lastAction = "Dashboard"),
    },
    {
      label: "Settings",
      icon: SettingsIcon,
      onSelect: () => (lastAction = "Settings"),
    },
    { type: "separator" },
    { type: "label", label: "Danger Zone" },
    {
      label: "Archive project",
      disabled: true,
      icon: ArchiveIcon,
      onSelect: () => (lastAction = "Archived project"),
    },
    {
      label: "Delete permanently",
      destructive: true,
      icon: TrashIcon,
      onSelect: () => (lastAction = "Deleted project permanently"),
    },
  ];
</script>

{#snippet UserIcon()}
  <User size={16} />
{/snippet}

{#snippet LogOutIcon()}
  <LogOut size={16} />
{/snippet}

{#snippet DashboardIcon()}
  <LayoutDashboard size={16} />
{/snippet}

{#snippet LinkIcon()}
  <Link size={16} />
{/snippet}

{#snippet TrashIcon()}
  <Trash size={16} />
{/snippet}

{#snippet SettingsIcon()}
  <Settings size={16} />
{/snippet}

{#snippet ArchiveIcon()}
  <Archive size={16} />
{/snippet}

{#snippet customTrigger()}
  <Avatar fallback="JD" interactive />
{/snippet}

{#snippet contextTrigger()}
  <div
    class="grid h-24 w-48 place-items-center rounded-lg border border-dashed border-base-400 px-4 text-center text-sm text-content-muted"
  >
    Right-click here
  </div>
{/snippet}

<Card class="flex flex-col gap-8">
  <div class="flex flex-wrap gap-4">
    <div class="flex flex-col gap-2">
      <span class="text-xs font-medium text-content-muted text-center">
        Simple
      </span>
      <Menu
        items={simpleItems}
        label="Simple Menu"
        iconRight={ChevronDown}
        variant="outline"
      />
    </div>

    <div class="flex flex-col gap-2">
      <span class="text-xs font-medium text-content-muted text-center">
        With Icons
      </span>
      <Menu
        items={itemsWithIcons}
        label="Icon Menu"
        icon={Link}
        iconRight={ChevronDown}
        variant="outline"
      />
    </div>

    <div class="flex flex-col gap-2">
      <span class="text-xs font-medium text-content-muted text-center">
        Complex
      </span>
      <Menu
        items={complexItems}
        label="Complex Menu"
        iconRight={ChevronDown}
        variant="outline"
        size="lg"
      />
    </div>

    <div class="flex flex-col gap-2">
      <span class="text-xs font-medium text-content-muted text-center">
        Custom Trigger
      </span>
      <Menu items={simpleItems} trigger={customTrigger} />
    </div>

    <div class="flex flex-col gap-2">
      <span class="text-xs font-medium text-content-muted text-center">
        Context Menu
      </span>
      <Menu items={itemsWithIcons} mode="context" trigger={contextTrigger} />
    </div>

    <div class="flex flex-col gap-2">
      <span class="text-xs font-medium text-content-muted text-center">
        Context Button
      </span>
      <Menu
        items={simpleItems}
        mode="context"
        label="Right-click Button"
        iconRight={ChevronDown}
        variant="outline"
      />
    </div>
  </div>

  <p class="text-sm text-content-muted italic">Last action: {lastAction}</p>
</Card>

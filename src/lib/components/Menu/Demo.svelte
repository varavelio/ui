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
  import { Button, Card, Menu } from "$lib/components/index.js";
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

{#snippet simpleTrigger()}
  <Button variant="outline">
    Simple Menu <ChevronDown size={16} class="ml-2" />
  </Button>
{/snippet}

{#snippet iconTrigger()}
  <Button variant="outline">
    Icon Menu <ChevronDown size={16} class="ml-2" />
  </Button>
{/snippet}

{#snippet complexTrigger()}
  <Button variant="outline">
    Complex Menu <ChevronDown size={16} class="ml-2" />
  </Button>
{/snippet}

{#snippet customTrigger()}
  <Avatar fallback="JD" />
{/snippet}

<Card class="flex flex-col gap-8">
  <div class="flex flex-wrap gap-4">
    <div class="flex flex-col gap-2">
      <span class="text-xs font-medium text-content-muted text-center"
        >Simple</span
      >
      <Menu items={simpleItems} trigger={simpleTrigger} />
    </div>

    <div class="flex flex-col gap-2">
      <span class="text-xs font-medium text-content-muted text-center"
        >With Icons</span
      >
      <Menu items={itemsWithIcons} trigger={iconTrigger} />
    </div>

    <div class="flex flex-col gap-2">
      <span class="text-xs font-medium text-content-muted text-center"
        >Complex</span
      >
      <Menu items={complexItems} trigger={complexTrigger} />
    </div>

    <div class="flex flex-col gap-2">
      <span class="text-xs font-medium text-content-muted text-center"
        >Custom Trigger</span
      >
      <Menu items={simpleItems} trigger={customTrigger} />
    </div>
  </div>

  <p class="text-sm text-content-muted italic">Last action: {lastAction}</p>
</Card>

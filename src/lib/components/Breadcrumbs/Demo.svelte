<script lang="ts">
  import {
    Bell,
    BookOpen,
    House,
    Package,
    Settings2,
    ShieldCheck,
    UserRound,
  } from "@lucide/svelte";
  import type { Component } from "svelte";
  import { Breadcrumbs, Card, Label } from "$lib/components/index.js";

  type BreadcrumbDemoItem = {
    label: string;
    icon: Component;
    href?: string;
    onClick?: () => void;
    disabled?: boolean;
  };

  const linkOnlyItems: BreadcrumbDemoItem[] = [
    { label: "Home", icon: House, href: "#home" },
    {
      label: "Workspace",
      icon: UserRound,
      href: "#workspace",
    },
    { label: "Modules", icon: Package, href: "#modules" },
    { label: "Security", icon: ShieldCheck },
  ];

  const buttonOnlyItems: BreadcrumbDemoItem[] = [
    { label: "Home", icon: House, onClick: () => {} },
    { label: "Alerts", icon: Bell, onClick: () => {} },
    {
      label: "Settings",
      icon: Settings2,
      onClick: () => {},
    },
    { label: "Access Tokens", icon: ShieldCheck },
  ];

  const mixedItems: BreadcrumbDemoItem[] = [
    { label: "Docs", icon: BookOpen, href: "#docs" },
    {
      label: "Settings",
      icon: Settings2,
      onClick: () => {},
    },
    {
      label: "Billing",
      icon: ShieldCheck,
      onClick: () => {},
      disabled: true,
    },
    { label: "Usage limits", icon: Package },
  ];

  const textOnlyItems: BreadcrumbDemoItem[] = [
    { label: "Platform", icon: House },
    { label: "Infrastructure", icon: Settings2 },
    { label: "Permissions", icon: ShieldCheck },
  ];

  const disabledVariantsItems: BreadcrumbDemoItem[] = [
    {
      label: "Home",
      icon: House,
      href: "#home",
      disabled: true,
    },
    {
      label: "Alerts",
      icon: Bell,
      onClick: () => {},
      disabled: true,
    },
    { label: "Settings", icon: Settings2, disabled: true },
    { label: "Summary", icon: Package },
  ];

  const overflowItems: BreadcrumbDemoItem[] = [
    {
      label: "Very long organization name",
      icon: House,
      href: "#org",
    },
    {
      label: "Distributed platform project with nested modules",
      icon: Package,
      href: "#project",
    },
    {
      label: "Production environment configuration",
      icon: Settings2,
      onClick: () => {},
    },
    {
      label: "API token permissions",
      icon: ShieldCheck,
    },
  ];
</script>

<div class="grid grid-cols-1 gap-4 desk:grid-cols-2">
  <Card class="space-y-2">
    <Label>Links Only</Label>
    <Breadcrumbs items={linkOnlyItems} />
    <p class="text-sm text-content-muted">
      All previous steps are links and the last step is static active text.
    </p>
  </Card>

  <Card class="space-y-2">
    <Label>Buttons Only</Label>
    <Breadcrumbs items={buttonOnlyItems} />
    <p class="text-sm text-content-muted">
      Steps with
      <code class="rounded-sm bg-base-200 px-1.5 py-0.5 text-xs">onClick</code>
      render as buttons.
    </p>
  </Card>

  <Card class="space-y-2">
    <Label>Mixed Types and Disabled Step</Label>
    <Breadcrumbs items={mixedItems} />
    <p class="text-sm text-content-muted">
      A step can be a link, button, or text. Disabled steps become
      non-interactive.
    </p>
  </Card>

  <Card class="space-y-2">
    <Label>Text-Only Steps</Label>

    <Breadcrumbs items={textOnlyItems} />
    <p class="text-sm text-content-muted">
      Items without
      <code class="rounded-sm bg-base-200 px-1.5 py-0.5 text-xs">href</code>
      and
      <code class="rounded-sm bg-base-200 px-1.5 py-0.5 text-xs">onClick</code>
      render as plain text.
    </p>
  </Card>

  <Card class="space-y-2">
    <Label>Disabled Variants</Label>
    <Breadcrumbs items={disabledVariantsItems} />
    <p class="text-sm text-content-muted">
      Disabled behavior is consistent for link, button, and text steps.
    </p>
  </Card>

  <Card class="space-y-2">
    <Label>Horizontal Overflow</Label>
    <Breadcrumbs items={overflowItems} />
    <p class="text-sm text-content-muted">
      Overflow uses native horizontal scroll and starts from the right edge.
    </p>
  </Card>
</div>

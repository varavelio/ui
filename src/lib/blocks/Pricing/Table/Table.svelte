<script lang="ts">
  import { Check, Minus, X } from "@lucide/svelte";
  import type { Component } from "svelte";
  import type { HTMLAnchorAttributes, HTMLAttributes } from "svelte/elements";
  import Button from "$lib/components/Button/Button.svelte";
  import Card from "$lib/components/Card/Card.svelte";
  import Container from "$lib/components/Container/Container.svelte";
  import { Table } from "$lib/components/index.js";
  import { cn } from "$lib/helpers/cn.js";

  export interface PricingTableAction {
    label: string;
    href?: string;
    target?: HTMLAnchorAttributes["target"];
    rel?: HTMLAnchorAttributes["rel"];
    external?: boolean;
    variant?: "solid" | "outline" | "ghost";
    color?: "neutral" | "info" | "success" | "warning" | "error";
    size?: "sm" | "md" | "lg";
    icon?: Component;
    iconRight?: Component;
  }

  export interface PricingTablePlan {
    id: string;
    name: string;
    price: string;
    period?: string;
    description?: string;
    badge?: string;
    featured?: boolean;
    cta: PricingTableAction;
  }

  export interface PricingFeatureRow {
    label: string;
    description?: string;
    availability: Record<string, boolean | string>;
  }

  export interface PricingFeatureGroup {
    title: string;
    items: PricingFeatureRow[];
  }

  export interface PricingTableProps
    extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    eyebrow?: string;
    title?: string;
    description?: string;
    plans: PricingTablePlan[];
    groups: PricingFeatureGroup[];
    disclaimer?: string;
  }

  let {
    class: className,
    eyebrow,
    title,
    description,
    plans,
    groups,
    disclaimer,
    ...restProps
  }: PricingTableProps = $props();

  const mobileGroups = $derived.by(() =>
    plans.map((plan) => ({
      ...plan,
      groups: groups.map((group) => ({
        title: group.title,
        items: group.items.map((item) => ({
          ...item,
          value: item.availability[plan.id],
        })),
      })),
    })),
  );

  function valueState(value: PricingFeatureRow["availability"][string]) {
    if (typeof value === "string") {
      return "text";
    }

    if (value === true) {
      return "yes";
    }

    if (value === false) {
      return "no";
    }

    return "empty";
  }
</script>

<section class={cn("py-16 desk:py-24", className)} {...restProps}>
  <Container maxWidth="lg" padded>
    <div class="space-y-10 desk:space-y-12">
      {#if eyebrow || title || description}
        <div class="mx-auto flex max-w-3xl flex-col gap-4 text-center">
          {#if eyebrow}
            <p
              class="text-xs font-medium uppercase tracking-[0.24em] text-content-muted"
            >
              {eyebrow}
            </p>
          {/if}

          {#if title}
            <h2
              class="text-3xl font-semibold tracking-tight text-content desk:text-4xl"
            >
              {title}
            </h2>
          {/if}

          {#if description}
            <p class="text-base leading-7 text-content-muted desk:text-lg">
              {description}
            </p>
          {/if}
        </div>
      {/if}

      <div class="space-y-4 desk:hidden">
        {#each mobileGroups as plan (plan.id)}
          <Card class="space-y-6 p-6">
            <div class="space-y-3">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h3 class="text-xl font-medium tracking-tight text-content">
                    {plan.name}
                  </h3>
                  {#if plan.description}
                    <p class="mt-2 text-sm leading-6 text-content-muted">
                      {plan.description}
                    </p>
                  {/if}
                </div>

                {#if plan.badge}
                  <span
                    class="rounded-full border border-base-400 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-content-muted"
                  >
                    {plan.badge}
                  </span>
                {/if}
              </div>

              <div class="flex items-end gap-2">
                <span
                  class="text-3xl font-semibold tracking-tight text-content"
                >
                  {plan.price}
                </span>
                {#if plan.period}
                  <span class="pb-1 text-sm text-content-muted">
                    {plan.period}
                  </span>
                {/if}
              </div>
            </div>

            <Button
              href={plan.cta.href}
              icon={plan.cta.icon}
              iconRight={plan.cta.iconRight}
              rel={plan.cta.rel}
              target={plan.cta.target}
              variant={plan.cta.variant ?? (plan.featured ? "solid" : "outline")}
              wide
            >
              {plan.cta.label}
            </Button>

            <div class="space-y-5 border-t border-base-400 pt-5">
              {#each plan.groups as group (group.title)}
                <div class="space-y-3">
                  <h4
                    class="text-xs font-medium uppercase tracking-[0.2em] text-content-muted"
                  >
                    {group.title}
                  </h4>

                  <div class="space-y-3">
                    {#each group.items as item (`${plan.id}-${group.title}-${item.label}`)}
                      <div
                        class="flex items-start justify-between gap-4 text-sm"
                      >
                        <div>
                          <p class="font-medium text-content">{item.label}</p>
                          {#if item.description}
                            <p class="mt-1 leading-6 text-content-muted">
                              {item.description}
                            </p>
                          {/if}
                        </div>

                        {#if valueState(item.value) === "yes"}
                          <Check class="mt-1 size-4 shrink-0 text-content" />
                        {:else if valueState(item.value) === "no"}
                          <X class="mt-1 size-4 shrink-0 text-content-muted" />
                        {:else if valueState(item.value) === "text"}
                          <span class="shrink-0 font-medium text-content">
                            {item.value}
                          </span>
                        {:else}
                          <Minus
                            class="mt-1 size-4 shrink-0 text-content-muted"
                          />
                        {/if}
                      </div>
                    {/each}
                  </div>
                </div>
              {/each}
            </div>
          </Card>
        {/each}
      </div>

      <div class="hidden desk:block">
        <Table.Root stickyHeader>
          <Table.Header>
            <Table.Row>
              <Table.Head class="w-[30%]">Feature</Table.Head>
              {#each plans as plan (plan.id)}
                <Table.Head class="w-[23%] align-top">
                  <div class="space-y-3 py-1">
                    <div class="flex items-center justify-between gap-3">
                      <span class="text-lg font-medium text-content">
                        {plan.name}
                      </span>
                      {#if plan.badge}
                        <span
                          class="rounded-full border border-base-400 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-content-muted"
                        >
                          {plan.badge}
                        </span>
                      {/if}
                    </div>

                    <div class="flex items-end gap-2">
                      <span
                        class="text-2xl font-semibold tracking-tight text-content"
                      >
                        {plan.price}
                      </span>
                      {#if plan.period}
                        <span class="pb-1 text-xs text-content-muted">
                          {plan.period}
                        </span>
                      {/if}
                    </div>

                    {#if plan.description}
                      <p class="text-xs leading-5 text-content-muted">
                        {plan.description}
                      </p>
                    {/if}

                    <Button
                      class="mt-1"
                      href={plan.cta.href}
                      rel={plan.cta.rel}
                      size="sm"
                      target={plan.cta.target}
                      variant={plan.cta.variant ?? (plan.featured ? "solid" : "outline")}
                      wide
                    >
                      {plan.cta.label}
                    </Button>
                  </div>
                </Table.Head>
              {/each}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {#each groups as group (group.title)}
              <Table.Row>
                <Table.Cell
                  class="bg-base-300 font-medium uppercase tracking-[0.18em] text-content-muted"
                >
                  {group.title}
                </Table.Cell>
                {#each plans as plan (plan.id)}
                  <Table.Cell class="bg-base-300" />
                {/each}
              </Table.Row>

              {#each group.items as item (`${group.title}-${item.label}`)}
                <Table.Row>
                  <Table.Cell>
                    <div class="space-y-1">
                      <p class="font-medium text-content">{item.label}</p>
                      {#if item.description}
                        <p class="text-xs leading-5 text-content-muted">
                          {item.description}
                        </p>
                      {/if}
                    </div>
                  </Table.Cell>

                  {#each plans as plan (plan.id)}
                    {@const value = item.availability[plan.id]}
                    <Table.Cell align="center">
                      {#if valueState(value) === "yes"}
                        <Check class="mx-auto size-4 text-content" />
                      {:else if valueState(value) === "no"}
                        <X class="mx-auto size-4 text-content-muted" />
                      {:else if valueState(value) === "text"}
                        <span class="font-medium text-content">{value}</span>
                      {:else}
                        <Minus class="mx-auto size-4 text-content-muted" />
                      {/if}
                    </Table.Cell>
                  {/each}
                </Table.Row>
              {/each}
            {/each}
          </Table.Body>
        </Table.Root>
      </div>

      {#if disclaimer}
        <p class="text-center text-sm text-content-muted">{disclaimer}</p>
      {/if}
    </div>
  </Container>
</section>

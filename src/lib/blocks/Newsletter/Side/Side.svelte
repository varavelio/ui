<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import Button from "$lib/components/Button/Button.svelte";
  import Container from "$lib/components/Container/Container.svelte";
  import Input from "$lib/components/Input/Input.svelte";
  import { cn } from "$lib/helpers/cn.js";

  export interface NewsletterSideProps
    extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    eyebrow?: string;
    title?: string;
    description?: string;
    buttonLabel: string;
    placeholder?: string;
    helperText?: string;
    disclaimer?: string;
    formAction?: string;
    formMethod?: "get" | "post";
    name?: string;
    label?: string;
    highlights?: string[];
  }

  let {
    class: className,
    eyebrow,
    title,
    description,
    buttonLabel,
    placeholder = "Enter your email",
    helperText,
    disclaimer,
    formAction,
    formMethod = "post",
    name = "email",
    label = "Email address",
    highlights = [],
    ...restProps
  }: NewsletterSideProps = $props();

  const fieldId = $derived(`newsletter-side-${name}`);
</script>

<section class={cn("py-16 desk:py-24", className)} {...restProps}>
  <Container maxWidth="lg" padded>
    <div
      class="grid gap-8 rounded-lg border border-base-400 bg-base-200 p-6 desk:grid-cols-[minmax(0,1fr)_minmax(360px,420px)] desk:items-center desk:gap-10 desk:p-8"
    >
      <div class="space-y-6">
        {#if eyebrow || title || description}
          <div class="flex flex-col gap-4 text-left">
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

        {#if highlights.length}
          <div class="grid gap-3 sm:grid-cols-2">
            {#each highlights as highlight (highlight)}
              <div
                class="rounded-md border border-base-400 bg-base-100 px-4 py-3 text-sm text-content-muted"
              >
                {highlight}
              </div>
            {/each}
          </div>
        {/if}
      </div>

      <form
        action={formAction}
        class="space-y-4 rounded-lg border border-base-400 bg-base-100 p-5"
        method={formMethod}
      >
        <label class="text-sm font-medium text-content" for={fieldId}>
          {label}
        </label>
        <Input id={fieldId} {name} {placeholder} size="lg" type="email" />
        <Button size="lg" type="submit" wide>{buttonLabel}</Button>

        {#if helperText}
          <p class="text-sm text-content-muted">{helperText}</p>
        {/if}

        {#if disclaimer}
          <p class="text-sm text-content-muted">{disclaimer}</p>
        {/if}
      </form>
    </div>
  </Container>
</section>

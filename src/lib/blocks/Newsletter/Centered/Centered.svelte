<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import Button from "$lib/components/Button/Button.svelte";
  import Card from "$lib/components/Card/Card.svelte";
  import Container from "$lib/components/Container/Container.svelte";
  import Input from "$lib/components/Input/Input.svelte";
  import { cn } from "$lib/helpers/cn.js";

  export interface NewsletterCenteredProps
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
    ...restProps
  }: NewsletterCenteredProps = $props();

  const fieldId = $derived(`newsletter-centered-${name}`);
</script>

<section class={cn("py-16 desk:py-24", className)} {...restProps}>
  <Container maxWidth="sm" padded>
    <Card class="space-y-8 p-6 text-center desk:p-8">
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

      <form action={formAction} class="space-y-4" method={formMethod}>
        <label class="sr-only" for={fieldId}>{label}</label>
        <div class="flex flex-col gap-3 desk:flex-row">
          <Input id={fieldId} {name} {placeholder} size="lg" type="email" />
          <Button size="lg" type="submit">{buttonLabel}</Button>
        </div>

        {#if helperText}
          <p class="text-sm text-content-muted">{helperText}</p>
        {/if}

        {#if disclaimer}
          <p class="text-sm text-content-muted">{disclaimer}</p>
        {/if}
      </form>
    </Card>
  </Container>
</section>

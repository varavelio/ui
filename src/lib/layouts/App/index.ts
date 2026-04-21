import type { ComponentProps } from "svelte";
import { appLayoutApi } from "./api.ts";
import AppLayout from "./Root.svelte";

export { AppLayout, appLayoutApi };
export type AppLayoutProps = ComponentProps<typeof AppLayout>;

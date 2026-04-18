import { error } from "@sveltejs/kit";

const validTypes = new Set([
  "components",
  "brand",
  "blocks",
  "layouts",
  "runtime",
]);

export function load({ params }: { params: { type: string } }) {
  if (!validTypes.has(params.type)) {
    error(404, "Explorer section not found");
  }
}

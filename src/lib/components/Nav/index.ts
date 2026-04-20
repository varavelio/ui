import Group from "./Group.svelte";
import Item from "./Item.svelte";
import Root from "./Root.svelte";

export const Nav = {
  Root,
  Item,
  Group,
} as const;

export default Nav;

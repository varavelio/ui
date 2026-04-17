import Body from "./Body.svelte";
import Caption from "./Caption.svelte";
import Cell from "./Cell.svelte";
import Footer from "./Footer.svelte";
import Head from "./Head.svelte";
import Header from "./Header.svelte";
import Root from "./Root.svelte";
import Row from "./Row.svelte";

export const Table = {
  Root,
  Header,
  Body,
  Footer,
  Row,
  Head,
  Cell,
  Caption,
} as const;

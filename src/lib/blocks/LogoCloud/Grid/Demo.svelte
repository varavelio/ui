<script lang="ts">
  import { LogoCloud } from "../index.js";

  const logos = [
    { name: "Northstar" },
    { name: "Relay" },
    { name: "Framebase" },
    { name: "Atlas" },
    { name: "Monograph" },
    { name: "Signal" },
  ];
</script>

<LogoCloud.Grid
  description="A simple trust section that keeps logos monochrome so the surrounding layout stays calm and consistent."
  {logos}
  title="Trusted by teams shipping fast"
/>

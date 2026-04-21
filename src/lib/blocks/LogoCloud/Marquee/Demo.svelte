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

<LogoCloud.Marquee
  description="Use the marquee variant when the logo list needs motion without becoming a full-blown carousel."
  {logos}
  title="Moving logo strip"
/>

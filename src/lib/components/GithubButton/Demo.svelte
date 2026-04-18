<script lang="ts">
  import { Card, GithubButton, Label } from "$lib/components/index.js";
</script>

<div class="space-y-8">
  <div class="space-y-3">
    <Label>Default</Label>
    <Card class="grid grid-cols-1 gap-4 p-6 desk:grid-cols-2">
      <GithubButton user="varavelio" repo="ui" />
      <GithubButton user="varavelio" repo="ui" variant="ghost" />
    </Card>
  </div>

  <div class="space-y-3">
    <Label>Controls</Label>
    <Card class="grid grid-cols-1 gap-4 p-6 desk:grid-cols-2">
      <GithubButton user="varavelio" repo="vdl" showTag={false} />
      <GithubButton
        user="varavelio"
        repo="vdl-plugin-sdk"
        showForks={false}
        showStars={false}
      />
    </Card>
  </div>
</div>

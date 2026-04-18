<script lang="ts">
  import { Card, Label, Pagination, Table } from "$lib/components/index.js";

  let page = $state(3);
  const perPage = 10;
  const rows = Array.from({ length: 128 }, (_, index) => ({
    id: `REQ-${String(index + 1).padStart(3, "0")}`,
    status: index % 4 === 0 ? "Queued" : index % 3 === 0 ? "Review" : "Ready",
  }));

  let visibleRows = $derived.by(() => {
    const start = (page - 1) * perPage;
    return rows.slice(start, start + perPage);
  });
</script>

<div class="space-y-8">
  <div class="space-y-3">
    <Label>Default</Label>
    <Card class="space-y-6 p-6">
      <Table.Root size="sm" striped>
        <thead>
          <tr>
            <th>Request</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {#each visibleRows as row (row.id)}
            <tr>
              <td class="font-mono">{row.id}</td>
              <td>{row.status}</td>
            </tr>
          {/each}
        </tbody>
      </Table.Root>

      <Pagination bind:page count={rows.length} {perPage} showSummary />
    </Card>
  </div>

  <div class="space-y-3">
    <Label>Minimal Navigation</Label>
    <Card class="space-y-4 p-6">
      <Pagination count={128} page={3} perPage={10} />
      <Pagination
        count={28}
        page={2}
        perPage={8}
        prevLabel="Prev"
        nextLabel="Next"
      />
    </Card>
  </div>
</div>

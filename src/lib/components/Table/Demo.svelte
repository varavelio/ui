<script lang="ts">
  import { Badge, Button, Card } from "$lib/components/index.js";
  import { Table } from "./index.js";

  const invoices = [
    {
      id: "INV-2048",
      customer: "Northwind",
      owner: "A. Morgan",
      status: "Paid",
      amount: "$12,480",
    },
    {
      id: "INV-2049",
      customer: "Acme Inc.",
      owner: "S. Patel",
      status: "Pending",
      amount: "$4,320",
    },
    {
      id: "INV-2050",
      customer: "Orbital",
      owner: "J. Chen",
      status: "Review",
      amount: "$9,110",
    },
  ];

  const quarterly = [
    { region: "North America", revenue: "$482,000", margin: "38%" },
    { region: "EMEA", revenue: "$361,000", margin: "32%" },
    { region: "APAC", revenue: "$294,000", margin: "29%" },
    { region: "LATAM", revenue: "$118,000", margin: "24%" },
  ];

  const quarterlySnapshots = Array.from({ length: 24 }, (_, index) => {
    const row = quarterly[index % quarterly.length];

    return {
      ...row,
      period: `Q${(index % 4) + 1} · Week ${index + 1}`,
    };
  });

  const opsColumns = [
    "Workspace",
    "Owner",
    "Region",
    "Stage",
    "Risk",
    "MRR",
    "Renewal",
    "Health",
    "Action",
  ];

  const opsRows = Array.from({ length: 14 }, (_, index) => ({
    workspace: `customer-success-platform-${index + 1}`,
    owner: ["A. Morgan", "S. Patel", "J. Chen", "R. Diaz"][index % 4],
    region: quarterly[index % quarterly.length]?.region ?? "Global",
    stage: ["Pilot", "Rollout", "Expansion", "Renewal"][index % 4],
    risk: ["Low", "Medium", "Medium", "High"][index % 4],
    mrr: `$${(18_500 + index * 1_250).toLocaleString()}`,
    renewal: `2026-${String((index % 12) + 1).padStart(2, "0")}-15`,
    health: `${(97.2 + (index % 5) * 0.4).toFixed(1)}%`,
    action: index % 3 === 0 ? "Escalate" : "Open",
  }));
</script>

<div class="space-y-12">
  <div class="space-y-4">
    <h2 class="text-lg font-semibold tracking-tight">Default data table</h2>
    <p class="text-sm text-content-muted">
      A clean semantic table with realistic operational data.
    </p>

    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Head>Invoice</Table.Head>
          <Table.Head>Customer</Table.Head>
          <Table.Head>Owner</Table.Head>
          <Table.Head align="right">Status</Table.Head>
          <Table.Head numeric>Amount</Table.Head>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {#each invoices as invoice (invoice.id)}
          <Table.Row>
            <Table.Cell class="font-medium">{invoice.id}</Table.Cell>
            <Table.Cell>{invoice.customer}</Table.Cell>
            <Table.Cell>{invoice.owner}</Table.Cell>
            <Table.Cell align="right">
              <Badge variant="outline">{invoice.status}</Badge>
            </Table.Cell>
            <Table.Cell numeric>{invoice.amount}</Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>

  <div class="space-y-4">
    <h2 class="text-lg font-semibold tracking-tight">Ghost inside a card</h2>
    <p class="text-sm text-content-muted">
      Use the ghost variant when a table should inherit a parent container
      without adding a second outer frame.
    </p>

    <Card class="max-w-2xl" padding="none">
      <Table.Root size="sm" variant="ghost">
        <Table.Header>
          <Table.Row>
            <Table.Head>Team</Table.Head>
            <Table.Head>Owner</Table.Head>
            <Table.Head numeric>Tickets</Table.Head>
            <Table.Head numeric>CSAT</Table.Head>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell class="font-medium">Support</Table.Cell>
            <Table.Cell>A. Morgan</Table.Cell>
            <Table.Cell numeric>184</Table.Cell>
            <Table.Cell numeric>97.9%</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell class="font-medium">Onboarding</Table.Cell>
            <Table.Cell>J. Chen</Table.Cell>
            <Table.Cell numeric>62</Table.Cell>
            <Table.Cell numeric>98.4%</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Card>
  </div>

  <div class="space-y-4">
    <h2 class="text-lg font-semibold tracking-tight">
      Striped with sticky header
    </h2>
    <p class="text-sm text-content-muted">
      Useful for wider datasets and scroll-heavy review screens.
    </p>

    <Table.Root class="max-h-72" stickyHeader striped>
      <Table.Caption>
        Generated weekly snapshots across four regions.
      </Table.Caption>

      <Table.Header>
        <Table.Row>
          <Table.Head>Period</Table.Head>
          <Table.Head>Region</Table.Head>
          <Table.Head numeric>Revenue</Table.Head>
          <Table.Head numeric>Margin</Table.Head>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {#each quarterlySnapshots as row, index (`${row.period}-${row.region}-${index}`)}
          <Table.Row>
            <Table.Cell class="font-mono text-content-muted">
              {row.period}
            </Table.Cell>
            <Table.Cell class="font-medium">{row.region}</Table.Cell>
            <Table.Cell numeric>{row.revenue}</Table.Cell>
            <Table.Cell numeric>{row.margin}</Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>

  <div class="space-y-4">
    <h2 class="text-lg font-semibold tracking-tight">
      Overflow with sticky edges
    </h2>
    <p class="text-sm text-content-muted">
      Constraining both axes highlights sticky identity, actions, and summary
      rows without changing the table surface itself.
    </p>

    <div class="max-w-[900px]">
      <Table.Root
        class="max-h-80"
        stickyActions
        stickyColumn
        stickyFooter
        stickyHeader
      >
        <Table.Header>
          <Table.Row>
            {#each opsColumns as column (column)}
              <Table.Head
                class={column === "Workspace"
                  ? "min-w-64 whitespace-nowrap"
                  : "min-w-32 whitespace-nowrap"}
              >
                {column}
              </Table.Head>
            {/each}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {#each opsRows as row (row.workspace)}
            <Table.Row>
              <Table.Cell class="whitespace-nowrap font-medium">
                {row.workspace}
              </Table.Cell>
              <Table.Cell class="whitespace-nowrap">{row.owner}</Table.Cell>
              <Table.Cell class="whitespace-nowrap">{row.region}</Table.Cell>
              <Table.Cell class="whitespace-nowrap">{row.stage}</Table.Cell>
              <Table.Cell class="whitespace-nowrap">{row.risk}</Table.Cell>
              <Table.Cell class="whitespace-nowrap" numeric>
                {row.mrr}
              </Table.Cell>
              <Table.Cell class="whitespace-nowrap">{row.renewal}</Table.Cell>
              <Table.Cell class="whitespace-nowrap" numeric>
                {row.health}
              </Table.Cell>
              <Table.Cell class="whitespace-nowrap" align="left">
                <Button size="sm" variant="outline" wide>{row.action}</Button>
              </Table.Cell>
            </Table.Row>
          {/each}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.Cell class="whitespace-nowrap font-medium">
              Portfolio total
            </Table.Cell>
            <Table.Cell class="whitespace-nowrap">14 accounts</Table.Cell>
            <Table.Cell class="whitespace-nowrap">4 regions</Table.Cell>
            <Table.Cell class="whitespace-nowrap">Mixed</Table.Cell>
            <Table.Cell class="whitespace-nowrap">3 high</Table.Cell>
            <Table.Cell class="whitespace-nowrap" numeric>$372,750</Table.Cell>
            <Table.Cell class="whitespace-nowrap">Rolling</Table.Cell>
            <Table.Cell class="whitespace-nowrap" numeric>97.6%</Table.Cell>
            <Table.Cell class="whitespace-nowrap" align="left">
              <Button size="sm" variant="outline" wide>Review</Button>
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table.Root>
    </div>
  </div>

  <div class="space-y-4">
    <h2 class="text-lg font-semibold tracking-tight">
      Compact density and footer
    </h2>
    <p class="text-sm text-content-muted">
      Compact tables work well for dashboards while still preserving hierarchy.
    </p>

    <Table.Root size="sm">
      <Table.Header>
        <Table.Row>
          <Table.Head>Metric</Table.Head>
          <Table.Head numeric>Value</Table.Head>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>Open invoices</Table.Cell>
          <Table.Cell numeric>48</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Average approval time</Table.Cell>
          <Table.Cell numeric>2.4d</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Collection rate</Table.Cell>
          <Table.Cell numeric>96.8%</Table.Cell>
        </Table.Row>
      </Table.Body>

      <Table.Footer>
        <Table.Row>
          <Table.Cell class="font-medium">Updated</Table.Cell>
          <Table.Cell numeric>12:40 UTC</Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table.Root>
  </div>
</div>

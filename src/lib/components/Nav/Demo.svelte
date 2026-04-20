<script lang="ts">
  import {
    Box,
    Database,
    Folder,
    House,
    Network,
    ServerCog,
    Settings,
    Shield,
    Users,
  } from "@lucide/svelte";
  import Card from "$lib/components/Card/Card.svelte";
  import Container from "$lib/components/Container/Container.svelte";
  import { Nav } from "./index.js";
</script>

<Container maxWidth="sm">
  <Card>
    <Nav.Root>
      <Nav.Item href="#home" label="Home" icon={House} isActive={true} />

      <Nav.Group label="Management" icon={Users} isOpen={true}>
        <Nav.Item href="#users" label="Users" />

        <Nav.Group label="Permissions" icon={Shield} isOpen={true} line="solid">
          <Nav.Item href="#roles" label="Roles" isActive />

          <Nav.Group label="Advanced" icon={Folder} isOpen={true}>
            <Nav.Item href="#policies" label="Policies" />

            <Nav.Group label="Overrides" icon={Box} isOpen={true} line="none">
              <Nav.Item href="#custom-rules" label="Custom Rules" />
            </Nav.Group>
          </Nav.Group>
        </Nav.Group>
      </Nav.Group>

      <Nav.Group label="System" icon={ServerCog}>
        <Nav.Group label="Infrastructure" icon={Network}>
          <Nav.Item href="#database" label="Database" icon={Database} />
        </Nav.Group>
        <Nav.Item href="#settings" label="Settings" icon={Settings} />
      </Nav.Group>

      <Nav.Item href="#api-v1" label="API v1" />
    </Nav.Root>
  </Card>
</Container>

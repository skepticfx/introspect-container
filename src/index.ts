import { Container, loadBalance, getContainer } from "@cloudflare/containers";
import { Hono } from "hono";

export class IntrospectContainer extends Container {
  // Port the container listens on (default: 8080)
  defaultPort = 7681;
  // Time before container sleeps due to inactivity (default: 30s)
  sleepAfter = "2m";
  // Environment variables passed to the container
  envVars = {
    system: "ttyd-introspect",
  };
  enableInternet = true;

  // Optional lifecycle hooks
  override onStart() {
    console.log("Container successfully started");
  }

  override onStop() {
    console.log("Container successfully shut down");
  }

  override onError(error: unknown) {
    console.log("Container error:", error);
  }
}

// Create Hono app with proper typing for Cloudflare Workers
const app = new Hono<{
  Bindings: { INTROSPECT_CONTAINER: DurableObjectNamespace<IntrospectContainer> };
}>();

app.get("/*", async (c) => {
  const container = getContainer(c.env.INTROSPECT_CONTAINER);
  return await container.fetch(c.req.raw);
});

export default app;

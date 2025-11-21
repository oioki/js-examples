import * as Sentry from "@sentry/remix";
import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

Sentry.init({
  dsn: "https://4422eb44b50a7a5456db75fa27ec3161@o4508565392703488.ingest.us.sentry.io/4510400042369024",
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV || "development",
});

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>
  );
});


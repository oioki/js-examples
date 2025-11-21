import * as Sentry from "@sentry/remix";

Sentry.init({
  dsn: "https://4422eb44b50a7a5456db75fa27ec3161@o4508565392703488.ingest.us.sentry.io/4510400042369024",
  tracesSampleRate: 1.0,
  sendDefaultPii: true,
  environment: process.env.NODE_ENV || "development",
  integrations: [
    Sentry.httpIntegration(),
  ],
});


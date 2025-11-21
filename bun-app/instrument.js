import * as Sentry from "@sentry/bun";
// Ensure to call this before importing any other modules!
Sentry.init({
  dsn: "https://273d5bf9d1ac39a74878704a2a2c4255@o546955.ingest.us.sentry.io/4510401997438976",
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/bun/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
  // Add Performance Monitoring by setting tracesSampleRate
  // Set tracesSampleRate to 1.0 to capture 100% of transactions
  // We recommend adjusting this value in production
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
  tracesSampleRate: 1.0,
});
import * as Sentry from "@sentry/bun";

Sentry.init({
  dsn: "https://273d5bf9d1ac39a74878704a2a2c4255@o546955.ingest.us.sentry.io/4510401997438976",
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV || "development",
});

const server = Bun.serve({
  port: 3001,
  async fetch(req) {
    const url = new URL(req.url);

    // Serve the main page
    if (url.pathname === "/") {
      const html = await Bun.file("./public/index.html").text();
      return new Response(html, {
        headers: { "Content-Type": "text/html" },
      });
    }

    // API endpoint
    if (url.pathname === "/api/submit" && req.method === "POST") {
      try {
        const body = await req.json();
        const { username } = body;

        // Add breadcrumb for server-side tracking
        Sentry.addBreadcrumb({
          category: "api",
          message: "Processing form submission",
          data: { username },
          level: "info",
        });

        return Response.json({
          success: true,
          message: `Hello, ${username}!`,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        // Capture server-side errors
        Sentry.captureException(error);
        
        return Response.json(
          { error: "Invalid request" },
          { status: 400 }
        );
      }
    }

    // 404
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`🚀 Bun server running at http://localhost:${server.port}`);


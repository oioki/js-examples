# Remix Sentry Demo

A simple Remix app demonstrating Sentry JavaScript SDK integration with full server-side tracing.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open http://localhost:5173 in your browser

## What it does

- Simple form with a text input
- Sends AJAX POST request to `/api/submit`
- Tracks form submissions with Sentry breadcrumbs
- Captures and reports any errors to Sentry
- Shows real-time logs of activity
- **Full server-side instrumentation** - tracks `http.server` spans
- Client-side and server-side error tracking
- Performance monitoring for both frontend and backend

## Sentry Features

This demo includes:
- ✅ Server-side initialization (`entry.server.tsx`)
- ✅ Client-side initialization (`entry.client.tsx`)
- ✅ HTTP server tracing (`span.op: http.server`)
- ✅ Remix route instrumentation
- ✅ Breadcrumbs tracking
- ✅ Error capturing with context
- ✅ Performance monitoring

## Production

Build for production:
```bash
npm run build
npm start
```


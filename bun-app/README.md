# Bun Demo App

A minimal web app built with Bun with Sentry integration.

## Requirements

- [Bun](https://bun.sh) installed

## Setup

1. Install dependencies:
```bash
bun install
```

2. Run the server:
```bash
bun run dev
```

Or:
```bash
bun run start
```

The app will be available at http://localhost:3001

## What it does

- Simple HTML form with text input
- Sends POST request to `/api/submit`
- Displays real-time logs
- Fast server powered by Bun
- **Sentry integration** for error tracking and performance monitoring
  - Server-side error capturing with `@sentry/bun`
  - Client-side error capturing via Sentry CDN
  - Breadcrumbs tracking
  - Full context and tags

## Structure

```
bun-app/
├── server.ts          # Bun HTTP server
├── public/
│   └── index.html     # Frontend
├── package.json
└── README.md
```


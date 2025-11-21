import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.json();
  
  // Simulate some processing
  return json({
    success: true,
    message: `Hello, ${body.username}!`,
    timestamp: new Date().toISOString(),
  });
}

// Return 405 for non-POST requests
export function loader() {
  return json({ error: "Method not allowed" }, { status: 405 });
}

